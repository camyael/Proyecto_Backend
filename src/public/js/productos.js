const prodArray = document.getElementById('productos-tiemporeal')

const socket = io()

socket.on('productos', data => {
    prodArray.innerHTML = ''

    data.forEach(prod => {
        if (data.length == 0) {
            prodArray.innerHTML = `
                <h2>No hay productos actualmente</h2>
            `
        } else {
            prodArray.innerHTML += `
            <div>
                <p>Producto: ${prod.title}, precio: $${prod.price}, id: ${prod._id}</p>
                <img src=${prod.image}>
                <a href= /products/${prod._id}>Ver más</a>
            </div>
        `
        }
    });
})