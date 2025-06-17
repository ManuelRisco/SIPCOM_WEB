// Utilidades de usuarios y sesión
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}
function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
function obtenerSesion() {
    return JSON.parse(localStorage.getItem('usuarioSesion'));
}
function guardarSesion(usuario) {
    localStorage.setItem('usuarioSesion', JSON.stringify(usuario));
}
function cerrarSesion() {
    localStorage.removeItem('usuarioSesion');
    // Elimina también el nombre de usuario para admin-usuarios.html
    localStorage.removeItem('usuario');
}

// Inicializar con un admin, supervisor y vendedor si no hay usuarios
if (!localStorage.getItem('usuarios')) {
    guardarUsuarios([
        {
            idUsuario: 1,
            nombreUsuario: 'admin',
            contrasena: 'admin123',
            nombres: 'Administrador',
            apellidos: '',
            rol: 'admin',
            estado: 1,
            fechaRegistro: new Date().toISOString()
        },
        {
            idUsuario: 2,
            nombreUsuario: 'supervisor',
            contrasena: 'super123',
            nombres: 'Supervisor',
            apellidos: '',
            rol: 'supervisor',
            estado: 1,
            fechaRegistro: new Date().toISOString()
        },
        {
            idUsuario: 3,
            nombreUsuario: 'vendedor',
            contrasena: 'vende123',
            nombres: 'Vendedor',
            apellidos: '',
            rol: 'vendedor',
            estado: 1,
            fechaRegistro: new Date().toISOString()
        }
    ]);
}

// LOGIN
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form') || document.getElementById('loginForm');
    const loginError = document.getElementById('loginError') || document.getElementById('login-msg');
    const loginSuccess = document.getElementById('loginSuccess');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (loginError) loginError.style.display = 'none';
            if (loginSuccess) loginSuccess.style.display = 'none';
            // Compatibilidad con distintos nombres de input
            const username = loginForm.username ? loginForm.username.value.trim() : loginForm['login-usuario'].value.trim();
            const password = loginForm.password ? loginForm.password.value.trim() : loginForm['login-contrasena'].value.trim();

            const usuarios = obtenerUsuarios();
            const user = usuarios.find(u => u.nombreUsuario === username && u.contrasena === password);
            if (user) {
                if (user.estado == 0) {
                    if (loginError) {
                        loginError.textContent = 'Usuario inactivo. Contacte al administrador.';
                        loginError.style.display = 'block';
                    }
                    return;
                }
                guardarSesion(user);
                // Guarda también el nombre de usuario para admin-usuarios.html
                localStorage.setItem('usuario', user.nombreUsuario);
                if (loginSuccess) {
                    loginSuccess.textContent = '¡Acceso correcto! Redirigiendo...';
                    loginSuccess.style.display = 'block';
                }
                setTimeout(() => {
                    // Redirige según rol o página
                    if (window.location.pathname.includes('admin-usuarios')) {
                        window.location.reload();
                    } else {
                        window.location.href = 'admin-panel.html';
                    }
                }, 400);
            } else {
                if (loginError) {
                    loginError.textContent = 'Usuario o contraseña incorrectos.';
                    loginError.style.display = 'block';
                }
            }
        });
    }
    // Mostrar mensaje si viene de otra página
    const loginMsg = localStorage.getItem('loginMsg');
    if (loginMsg && loginError) {
        loginError.textContent = loginMsg;
        loginError.style.display = 'block';
        localStorage.removeItem('loginMsg');
    }
});

// REGISTRO Y CRUD DE USUARIOS (solo para admin)
window.registrarUsuario = function(datos) {
    const sesion = obtenerSesion();
    if (!sesion || sesion.rol !== 'admin') {
        alert('Solo el administrador puede registrar usuarios.');
        return false;
    }
    let usuarios = obtenerUsuarios();
    if (usuarios.some(u => u.nombreUsuario === datos.nombreUsuario)) {
        alert('El nombre de usuario ya existe.');
        return false;
    }
    const nuevoId = usuarios.length ? Math.max(...usuarios.map(u => u.idUsuario)) + 1 : 1;
    usuarios.push({
        idUsuario: nuevoId,
        nombreUsuario: datos.nombreUsuario,
        contrasena: datos.contrasena,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        rol: datos.rol,
        estado: datos.estado,
        fechaRegistro: new Date().toISOString()
    });
    guardarUsuarios(usuarios);
    return true;
};

window.editarUsuario = function(id, datos) {
    const sesion = obtenerSesion();
    if (!sesion || sesion.rol !== 'admin') {
        alert('Solo el administrador puede editar usuarios.');
        return false;
    }
    let usuarios = obtenerUsuarios();
    usuarios = usuarios.map(u => {
        if (u.idUsuario == id) {
            return { ...u, ...datos };
        }
        return u;
    });
    guardarUsuarios(usuarios);
    return true;
};

window.eliminarUsuario = function(id) {
    const sesion = obtenerSesion();
    if (!sesion || sesion.rol !== 'admin') {
        alert('Solo el administrador puede eliminar usuarios.');
        return false;
    }
    let usuarios = obtenerUsuarios();
    usuarios = usuarios.filter(u => u.idUsuario != id);
    guardarUsuarios(usuarios);
    return true;
};

// Cerrar sesión global
window.cerrarSesionGlobal = function() {
    cerrarSesion();
    window.location.href = "login.html";
};

// Asignar a todos los botones con id o clase 'cerrar-sesion'
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#cerrar-sesion, .cerrar-sesion').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            cerrarSesion();
            window.location.href = "login.html";
        };
    });
});