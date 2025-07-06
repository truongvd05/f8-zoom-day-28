const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todo = $(".todo");

// XHR
// function send(method = "GET", url, cb) {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             const type = xhr.getResponseHeader("Content-Type");
//             const isJson = type && type.includes("application/json");
//             if (isJson) {
//                 cb(JSON.parse(xhr.responseText));
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.open(method, url, true);
//     xhr.send();
// }

// fetch
async function send(method, url) {
    const res = await fetch(url, { method });
    if (!res.ok) throw new Error(`HTTP code:  ${res.status}`);
    const type = res.headers.get("content-type");
    const isJson = type && type.includes("application/json");
    try {
        const result = isJson ? await res.json() : await res.text();
        return result;
    } catch (error) {
        throw new Error("invalid JSON format");
    }
}

send("GET", "https://dummyjson.com/products")
    .then((responseText) => {
        responseText.products.forEach((product) => {
            const item = document.createElement("a");
            item.innerHTML = `${product.title}`;
            item.href = `detail.html?id=${product.id}`;
            todo.appendChild(item);
        });
    })
    .catch((error) => {
        console.log(error);
    });

const promise = new Promise((resolve, reject) => {});
