// busqueda.js
// Filtra productos de la carta en todas las secciones según el texto ingresado

document.addEventListener('DOMContentLoaded', function() {
    const buscadorCarta = document.getElementById('buscadorCarta');
    if (!buscadorCarta) return;
    buscadorCarta.addEventListener('input', function() {
        const filtro = buscadorCarta.value.toLowerCase();
        // Mostrar todas las tabs-content y grid-product por defecto
        document.querySelectorAll('.tabs-content').forEach(function(tab) {
            tab.style.display = '';
        });
        document.querySelectorAll('.grid-product').forEach(function(grid) {
            let hayCoincidencia = false;
            grid.querySelectorAll('.product-item').forEach(function(item) {
                const nombre = item.querySelector('h3')?.textContent.toLowerCase() || '';
                if (nombre.includes(filtro)) {
                    item.style.display = '';
                    hayCoincidencia = true;
                } else {
                    item.style.display = 'none';
                }
            });
            // Oculta la grid-product si no hay coincidencias
            grid.style.display = hayCoincidencia || filtro === '' ? '' : 'none';
        });
        // Si hay filtro, muestra todas las tabs-content y oculta solo las grid-product vacías
        if (filtro !== '') {
            document.querySelectorAll('.tabs-content').forEach(function(tab) {
                tab.classList.add('tab-active');
                // Si no hay ningún producto visible en la grid-product de esta tab, oculta la tab
                const grid = tab.querySelector('.grid-product');
                if (grid && grid.style.display === 'none') {
                    tab.style.display = 'none';
                } else {
                    tab.style.display = '';
                }
            });
        } else {
            // Si no hay filtro, restaura el estado original de las tabs
            document.querySelectorAll('.tabs-content').forEach(function(tab, i) {
                tab.style.display = '';
                tab.classList.remove('tab-active');
            });
            // Activa solo la tab activa por defecto
            const activeTab = document.querySelector('.hm-tab-link.active');
            if (activeTab) {
                const idx = Array.from(document.querySelectorAll('.hm-tab-link')).indexOf(activeTab);
                const tabsContent = document.querySelectorAll('.tabs-content');
                if (tabsContent[idx]) {
                    tabsContent[idx].classList.add('tab-active');
                }
            }
        }
    });
});
