import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Atlas backend running" });
});

export default app;
