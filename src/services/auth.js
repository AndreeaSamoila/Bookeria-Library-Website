import { fetchAndParse, BASE_URL, headers } from "./utils";

export function login(data) {
    return fetchAndParse(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers, 
    })
}

export function register(data) {
    return fetchAndParse(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers
        })
}