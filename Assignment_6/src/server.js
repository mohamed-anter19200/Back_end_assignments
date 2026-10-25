import express from "express";
import booksRoute from "./app/books/books.route.js";
import authorsRoute from "./app/authors/authors.route.js";
import logsRoute from "./app/logs/logs.route.js";
const app = express();

app.use(express.json());


app.use("/collection/books", booksRoute);
app.use("/collection/authors", authorsRoute);
app.use("/collection/logs", logsRoute);
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        success: false
    });
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})