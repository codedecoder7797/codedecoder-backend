import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type Blog = {
  id: string;
  title: string;
  bannerImage: string;
  bannerImageWidth: number;
  bannerImageHeight: number;
  content: BlockObjectResponse[];
  slug: string;
  description: string;
  bannerImageBlur: string;
};

export type BlogMeta = Omit<Blog, "content" | "bannerImageBlur">;

export type BlogList = BlogMeta[];
