from functools import wraps
from os import name
from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.responses import Response
from pydantic import BaseModel, Field
from reliquery import Relic, Reliquery, storage
from typing import List, Any
import base64
import json


def get_router(Relic=Relic):
    router = APIRouter()

    @router.get(
        "/reliquery/{storage_name}/{relic_type}/{name}", response_model=RelicResponse
    )
    async def reliquery(storage_name: str, relic_type: str, name: str) -> RelicResponse:
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
    # @cache_no_store TODO: figure out why the decorator breaks app
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
        "/reliquery",
        response_model=AllRelicNamesResponse,
    )
    async def reliquery_storages() -> AllRelicNamesResponse:
        reliquery = Reliquery()

        return AllRelicNamesResponse(
            relics=[
                RelicNameResponse(name=i["name"], type=i["type"], storage=i["storage"])
                for i in reliquery.get_relic_names()
            ]
        )

    @router.get(
        "/reliquery/storages",
        response_model=RelicStoragesResponse,
    )
    async def reliquery_storages() -> RelicStoragesResponse:
        reliquery = Reliquery()

        return RelicStoragesResponse(storage_names=list(reliquery.storage_map.keys()))

    @router.get(
        "/reliquery/{storage_name}",
        response_model=RelicTypesResponse,
    )
    async def reliquery_relic_types(storage_name: str) -> RelicTypesResponse:
        reliquery = Reliquery()

        return RelicTypesResponse(
            types=reliquery.get_relic_types_by_storage(storage_name)
        )

    @router.get(
        "/reliquery/{storage_name}/{relic_type}",
        response_model=RelicsResponse,
    )
    async def reliquery_relics(storage_name: str, relic_type: str) -> RelicsResponse:
        reliquery = Reliquery()

        return RelicsResponse(
            relics=reliquery.get_relic_names_by_storage_and_type(
                storage_name, relic_type
            )
        )

    return router


class RelicNameResponse(BaseModel):
    name: str
    type: str
    storage: str


class AllRelicNamesResponse(BaseModel):
    relics: List[RelicNameResponse]


class RelicsResponse(BaseModel):
    relics: List[str]


class RelicTypesResponse(BaseModel):
    types: List[str]


class RelicStoragesResponse(BaseModel):
    storage_names: List[str]


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
    )


router = get_router(Relic)
