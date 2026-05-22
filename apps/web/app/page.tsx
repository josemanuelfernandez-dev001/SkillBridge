import type { KnowledgeCard } from "@skillbridge/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const fetchCards = async (): Promise<KnowledgeCard[]> => {
  const response = await fetch(`${apiUrl}/api/v1/cards`, { cache: "no-store" });

  if (!response.ok) {
    return [];
  }

  return response.json() as Promise<KnowledgeCard[]>;
};

export default async function Home() {
  const cards = await fetchCards();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">SkillBridge</h1>
          <p className="text-slate-300">
            Knowledge cards shared by senior team members for fast onboarding.
          </p>
        </header>

        <section className="rounded-2xl bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Knowledge Cards</h2>
          <ul className="mt-4 grid gap-4">
            {cards.length === 0 ? (
              <li className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-slate-300">
                No cards available yet.
              </li>
            ) : (
              cards.map((card) => (
                <li
                  key={card.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-slate-100">{card.title}</h3>
                    <p className="text-sm text-slate-300">{card.content}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                      <span>Author: {card.authorId}</span>
                      <span>•</span>
                      <span>{new Date(card.createdAt).toLocaleDateString()}</span>
                      {card.tags.length > 0 && (
                        <span>• Tags: {card.tags.join(", ")}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
