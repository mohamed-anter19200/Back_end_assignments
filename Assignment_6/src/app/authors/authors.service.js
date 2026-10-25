import * as authorsRepository from "./authors.repository.js";

export async function insertAuthor(data) {
    return await authorsRepository.insertAuthor(data);
}