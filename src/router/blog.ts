import { Router } from "express";
import * as BlogController from "../controller/blog";
import { authRouter } from "../middleware/auth";

const router = Router();

router.get("/", authRouter, BlogController.getBlogs);
router.get("/slug", authRouter, BlogController.getSlugs);
router.get("/:slug", authRouter, BlogController.getBlogBySlug);

export { router as blogRouter };
