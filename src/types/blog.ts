export interface Post {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  category: string;
  createdAt: string;
  status: "Published" | "Draft" | "Private";
  fileUrl?: string;
  content?: string;
}
