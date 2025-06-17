// CRUD de proveedores en localStorage

function obtenerProveedores() {
    return JSON.parse(localStorage.getItem('proveedores')) || [];
}
function guardarProveedores(proveedores) {
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
}

// Renderizar tabla de proveedores
function renderizarProveedores() {
    const tbody = document.querySelector('#tabla-proveedores tbody');
    const proveedores = obtenerProveedores();
    tbody.innerHTML = '';
    proveedores.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.idProveedor}</td>
            <td>${p.razonSocial}</td>
            <td>${p.ruc}</td>
            <td>${p.telefono || ''}</td>
            <td>${p.correo || ''}</td>
            <td>${p.direccion || ''}</td>
            <td>${p.estado ? 'Activo' : 'Inactivo'}</td>
            <td>${p.fechaRegistro ? new Date(p.fechaRegistro).toLocaleString() : ''}</td>
            <td class="actions">
                <button onclick="editarProveedorUI(${p.idProveedor})">Editar</button>
                <button onclick="eliminarProveedorUI(${p.idProveedor})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Agregar o editar proveedor
document.addEventListener('DOMContentLoaded', function() {
    renderizarProveedores();

    const form = document.getElementById('proveedor-form');
    const msg = document.getElementById('form-msg-proveedor');
    const cancelarBtn = document.getElementById('cancelar-edicion-proveedor');

    form.onsubmit = function(e) {
        e.preventDefault();
        const id = document.getElementById('proveedor-id').value;
        const razonSocial = document.getElementById('razonSocial').value.trim();
        const ruc = document.getElementById('ruc').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const estado = parseInt(document.getElementById('estado-proveedor').value);

        let proveedores = obtenerProveedores();

        // Validar RUC único
        if (!id && proveedores.some(p => p.ruc === ruc)) {
            msg.textContent = 'El RUC ya está registrado.';
            msg.className = 'error';
            return;
        }

        if (id) {
            // Editar
            proveedores = proveedores.map(p =>
                p.idProveedor == id
                    ? { ...p, razonSocial, ruc, telefono, correo, direccion, estado }
                    : p
            );
            msg.textContent = 'Proveedor actualizado correctamente.';
        } else {
            // Nuevo
            const nuevoId = proveedores.length ? Math.max(...proveedores.map(p => p.idProveedor)) + 1 : 1;
            proveedores.push({
                idProveedor: nuevoId,
                razonSocial,
                ruc,
                telefono,
                correo,
                direccion,
                estado,
                fechaRegistro: new Date().toISOString()
            });
            msg.textContent = 'Proveedor agregado correctamente.';
        }
        msg.className = 'success';
        guardarProveedores(proveedores);
        form.reset();
        document.getElementById('proveedor-id').value = '';
        cancelarBtn.classList.add('hidden');
        renderizarProveedores();
        setTimeout(() => { msg.textContent = ''; }, 2000);
    };

    cancelarBtn.onclick = function() {
        form.reset();
        document.getElementById('proveedor-id').value = '';
        cancelarBtn.classList.add('hidden');
        msg.textContent = '';
    };
});

// Editar proveedor UI
window.editarProveedorUI = function(id) {
    const proveedores = obtenerProveedores();
    const p = proveedores.find(p => p.idProveedor == id);
    if (!p) return;
    document.getElementById('proveedor-id').value = p.idProveedor;
    document.getElementById('razonSocial').value = p.razonSocial;
    document.getElementById('ruc').value = p.ruc;
    document.getElementById('telefono').value = p.telefono || '';
    document.getElementById('correo').value = p.correo || '';
    document.getElementById('direccion').value = p.direccion || '';
    document.getElementById('estado-proveedor').value = p.estado;
    document.getElementById('cancelar-edicion-proveedor').classList.remove('hidden');
};

// Eliminar proveedor UI
window.eliminarProveedorUI = function(id) {
    if (!confirm('¿Seguro que deseas eliminar este proveedor?')) return;
    let proveedores = obtenerProveedores();
    proveedores = proveedores.filter(p => p.idProveedor != id);
    guardarProveedores(proveedores);
    renderizarProveedores();
};
