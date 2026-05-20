function obtenerCarrito() 
{
    let carritoJSON = localStorage.getItem("carrito") || "[]";
    return JSON.parse(carritoJSON);

}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let carrito = obtenerCarrito();
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
        `;
        tabla.appendChild(fila);
    });

    let contenedor = document.querySelector("#valor-final");
    contenedor.innerText = `El valor final a pagar es de: $${total}`;
}

function limpiarCarrito() 
{
    localStorage.removeItem("carrito");
    alert("Carrito limpiado correctamente");
    location.reload();
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});