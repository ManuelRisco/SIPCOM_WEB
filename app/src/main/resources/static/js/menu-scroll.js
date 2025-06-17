// js/menu-scroll.js
// Función de scroll suave con offset
function scrollConOffset(elemento, offset = 80) {
    const y = elemento.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
}

// Scroll suave para enlaces del navbar y footer
if (document.querySelectorAll('.footer-link-menu, .footer-link-promociones').length) {
    document.querySelectorAll('.footer-link-menu, .footer-link-promociones').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var tab = link.dataset.tab;
            // Si es Carta, activa Pollo a la Brasa
            if (link.classList.contains('footer-link-menu')) {
                var tabs = document.querySelectorAll('.hm-tab-link');
                tabs.forEach(function(t) {
                    if (t.textContent.trim() === 'Pollo a la Brasa') {
                        t.click();
                    }
                });
            }
            // Si es Promociones, activa la pestaña Promociones
            if (tab) {
                var tabs = document.querySelectorAll('.hm-tab-link');
                tabs.forEach(function(t) {
                    if (t.textContent.trim() === tab) {
                        t.click();
                    }
                });
            }
            var href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                var target = document.querySelector(href);
                if (target) {
                    scrollConOffset(target);
                }
            }
        });
    });
}

// Scroll suave y cambio de pestaña para el menú móvil
if (document.querySelectorAll('.header-menu-movil a').length) {
    document.querySelectorAll('.header-menu-movil a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var text = link.textContent.trim();
            var cerrarMenu = function() {
                document.querySelector('.header-menu-movil').classList.remove('active');
            };
            // Offset mayor para header móvil (puedes ajustar el valor si tu header es más grande)
            var offsetMovil = 150;
            if (text === 'Carta') {
                e.preventDefault();
                cerrarMenu();
                var tabs = document.querySelectorAll('.hm-tab-link');
                tabs.forEach(function(t) {
                    if (t.textContent.trim() === 'Pollo a la Brasa') {
                        t.click();
                    }
                });
                var target = document.querySelector('#carta');
                if (target) {
                    scrollConOffset(target, offsetMovil);
                }
            } else if (text === 'Promociones') {
                e.preventDefault();
                cerrarMenu();
                var tabs = document.querySelectorAll('.hm-tab-link');
                tabs.forEach(function(t) {
                    if (t.textContent.trim() === 'Promociones') {
                        t.click();
                    }
                });
                var target = document.querySelector('#carta');
                if (target) {
                    scrollConOffset(target, offsetMovil);
                }
            } else if (text === 'Contacto') {
                e.preventDefault();
                cerrarMenu();
                window.location.href = 'https://wa.me/51929844681';
            } else if (text === 'Acceso' || text === 'Acesso') {
                e.preventDefault();
                cerrarMenu();
                window.location.href = 'login.html';
            }
        });
    });
}
