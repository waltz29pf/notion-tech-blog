import PostContent from "@/components/blog/PostContent";
import { getPostBySlug } from "@/lib/notion/database";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPost({ params, searchParams }: PageProps) {
  try {
    console.log(searchParams)
    const { slug } = params;
    const post = await getPostBySlug(slug);
    if (!params.slug) {
      console.error("Slug parameter is missing");
      notFound();
    }
    if (!post) {
      notFound();
    }

    return (
      <article className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <PostContent post={post} />
      </article>
    );
  } catch (error) {
    console.error("Error in BlogPost:", error);
    notFound();
  }
}
