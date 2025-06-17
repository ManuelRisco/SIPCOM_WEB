// Solo UI y llamadas a login.js

document.addEventListener('DOMContentLoaded', function() {
    // Restricción de acceso
    const sesion = JSON.parse(localStorage.getItem('usuarioSesion'));
    // Permitir acceso a admin, supervisor y vendedor
    if (!sesion || sesion.estado === 0 || (sesion.rol !== 'admin' && sesion.rol !== 'supervisor' && sesion.rol !== 'vendedor')) {
        localStorage.removeItem('usuarioSesion');
        localStorage.removeItem('usuario');
        // Guarda mensaje para mostrar en login
        localStorage.setItem('loginMsg', 'Usuario inactivo. Contacte al administrador.');
        window.location.href = "login.html";
        return;
    }

    const bienvenida = document.getElementById('bienvenida');
    bienvenida.textContent = `Bienvenido, ${sesion.nombres || sesion.nombreUsuario} (${sesion.rol})`;

    const cerrarSesionBtn = document.getElementById('cerrar-sesion');
    cerrarSesionBtn.onclick = cerrarSesionGlobal;

    // Mostrar/ocultar acciones según rol
    function mostrarPanelPorRol(rol) {
        const adminActions = document.getElementById('admin-actions');
        if (rol === 'admin' || rol === 'supervisor') {
            adminActions.style.display = '';
            document.querySelectorAll('.actions').forEach(td => td.style.display = '');
        } else {
            adminActions.style.display = 'none';
            document.querySelectorAll('.actions').forEach(td => td.style.display = 'none');
        }
    }
    mostrarPanelPorRol(sesion.rol);

    // Renderizar usuarios
    const tablaUsuarios = document.getElementById('tabla-usuarios').querySelector('tbody');
    function renderizarUsuarios() {
        const usuarios = obtenerUsuarios();
        tablaUsuarios.innerHTML = '';
        usuarios.forEach(u => {
            const tr = document.createElement('tr');
            // Si el usuario logueado es vendedor, no mostrar botones de acción
            let acciones = '';
            if (sesion.rol === 'admin' || sesion.rol === 'supervisor') {
                acciones = `
                    <button onclick="editarUsuarioUI(${u.idUsuario})">Editar</button>
                    <button onclick="eliminarUsuarioUI(${u.idUsuario})">Eliminar</button>
                `;
            }
            tr.innerHTML = `
                <td data-label="ID">${u.idUsuario}</td>
                <td data-label="Usuario">${u.nombreUsuario}</td>
                <td data-label="Nombres">${u.nombres}</td>
                <td data-label="Apellidos">${u.apellidos || ''}</td>
                <td data-label="Rol">${u.rol}</td>
                <td data-label="Estado">${u.estado ? 'Activo' : 'Inactivo'}</td>
                <td data-label="Fecha Registro">${new Date(u.fechaRegistro).toLocaleString()}</td>
                <td data-label="Acciones" class="actions">
                    ${acciones}
                </td>
            `;
            tablaUsuarios.appendChild(tr);
        });
        mostrarPanelPorRol(sesion.rol);
    }
    renderizarUsuarios();

    // Agregar o editar usuario
    const usuarioForm = document.getElementById('usuario-form');
    const formMsg = document.getElementById('form-msg');
    const cancelarEdicion = document.getElementById('cancelar-edicion');

    usuarioForm.onsubmit = function(e) {
        e.preventDefault();
        const id = document.getElementById('usuario-id').value;
        const datos = {
            nombreUsuario: document.getElementById('nombreUsuario').value.trim(),
            contrasena: document.getElementById('contrasena').value,
            nombres: document.getElementById('nombres').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            rol: document.getElementById('rol').value,
            estado: parseInt(document.getElementById('estado').value)
        };
        let ok;
        if (id) {
            ok = editarUsuario(parseInt(id), datos);
            formMsg.textContent = ok ? "Usuario actualizado correctamente." : "Error al actualizar usuario.";
        } else {
            ok = registrarUsuario(datos);
            formMsg.textContent = ok ? "Usuario agregado correctamente." : "Error al agregar usuario.";
        }
        formMsg.className = ok ? "success" : "error";
        if (ok) {
            usuarioForm.reset();
            cancelarEdicion.classList.add('hidden');
            renderizarUsuarios();
            setTimeout(() => formMsg.textContent = '', 2000);
        }
    };

    // Editar usuario UI
    window.editarUsuarioUI = function(id) {
        const usuarios = obtenerUsuarios();
        const u = usuarios.find(u => u.idUsuario == id);
        if (!u) return;
        document.getElementById('usuario-id').value = u.idUsuario;
        document.getElementById('nombreUsuario').value = u.nombreUsuario;
        document.getElementById('contrasena').value = u.contrasena;
        document.getElementById('nombres').value = u.nombres;
        document.getElementById('apellidos').value = u.apellidos;
        document.getElementById('rol').value = u.rol;
        document.getElementById('estado').value = u.estado;
        cancelarEdicion.classList.remove('hidden');
    };

    // Cancelar edición
    cancelarEdicion.onclick = function() {
        usuarioForm.reset();
        cancelarEdicion.classList.add('hidden');
        formMsg.textContent = '';
    };

    // Eliminar usuario UI
    window.eliminarUsuarioUI = function(id) {
        if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
        const ok = eliminarUsuario(id);
        if (ok) renderizarUsuarios();
    };
});