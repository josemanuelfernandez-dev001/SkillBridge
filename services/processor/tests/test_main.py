import sys
from pathlib import Path

from fastapi.testclient import TestClient

sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.main import app

client = TestClient(app)


def test_health_check() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "processor"}


def test_process_card() -> None:
    payload = {"card_id": "card-1", "content": "Transfer knowledge efficiently."}
    response = client.post("/process", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["card_id"] == "card-1"
    assert data["word_count"] == 3
    assert data["summary"] == "Mock summary of the knowledge card."
    assert data["tags"] == ["knowledge", "skillbridge"]
