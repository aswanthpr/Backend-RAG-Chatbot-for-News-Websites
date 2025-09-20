import express, { type Application , Request, Response} from "express";
import { qdrantClient,redisClient} from "./configs"
import { corsOptions } from "./middlewares";
import chatRoute from "./routes/chat.routes"
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import "./utils/crone.job.util";
import { HttpResponse, HttpStatus } from "./constants";

 const app: Application = express();

redisClient();
qdrantClient();


app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/health",(_req:Request,res: Response)=> {
    res.status(HttpStatus?.OK).json(HttpResponse?.SUCCESS);
})
app.use("/chat", chatRoute); 

export default app;      