// panel de administración

document.addEventListener('DOMContentLoaded', function() {
    // Validar sesión antes de mostrar el panel
    const sesion = JSON.parse(localStorage.getItem('usuarioSesion'));
    if (!sesion || (sesion.rol !== 'admin' && sesion.rol !== 'supervisor')) {
        window.location.href = 'login.html';
        return;
    }
    //cerrar sesión
    document.querySelectorAll('.admin-option').forEach(function(option) {
        if(option.textContent.includes('Cerrar Sesión')) {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                // Eliminar sesión
                localStorage.removeItem('usuarioSesion');
                window.location.href = 'login.html';
            });
        }
    });
});