import { Post } from "@/types/blog";
import { NotionDatabaseProperties } from "./types";

/**
 * NotionのデータベースプロパティをPostオブジェクトに変換
 */
export function parseProperties(
  properties: NotionDatabaseProperties,
  pageId: string
): Post {
  try {
    if (
      !properties.title?.title?.[0]?.plain_text ||
      !properties.slug?.rich_text?.[0]?.plain_text
    ) {
      throw new Error(`Title is required for page ${pageId}`);
    }

    return {
      id: pageId,
      slug: properties.slug?.rich_text[0]?.plain_text,
      title: properties.title.title[0].plain_text,
      content: properties.title.title[0].plain_text,
      tags: properties.tag?.multi_select?.map((tag) => tag.name) ?? [],
      category: properties.category?.select?.name ?? "",
      createdAt: properties.createAt?.created_time ?? "",
      status: (properties.status?.status?.name as Post["status"]) ?? "Draft",
      fileUrl: properties.file?.files[0]?.file?.url,
    };
  } catch (error) {
    console.error("Error parsing properties:", error);
    throw new Error(`Failed to parse Notion properties for page ${pageId}`);
  }
}
