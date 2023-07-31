let prodect = document.getElementById("prodect");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.getElementById("creat");
let text = "creat";
let impty;
let icun = document.querySelector("i");
let mylocal = localStorage.getItem("mode");
if (mylocal !== null) {
    if (mylocal == "dark-mode") {
        document.body.classList.add("change")
    } else {
        document.body.classList.remove("change")
    }
}
// Get Total
function getTotal() {

    if (price.value > 0) {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.textContent = result;
        total.style.background = "#080"
    } else {
        total.textContent = " ";
        total.style.background = "#f00"
    }
}
// Creat New Product
let datProduct;
if (localStorage.prodect != null) {
    datProduct = JSON.parse(localStorage.prodect);
} else {
    datProduct = [];
}
creat.onclick = function () {
    let newProduct = {
        prodect: prodect.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (prodect.value && price.value && category.value && newProduct.count <= 80) {
        if (text === "creat") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    datProduct.push(newProduct)
                }
            } else {
                datProduct.push(newProduct)
            }
        } else {
            datProduct[impty] = newProduct;
            text = "creat";
            creat.textContent = "creat";
            count.style.display = "block"
        }
        cleardataforminputs();
    }
    localStorage.setItem("prodect", JSON.stringify(datProduct));
    showdataintable()
}
// Clear Inputs
function cleardataforminputs() {
    prodect.value = null;
    price.value = null;
    taxes.value = null;
    ads.value = null;
    discount.value = null;
    total.textContent = null;
    count.value = null;
    category.value = null;
}
// Save In Localstorage
// Read The Data
function showdataintable() {
    getTotal()
    let table = " "
    for (let i = 0; i < datProduct.length; i++) {
        table += `
    <tr>
        <td>${i+1}</td>
        <td>${datProduct[i].prodect}</td>
        <td>${datProduct[i].price}</td>
        <td>${datProduct[i].taxes}</td>
        <td>${datProduct[i].ads}</td>
        <td>${datProduct[i].discount}</td>
        <td>${datProduct[i].total}</td>
        <td>${datProduct[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deletedata (${i})">delete</button></td>
    </tr>
`
}
    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");
    if (datProduct.length > 1) {
        deleteAll.style.display = "flex";
        deleteAll.innerHTML = `
    <button" onclick="deleteAll()" style="cursor: pointer">delete All (${datProduct.length})</button>
`
    } else {
        deleteAll.style.display = "none"
    }
}
showdataintable();
// Count
// Delete One Data
function deletedata(i) {
    datProduct.splice(i, 1);
    localStorage.prodect = JSON.stringify(datProduct);
    showdataintable();
}
// Delete All The Data
function deleteAll() {
    datProduct.splice(0);
    localStorage.clear();
    showdataintable()
}
// Update The Data
function updateData(i) {
    prodect.value = datProduct[i].prodect;
    price.value = datProduct[i].price;
    taxes.value = datProduct[i].taxes;
    ads.value = datProduct[i].ads;
    discount.value = datProduct[i].discount;
    //    total.textContent = null;
    count.style.display = "none";
    creat.textContent = "update";
    text = "update";
    impty = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
    category.value = datProduct[i].category;
    getTotal()
}
// Search
let searchMode = "title";
function getSearch(id) {
    let search = document.getElementById("search")
    search.focus();
    search.value = null;
    showdataintable()
    if (id === "searchByTitle") {
        searchMode = "title"
    } else {
        searchMode = "category";
    }
    search.placeholder = "search By" + searchMode;
}
function searchInMyData(value) {
    let table = "";
    if (searchMode === "title") {
        for (let i = 0; i < datProduct.length; i++) {
            if (datProduct[i].prodect.toLowerCase().includes(value.toLowerCase())) {
                table += `
    <tr>
        <td>${i}</td>
        <td>${datProduct[i].prodect}</td>
        <td>${datProduct[i].price}</td>
        <td>${datProduct[i].taxes}</td>
        <td>${datProduct[i].ads}</td>
        <td>${datProduct[i].discount}</td>
        <td>${datProduct[i].total}</td>
        <td>${datProduct[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deletedata (${i})">delete</button></td>
    </tr>
`
            }
        }
    } else {
        for (let i = 0; i < datProduct.length; i++) {
            if (datProduct[i].category.includes(value.toLowerCase())) {
                table += `
    <tr>
        <td>${i}</td>
        <td>${datProduct[i].prodect}</td>
        <td>${datProduct[i].price}</td>
        <td>${datProduct[i].taxes}</td>
        <td>${datProduct[i].ads}</td>
        <td>${datProduct[i].discount}</td>
        <td>${datProduct[i].total}</td>
        <td>${datProduct[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deletedata (${i})">delete</button></td>
    </tr>
`
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}