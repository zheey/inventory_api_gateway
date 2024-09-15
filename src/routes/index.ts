import { proxyMiddleware } from "../middleware/proxy_middleware";
import type { Response, Request, Express } from "express";

export default function (app: Express) {
  app.use("/health", function (req: Request, res: Response) {
    return res.status(200).json("Health Checked");
  });
  app.use("/auth", proxyMiddleware("http://localhost:3001"));
  app.use("/inventory", proxyMiddleware("http://localhost:3002"));
  app.use("/orders", proxyMiddleware("http://localhost:3003"));
  app.use("/analytics", proxyMiddleware("http://localhost:3004"));
}
