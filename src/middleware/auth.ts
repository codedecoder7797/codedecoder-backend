import { Router } from "express";

const router = Router();

router.use((req, res, next) => {
  const token = req.query.token as string;
  if (token !== process.env.SERVER_API_VALIDATION) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});

export { router as authRouter };
