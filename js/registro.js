function capitalize(texto) { // combierte en mayuscula la primera letra de la palabra
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [{nombre:'admin', email:'admin@gmail.com',password:'admin', rol:'admin'}]; //lo que hace es instanciarlo/ inicializarlo por si no llega haber nada en el array

const form = document.getElementById("formulario-registro");

function agregarUsuario(event) {
    event.preventDefault()
    const elements = event.target.elements;

    const user = {
        nombre: capitalize(elements.nombre.value),
        email: elements.email.value,
        password: elements.password.value,
        password2: elements.password2.value,
        rol: 'usuario'
    }

    if(user.nombre == "" || user.email == "" || user.password == "" || user.password2 == ""){
        swal({
            title: `Uno o mas campos estan vacios`,
            icon: 'warning',
        })
    }else if(user.password != user.password2){
        swal({
            title: `Las contraseñas no coinciden`,
            icon: 'warning',
        })
    }else if(usuarios.find(u => u.email === user.email) != undefined){
        swal({
            title: `El email ya existe en la base de datos`,
            icon: 'warning',
        })
    }
    else{
        swal({
            title: `Usuario Creado`,
            icon: 'success',
        })
        usuarios.push(user);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}