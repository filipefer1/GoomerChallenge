import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { isCelebrate, CelebrateInternalError } from "celebrate";

export const celebrateErrorHandling = (
  err: CelebrateInternalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isCelebrate(err)) {
    return res.status(400).json({ message: err.joi.message });
  }
  return next(err)
};
