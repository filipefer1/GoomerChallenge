import { Request, Response, NextFunction } from "express";
import { isCelebrate, CelebrateInternalError } from "celebrate";

export interface InternalError extends Error {
  status: number;
  message: string;
}

export const celebrateErrorHandling = (
  err: CelebrateInternalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isCelebrate(err)) {
    return res.status(400).json({ message: err.joi.message });
  }
  return next(err);
};

export const internalErrorHandler = (
  err: InternalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({message});
};
