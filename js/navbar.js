
function usuarioLogueado() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || undefined;
    return usuarioLogueado;
}

function mostrarOcultarUsuarioLogueado() {
    console.log(usuarioLogueado(), 'usuarioLogueado');
    if(usuarioLogueado() !== undefined){

        document.getElementById('nav-usuario').innerHTML = usuarioLogueado().nombre;
        document.getElementById("contenedor-autenticacion-usuario").style.display = "flex";
        document.getElementById("contenedor-autenticacion-login").style.display = "none";
        document.getElementById('rutas-admin').style.display = 'block';
        if(usuarioLogueado().rol == 'admin'){
            document.getElementById('rutas-admin').style.display = 'flex';
        }else{
            document.getElementById('rutas-admin').style.display = 'none';
        }
    }else{
        document.getElementById("contenedor-autenticacion-usuario").style.display = "none";
        document.getElementById("contenedor-autenticacion-login").style.display = "flex";
        document.getElementById('rutas-admin').style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem("usuarioLogueado");
    mostrarOcultarUsuarioLogueado();
}


mostrarOcultarUsuarioLogueado();