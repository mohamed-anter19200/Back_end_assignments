import * as booksService from "./books.service.js";
import * as booksRepository from "./books.controller.js";

export async function createCollection(req, res, next) {
    try {
        await booksService.CreateCollection();

        res.status(201).json({
            message: "Books collection created successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export async function createIndexCollection(req, res, next) {
    try{
        await booksService.createIndex(
            res.status(201).json({
                message: "Index ( title ) created successfully",
                success: true
            })
        )
    }catch (error){
        next(error);
    }
}


export async function addBook(req, res, next) {
    try {
        const insertedId = await booksService.insertOneBook(req.body);

        res.status(201).json({
            message: "Book added successfully",
            success: true,
            insertedId
        });
    } catch (error) {
        next(error);
    }
}



export async function addManyBooks(req, res, next) {
    try {
        const result = await booksService.insertManyBooks(req.body);

        res.status(201).json({
            message: "Books added successfully",
            insertedCount: result.insertedCount,
            insertedIds: result.insertedIds,
            success: true
        });
    } catch (error) {
        next(error);
    }
}




export async function updateBook(req, res, next) {
    try {
        const { title } = req.params;
        const result = await booksService.updateBook(title, req.body);
        res.status(200).json({
            message: "Book updated successfully",
            success: true,
            result,
        });
    } catch (error) {
        next(error);
    }
}

export async function findBookByTitle(req, res, next) {
    try {
        const { title } = req.query;

        const book = await booksService.findBookByTitle(title);

        res.status(200).json({
            success: true,
            result: book,
        });
    } catch (error) {
        next(error);
    }
}

export async function findBooksBetween2years(req, res, next) {
    try {
        const { from, to } = req.query;

        const books = await booksService.findBooksBetween2years(from, to);

        res.status(200).json({
            success: true,
            result: books
        });
    } catch (error) {
        next(error);
    }
}

export async function findBooksByGenre(req, res, next) {
    try {
        const { genre } = req.query;
        const books = await booksService.findBooksByGenre(genre);

        res.status(200).json({
            success: true,
            result: books
        });
    } catch (error) {
        next(error);
    }
}

export async function findBooksSkipLimit(req, res, next) {
    try {
        const books = await booksService.findBooksSkipLimit();

        res.status(200).json({
            success: true,
            result: books
        });
    } catch (error) {
        next(error);
    }
}

export async function findBooksYearInteger(req, res, next) {
    try {
        const books = await booksService.findBooksYearInteger();

        res.status(200).json({
            success: true,
            result: books
        });
    } catch (error) {
        next(error);
    }
}



export async function findBooksExcludeGenres(req, res, next) {
    try {
        const books = await booksService.findBooksExcludeGenres();

        res.status(200).json({
            success: true,
            result: books
        });
    } catch (error) {
        next(error);
    }
}








export async function deleteBooksBeforeYear(req, res, next) {
    try {
        const { year } = req.query;
        const result = await booksService.deleteBooksBeforeYear(year);

        res.status(200).json({
            success: true,
            message: "Books deleted successfully",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        next(error);
    }
}






export async function aggregateBooks1(req, res, next) {
    try {
        const result = await booksService.aggregateBooks1();
        res.status(200).json({ success: true, result });
    } catch (error) {
        next(error);
    }
}

export async function aggregateBooks2(req, res, next) {
    try {
        const result = await booksService.aggregateBooks2();
        res.status(200).json({ success: true, result });
    } catch (error) {
        next(error);
    }
}

export async function aggregateBooks3(req, res, next) {
    try {
        const result = await booksService.aggregateBooks3();
        res.status(200).json({ success: true, result });
    } catch (error) {
        next(error);
    }
}

export async function aggregateBooks4(req, res, next) {
    try {
        const result = await booksService.aggregateBooks4();
        res.status(200).json({ success: true, result });
    } catch (error) {
        next(error);
    }
}



