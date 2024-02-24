import express, { json, urlencoded } from 'express';
import { config } from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authentication/index.js";
import { dbconnect } from './config/databaseConnection/index.js';
import { errorHandler } from './errorHandler/errorHandler.js';
const app = express();

dbconnect();
config();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use(errorHandler);

const PORTNO = process.env.PORTNO
app.listen(PORTNO, () => {
    console.log(`server started listening to port ${PORTNO}`);
});