import {Router} from 'express';
import { createSession, getChatHistory, resetSession } from '../controllers/chat.controller';

const chatRoute = Router();

chatRoute.post('/session',createSession)
chatRoute.post('/session/reset',resetSession)
chatRoute.get("/history/:sessionId", getChatHistory);

export default chatRoute;   