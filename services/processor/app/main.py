from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class ProcessRequest(BaseModel):
    card_id: str
    content: str


class ProcessResponse(BaseModel):
    card_id: str
    word_count: int
    summary: str
    tags: list[str]


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "processor"}


@app.post("/process", response_model=ProcessResponse)
def process_card(payload: ProcessRequest) -> ProcessResponse:
    word_count = len(payload.content.split())
    return ProcessResponse(
        card_id=payload.card_id,
        word_count=word_count,
        summary="Mock summary of the knowledge card.",
        tags=["knowledge", "skillbridge"],
    )
