import express from 'express';
import connectDB from "./common/db/connections.js";
import authRouter from "./app/auth/auth.route.js";
import userRouter from "./app/user/user.route.js";
import noteRouter from "./app/note/note.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

await connectDB()
const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);
app.use(errorMiddleware)
app.listen(3000,()=>{
    console.log("server started on port 3000");
})