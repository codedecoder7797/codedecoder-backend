import { Router } from "express";
import { blogRouter } from "./blog";
import { pcBuildRouter } from "./pcBuild";

const router = Router();

router.get("/health", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

router.use("/blog", blogRouter);
router.use("/pc-build", pcBuildRouter);

export { router };
