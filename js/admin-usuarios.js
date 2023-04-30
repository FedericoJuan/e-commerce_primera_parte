selectedIndex = -1;

function usuariosEnLocalStorage() {
    return JSON.parse(localStorage.getItem("usuarios")) || [{nombre:'admin', email:'admin@gmail.com',password:'admin', rol:'admin'}];
}

function mostrarFormulario() {
    document.getElementById("formulario-editar").style.display = "block";
}


function ocultarFormulario() {
    document.getElementById("formulario-editar").style.display = "none";
}

function cargarUsuarios() {
    const usuarios  = usuariosEnLocalStorage();
    const tbody = document.getElementById("contenido-tabla-usuarios");

    tbody.innerHTML = "";

    if(usuarios.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No hay usuarios</td></tr>`;
    } else {
        usuarios.forEach((usuario, index) => {
            tbody.innerHTML += `
                <tr class="data__table-body-row">
                    <td "data__table-body-row-item">${usuario.nombre}</td>
                    <td "data__table-body-row-item">${usuario.email}</td>
                    <td "data__table-body-row-item">${usuario.rol}</td>
                    <td class="data__table-body-row-menu">
                        <button onclick="editarUsuario(${index})"> 
                        <i class="fa-solid fa-edit"></i>
                        </button>    
                        <button onclick="eliminarUsuario(${index})"> 
                        <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }

}

function editarUsuario(index){
    const usuarios = usuariosEnLocalStorage();
    const usuario = usuarios[index];
    
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('email').value = usuario.email;
    document.getElementById('password').value = usuario.password;
    document.getElementById('rol').value = usuario.rol;
    selectedIndex = index;
    mostrarFormulario();
}

function guardarUsuario(event) {
    event.preventDefault();

    const elements = event.target.elements;

    const usuario = {
        nombre: elements.nombre.value,
        email: elements.email.value,
        password: elements.password.value,
        rol: elements.rol.value
    }

    const usuarios = usuariosEnLocalStorage();
    
    if(selectedIndex > 0) {
        usuarios[selectedIndex] = usuario;
    } else {
        usuarios.push(usuario);
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    cargarUsuarios();
    ocultarFormulario();
}


function eliminarUsuario(id){
    const usuarios = usuariosEnLocalStorage();
    swal({
        title: `Borrar Cliente`,
        text: `Esta seguro que desea borrar el usuario ${usuarios[id].nombre}`,
        icon: 'warning',
        buttons: {
            cancel: `Cancelar`,
            delete: `Borrar`
        }
    }).then(value => {
        if(value === `delete`){
            usuarios.splice(id, 1)
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
            swal({
                title: `Elemento Borrado Correctamente`,
                icon: 'error'
            })
        
            cargarUsuarios();    
        }
    })
}

cargarUsuarios()
ocultarFormulario()