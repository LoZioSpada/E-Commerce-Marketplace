// WELCOME INTO THE GOD MODE

// EVENTUALI VARIABILI GLOBALI
const name = document.querySelector('#name')
const description = document.querySelector('#description')
const brand = document.querySelector('#brand')
const imageUrl = document.querySelector('#imageUrl')
const price = document.querySelector('#price')
const productForm = document.querySelector('#productForm')
const contenuto = document.querySelector('.add .row')
const row = document.querySelector('.edit .row')

// CARICAMENTO DELLA PAGINA
// contenuto.innerHTML = /*html*/
// `
//   <div class="container pc">
//   	<div class="loader"></div>
//   	<div class="loader"></div>
//   	<div class="loader"></div>
//   </div>

// `




// FUNZIONE PER ANDARE AD AGGIUNGERE UN PRODOTTO
async function addToMain(event) {
    event.preventDefault()
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjNTM5YzM5MzI3YzAwMThkM2EyZTQiLCJpYXQiOjE2OTYzNTUyMjgsImV4cCI6MTY5NzU2NDgyOH0.C0j8PM2EFXdAsuRqqVA3LRQieDwSkG5G22Z_UDkCoJQ",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
            brand: brand.value,
            imageUrl: imageUrl.value,
            price: price.value,

        })
    })

    if (response.ok) {    //CONTROLLO STATO
        alert("Your product has been successfully added!")
        for (const field of [name, description, brand, imageUrl, price]) {
            field.value = '' // SVUOTA I CAMPI CHE PRIMA SONO STATI UTILIZZATI PER INSERIRE UN PRODOTTO
        }
    } else {
        console.error("Something went wrong!")
    }
}

productForm.addEventListener('submit', addToMain)


// FUNZIONE PER FARE LOGOUT DALL'ACCOUNT ADMIN
const logoutAdmin = (event) => {
    window.location.href = "../index.html"
}



// FUNZIONE CHE ANDRÀ A POPOLARE LA PAGINA CON CIÒ CHE IO ANDRÒ AD INSERIRE NELL'ENDPOINT E CHE SERVIRANNO PER EFFETTUARE "PUT" E "DELETE"
const getProducts = async () => {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjNTM5YzM5MzI3YzAwMThkM2EyZTQiLCJpYXQiOjE2OTYzNTUyMjgsImV4cCI6MTY5NzU2NDgyOH0.C0j8PM2EFXdAsuRqqVA3LRQieDwSkG5G22Z_UDkCoJQ'
            },
            redirect: 'follow'

        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

// FUNZIONE CHE FA VEDERE CIÒ CHE HO INSERITO
function displayProduct(data) {

    row.innerHTML = data.map(({ name, description, brand, imageUrl, price, _id }) => /*html*/`
  
<div id="_${_id}" class="d-flex justify-content-between align-items-center mb-2">
    <div class="col-lg-1 me-3" id="product_${_id}">
      <img src="${imageUrl}">
    </div>
    <div class="col-lg-3 align-self-center">
      ${name}
    </div>
    <div class="col-lg-3 align-self-center">
      <p>${description}</p>
    </div>
    <div class="col-lg-2 align-self-center">
      <p>${brand}</p>
    </div>
    <div class="col-lg-2 align-self-center">
      <p>${price} €</p>
    </div>
    <div class="col-lg-1 d-flex justify-content-lg-between justify-content-between align-items-center align-self-center mb-2">
        <button class="btn btn-warning px-2 mx-2" onclick="editProduct('${_id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
        </button>
        <button class="btn btn-danger px-2 mx-2" onclick="deleteProduct('${_id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
        </button>
    </div>  
</div>

    `).join("")
}





