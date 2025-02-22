import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionDatabaseProperties = {
  title?: {
    type: "title";
    title: Array<{
      type: "text";
      text: { content: string; link: null };
      plain_text: string;
      // annotations?: any;
    }>;
  };
  tag?: {
    type: "multi_select";
    multi_select: Array<{
      id: string;
      name: string;
      color: string;
    }>;
  };
  category?: {
    type: "select";
    select: {
      id: string;
      name: string;
      color: string;
    } | null;
  };
  slug?: {
    type: "rich_text";
    rich_text: Array<{
      type: "text";
      text: {
        content: string;
        link: null;
      };
      plain_text: string;
      annotations?: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
    }>;
  };
  createAt?: {
    type: "created_time";
    created_time: string;
  };
  status?: {
    type: "status";
    status: {
      id: string;
      name: "Published" | "Draft" | "Private";
      color: string;
    } | null;
  };
  file?: {
    type: "files";
    files: Array<{
      name?: string;
      type: "file";
      file: {
        url: string;
        expiry_time?: string;
      };
    }>;
  };
  // [key: string]: any;
};

export type NotionPage = PageObjectResponse & {
  properties: NotionDatabaseProperties;
};
