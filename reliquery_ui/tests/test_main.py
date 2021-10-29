from typing import Dict

from fastapi.testclient import TestClient

from ..main import get_app


class TestRelic:
    name: str
    relic_type: str
    storage: str

    def __init__(
        self,
        name: str,
        relic_type: str,
        storage: str = None,
        storage_name: str = "default",
        check_exists: bool = True,
    ):
        self.name = name
        self.relic_type = relic_type
        self.storage = None
        self.storage_name = storage_name
        self.check_exists = check_exists

    @classmethod
    def relic_exists(
        cls,
        name: str,
        relic_type: str,
        storage: str = None,
        storage_name: str = "default",
    ) -> bool:
        return True

    def describe(self) -> Dict:
        return {
            "tutorial": {
                "arrays": [],
                "text": [],
                "html": [],
                "images": [],
                "json": [],
                "pandasdf": [],
            }
        }


def test_read_relic():
    app = get_app(TestRelic)
    client = TestClient(app)
    response = client.get("/api/reliquery/default/basic/tutorial")
    assert response.status_code == 200
    print(response)
    assert response.json() == {
        "name": "tutorial",
        "relic_type": "basic",
        "arrays": [],
        "text": [],
        "html": [],
        "images": [],
        "json": [],
        "pandasdf": [],
    }
