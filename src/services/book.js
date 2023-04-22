import { fetchAndParse, BASE_URL, headers } from "./utils";

export function myBooks() {
    return fetchAndParse(`${BASE_URL}/book/my-books`, {
        headers
    })
}
export function getAllBooks() {
    return fetchAndParse(`${BASE_URL}/book/`, {
        headers
    })
}

export function getBookById(id) {
    return fetchAndParse(`${BASE_URL}/book/${id}`, {
        headers
    })
}