import express from "express";
import { Request, Response, NextFunction } from "express";
import fileManagementRouter from "./router/file-management-router";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { rateLimit } from "express-rate-limit";
import errorHandler from "./error/error-handler";

dotenv.config();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 50, 
})

const server = express();

server.use(express.json());

server.use(cors({
    origin: '*',
}))

server.use(limiter);

server.get("/", (req, res) => {
    res.send("Api de upload de arquivos para Aspprev, por favor refira a documentação em !");
});

server.use("/files", fileManagementRouter);

server.use(errorHandler);

server.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});