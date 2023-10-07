// FUNZIONE PER FARE UNA QUERY STRING
const params = new URLSearchParams(window.location.search)
const id = params.get('id')
let contenuto = document.querySelector('.product .row')

// //CARICAMENTO DELLA PAGINA
// contenuto.innerHTML = /*html*/
//     `
// <div class="container pc">
// 	<div class="loader"></div>
// 	<div class="loader"></div>
// 	<div class="loader"></div>
// </div>

// `

fetch(`https://striveschool-api.herokuapp.com/api/product/${_id}`)
    .then(response => response.json())
    .then(product => {
        console.log(product)
        contenuto.innerHTML += /*html*/
            `
            <h1 class="mb-5" style="color: red">${product.name}</h1>
            <div class="d-flex justify-content-between">
                <div class="col-6 col-md-3" id="product_${product._id}">
                        <img src='${product.imageUrl}' class="card-img-top">
                </div>
                
                <ul class="dettagli">
                    <li>Description: ${product.description}</li>
                    <li>Brand: ${product.brand}</li>
                    <li>Price: ${product.price}</li>
                    <li> Aggiungi al carrello:
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16" onclick="aggiungiAlCarrello('${product.title}', '${product.price}', '${product.id}' )">
                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    </li>
                </ul>
            </div>
            
            `
    })
    .catch(error => console.log(error))
    // .finally(() => {contenuto.querySelector('.libro').remove()})
















// FUNZIONE PER AGGIUNGERE AL CARRELLO I PRODOTTI SELEZIONATI
const aggiungiAlCarrello = (name, price, id) => {
    const product = document.querySelector('#product_' + id)
    product.style.border = '1px solid yellow'
    const cart = document.querySelector('.list')
    cart.innerHTML +=
        `
        <li> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" onclick='rimuoviDalCarrello(event, ${id}, ${price})'>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg> ${name}, ${price}</li>
    `
    const totale = document.querySelector('.totalCart')
    totale.innerText = (Number(totale.innerText) + Number(price)).toFixed(2)
}


// FUNZIONE PER RIMUOVERE IL CONTENUTO DAL CARRELLO
const rimuoviDalCarrello = (event, id, price) => {
    event.target.closest("li").remove()
    const totale = document.querySelector('.totalCart')
    totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2)
    const product = document.querySelector('#product_' + id)
    product.style.border = 'none'
}



// FUNZIONE PER SVUOTARE IL CARRELLO
const svuotaCarrello = () => {
    document.querySelector('.list').innerHTML = ""
    document.querySelectorAll('.card').forEach(card => card.style.border = 'none')
    const totale = document.querySelector('.totalCart')
    totale.innerText = ''
}
