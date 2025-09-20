import { Request, Response, NextFunction } from "express";
import { redis } from "../configs/index";
import { createHttpError, uuidGen } from "../utils";
import { HISTORY_TTL, HttpResponse, HttpStatus } from "../constants";
import { IChatMessage } from "../types/types";


export const getChatHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      throw createHttpError(HttpStatus.BAD_REQUEST,HttpResponse?.REQUIRED_SESSION_ID );
    }

    const key = `session:${sessionId}`;
    const rawHistory = await redis?.get(key);

    const history = rawHistory ? JSON.parse(rawHistory) : [];
   

    res.status(HttpStatus.OK).json({
      success: true,
      message: HttpResponse.SUCCESS,
      sessionId,
      history,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const createSession = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try{

    const newSessionId = uuidGen();
    const initialHistory:IChatMessage[] = []//chatHistory || [];

    await redis?.set(
      `session:${newSessionId}`,
      JSON.stringify(initialHistory),
      "EX",
      HISTORY_TTL
    );
console.log('session created')
    res.status(HttpStatus?.OK).json({
      success: true,
      message: HttpResponse?.SESSION_CREATED,
      sessionId: newSessionId,
      history: initialHistory,
    });

  } catch (error: unknown) {
    next(error);
  }
};

export const resetSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      throw createHttpError(
        HttpStatus?.BAD_REQUEST,
        HttpResponse?.REQUIRED_SESSION_ID
      );
    }
    // del old session & HISTORY
    await redis?.del(`session:${sessionId}`);

    //create new uuid and store
    const newSessionId = uuidGen();

    //create new session with history[]
    await redis?.set(`session${newSessionId}`, JSON.stringify([]));

    res.status(HttpStatus.OK).json({
      success: true,
      message: HttpResponse?.SUCCESS,
      sessionId: newSessionId,
      history: [],
    });

  } catch (error: unknown) {
    next(error);
  }
};
