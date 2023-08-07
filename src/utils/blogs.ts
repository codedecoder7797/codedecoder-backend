/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Blog, BlogList } from "../types/blog";
import { getPageContent } from "../lib/notion";

export const mapBlogs = async (posts: QueryDatabaseResponse) => {
  const blogs: BlogList = posts.results.map((post) => {
    const blog = post as PageObjectResponse;
    return {
      id: blog.id,
      title: (blog?.properties.Title as any).title[0].plain_text,
      description: (blog?.properties.Description as any).rich_text[0]
        .plain_text as string,
      bannerImage: (blog.properties.Image as any).url as string,
      bannerImageWidth: (blog.properties.BannerImageWidth as any)
        .number as number,
      bannerImageHeight: (blog.properties.BannerImageHeight as any)
        .number as number,
      slug: (blog?.properties.Slug as any).rich_text[0].plain_text,
    };
  });

  return blogs;
};

export const mapSlugs = (posts: QueryDatabaseResponse) => {
  const slugs = posts.results.map((post) => {
    const blog = post as PageObjectResponse;
    return {
      slug:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((blog?.properties.Slug as any).rich_text[0].plain_text as string) ||
        "",
    };
  });

  return slugs;
};

export const mapPost = async (post: PageObjectResponse) => {
  const content = await getPageContent(post.id);

  const blog: Blog = {
    id: post.id,
    title: (post.properties.Title as any).title[0].plain_text,
    bannerImage: (post.properties.Image as any).url,
    bannerImageWidth: (post.properties.BannerImageWidth as any).number,
    bannerImageHeight: (post.properties.BannerImageHeight as any).number,
    content,
    description: (post?.properties.Description as any).rich_text[0]
      .plain_text as string,
    slug:
      ((post?.properties.Slug as any).rich_text[0].plain_text as string) || "",
    bannerImageBlur: (post.properties.ImageBlurUrl as any).url as string,
  };

  return blog;
};

export const mapSiteMaps = (posts: QueryDatabaseResponse) => {
  const slugs = posts.results.map((post) => {
    const blog = post as PageObjectResponse;
    return {
      slug:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((blog?.properties.Slug as any).rich_text[0].plain_text as string) ||
        "",
      date: blog.last_edited_time,
    };
  });

  return slugs;
};
