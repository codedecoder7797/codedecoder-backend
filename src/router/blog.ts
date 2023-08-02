import { Router } from "express";
import * as BlogController from "../controller/blog";

const router = Router();

router.get("/", BlogController.getBlogs);
router.get("/slug", BlogController.getSlugs);
router.get("/:slug", BlogController.getBlogBySlug);

export { router as blogRouter };
