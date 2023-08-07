import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getPages = (dbId: string) => {
  try {
    return notionClient.databases.query({
      filter: {
        property: "Status",
        status: {
          equals: "published",
        },
      },
      database_id: dbId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getPageBySlug = async (slug: string, dbId: string) => {
  const response = await notionClient.databases.query({
    database_id: dbId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  const result = (await response.results[0]) as PageObjectResponse | undefined;

  return result;
};

export const getPageContent = async (pageId: string) => {
  return notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[]);
};
