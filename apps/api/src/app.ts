import { randomUUID } from "crypto";
import Fastify, { type FastifyInstance } from "fastify";
import type { KnowledgeCard } from "@skillbridge/types";

type CreateCardBody = {
  title: string;
  content: string;
  authorId: string;
};

const mockCards: KnowledgeCard[] = [
  {
    id: randomUUID(),
    title: "Onboarding Essentials",
    content: "Key steps for onboarding new hires effectively.",
    authorId: "author-101",
    createdAt: new Date().toISOString(),
    tags: ["onboarding", "culture"],
  },
  {
    id: randomUUID(),
    title: "Operational Handoffs",
    content: "Checklist for reliable shift handovers.",
    authorId: "author-202",
    createdAt: new Date().toISOString(),
    tags: ["operations", "handoff"],
  },
];

export const buildServer = (): FastifyInstance => {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? "info",
    },
  });

  app.get("/health", async () => ({
    status: "ok",
    service: "api",
    version: "0.1.0",
  }));

  app.get("/api/v1/cards", async () => mockCards);

  app.post<{ Body: CreateCardBody }>("/api/v1/cards", async (request, reply) => {
    const { title, content, authorId } = request.body;
    const card: KnowledgeCard = {
      id: randomUUID(),
      title,
      content,
      authorId,
      createdAt: new Date().toISOString(),
      tags: [],
    };

    reply.code(201);
    return card;
  });

  return app;
};