// FUNZIONE PER EFFETTUARE MODIFICHE DI UN PRODOTTO (METODO PUT)
async function editProduct(_id) {
    const products = await fetch("https://striveschool-api.herokuapp.com/api/product/" + _id, {
        method: 'GET',
        headers: {
            "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjNTM5YzM5MzI3YzAwMThkM2EyZTQiLCJpYXQiOjE2OTYzNTUyMjgsImV4cCI6MTY5NzU2NDgyOH0.C0j8PM2EFXdAsuRqqVA3LRQieDwSkG5G22Z_UDkCoJQ'
        },
        redirect: 'follow'})
    const productsJson = await products.json()

    const { name, description, brand, imageUrl, price } = productsJson

    const productsRow = document.querySelector(`#_${_id}`)

    productsRow.innerHTML = /*html*/
    `
        <form class="container row" onsubmit="editProductSubmit(event, '${_id}')">
            <div class="row g-2">
                <div class="col-2">
                    <label>Name</label>
                    <input required name="name" type="text" class="form-control" value="${name}">
                </div>
                <div class="col-2">
                    <label>Description</label>
                    <input required name="description" type="text" class="form-control"
                         value="${description}">
                </div>
                <div class="col-2">
                    <label>Brand</label>
                    <input required name="brand" type="text" class="form-control"
                         value="${brand}">
                </div>
                <div class="col-3">
                    <label>Image</label>
                    <input required name="imageUrl" type="url" class="form-control"
                         value="${imageUrl}">
                </div>
                <div class="col-2">
                    <label>Price</label>
                    <div class="d-flex align-items-center">
                        <input required name="price" type="text" class="form-control" value="${price}">
                        <span class="mx-2">€</span>
                    </div>
                </div>
                <div class="col-1 d-flex align-items-end">
                    <button type="submit" class="btn btn-success mx-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="editProductCancel()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    `

}


async function editProductSubmit(event, _id) {
    event.preventDefault();

    event.target.classList.add("pe-none")

    event.target.querySelector("button[type=submit]").innerHTML = /*html*/`
      <div class="d-flex justify-content-center">
        <div class="dot-spinner">
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
        </div>
      </div>
    `

    const name = document.querySelector(`#_${_id} [name='name']`);
    const description = document.querySelector(`#_${_id} [name='description']`);
    const brand = document.querySelector(`#_${_id} [name='brand']`);
    const imageUrl = document.querySelector(`#_${_id} [name='imageUrl']`);
    const price = document.querySelector(`#_${_id} [name='price']`);

    const updatedProduct = {
        name: name.value,
        description: description.value,
        brand: brand.value,
        imageUrl: imageUrl.value,
        price: price.value
    }

    try {

        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + _id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjNTM5YzM5MzI3YzAwMThkM2EyZTQiLCJpYXQiOjE2OTYzNTUyMjgsImV4cCI6MTY5NzU2NDgyOH0.C0j8PM2EFXdAsuRqqVA3LRQieDwSkG5G22Z_UDkCoJQ",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })

        if (response.ok) {
            displayProduct(await getProducts())
            alert("Product updated")
        } else {
            alert("Something went wrong, cannot update.")
        }

    } catch {
        alert("You are offline.")
    }

}

async function editProductCancel() {
    displayProducts(await getProducts())
}


// FUNZIONE PER ANDARE A CANCELLARE UN PRODOTTO
async function deleteProduct(_id) {

    if (!confirm("Are you sure you want to delete this product?")) {
        return
    }

    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + _id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjNTM5YzM5MzI3YzAwMThkM2EyZTQiLCJpYXQiOjE2OTYzNTUyMjgsImV4cCI6MTY5NzU2NDgyOH0.C0j8PM2EFXdAsuRqqVA3LRQieDwSkG5G22Z_UDkCoJQ",
        },
    })

    if (response.ok) {
        alert("Product " + _id + " deleted!")
        displayData(await loadData())
    } else {
        alert("Can't delete this product. Try again later")
    }

    displayProduct(await getProducts())
}




window.onload = async function () {
    try {
        const productData = await getProducts()
        displayProduct(productData)
    } catch (error) {
        console.log(error)
    } // finally {
    //     contenuto.querySelector('.pc').remove()
    // }
}