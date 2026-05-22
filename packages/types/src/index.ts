export type KnowledgeCard = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  tags: string[];
};

export type ProcessRequest = {
  card_id: string;
  content: string;
};

export type ProcessResponse = {
  card_id: string;
  word_count: number;
  summary: string;
  tags: string[];
};
