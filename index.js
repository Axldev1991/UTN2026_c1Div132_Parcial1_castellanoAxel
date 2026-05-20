//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    let carritoJSON = localStorage.getItem("carrito") || "[]";
    return JSON.parse(carritoJSON);
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    let carritoRAW = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoRAW);
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let { nombreProducto, precioProducto } = buscarNombrePrecioProducto(elementoClickeado);

    let carrito = obtenerCarrito();
    let existeProducto = carrito.find(producto => producto.nombre === nombreProducto)
    if(!existeProducto){
        carrito.push({nombre: nombreProducto, precio: precioProducto, cantidad: 1})
    }else{
        existeProducto.cantidad++;
    }
    console.log(carrito);
    guardarCarrito(carrito);
    alert(`Un/una: ${nombreProducto} fue agregado al carrito`);
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let {nombreProducto, precioProducto} = buscarNombrePrecioProducto(elementoClickeado);

    let carrito = obtenerCarrito();
    let existeProducto = carrito.find(producto => producto.nombre === nombreProducto)
    if(carrito.length === 0){
        alert("No hay ningún producto guardado en el carrito");
        return
    }else if(!existeProducto){
        alert(`No hay más ${nombreProducto} en el carrito`);
    }else{
        existeProducto.cantidad--;
        alert(`Un/una: ${nombreProducto} fue eliminado del carrito`);
        if(existeProducto.cantidad === 0){
            carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
        }
        guardarCarrito(carrito);
    }
}

function buscarNombrePrecioProducto(e){
    let contenedor = e.closest("li");
    let nombreProducto = contenedor.querySelector(".nombre-producto").innerText;
    let precioProducto = parseInt(contenedor.querySelector(".precio-producto").innerText.replace("$", "").trim(), 10);
    return {nombreProducto, precioProducto};
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
