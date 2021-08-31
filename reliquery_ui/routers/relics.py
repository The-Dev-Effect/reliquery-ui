from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from reliquery import Relic
from typing import List


def get_router(Relic=Relic):
    router = APIRouter()

    @router.get("/reliquery/{relic_type}/{name}", response_model=RelicResponse)
    async def reliquery(relic_type: str, name: str) -> RelicResponse:
        if not Relic.relic_exists(name=name, relic_type=relic_type):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(name=name, relic_type=relic_type, check_exists=False)

        return relic_response(relic)

    @router.get(
        "/reliquery/{relic_type}/{name}/html/{html}", response_class=HTMLResponse
    )
    async def reliquery_html(relic_type: str, name: str, html: str) -> str:
        if not Relic.relic_exists(name=name, relic_type=relic_type):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(name=name, relic_type=relic_type, check_exists=False)

        return relic.get_html(html)

    return router


class RelicResponse(BaseModel):
    name: str
    relic_type: str
    arrays: List[str]


def relic_response(relic: Relic) -> RelicResponse:
    return RelicResponse(
        name=relic.name,
        relic_type=relic.relic_type,
        arrays=relic.list_arrays(),
    )


router = get_router(Relic)
