import { Socket } from "socket.io";
import { generateAIResponse } from "../helpers/chat.rag";

export async function chatSocket(socket: Socket) {
  try {
    const { sessionId } = socket.handshake.query as { sessionId: string };
    if (!sessionId) {
      socket.emit("chat:error", "Missing sessionId");
      socket.disconnect();
      return;
    }
    socket.join(sessionId);


    //incomming message;
    socket.on("chat:send:message", async (msg: string) => {
      try {
        if (!msg || typeof msg !== "string") {
          socket.emit("chat:error", "Invalid message");
          return;
        }

        // Optionally echo the user message back (so UI shows it immediately)
        //   const userEcho = { sender: "user", text, timestamp: Date.now() };
        //   socket.emit("receive_message", userEcho);

        //AI response
        const { aiText, sources } = await generateAIResponse(sessionId, msg);

        socket.emit("chat:message:received", { aiText, sources });
      } catch (err: unknown) {
        console.error(
          "Error processing message:",
          err instanceof Error ? err : String(err)
        );
        socket.emit("chat:error", "Failed to process message");
      }
    });
  } catch (error: unknown) {
    console.log(`${error instanceof Error ? error : String(error)}`);
  }
}
