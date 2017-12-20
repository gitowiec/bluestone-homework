const headers = new Headers();
headers.append("accept", "application/json");
const fetchConfig = {
    method: "GET",
    headers,
    cache: "no-store"
};


function products() {
    return fetch('/api/products/', fetchConfig as RequestInit)
        .then(checkStatus)
        .then(returnJSON);
}

function product(number: string) {
    return fetch(`/api/product/${number}`, fetchConfig as RequestInit)
        .then(checkStatus)
        .then(returnJSON);
}

const returnJSON = (response: Response) => response.json();

const checkStatus = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.message = response.statusText;
    console.log(error);
    throw error;
};

const Http = {product, products};
export default Http;
