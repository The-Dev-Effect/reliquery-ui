from fastapi.testclient import TestClient

from ..main import get_app
from typing import Any, List


class TestRelic:
    name: str
    relic_type: str
    storage: str

    def __init__(self, name: str, relic_type: str, storage: str = None):
        self.name = name
        self.relic_type = relic_type
        self.storage = None

    @classmethod
    def relic_exists(cls, name: str, relic_type: str, storage: str = None) -> bool:
        return True

    def list_arrays(self) -> List[str]:
        return ["ones"]


def test_read_relic():
    app = get_app(TestRelic)
    client = TestClient(app)
    response = client.get("/reliquery/basic/tutorial")
    assert response.status_code == 200
    assert response.json() == {
        "name": "tutorial",
        "relic_type": "basic",
        "arrays": ["ones"],
    }
