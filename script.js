// QUI ANDREMO AD INSERIRE TUTTE LE VARIABILI GLOBALI
const url = "https://striveschool-api.herokuapp.com/api/product/"

let contenuto = document.querySelector('.products .row')

// //CARICAMENTO DELLA PAGINA
contenuto.innerHTML = /*html*/
    `
<div class="container pc">
	<div class="loader"></div>
	<div class="loader"></div>
	<div class="loader"></div>
</div>

`



// FUNZIONE CHE ANDRÀ A POPOLARE LA PAGINA CON CIÒ CHE IO ANDRÒ AD INSERIRE NELL'ENDPOINT
const getProducts = async () => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjNTM5YzM5MzI3YzAwMThkM2EyZTQiLCJpYXQiOjE2OTYzNTUyMjgsImV4cCI6MTY5NzU2NDgyOH0.C0j8PM2EFXdAsuRqqVA3LRQieDwSkG5G22Z_UDkCoJQ'
        }
    })
    const result = await response.json()

    contenuto.innerHTML = result.map((data) => {
        // CREAZIONE CARD CHE ANDRANNO A POPOLARE LA PAGINA
        return /*html*/ `
        <div class="col-6 col-md-3">
                    <div class="card mb-5" id="product_${data._id}">
                        <img src='${data.imageUrl}' class="card-img-top">
                        <div class="card-body p-1">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">Brand: ${data.brand}</p>
                            <p class="card-text">${data.description}</p>
                            <p class="card-text"> Prezzo: ${data.price}</p>
                            <div class="d-flex justify-content-around align-items-center pb-1 px-1">
                               <!-- <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                                LASCIATO COMMENTATO PER COMODITA' PER RIPRENDERLO DOPO (BACKOFFICE),
                                L'UTENTE NON VEDE IL TASTO PER ELIMINARE UN PRODOTTO DALLA PAGINA -->

                                <a href="dettagli/dettagli.html?id=${data.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                                </a>

                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16" onclick="aggiungiAlCarrello('${data.name}', '${data.price}', '${data.id}' )">
                                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div> `
    }).join('')
        .finally(() => { contenuto.querySelector('.pc').remove() })
}


//AL CARICAMENTO DELLA PAGINA, DEVO POTER VEDERE TUTTI I PRODOTTI
window.onload = () => {
    try {
        getProducts()
    } catch (error) {
        alert("Something went wrong")
    }
}

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


// FUNZIONE CHE PERMETTE DI FARE IL LOGIN DELL'ADMIN CHE COLLEGA ALLA PAGINA DI BACKOFFICE
const loginAdmin = (event) => {
    let username = document.querySelector('#username')
    let password = document.querySelector('#password')
    let signIn = document.querySelector('#signIn')

    if (username.value === "admin" && password.value === "password") {
        signIn = window.location.href = "backoffice/backoffice.html"
    } else {
        alert("An invalid username and/or password has been entered! Try again")
    }
}