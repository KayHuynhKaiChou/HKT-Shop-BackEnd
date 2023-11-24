import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connect from './config/mongoDB/index.js'
import {routes} from './src/routes/index.js';
import { authUser } from "./src/middleware/auth.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 4000;


app.use(cors({
    origin : 'http://localhost:4000',
    credentials : true
}));
//PayloadTooLargeError: request entity too large , lỗi này ở phần set avatar bằng 
//getBase64 nên url của avatar mã hóa theo base64 nên vô cùng dài , do đó ta use :
//app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended:true, limit: '50mb' }));
app.use(cookieParser());
app.use(authUser);

routes(app);

mongoose.set('strictQuery',false);
await connect();

app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`) 
}) 