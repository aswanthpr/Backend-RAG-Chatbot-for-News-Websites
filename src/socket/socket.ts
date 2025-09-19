import { Socket, Server } from "socket.io";
import { Server as HttpServer,  } from "http";
import { socketCorsConfig } from "../middlewares/index";
import { chatSocket } from "./chat.socket";
// import { chatSocket } from "./chat.socket";

export let io: Server | null = null;

export async function initSocket(httpServer: HttpServer): Promise<Server> {

  return io = new Server(httpServer, {

    cors:socketCorsConfig,

  }).on("connection", (socket: Socket) => {
    console.log("✅ Client connected:", socket.id);
    chatSocket(socket);

 // Join a session
    socket.on("join_session", ({ sessionId }: { sessionId: string }) => {
      if (!sessionId) return;
      socket.join(sessionId);
      console.log(`Socket ${socket.id} joined session ${sessionId}`);
    });

    // Leave a session
   socket.on("leave_session", ({ sessionId }: { sessionId: string }) => {
      if (!sessionId) return;
      socket.leave(sessionId);
      console.log(`Socket ${socket.id} left session ${sessionId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket?.id);
    });
  });


}
export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};