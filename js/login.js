

const form = document.getElementById("formulario-login");


function login(event) {
    event.preventDefault()
    
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [{nombre:'admin', email:'admin@gmail.com',password:'admin', rol:'admin'}]; //lo que hace es instanciarlo/ inicializarlo por si no llega haber nada en el array
    
    const elements = event.target.elements;

    const userLogin = {
        email: elements.email.value,
        password: elements.password.value,
    }

    const usuarioEnBaseDeDatos = usuarios.find(u => u.email === userLogin.email);

    if(userLogin.email == "" || userLogin.password == ""){
        swal({
            title: `Uno o mas campos estan vacios`,
            icon: 'warning',
        })
    }else if(usuarioEnBaseDeDatos === undefined){
        swal({
            title: `El email no existe en la base de datos`,
            icon: 'warning',
        })
    }else if(usuarioEnBaseDeDatos.password != userLogin.password){
        swal({
            title: `La contraseña no coincide`,
            icon: 'warning',
        })
    }else{
        swal({
            title: `Usuario logueado correctamente`,
            icon: 'success',
        })
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEnBaseDeDatos));
        mostrarOcultarUsuarioLogueado();
    }
}