from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from reliquery import Relic


def get_app(Relic=Relic):
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/reliquery/{relic_type}/{name}", response_model=RelicResponse)
    async def reliquery(relic_type: str, name: str) -> RelicResponse:
        if not Relic.relic_exists(name=name, relic_type=relic_type):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(name=name, relic_type=relic_type)

        return relic_response(relic)

    @app.get("/reliquery/{relic_type}/{name}/html/{html}", response_class=HTMLResponse)
    async def reliquery_html(relic_type: str, name: str, html: str) -> str:
        if not Relic.relic_exists(name=name, relic_type=relic_type):
            raise HTTPException(status_code=404, detail="Relic not found")

        relic = Relic(name=name, relic_type=relic_type)

        return relic.get_html(html)

    return app


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


app = get_app(Relic)
