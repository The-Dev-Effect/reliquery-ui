from functools import wraps
from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.responses import Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from reliquery import Relic, Reliquery
from typing import List, Any
import base64
import json


def cache_no_store(f):
    @wraps(f)
    def inner(*args, **kwargs):
        resp = f(*args, **kwargs)
        resp.headers["Cache-Control"] = "no-store"
        return resp

    return inner


def get_router(Relic=Relic, Reliquery=Reliquery):
    router = APIRouter()
    rq = Reliquery()

    @router.get("/sync_reliquery", response_model=None)
    async def reliquery_relic() -> None:
        rq.sync_reliquery()

    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}", response_model=RelicResponse
    )
    async def reliquery_relic(
        storage_name: str, relic_type: str, name: str
    ) -> RelicResponse:
        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )

        return relic_response(relic)
        
    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}/html/{html}",
        response_class=HTMLResponse,
    )
    async def reliquery_html(
        storage_name: str, relic_type: str, name: str, html: str
    ) -> str:
        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )

        return relic.get_html(html)

    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}/images/{image}",
        response_class=HTMLResponse,
    )
    async def reliquery_images(
        storage_name: str, relic_type: str, name: str, image: str
    ) -> str:
        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )

        encoded = base64.b64encode(relic.get_image(image).read()).decode("utf-8")
        return "<div><img src='data:image/png;base64,{}'></div>".format(encoded)

    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}/text/{text}",
        response_class=HTMLResponse,
    )
    async def reliquery_text(
        storage_name: str, relic_type: str, name: str, text: str
    ) -> str:
        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )

        return relic.get_text(text)

    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}/json/{json_name}",
        response_class=HTMLResponse,
    )
    async def reliquery_json(
        storage_name: str, relic_type: str, name: str, json_name: str
    ) -> str:
        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )
        return json.dumps(relic.get_json(json_name), sort_keys=True, indent=4)

    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}/pandasdf/{pandasdf_name}",
        response_class=HTMLResponse,
    )
    async def reliquery_pandas_df(
        storage_name: str, relic_type: str, name: str, pandasdf_name: str
    ) -> str:
        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )
        return relic.get_pandasdf(pandasdf_name).to_html()

    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}/files/{files_name}",
        response_class=Response,
    )
    # @cache_no_store TODO: figure out why the decorator breaks app
    async def reliquery_files(
        storage_name: str, relic_type: str, name: str, files_name: str
    ) -> Response:
        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )

        response = Response(content=relic.get_file(files_name).read())
        response.headers["Content-Disposition"] = "attachment"
        response.headers["Cache-Control"] = "no-store"

        return response

    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}/notebooks-html/{notebooks_name}",
        response_class=HTMLResponse,
    )
    async def reliquery_notebooks(
        storage_name: str, relic_type: str, name: str, notebooks_name: str
    ) -> str:
        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )
        return relic.get_notebook_html(notebooks_name)

    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}/notebooks/{notebooks_name}",
        response_class=Response,
    )
    async def reliquery_notebooks(
        storage_name: str, relic_type: str, name: str, notebooks_name: str
    ) -> Response:
        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )

        response = Response(content=relic.get_notebook(notebooks_name).read())
        response.headers["Content-Disposition"] = "attachment"
        response.headers["Cache-Control"] = "no-store"

        return response


     
    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}/videos/{video}",
        response_class=StreamingResponse,
    )
    async def reliquery_videos(
        storage_name: str, relic_type: str, name: str, video: str
    ) -> StreamingResponse:

        if not Relic.relic_exists(
            name=name, relic_type=relic_type, storage_name=storage_name
        ):
            raise HTTPException(status_code=404, detail="Relic not found")
        relic = Relic(
            name=name,
            relic_type=relic_type,
            storage_name=storage_name,
            check_exists=False,
        )
        video_bytes = relic.get_video(video)
        return StreamingResponse(video_bytes, media_type='video/mp4')
            


    @router.get(
        "/reliquery",
        response_model=AllRelicNamesResponse,
    )
    async def reliquery_storages() -> AllRelicNamesResponse:

        return AllRelicNamesResponse(
            relics=[
                RelicNameResponse(name=i["name"], type=i["type"], storage=i["storage"])
                for i in rq.get_relic_names()
            ]
        )

    @router.get(
        "/storages",
        response_model=RelicStoragesResponse,
    )
    async def reliquery_storages() -> RelicStoragesResponse:

        return RelicStoragesResponse(
            storage_names=[RelicStorageName(storage_name=i) for i in rq.storage_map]
        )

    @router.get(
        "/storages/{storage_name}",
        response_model=AllRelicNamesResponse,
    )
    async def reliquery_relic_names_by_storage(
        storage_name: str,
    ) -> AllRelicNamesResponse:

        return AllRelicNamesResponse(
            relics=[
                RelicNameResponse(name=i["name"], type=i["type"], storage=i["storage"])
                for i in rq.get_relic_names_by_storage(storage=storage_name)
            ]
        )

    @router.get(
        "/relic-types",
        response_model=RelicTypesResponse,
    )
    async def reliquery_relic_types() -> RelicTypesResponse:

        return RelicTypesResponse(
            types=[
                RelicTypeResponse(type=t["type"], storage=t["storage"])
                for t in rq.get_unique_relic_types_and_storages()
            ]
        )

    @router.get(
        "/relic-types/{storage_name}/{relic_type}",
        response_model=AllRelicNamesResponse,
    )
    async def reliquery_relic_names_by_storage_and_type(
        storage_name: str, relic_type: str
    ) -> AllRelicNamesResponse:

        return AllRelicNamesResponse(
            relics=[
                RelicNameResponse(name=i["name"], type=i["type"], storage=i["storage"])
                for i in rq.get_relic_names_by_storage_and_type(
                    storage=storage_name, relic_type=relic_type
                )
            ]
        )

    @router.get(
        "/reliquery/{storage_name}/{relic_type}",
        response_model=RelicsResponse,
    )
    async def reliquery_relics(storage_name: str, relic_type: str) -> RelicsResponse:

        return RelicsResponse(
            relics=[
                RelicNameResponse(name=i["name"], type=i["type"], storage=i["storage"])
                for i in rq.get_relic_names_by_storage_and_type(
                    storage_name, relic_type
                )
            ]
        )

    return router


