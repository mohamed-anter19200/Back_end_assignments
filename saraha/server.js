
import express from "express";
import mongoose from "mongoose";
import authRouter from "./src/app/auth/auth.route.js";
import { messageRouter } from "./src/app/message/message.route.js";
import { userRouter } from "./src/app/user/user.route.js";
import cors from "cors";
import {front_end_cors, PORT,} from "./src/config/config.js";
import { connectDB } from "./src/common/db/connection.js";

const app = express();

app.use(cors({
    origin: front_end_cors,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
        success: false
    });
});

let server;

async function bootstrap() {
    await connectDB();

    server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

bootstrap();

const shutdown = async () => {
    server.close(async () => {
        await mongoose.disconnect();
        process.exit(0);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
