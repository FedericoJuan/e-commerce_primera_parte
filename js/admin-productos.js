let selectedIndex = -1

function obtenerProductos() {
    const listaProductos = 
        [
            {
                id: 1,
                producto: 'Remera blanca mujer',
                imagen: '"https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"',
                descripcion: 'Regalate una alegria!',
                precio: 2500,
            },
            {
                id: 2,
                producto: 'Remera blanca hombre',
                imagen: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
                descripcion: 'Elegantemente deportivo',
                precio: 4000,
            },
            {
                id: 3,
                producto: 'Buzo Gris unisex.',
                descripcion: 'comodo y a la moda!',
                imagen: 'https://images.unsplash.com/photo-1576775068951-d4983d253497?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                precio: 1550,   
            },
            {
                id: 4,
                producto: 'Buzo Dama Lana',
                descripcion: 'Un Abrazo de la abuela!',
                imagen: 'https://images.unsplash.com/photo-1520965291898-92731ff2f8ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=432&q=80g',
                precio: 5000,
            },
            {
                id: 5,
                producto: 'Vestido Color Hueso',
                descripcion: 'Elegante para todo evento',
                imagen: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                precio: 6500,
            },
            {
                id: 6,
                producto: 'Buzo Hombre Samuray',
                descripcion: 'Siente el poder ancestral del Bushido',
                imagen: 'https://images.unsplash.com/photo-1613338761569-735c3fc68699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=346&q=80',
                precio: 5500,
            },
            {
                id: 7,
                producto: 'Campera Jean Celeste unidex.',
                descripcion: 'Los Clasicos nunca mueren',
                imagen: 'https://images.unsplash.com/photo-1600574691453-499962cc0611?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80g',
                precio: 7500,
            },
            {
                id: 8,
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

function ocultarFormulario() {
    document.getElementById('formulario-editar').style.display = 'none';
}

function mostrarFormulario() {
    document.getElementById('formulario-editar').style.display = 'block';
}

function cargarDatosEnTabla( ) {
    const productos  = obtenerProductos();
    const tbody = document.getElementById("contenido-tabla-productos");

    tbody.innerHTML = "";

    if(productos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No hay productos</td></tr>`;
    } else {
        productos.forEach((producto, index) => {
            tbody.innerHTML += `
                <tr class="data__table-row">
                    <td class="data__table-body-row-item">${producto.producto}</td>
                    <td class="data__table-body-row-item"><img src=${producto.imagen} alt=${producto.producto} height="50" width="50"> </td>
                    <td class="data__table-body-row-item">${producto.precio}</td>
                    <td class="data__table-body-row-menu">
                        <button onclick="editarProducto(${index})"> 
                        <i class="fa-solid fa-edit"></i>
                        </button>
                        <button onclick="eliminarProducto(${index})"> 
                        <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }
}

function editarProducto(index){
    const productos = obtenerProductos();
    const producto = productos[index];
    
    document.getElementById('producto').value = producto.producto;
    document.getElementById('imagen').value = producto.imagen;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
    selectedIndex = index;
    mostrarFormulario();
}

function guardarProducto(event) {
    event.preventDefault();

    const elements = event.target.elements;

    const producto = {
        producto: elements.producto.value,
        imagen: elements.imagen.value,
        descripcion: elements.descripcion.value,
        precio: elements.precio.value,
    }

    const productos = obtenerProductos();
    
    if(selectedIndex >= 0) {
        productos[selectedIndex] = producto;
        selectedIndex = -1; //preparo el indice para el proximo guardado
        console.log('editando');
    } else {
        console.log('agregando');
        productos.push(producto);
    }

    localStorage.setItem('productos', JSON.stringify(productos));
    cargarDatosEnTabla();
    ocultarFormulario();
}
function eliminarProducto(index) {
    const productos = obtenerProductos();
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    cargarDatosEnTabla();
}

ocultarFormulario();
cargarDatosEnTabla();