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

export function updateBook(bookData, bookId) {

    const bodyContent = new FormData();

    bodyContent.append('title', bookData.title);
    bodyContent.append('author', bookData.author);
    bodyContent.append('description', bookData.description);
    bodyContent.append("file", bookData.file);

    const newHeaders = {...headers};
    delete newHeaders["Content-Type"];

    return fetchAndParse(`${BASE_URL}/book/${bookId}`, {
        method: "PUT",
        body: bodyContent,
        headers: newHeaders
    })
}

export function addBook(bookData) {

    const bodyContent = new FormData();

    bodyContent.append('title', bookData.title);
    bodyContent.append('author', bookData.author);
    bodyContent.append('description', bookData.description);
    bodyContent.append("file", bookData.file);

    const newHeaders = {...headers};
    delete newHeaders["Content-Type"];

    return fetchAndParse(`${BASE_URL}/book`, {
        method: "POST",
        body: bodyContent,
        headers: newHeaders
    })
}

export function deleteBook(bookId) {

    return fetchAndParse(`${BASE_URL}/book/${bookId}`, {
        method: "DELETE",
        headers,
    })
}

export function searchBook(searchTerm) {

    return fetchAndParse(`${BASE_URL}/book/search?search=${searchTerm}`, {
        method: "GET",
        headers,
    })
}

