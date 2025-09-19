import type { Request, Response } from "express";
import { HttpError } from "../utils/index";
import { HttpResponse, HttpStatus } from "../constants/index";

export const errorHandler = (
  err: HttpError | Error,
  _req: Request,
  res: Response
): void => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message: string = HttpResponse.SERVER_ERROR;

  console.log("Error Midlewrwe Error:", err);

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    console.log("Unhandled", err);
  }

  res.status(statusCode).json({ error: message });
};
