import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createWorkspace,
  getMyWorkspaces,
} from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createWorkspace);
router.get("/", authMiddleware, getMyWorkspaces);

export default router;
