import os

from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from .routers import relics
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

    app.include_router(relics.get_router(Relic), prefix="/api", tags=["relics"])

    rel_loc = os.path.dirname(__file__)
    dist_path = os.path.join(os.path.split(rel_loc)[0], "frontend/dist/")
    index_path = dist_path + "index.html"

    @app.get("/", response_class=FileResponse)
    def read_index(request: Request):
        return FileResponse(index_path)

    @app.get("/{catchall:path}", response_class=FileResponse)
    def read_index(request: Request):
        # check first if requested file exists
        path = request.path_params["catchall"]
        file = dist_path + path

        print("looking for: ", path, file)
        if os.path.exists(file):
            return FileResponse(file)

        # otherwise return index
        return FileResponse(index_path)

    return app


app = get_app(Relic)
