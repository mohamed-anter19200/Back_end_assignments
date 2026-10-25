import * as booksRepository from "./books.repository.js";

export async function CreateCollection() {
    const newCollection = await booksRepository.createBooks()
    if(!newCollection){
        const error = new Error('cannot create collection');
        throw error;
    }
    return newCollection
}

export async function createIndex () {
    const create_index = await booksRepository.createIndex()
    if(!create_index){
        const error = new Error('cannot create index');
        throw error;
    }
    return create_index
}


export async function insertOneBook (data) {
    const {insertedId} = await booksRepository.insertBook(data)
    return insertedId
}


export async function insertManyBooks(books) {
    return await booksRepository.insertManyBooks(books);
}


export async function updateBook(title, data) {
    return await booksRepository.updateBook(title, data);
}


export async function findBookByTitle(title) {
    return await booksRepository.findBookByTitle(title);
}


export async function findBooksBetween2years (from, to  ) {
    return await booksRepository.findBooksBetween2years(from, to);
}



export async function findBooksByGenre(genre) {
    return await booksRepository.findBooksByGenre(genre);
}


export async function findBooksSkipLimit() {
    return await booksRepository.findBooksSkipLimit();
}

export async function findBooksYearInteger() {
    return await booksRepository.findBooksYearInteger();
}


export async function findBooksExcludeGenres() {
    return await booksRepository.findBooksExcludeGenres();
}




export async function deleteBooksBeforeYear(year) {
    return await booksRepository.deleteBooksBeforeYear(year);
}







export async function aggregateBooks1() {
    return await booksRepository.aggregateBooks1();
}

export async function aggregateBooks2() {
    return await booksRepository.aggregateBooks2();
}

export async function aggregateBooks3() {
    return await booksRepository.aggregateBooks3();
}

export async function aggregateBooks4() {
    return await booksRepository.aggregateBooks4();
}