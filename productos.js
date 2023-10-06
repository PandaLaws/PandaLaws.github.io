function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    const totalItems = window.carrito ? window.carrito.reduce((total, producto) => total + producto.cantidad, 0) : 0;
    contador.textContent = totalItems;
}

document.querySelectorAll('.producto').forEach(producto => {
    let id = producto.dataset.id;
    let nombre = producto.querySelector('h2').textContent;
    let precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
    let inputCantidad = producto.querySelector('input');
    let imagen = producto.querySelector('img').src;

    producto.querySelector('.incrementar').addEventListener('click', () => {
        inputCantidad.value = parseInt(inputCantidad.value, 10) + 1;
    });
    
});
function agregarAlCarrito(id, nombre, precio, cantidad,imagen) {
    let productoExistente = carrito.find(producto => producto.id === id);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ id, nombre, precio, cantidad, imagen });
    }
    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
    

    // Guardar carrito en localStorage
}
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


