import { Post } from "@/types/blog";
import Link from "next/link";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="transition-transform duration-200 hover:-translate-y-1"
        >
          <article className="h-full border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-3">{post.title}</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-600 px-2 py-1 rounded-full text-sm text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-gray-400">
              <div>{post.category}</div>
              <time className="text-sm">
                {new Date(post.createdAt).toLocaleDateString("ja-JP")}
              </time>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
