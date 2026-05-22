import { buildServer } from "../app";

describe("API routes", () => {
  const app = buildServer();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /health returns service status", async () => {
    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
      service: "api",
      version: "0.1.0",
    });
  });

  it("GET /api/v1/cards returns mock cards", async () => {
    const response = await app.inject({ method: "GET", url: "/api/v1/cards" });

    expect(response.statusCode).toBe(200);
    const payload = response.json() as Array<{ id: string }>;
    expect(payload).toHaveLength(2);
    expect(payload[0].id).toEqual(expect.any(String));
  });

  it("POST /api/v1/cards creates a card", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/cards",
      payload: {
        title: "Mentoring Playbook",
        content: "Guidelines for mentoring junior engineers.",
        authorId: "author-303",
      },
    });

    expect(response.statusCode).toBe(201);
    const payload = response.json() as { title: string; authorId: string; id: string };
    expect(payload.title).toBe("Mentoring Playbook");
    expect(payload.authorId).toBe("author-303");
    expect(payload.id).toEqual(expect.any(String));
  });
});
