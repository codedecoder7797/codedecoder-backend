/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from "express";

import { getPageBySlug, getPageContent, getPages } from "../lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Blog, BlogList } from "../types/blog";

export const getBlogs: RequestHandler = async (req, res) => {
  try {
    const posts = await getPages();
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
    return res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
  }
};

export const getSlugs: RequestHandler = async (req, res) => {
  const posts = await getPages();
  const slugs = posts.results.map((post) => {
    const blog = post as PageObjectResponse;
    return {
      slug:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((blog?.properties.Slug as any).rich_text[0].plain_text as string) ||
        "",
    };
  });

  return res.status(200).json(slugs);
};

export const getBlogBySlug: RequestHandler = async (req, res) => {
  try {
    const post = await getPageBySlug(req.params.slug as string);
    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }

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
        ((post?.properties.Slug as any).rich_text[0].plain_text as string) ||
        "",
      bannerImageBlur: (post.properties.ImageBlurUrl as any).url as string,
    };

    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
};

export const getSitemaps: RequestHandler = async (req, res) => {
  const posts = await getPages();
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

  return res.status(200).json(slugs);
};
