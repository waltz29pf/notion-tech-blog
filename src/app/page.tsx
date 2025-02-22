// src/app/page.tsx
import PostList from "@/components/blog/PostList";
import { getPublishedPosts } from "@/lib/notion/database";

export default async function Home() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen flex flex-col bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tech Blog</h1>
        <PostList posts={posts} />
      </div>
    </main>
  );
}
