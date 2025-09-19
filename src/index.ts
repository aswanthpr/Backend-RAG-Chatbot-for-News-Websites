import http from "http";
import  app  from "./app";
import {getIO, initSocket} from "./socket/socket";


const PORT = process.env['PORT'];

const httpServer = http.createServer(app);
initSocket(httpServer)

httpServer.listen(parseInt(PORT as string, 10), () => {
  console.log(`✳️  Server running at http://localhost:${PORT} 🔥`);
});
    
//grace full close
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down server...");

   getIO().close(); 

  httpServer.close(() => {
    console.log("✅ HTTP server closed");
    process.exit(0);
  });

}); 