class RelicNameResponse(BaseModel):
    name: str
    type: str
    storage: str


class RelicStorageName(BaseModel):
    storage_name: str


class RelicTypeResponse(BaseModel):
    type: str
    storage: str


class AllRelicNamesResponse(BaseModel):
    relics: List[RelicNameResponse]


class RelicsResponse(BaseModel):
    relics: List[RelicNameResponse]


class RelicTypesResponse(BaseModel):
    types: List[RelicTypeResponse]


class RelicStoragesResponse(BaseModel):
    storage_names: List[RelicStorageName]


class RelicResponse(BaseModel):
    name: str
    relic_type: str
    arrays: List[Any] = []
    text: List[Any] = []
    html: List[Any] = []
    images: List[Any] = []
    json_field: List[Any] = Field(alias="json")
    pandasdf: List[Any] = []
    files: List[Any] = []
    notebooks: List[Any] = []
    videos: List[Any] = []

    class Config:
        arbitrary_types_allowed = True


class MetaData:
    name: str
    relic_type: str
    data_type: str
    size: str
    shape: str
    last_modified: str


def relic_response(relic: Relic) -> RelicResponse:
    description = relic.describe()[relic.name]

    # TODO: We will investigate this.
    RelicResponse.update_forward_refs()
    return RelicResponse(
        name=relic.name,
        relic_type=relic.relic_type,
        arrays=description["arrays"],
        text=description["text"],
        html=description["html"],
        images=description["images"],
        json=description["json"],
        pandasdf=description["pandasdf"],
        files=description["files"],
        notebooks=description["notebooks"],
        videos = description["videos"]
    )
