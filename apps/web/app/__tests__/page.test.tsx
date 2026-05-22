import { render, screen } from "@testing-library/react";
import Home from "../page";

const mockCards = [
  {
    id: "card-1",
    title: "Mentoring",
    content: "Share mentoring practices.",
    authorId: "author-1",
    createdAt: new Date().toISOString(),
    tags: ["mentoring"],
  },
];

describe("Home page", () => {
  it("renders SkillBridge heading", async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => mockCards,
    })) as unknown as typeof fetch;

    const page = await Home();
    render(page);

    expect(screen.getByText("SkillBridge")).toBeInTheDocument();
  });
});
