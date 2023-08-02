import { Router } from "express";
import { blogRouter } from "./blog";

const router = Router();

router.get("/health", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

router.use("/blog", blogRouter);

export { router };
