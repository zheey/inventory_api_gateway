import { createProxyMiddleware } from "http-proxy-middleware";
import type { Request, Response, NextFunction } from "express";

export const proxyMiddleware = (target: string) => {
  return createProxyMiddleware<Request, Response, NextFunction>({
    target,
    changeOrigin: true,
    logger: console,
  });
};
