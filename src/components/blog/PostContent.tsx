import { Post } from "@/types/blog";
import ReactMarkdown from "react-markdown";

interface PostContentProps {
  post: Post;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <time className="text-gray-400">
          {new Date(post.createdAt).toLocaleDateString("ja-JP")}
        </time>
      </div>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {/* <ReactMarkdown children={post.content} /> */}
      {/* {post.content} */}
    </div>
  );
};

export default PostContent;
