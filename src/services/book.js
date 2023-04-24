import { fetchAndParse, BASE_URL, headers } from "./utils";

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

export function getMyBooks() {
    return fetchAndParse(`${BASE_URL}/book/my-books`, {
        headers
    })
}

export function updateBook(id) {

    let bodyContent = new FormData();

    return fetchAndParse(`${BASE_URL}/book/${id}`, {
        method: "PUT",
        headers,
        body: bodyContent,
    })
}

export function addBook() {

    return fetchAndParse(`${BASE_URL}/book`, {
        method: "POST",
        headers,
    })
}
export function deleteBook() {

    return fetchAndParse(`${BASE_URL}/book${id}`, {
        method: "DELETE",
        headers,
    })
}

export function searchBook() {

    return fetchAndParse(`${BASE_URL}/search?search=Karamazov`, {
        method: "GET",
        headers,
    })
}

