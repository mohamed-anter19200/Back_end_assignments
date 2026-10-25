import { Router } from "express";
import * as booksController from "./books.controller.js";

const router = Router();

router.post("/create", booksController.createCollection);
router.post("/index",booksController.createIndexCollection)
router.post("/",booksController.addBook)
router.post("/batch", booksController.addManyBooks);
router.patch("/:title",booksController.updateBook);
router.get("/title", booksController.findBookByTitle);
router.get("/year", booksController.findBooksBetween2years);
router.get("/genre", booksController.findBooksByGenre);
router.get("/skip-limit", booksController.findBooksSkipLimit);
router.get("/year-integer", booksController.findBooksYearInteger);
router.get("/exclude-genres", booksController.findBooksExcludeGenres);
router.delete("/before-year", booksController.deleteBooksBeforeYear);
router.get("/aggregate1", booksController.aggregateBooks1);
router.get("/aggregate2", booksController.aggregateBooks2);
router.get("/aggregate3", booksController.aggregateBooks3);
router.get("/aggregate4", booksController.aggregateBooks4);


export default router;