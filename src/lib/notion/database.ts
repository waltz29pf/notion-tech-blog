import { Post } from "@/types/blog";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { n2m, notion } from "./client";
import { parseProperties } from "./parser";

export async function getPublishedPosts(): Promise<Post[]> {
  try {
    console.log(process.env.NOTION_DATABASE_ID)
    const database = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "status",
        status: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "createAt",
          direction: "descending",
        },
      ],
    });

    return database.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => parseProperties(page.properties, page.id));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    // const blocks = await notion.blocks.children.list({ block_id: page.id });

    if (!("properties" in page)) {
      console.warn("Properties not found in the page object:", page);
      return null;
    }

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks).parent;

    return {
      ...parseProperties(page.properties, page.id),
      content: mdString,
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}
