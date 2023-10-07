// WELCOME INTO THE GOD MODE

// EVENTUALI VARIABILI GLOBALI
const name = document.querySelector('#name')
const description = document.querySelector('#description')
const brand = document.querySelector('#brand')
const imageUrl = document.querySelector('#imageUrl')
const price = document.querySelector('#price')
const productForm =  document.querySelector('#productForm')



// FUNZIONE PER ANDARE AD AGGIUNGERE UN PRODOTTO
async function addToMain (event) {
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