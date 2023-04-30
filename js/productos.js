function obtenerProductos() {
    const listaProductos = 
        [
            {
                producto: 'Remera blanca mujer',
                imagen: '"https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"',
                descripcion: 'Regalate una alegria!',
                precio: 2500,
            },
            {
                producto: 'Remera blanca hombre',
                imagen: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
                descripcion: 'Elegantemente deportivo',
                precio: 4000,
            },
            {
                producto: 'Buzo Gris unisex.',
                descripcion: 'comodo y a la moda!',
                imagen: 'https://images.unsplash.com/photo-1576775068951-d4983d253497?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                precio: 1550,   
            },
            {
                producto: 'Buzo Dama Lana',
                descripcion: 'Un Abrazo de la abuela!',
                imagen: 'https://images.unsplash.com/photo-1520965291898-92731ff2f8ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=432&q=80g',
                precio: 5000,
            },
            {
                producto: 'Vestido Color Hueso',
                descripcion: 'Elegante para todo evento',
                imagen: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                precio: 6500,
            },
            {
                producto: 'Buzo Hombre Samuray',
                descripcion: 'Siente el poder ancestral del Bushido',
                imagen: 'https://images.unsplash.com/photo-1613338761569-735c3fc68699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=346&q=80',
                precio: 5500,
            },
            {
                producto: 'Campera Jean Celeste unidex.',
                descripcion: 'Los Clasicos nunca mueren',
                imagen: 'https://images.unsplash.com/photo-1600574691453-499962cc0611?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80g',
                precio: 7500,
            },
            {
                producto: 'Camisa Cuadrille Hombre',
                descripcion: 'La camisa que te hara sentir como un verdadero caballero',
                imagen: 'https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
                precio: 4500,
            },
        ]

    const data = localStorage.getItem('productos');
    if (data !== null) {
        return JSON.parse(data);
    } else {
        localStorage.setItem('productos', JSON.stringify(listaProductos));
        return listaProductos;
    }
}

function agregarAlCarrito(nombreProducto){ 
    const orden = JSON.parse(localStorage.getItem('orden')) || [];
    const productos = obtenerProductos();

        const producto = productos.find(p => p.producto === nombreProducto);

        if(producto !== undefined){

            const productoEnOrden = orden.filter(p => p.producto === producto.producto)

            console.log(productoEnOrden);
            if(productoEnOrden === undefined || productoEnOrden.length > 0){ // no esta el producto en la orden
                // get a new array with the filtered data excluding the one we want to remove
                console.log('camino a');

                const ordenSinProducto = orden.filter(p => p.producto !== producto.producto)
                ordenSinProducto.push({
                    producto: producto.producto,
                    imagen: producto.imagen,
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    cantidad: productoEnOrden[0].cantidad + 1,
                    subtotal: producto.precio * (productoEnOrden[0].cantidad + 1)
                })
                
                localStorage.setItem('orden', JSON.stringify(ordenSinProducto))
               
            }else {
                console.log('camino b');
                orden.push({
                    producto: producto.producto,
                    imagen: producto.imagen,
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    cantidad: 1,
                    subtotal: producto.precio * 1
                })
                
                localStorage.setItem('orden', JSON.stringify(orden))
            }
            swal({
                title: `Producto agregado al carrito`,
                icon: 'success',
            })
        }else {
            swal({
                title:'Error al cargar el producto al carrito',
                icon:"warning"
            })
        }
    
    }



function mostrarProductos(productos){
    const contenedorProductos = document.getElementById('lista-productos');
    
    productos.forEach(producto => {
        contenedorProductos.innerHTML += `
        <article class="card">
                <header class="card__header">

                    <h3 class="card__title">
                        ${producto.producto}
                    </h3>
                    <p class="card__subtitle">
                        ${producto.descripcion}
                    </p>
                </header>
                <figure class="card__body">
                    <img src=${producto.imagen} alt=${producto.producto} class="card__img" height="200" width="200">
                    <div class="card__price">
                        <p><span>$</span> ${producto.precio}</p>
                    </div>
                </figure>
                <footer class="card__footer">
                    <hr>
                    <nav class="card__btn-container">
                        <a class="btn btn-primary" href="#">
                            Detalle
                        </a>
                        <button class="btn btn-secondary" onclick="agregarAlCarrito('${producto.producto}')" >Comprar!</button>
                    </nav>
                </footer>
                </div>
            </article>
        `
    })    
}

function filtrarProductos(event) {
    event.preventDefault();

    const elements = event.target.elements
    const consulta = elements.consulta.value;

    LimpiarProductos();
    if( consulta === '') {
        mostrarProductos(obtenerProductos());
    }else {
        const productos = obtenerProductos();
        const productosFiltrados = productos.filter(producto => (producto.producto.toLowerCase().includes(consulta)))
    
        mostrarProductos(productosFiltrados); 
    }

}

function LimpiarProductos() {
    const contenedorProductos = document.getElementById('lista-productos');
    contenedorProductos.innerHTML = '';
}

mostrarProductos(obtenerProductos());