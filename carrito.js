// Estructura del carrito
window.carrito = window.carrito || [];


function actualizarListaCarrito() {
    const listaCarrito = document.getElementById('items-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        
        // Crear imagen
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        img.classList.add('imagen-carrito');
        li.appendChild(img);
        
        // Crear span para el texto
        const span = document.createElement('span');
        span.textContent = `${producto.nombre} - Precio unitario: $${producto.precio} - Cantidad: `;
        li.appendChild(span);
        
        // Crear input de cantidad
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.value = producto.cantidad;
        inputCantidad.addEventListener('change', (e) => {
            const nuevaCantidad = parseInt(e.target.value);
            if (nuevaCantidad <= 0) {
                carrito.splice(index, 1);
            } else {
                producto.cantidad = nuevaCantidad;
            }
            guardarCarritoEnLocalStorage();
            actualizarListaCarrito();
            actualizarTotal();
        });
        li.appendChild(inputCantidad);
        
        // Crear botón eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "eliminar";
        btnEliminar.addEventListener('click', () => {
            carrito.splice(index, 1);
            guardarCarritoEnLocalStorage();
            actualizarListaCarrito();
            actualizarTotal();
        });
        li.appendChild(btnEliminar);
        
        // Añadir li al ul
        listaCarrito.appendChild(li);
    });

    actualizarTotal();
}




function agregarProducto(e) {
    const producto = e.target.parentElement;
    const id = producto.dataset.id;
    const nombre = producto.querySelector('h2').textContent;
    const precio = parseFloat(producto.querySelector('.precio').textContent.slice(1));
    const cantidad = parseInt(producto.querySelector('input').value);
    const imagen = producto.querySelector('img').src;

    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        carrito.push({
        id,
        nombre,
        precio,
        cantidad,
        imagen
        });
    }
    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
    actualizarListaCarrito(); // Agregamos esta línea
    
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (contador) { // Verifica si el contador existe
        const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        contador.textContent = totalItems;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarProducto);
    });

    actualizarListaCarrito(); // Mostramos la lista al cargar la página
});

function enviarAWhatsapp() {
    let mensaje = 'Hola! Me gustaría comprar:\n';

    carrito.forEach(producto => {
        mensaje += `\n${producto.nombre} - Cantidad: ${producto.cantidad} - Precio unitario: ${producto.precio}`;
    });

    const total = carrito.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
    mensaje += `\n\nTotal: ${total.toFixed(2)}`;

    const numeroWhatsapp = '+584128955434';
    const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;

    window.open(urlWhatsapp, '_blank');
}

if (document.getElementById('btn-comprar')) {
    document.getElementById('btn-comprar').addEventListener('click', enviarAWhatsapp);
}

// Intentar cargar carrito desde localStorage al iniciar la página
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarContadorCarrito();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
function cargarCarritoDeLocalStorage() {
    // Verificar si hay algo guardado en localStorage
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarListaCarrito();
        actualizarContadorCarrito();
        actualizarTotal();
    }
}
function limpiarCarritoDeLocalStorage() {
    localStorage.removeItem('carrito');
}
function actualizarTotal() {
    const total = carrito.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
    document.getElementById('total-carrito').textContent = total.toFixed(2);
}


