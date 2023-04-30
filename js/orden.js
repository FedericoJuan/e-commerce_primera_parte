let ordenes = JSON.parse(localStorage.getItem('orden')) || [];

function mostrarOrdenes() {
    const listaOrdenes = document.getElementById('lista-ordenes');

    listaOrdenes.innerHTML = '';

    if(ordenes.length === 0) {
        listaOrdenes.innerHTML = `<li>No hay ordenes</li>`;
    }else {
        ordenes.forEach(orden => {
           console.table(orden)
            listaOrdenes.innerHTML += `
            <li>
            <article>
                <img src=${orden.imagen} height="200" width="200">
                <h3>${orden.producto}</h3>
                <p>${orden.descripcion}</p>
                <p>Precio: $${orden.precio}</p>
                <p>Cantidad: ${orden.cantidad}</p>
                <p>Subtotal: $${orden.subtotal}</p>
                <button onclick="eliminarOrden('${orden.producto}')">Eliminar</button>
            </article>
        </li>
            `
        })
    }
}

function calcularTotal() {
    let total = 0;
    ordenes.forEach(orden => {
        total += orden.subtotal;
    })
    document.getElementById('total-orden').innerHTML = `${total}`;
}

function eliminarOrden(nombreProducto){
    const ordenSinProducto = ordenes.filter(p => p.producto !== nombreProducto)
    localStorage.setItem('orden', JSON.stringify(ordenSinProducto))
    ordenes = JSON.parse(localStorage.getItem('orden')) || []
    mostrarOrdenes();
    calcularTotal();
}

mostrarOrdenes();
calcularTotal();