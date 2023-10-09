// FUNZIONE PER FARE UNA QUERY STRING
const params = new URLSearchParams(window.location.search)
const id = params.get('id')
let contenuto = document.querySelector('.product .row')

//CARICAMENTO DELLA PAGINA
contenuto.innerHTML = /*html*/
    `
<div class="container pc">
	<div class="loader"></div>
	<div class="loader"></div>
	<div class="loader"></div>
</div>

`

// FUNZIONE CHE ANDRÀ A POPOLARE LA PAGINA CON I DETTAGLI DI UN PRODOTTO
const getProduct = async (id) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
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
    } finally {
        contenuto.querySelector('.pc').remove()
    }
}

const displayProduct = (result) => {
    contenuto.innerHTML += /*html*/ `
            <h1 class="mb-5" style="color: yellow">${result.name}</h1>
            <div class="d-flex justify-content-between">
                <div class="col-6 col-md-3" id="product_${result.id}">
                        <img src='${result.imageUrl}' class="card-img-top">
                </div>
                
                <ul class="dettagli">
                    <li>Description: ${result.description}</li>
                    <li>Brand: ${result.brand}</li>
                    <li>Price: ${result.price} €</li>
                    <li> Add to cart:
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16" onclick="aggiungiAlCarrello('${result.name}', '${result.price}', '${result.id}' )">
                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    </li>
                </ul>
            </div>
            `
}

// AL CARICAMENTO DELLA PAGINA, DEVO POTER VEDERE I DETTAGLI DEL PRODOTTO SELEZIONATO
window.onload = async () => {
    try{
        const product = await getProduct(id)
        displayProduct(product)
    } catch(error){
        alert("Something went wrong!")
    }
}


// FUNZIONE PER AGGIUNGERE AL CARRELLO I PRODOTTI SELEZIONATI
const aggiungiAlCarrello = (name, price, _id) => {
    const product = document.querySelector('#product_' + _id)
    const cart = document.querySelector('.list')
    cart.innerHTML +=
     /*html*/ `
        <li> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" onclick='rimuoviDalCarrello(event, "${_id}", "${price}")'>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg> ${name}, ${price}</li>
    `
    const totale = document.querySelector('.totalCart')
    totale.innerText = (Number(totale.innerText) + Number(price)).toFixed(2)
}


// FUNZIONE PER RIMUOVERE IL CONTENUTO DAL CARRELLO
const rimuoviDalCarrello = (event, _id, price) => {
    event.target.closest("li").remove()
    const totale = document.querySelector('.totalCart')
    totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2)
    const product = document.querySelector('#product_' + _id)
    product.style.border = 'none'
}


// FUNZIONE PER SVUOTARE IL CARRELLO
const svuotaCarrello = () => {
    document.querySelector('.list').innerHTML = ""
    document.querySelectorAll('.card').forEach(card => card.style.border = 'none')
    const totale = document.querySelector('.totalCart')
    totale.innerText = ''
}