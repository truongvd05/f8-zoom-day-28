const params = new URLSearchParams(location.search);
const id = params.get("id");
const products = document.querySelector(".product-detail");

// console.log(products);

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

send("GET", `https://dummyjson.com/products/${id}`)
    .then((res) => {
        const h2 = document.createElement("h2");
        h2.innerText = `${res.title}`;
        const img = document.createElement("img");
        img.src = `${res.images[0]}`;
        const description = document.createElement("p");
        description.innerText = `${res.description}`;
        const category = document.createElement("p");
        category.innerText = `${res.category}`;
        const price = document.createElement("p");
        price.innerText = `Giá: ${res.price}`;
        const rating = document.createElement("p");
        rating.innerText = `Đánh giá: ${res.rating}`;
        products.append(h2, description, img, category, price, rating);
    })
    .catch((error) => {
        console.log(error);
    });
