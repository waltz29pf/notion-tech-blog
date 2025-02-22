import { Post } from "@/types/blog";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <div className="flex gap-2 mt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
        <time className="mt-2 text-gray-600">{post.createdAt}</time>
        <div className="mt-2">{post.category}</div>
      </article>
    </Link>
  );
}
