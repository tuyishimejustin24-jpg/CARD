async function fetchproducts(){
    try {
        const responce = await fetch('https://fakestoreapi.com/products')
        const data = await responce.json()
        console.log(data)
    } catch (error) {
        console.log(`error is: ${error}`)
    }
}

fetchproducts()