import { NextFunction, Request, Response } from 'express';

export function LoggerGlobalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const actualDate = new Date();
  const date = actualDate.toLocaleDateString();
  const time = actualDate.toLocaleTimeString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip;

  console.log(`[${date} - ${time}] ${method} ${url} - IP: ${ip}`);
  next();
}
