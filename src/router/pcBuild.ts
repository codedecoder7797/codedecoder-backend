import { Router } from "express";
import * as PCBuildController from "../controller/pcBuild";
import { authRouter } from "../middleware/auth";

const router = Router();

router.get("/", authRouter, PCBuildController.getBlogs);
router.get("/slug", authRouter, PCBuildController.getSlugs);
router.get("/sitemap", authRouter, PCBuildController.getSitemaps);
router.get("/:slug", authRouter, PCBuildController.getBlogBySlug);

export { router as pcBuildRouter };
