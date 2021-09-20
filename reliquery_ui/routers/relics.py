from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from reliquery import Relic
from typing import List, Any


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

    return router


class RelicResponse(BaseModel):
    name: str
    relic_type: str
    arrays: List[Any] = []
    text: List[Any] = []
    html: List[Any] = []

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
    RelicResponse.update_forward_refs()
    return RelicResponse(
        name=relic.name,
        relic_type=relic.relic_type,
        arrays=description["arrays"],
        text=description["text"],
        html=description["html"],
    )


router = get_router(Relic)
