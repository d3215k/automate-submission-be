import { Router } from "express";
import submissionController from "../controllers/submission.controller";
import authMiddleware from "../middlewares/auth.middleware";

const submissionRoutes = Router();
submissionRoutes.post("/submission/:id", submissionController.add);

export { submissionRoutes };
