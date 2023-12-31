/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from "express";

import { getPageBySlug, getPages } from "../lib/notion";
import { BlogDbID } from "../lib/notion/constants";
import { mapBlogs, mapPost, mapSiteMaps, mapSlugs } from "../utils/blogs";

const DB_ID = BlogDbID;

export const getBlogs: RequestHandler = async (req, res) => {
  try {
    const posts = await getPages(DB_ID);
    if (!posts) {
      return res.status(404).json({ message: "Not found" });
    }
    const blogs = await mapBlogs(posts);
    return res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
  }
};

export const getSlugs: RequestHandler = async (req, res) => {
  const posts = await getPages(DB_ID);
  if (!posts) {
    return res.status(404).json({ message: "Not found" });
  }
  const slugs = mapSlugs(posts);

  return res.status(200).json(slugs);
};

export const getBlogBySlug: RequestHandler = async (req, res) => {
  try {
    const post = await getPageBySlug(req.params.slug as string, DB_ID);
    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }

    const blog = await mapPost(post);

    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
};

export const getSitemaps: RequestHandler = async (req, res) => {
  const posts = await getPages(DB_ID);
  if (!posts) {
    return res.status(404).json({ message: "Not found" });
  }
  const slugs = mapSiteMaps(posts);

  return res.status(200).json(slugs);
};
