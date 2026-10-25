import { db } from "../../common/db/connection.js";

export async function createBooks (){
    return await db.createCollection("books", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title"],
                properties: {
                    title: {
                        bsonType: "string",
                        minLength: 1,
                        pattern: "\\S"
                    }
                }
            }
        }
    });
};

export async function createIndex (){
    return await db.collection("books").createIndex({title:1})
}


export async function insertBook({ title, author, year, genres }) {
    return await db.collection("books").insertOne({
        title,
        author,
        year,
        genres
    });
}

export async function insertManyBooks(books) {
    return await db.collection("books").insertMany(books);
}

export async function updateBook (title, data) {
    return await db.collection("books").updateOne({title}, {$set: data});
}

export async function findBookByTitle(title) {
    return await db.collection("books").findOne({ title });
}

export async function findBooksBetween2years(from, to) {
    return await db.collection("books")
        .find({
            year: {
                $gte: Number(from),
                $lte: Number(to)
            }
        })
        .toArray();
}

export async function findBooksByGenre(genre) {
    return await db.collection("books")
        .find({ genres: genre })
        .toArray();
}

export async function findBooksSkipLimit() {
    return await db.collection("books")
        .find()
        .sort({ year: -1 })
        .skip(2)
        .limit(3)
        .toArray();
}



export async function findBooksYearInteger() {
    return await db.collection("books")
        .find({ year: { $type: "int" } })
        .toArray();
}

export async function findBooksExcludeGenres() {
    return await db.collection("books")
        .find({
            genres: {
                $nin: ["Horror", "Science Fiction"]
            }
        })
        .toArray();
}



export async function deleteBooksBeforeYear(year) {
    return await db.collection("books")
        .deleteMany({
            year: { $lt: Number(year) }
        });
}



export async function aggregateBooks1() {
    return await db.collection("books").aggregate([
        {
            $match: { year: { $gt: 2000 } }
        },
        {
            $sort: { year: -1 }
        }
    ]).toArray();
}

export async function aggregateBooks2() {
    return await db.collection("books").aggregate([
        {
            $match: { year: { $gt: 2000 } }
        },
        {
            $project: {
                _id: 0,
                title: 1,
                author: 1,
                year: 1
            }
        }
    ]).toArray();
}

export async function aggregateBooks3() {
    return await db.collection("books").aggregate([
        {
            $unwind: "$genres"
        }
    ]).toArray();
}

export async function aggregateBooks4() {
    return await db.collection("books").aggregate([
        {
            $lookup: {
                from: "logs",
                localField: "_id",
                foreignField: "bookId",
                as: "logs"
            }
        }
    ]).toArray();
}

