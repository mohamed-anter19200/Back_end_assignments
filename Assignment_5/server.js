import express from "express";
import sequelize from "./common/db/connection.js";
import usersRoutes from "./app/users/users.route.js";
import {globalError} from "./common/middleware/globalErrorHandler.js";
import postsRoute from "./app/posts/posts.route.js";
import commentsRouter from "./app/comments/comments.route.js";
import "./app/relations.js"
const app = express();

sequelize.sync({})
app.use(express.json());
app.use("/users",usersRoutes);
app.use("/posts",postsRoute);
app.use("/comments", commentsRouter);
app.use(globalError)
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});