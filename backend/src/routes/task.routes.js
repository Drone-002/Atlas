import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import requiredRole from "../middlewares/role.middleware.js";
import {
  createTask,
  getWorkspaceTasks,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post(
  "/:workspaceId/tasks",
  authMiddleware,
  requiredRole(["owner", "editor"]),
  createTask,
);

router.get(
  "/:workspaceId/tasks",
  authMiddleware,
  requiredRole(["owner", "editor", "viewer"]),
  getWorkspaceTasks,
);

export default router;
