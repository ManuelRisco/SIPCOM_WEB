// --- Define la IP base para las llamadas a la API ---
const API_BASE_URL = 'http://181.66.53.244:8080';

const headerMenu=document.querySelector('.hm-header');

console.log(headerMenu.offsetTop);

window.addEventListener('scroll',()=>{
    if(window.pageYOffset > 80){
        headerMenu.classList.add('header-fixed');
    }else{
        headerMenu.classList.remove('header-fixed');
    }
})

/*=========================================
    Tabs
==========================================*/
if(document.querySelector('.hm-tabs')){

    const tabLinks=document.querySelectorAll('.hm-tab-link');
    const tabsContent=document.querySelectorAll('.tabs-content');

    tabLinks[0].classList.add('active');

    if(document.querySelector('.tabs-content')){
        tabsContent[0].classList.add('tab-active');
    }
    

    for (let i = 0; i < tabLinks.length; i++) {
        
        tabLinks[i].addEventListener('click',()=>{

            
            tabLinks.forEach((tab) => tab.classList.remove('active'));
            tabLinks[i].classList.add('active');
            
            tabsContent.forEach((tabCont) => tabCont.classList.remove('tab-active'));
            tabsContent[i].classList.add('tab-active');
            
        });
        
    }

}

/*=========================================
    MENU
==========================================*/

const menu=document.querySelector('.icon-menu');
const menuClose=document.querySelector('.cerrar-menu');

menu.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.add('active');
})

menuClose.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.remove('active');
})

/*=========================================
    CARRITO DE COMPRAS
==========================================*/

// Actualiza el contador del carrito en el header
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.querySelector('.hm-icon-cart span');
    contador.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

// Agrega un producto al carrito
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.nombre === producto.nombre);
    if (index >= 0) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Animar el ícono del carrito
function animarCarrito() {
    const iconCart = document.querySelector('.hm-icon-cart');
    if (iconCart) {
        iconCart.classList.add('bounce');
        setTimeout(() => {
            iconCart.classList.remove('bounce');
        }, 500);
    }
}

// Animar el ícono del carrito con temblor
function animarCarritoTemblo() {
    const iconCart = document.querySelector('.hm-icon-cart');
    if (iconCart) {
        iconCart.classList.add('shake');
        setTimeout(() => {
            iconCart.classList.remove('shake');
        }, 500);
    }
}

// Detectar clicks en los botones "AGREGAR AL PEDIDO"
document.addEventListener('DOMContentLoaded', function() {
    actualizarContadorCarrito();
    document.querySelectorAll('.hm-btn.btn-primary.uppercase').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const pInfo = btn.closest('.p-info');
            const nombre = pInfo.querySelector('h3').textContent.trim();
            const precio = pInfo.querySelector('.precio span').textContent.trim();
            let img = '';
            const portada = btn.closest('.product-item').querySelector('.p-portada img');
            if (portada) img = portada.getAttribute('src');
            agregarAlCarrito({nombre, precio, img});
            animarCarrito(); // <-- animación al agregar
        });
    });
    // Evento para abrir el modal al hacer click en el icono del carrito
    var iconCart = document.querySelector('.hm-icon-cart a');
    if (iconCart) {
        iconCart.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModalCarrito();
        });
    }
});

/*=========================================
    MODAL CARRITO DE COMPRAS
==========================================*/

// Crear el modal en el HTML si no existe
function crearModalCarrito() {
    if (document.getElementById('modal-carrito')) return;
    const modal = document.createElement('div');
    modal.id = 'modal-carrito';
    modal.innerHTML = `
        <div class="modal-carrito-overlay"></div>
        <div class="modal-carrito-content">
            <button class="cerrar-modal-carrito">&times;</button>
            <h2>Mi Pedido</h2>
            <div class="carrito-lista"></div>
            <div class="carrito-total"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Cerrar modal
    modal.querySelector('.cerrar-modal-carrito').onclick = cerrarModalCarrito;
    modal.querySelector('.modal-carrito-overlay').onclick = cerrarModalCarrito;
}

function abrirModalCarrito() {
    crearModalCarrito();
    renderizarCarrito();
    document.getElementById('modal-carrito').style.display = 'flex';
}

function cerrarModalCarrito() {
    document.getElementById('modal-carrito').style.display = 'none';
}

// Disminuir cantidad de un producto en el carrito
function disminuirCantidadCarrito(idx) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito[idx]) {
        carrito[idx].cantidad -= 1;
        if (carrito[idx].cantidad <= 0) {
            carrito.splice(idx, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarContadorCarrito();
            renderizarCarrito();
            animarCarritoTemblo(); // animación de temblor al eliminar todo
            return;
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        renderizarCarrito();
        animarCarrito(); // animación normal al disminuir
    }
}

// Aumentar cantidad de un producto en el carrito
function aumentarCantidadCarrito(idx) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito[idx]) {
        carrito[idx].cantidad += 1;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        renderizarCarrito();
        animarCarrito(); // animación normal al aumentar
    }
}

// Eliminar completamente un producto del carrito
function eliminarDelCarrito(idx) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(idx, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    renderizarCarrito();
    animarCarritoTemblo(); // animación de temblor al eliminar todo
}

function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const lista = document.querySelector('#modal-carrito .carrito-lista');
    const totalDiv = document.querySelector('#modal-carrito .carrito-total');
    if (!carrito.length) {
        lista.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalDiv.innerHTML = '';
        return;
    }
    let total = 0;
    lista.innerHTML = carrito.map((item, idx) => {
        const precioNum = parseFloat(item.precio.replace(/[^\d.]/g, '')) || 0;
        const subtotal = precioNum * item.cantidad;
        total += subtotal;
        return `
            <div class="carrito-item">
                <img src="${item.img}" alt="${item.nombre}" style="width:60px;height:60px;object-fit:cover;">
                <div class="carrito-info">
                    <span>${item.nombre}</span>
                    <span>${item.precio}</span>
                    <div class="carrito-cantidad">
                        <button class="btn-cantidad menos" data-idx="${idx}" type="button">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-cantidad mas" data-idx="${idx}" type="button">+</button>
                        <span style="margin-left:10px;font-weight:500;">=</span>
                        <span style="margin-left:4px;">S/ ${subtotal.toFixed(2)}</span>
                    </div>
                </div>
                <button class="eliminar-item-carrito" data-idx="${idx}" type="button">&times;</button>
            </div>
        `;
    }).join('');
    totalDiv.innerHTML = `<strong>Total: S/ ${total.toFixed(2)}</strong><br><button class="btn-pagar-carrito" type="button">PAGAR</button>`;
    // Asignar eventos después de renderizar
    setTimeout(() => {
        document.querySelectorAll('.eliminar-item-carrito').forEach(btn => {
            btn.removeEventListener('click', btn._eliminarHandler);
            btn._eliminarHandler = function() {
                eliminarDelCarrito(parseInt(btn.getAttribute('data-idx')));
            };
            btn.addEventListener('click', btn._eliminarHandler);
        });
        document.querySelectorAll('.btn-cantidad').forEach(btn => {
            btn.removeEventListener('click', btn._cantidadHandler);
            btn._cantidadHandler = function() {
                const idx = parseInt(btn.getAttribute('data-idx'));
                if (btn.classList.contains('mas')) {
                    aumentarCantidadCarrito(idx);
                } else {
                    disminuirCantidadCarrito(idx);
                }
            };
            btn.addEventListener('click', btn._cantidadHandler);
        });
        const btnPagar = document.querySelector('.btn-pagar-carrito');
        if (btnPagar) {
            btnPagar.removeEventListener('click', btnPagar._pagarHandler);
            btnPagar._pagarHandler = mostrarFormularioPago;
            btnPagar.addEventListener('click', btnPagar._pagarHandler);
        }
    }, 10);
}

function mostrarFormularioPago() {
    const modal = document.getElementById('modal-carrito');
    const lista = modal.querySelector('.carrito-lista');
    const totalDiv = modal.querySelector('.carrito-total');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = carrito.reduce((acc, item) => {
        const precioNum = parseFloat(item.precio.replace(/[^\d.]/g, '')) || 0;
        return acc + precioNum * item.cantidad;
    }, 0);
    lista.innerHTML = `
        <form class="form-pago-carrito" style="display:flex;flex-direction:column;gap:16px;">
            <label>Tipo de Documento:<br>
                <select name="tipoDocumento" required style="width:100%;padding:8px;">
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                    <option value="CE">CE</option>
                    <option value="Pasaporte">Pasaporte</option>
                </select>
            </label>
            <label>Número de Documento:<br>
                <input type="text" name="numeroDocumento" required maxlength="20" style="width:100%;padding:8px;">
            </label>
            <label>Nombres:<br>
                <input type="text" name="nombres" required maxlength="100" style="width:100%;padding:8px;">
            </label>
            <label>Apellidos:<br>
                <input type="text" name="apellidos" maxlength="100" style="width:100%;padding:8px;">
            </label>
            <label>Correo:<br>
                <input type="email" name="correo" maxlength="100" style="width:100%;padding:8px;">
            </label>
            <label>Teléfono:<br>
                <input type="text" name="telefono" maxlength="20" style="width:100%;padding:8px;">
            </label>
            <label>Dirección:<br>
                <input type="text" name="direccion" id="input-direccion" maxlength="200" style="width:100%;padding:8px;" required>
                <button type="button" id="btn-abrir-mapa" class="btn-finalizar-pedido" style="margin-top:8px;margin-left:0;">Seleccionar en mapa</button>
            </label>
            <label>Comentario (opcional):<br>
                <textarea name="comentario" style="width:100%;padding:8px;"></textarea>
            </label>
            <label>Método de pago:<br>
                <select name="metodoPago" required style="width:100%;padding:8px;" id="select-metodo-pago">
                    <option value="">Cargando...</option>
                </select>
            </label>
            <button type="submit" class="btn-finalizar-pedido">FINALIZAR PEDIDO</button>
            <button type="button" class="btn-cancelar-pago">Cancelar</button>
        </form>
        <div id="modal-minimapa" style="display:none;position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;">
            <div style="background:#fff;padding:16px;border-radius:12px;max-width:98vw;max-height:98vh;position:relative;box-shadow:0 4px 24px #0003;">
                <button id="cerrar-minimapa" class="btn-cerrar-mapa" style="position:absolute;top:12px;right:12px;">&times;</button>
                <h3 style="margin-bottom:12px;">Selecciona tu ubicación</h3>
                <div id="mapa-direccion" style="width:600px;height:500px;max-width:95vw;max-height:80vh;border-radius:8px;overflow:hidden;"></div>
                <div style="margin-top:18px;text-align:center;">
                    <button id="btn-usar-ubicacion" class="btn-finalizar-pedido">Usar esta dirección</button>
                </div>
            </div>
        </div>
    `;
    totalDiv.innerHTML = `<strong>Total: S/ ${total.toFixed(2)}</strong>`;

    // Cargar métodos de pago desde el backend público y llenar el select
    fetch(`${API_BASE_URL}/api/publico/metodopago`)
        .then(res => res.json())
        .then(metodos => {
            const select = document.getElementById('select-metodo-pago');
            select.innerHTML = '<option value="">Selecciona un método</option>' +
                metodos.map(m => `<option value="${m.idMetodoPago}">${m.nombre}</option>`).join('');
            // Selecciona el primero automáticamente si solo hay uno
            if (metodos.length === 1) {
                select.value = metodos[0].idMetodoPago;
            }
        })
        .catch(() => {
            const select = document.getElementById('select-metodo-pago');
            select.innerHTML = '<option value="">No disponible</option>';
        });

    // Evento submit
    const form = modal.querySelector('.form-pago-carrito');
    form.onsubmit = function(e) {
        e.preventDefault();
        const datos = Object.fromEntries(new FormData(form));
        const detalles = carrito.map(item => ({
            productoCarta: item.nombre,
            cantidad: item.cantidad,
            precioUnitario: parseFloat(item.precio.replace(/[^\d.]/g, '')) || 0
        }));
        // Validar método de pago seleccionado
        const idMetodoPago = parseInt(form.metodoPago.value, 10);
        if (isNaN(idMetodoPago) || idMetodoPago <= 0) {
            alert('Selecciona un método de pago válido.');
            return;
        }
        const data = {
            cliente: {
                tipoDocumento: datos.tipoDocumento,
                numeroDocumento: datos.numeroDocumento,
                nombres: datos.nombres,
                apellidos: datos.apellidos || "",
                correo: datos.correo || "",
                telefono: datos.telefono || "",
                direccion: datos.direccion
            },
            detalles,
            idMetodoPago,
            comentario: datos.comentario || ""
        };
        // Mostrar el objeto en consola para depuración
        console.log('Objeto enviado al backend:', data);
        fetch(`${API_BASE_URL}/api/publico/carrito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // --- Guardar en historial del carrito ---
                const pedidoHistorial = {
                    fecha: new Date().toLocaleString(),
                    items: carrito.map(item => ({
                        nombre: item.nombre,
                        cantidad: item.cantidad,
                        precio: item.precio
                    })),
                    total: total,
                    tipoDocumento: datos.tipoDocumento,
                    numeroDocumento: datos.numeroDocumento,
                    nombres: datos.nombres,
                    apellidos: datos.apellidos || "",
                    correo: datos.correo || "",
                    telefono: datos.telefono || "",
                    direccion: datos.direccion,
                    metodoPago: form.metodoPago.options[form.metodoPago.selectedIndex]?.text || "",
                    comentario: datos.comentario || ""
                };
                let historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
                historial.push(pedidoHistorial);
                localStorage.setItem('historialPedidos', JSON.stringify(historial));
                // --- Fin historial ---
                lista.innerHTML = '<h3>¡Gracias por tu pedido! Pronto nos comunicaremos contigo.</h3>';
                totalDiv.innerHTML = '';
                localStorage.removeItem('carrito');
                actualizarContadorCarrito();
            } else {
                alert('Error al enviar el pedido');
            }
        })
        .catch(() => {
            alert('Error de red al enviar el pedido');
        });
    };
    // Botón cancelar
    form.querySelector('.btn-cancelar-pago').onclick = function() {
        renderizarCarrito();
    };

    // Mapa: solo carga si se abre el modal
    const btnAbrirMapa = document.getElementById('btn-abrir-mapa');
    const modalMinimapa = document.getElementById('modal-minimapa');
    let map, marker, selectedLatLng;

    btnAbrirMapa.onclick = function() {
        modalMinimapa.style.display = 'flex';
        // Cargar MapLibre GL JS solo una vez
        // Cambia la URL del style a tiles de MapTiler (que sí funcionan en sitios estáticos como GitHub Pages)
        if (!window.maplibregl) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.css';
            document.head.appendChild(link);
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.js';
            script.onload = function() {
                inicializarMapa();
            };
            document.body.appendChild(script);
        } else {
            inicializarMapa();
        }
        // ...cargar Google Maps Autocomplete si lo usas...
        if (typeof cargarGoogleMapsScript === 'function') {
            cargarGoogleMapsScript(inicializarGoogleAutocomplete);
        }
    };

    function inicializarMapa() {
        if (map) {
            map.resize();
            return;
        }
        // Usa MapTiler OSM style
        map = new maplibregl.Map({
            container: 'mapa-direccion',
            style: 'https://api.maptiler.com/maps/streets/style.json?key=ZgTUHkn0xjl3aHuyWf7B',
            center: [-77.0151, -12.1894], // [lng, lat]
            zoom: 15
        });

        marker = new maplibregl.Marker({draggable: true})
            .setLngLat([-77.0151, -12.1894])
            .addTo(map);

        selectedLatLng = {lat: -12.1894, lng: -77.0151};

        marker.on('dragend', function() {
            const lngLat = marker.getLngLat();
            selectedLatLng = {lat: lngLat.lat, lng: lngLat.lng};
        });

        map.on('click', function(e) {
            marker.setLngLat(e.lngLat);
            selectedLatLng = {lat: e.lngLat.lat, lng: e.lngLat.lng};
        });
    }

    document.getElementById('cerrar-minimapa').onclick = function() {
        modalMinimapa.style.display = 'none';
    };

    document.getElementById('btn-usar-ubicacion').onclick = function() {
        if (selectedLatLng) {
            // Geocoding con Nominatim (OpenStreetMap)
            const lat = selectedLatLng.lat;
            const lng = selectedLatLng.lng;
            const direccionInput = document.getElementById('input-direccion');
            direccionInput.value = `Cargando dirección...`;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
                .then(res => res.json())
                .then(data => {
                    if (data.display_name) {
                        direccionInput.value = data.display_name;
                    } else {
                        direccionInput.value = `Ubicación: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                    }
                })
                .catch(() => {
                    direccionInput.value = `Ubicación: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                });
            modalMinimapa.style.display = 'none';
        }
    };

    // Geocodificar dirección escrita y mostrar en el mapa solo si la encuentra (solo Perú)
    const inputDireccion = document.getElementById('input-direccion');
    inputDireccion.addEventListener('change', function() {
        const direccion = inputDireccion.value.trim();
        if (!direccion || !window.maplibregl || !map) return;
        // Limita la búsqueda a Perú usando el parámetro countrycodes=pe
        fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=pe&q=${encodeURIComponent(direccion)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    map.setCenter([lon, lat]);
                    map.setZoom(16);
                    marker.setLngLat([lon, lat]);
                    selectedLatLng = {lat, lng: lon};
                    // Quita mensaje de error si lo hubiera
                    mostrarErrorMapa('');
                } else {
                    mostrarErrorMapa('No se encontró la dirección en el mapa.');
                }
            })
            .catch(() => {
                mostrarErrorMapa('Error al buscar la dirección.');
            });
    });

    // Mostrar mensaje de error debajo del mapa si la dirección no se encuentra
    function mostrarErrorMapa(msg) {
        let errorDiv = document.getElementById('mapa-direccion-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'mapa-direccion-error';
            errorDiv.style.color = '#c0392b';
            errorDiv.style.marginTop = '8px';
            errorDiv.style.fontWeight = '500';
            const contenedor = document.getElementById('contenedor-minimapa') || document.getElementById('mapa-direccion').parentNode;
            contenedor.appendChild(errorDiv);
        }
        errorDiv.textContent = msg || '';
    }

    // --- Ajuste de estilo para el minimapa en móviles ---
    if (!document.getElementById('minimapa-mobile-style')) {
        const style = document.createElement('style');
        style.id = 'minimapa-mobile-style';
        style.innerHTML = `
        @media (max-width: 600px) {
            #modal-minimapa > div {
                left: 2vw !important;
                right: 2vw !important;
                margin: 0 auto !important;
                max-width: 96vw !important;
                min-width: 0 !important;
            }
            #mapa-direccion {
                width: 90vw !important;
                min-width: 0 !important;
                max-width: 96vw !important;
            }
        }
        `;
        document.head.appendChild(style);
    }
}

/*=========================================
    HISTORIAL DE PEDIDOS
==========================================*/

// Guarda el pedido en el historial en localStorage
function guardarPedidoEnHistorial(pedido) {
    let historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
    historial.push(pedido);
    localStorage.setItem('historialPedidos', JSON.stringify(historial));
}

function mostrarHistorialPedidos() {
    let historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
    crearModalHistorial();
    const modal = document.getElementById('modal-historial');
    const lista = modal.querySelector('.historial-lista');
    if (!historial.length) {
        lista.innerHTML = '<div class="historial-vacio"><br>Tu historial está vacío.</div>';
    } else {
        lista.innerHTML = historial.map((pedido, idx) => {
            return `<div class="historial-pedido">
                <div><strong>Pedido #${idx + 1}</strong> <span style='font-size:0.95em;color:#888;'>(${pedido.fecha})</span></div>
                <ul style='margin:8px 0 0 0;padding-left:18px;'>
                    ${pedido.items.map(item => {
                        const precioNum = parseFloat(item.precio.replace(/[^\d.]/g, '')) || 0;
                        const subtotal = precioNum * item.cantidad;
                        return `<li>${item.cantidad} x ${item.nombre} <span style='color:#888;'>= S/ ${subtotal.toFixed(2)}</span></li>`;
                    }).join('')}
                </ul>
                <div style='margin-top:6px;'><strong>Total: S/ ${pedido.total.toFixed(2)}</strong></div>
                <div style='font-size:0.95em;color:#555;margin-top:2px;'>
                    <strong>Tipo Doc:</strong> ${pedido.tipoDocumento || ''} |
                    <strong>N° Doc:</strong> ${pedido.numeroDocumento || ''}
                </div>
                <div style='font-size:0.95em;color:#555;'><strong>Nombres:</strong> ${pedido.nombres || ''}</div>
                <div style='font-size:0.95em;color:#555;'><strong>Apellidos:</strong> ${pedido.apellidos || ''}</div>
                <div style='font-size:0.95em;color:#555;'><strong>Correo:</strong> ${pedido.correo || ''}</div>
                <div style='font-size:0.95em;color:#555;'><strong>Teléfono:</strong> ${pedido.telefono || ''}</div>
                <div style='font-size:0.95em;color:#555;'><strong>Dirección:</strong> ${pedido.direccion || ''}</div>
                <div style='font-size:0.95em;color:#555;'>Método de pago: <strong>${pedido.metodoPago || 'No especificado'}</strong></div>
                ${pedido.comentario ? `<div style='font-size:0.95em;color:#555;'>Comentario: ${pedido.comentario}</div>` : ''}
            </div>`;
        }).join('<hr style="margin:18px 0;">');
    }
    modal.style.display = 'flex';
}

// modal del historial
function crearModalHistorial() {
    if (document.getElementById('modal-historial')) return;
    const modal = document.createElement('div');
    modal.id = 'modal-historial';
    modal.innerHTML = `
        <div class="modal-carrito-overlay"></div>
        <div class="modal-carrito-content">
            <button class="cerrar-modal-carrito">&times;</button>
            <h2>Historial de Pedidos</h2>
            <div class="historial-lista"></div>
        </div>
    `;
    document.body.appendChild(modal);
    // Cerrar modal
    modal.querySelector('.cerrar-modal-carrito').onclick = function() {
        modal.style.display = 'none';
    };
    modal.querySelector('.modal-carrito-overlay').onclick = function() {
        modal.style.display = 'none';
    };
}

// botón de historial al header
function agregarBotonHistorial() {
    if (document.getElementById('btn-historial-pedidos')) return;
    const btn = document.createElement('button');
    btn.id = 'btn-historial-pedidos';
    btn.textContent = 'Historial de pedidos';
    btn.className = 'hm-btn btn-historial-pedidos';
    btn.style.marginLeft = '18px';
    btn.onclick = mostrarHistorialPedidos;
    // Insertar en el header, después del carrito
    const header = document.querySelector('.hm-header .hm-icon-cart');
    if (header) header.parentNode.insertBefore(btn, header.nextSibling);
}

document.addEventListener('DOMContentLoaded', function() {
    agregarBotonHistorial();
    // Asigna funcionalidad al botón de historial en el menú móvil si existe en el HTML
    var btnMovil = document.getElementById('btn-historial-pedidos-movil');
    if (btnMovil) {
        btnMovil.onclick = mostrarHistorialPedidos;
        btnMovil.style.display = 'block'; // Asegura que sea visible
    }
});

/*=========================================
    MODAL CARRITO DE COMPRAS
==========================================*/

// modal en el HTML si no existe
function crearModalCarrito() {
    if (document.getElementById('modal-carrito')) return;
    const modal = document.createElement('div');
    modal.id = 'modal-carrito';
    modal.innerHTML = `
        <div class="modal-carrito-overlay"></div>
        <div class="modal-carrito-content">
            <button class="cerrar-modal-carrito">&times;</button>
            <h2>Mi Pedido</h2>
            <div class="carrito-lista"></div>
            <div class="carrito-total"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Cerrar modal
    modal.querySelector('.cerrar-modal-carrito').onclick = cerrarModalCarrito;
    modal.querySelector('.modal-carrito-overlay').onclick = cerrarModalCarrito;
}

function abrirModalCarrito() {
    crearModalCarrito();
    renderizarCarrito();
    document.getElementById('modal-carrito').style.display = 'flex';
}

function cerrarModalCarrito() {
    document.getElementById('modal-carrito').style.display = 'none';
}

// Disminuir cantidad de un producto en el carrito
function disminuirCantidadCarrito(idx) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito[idx]) {
        carrito[idx].cantidad -= 1;
        if (carrito[idx].cantidad <= 0) {
            carrito.splice(idx, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarContadorCarrito();
            renderizarCarrito();
            animarCarritoTemblo(); // animación de temblor al eliminar todo
            return;
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        renderizarCarrito();
        animarCarrito(); // animación normal al disminuir
    }
}

// Aumentar cantidad de un producto en el carrito
function aumentarCantidadCarrito(idx) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito[idx]) {
        carrito[idx].cantidad += 1;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        renderizarCarrito();
        animarCarrito(); // animación normal al aumentar
    }
}

// Eliminar completamente un producto del carrito
function eliminarDelCarrito(idx) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(idx, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    renderizarCarrito();
    animarCarritoTemblo(); // animación de temblor al eliminar todo
}

function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const lista = document.querySelector('#modal-carrito .carrito-lista');
    const totalDiv = document.querySelector('#modal-carrito .carrito-total');
    if (!carrito.length) {
        lista.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalDiv.innerHTML = '';
        return;
    }
    let total = 0;
    lista.innerHTML = carrito.map((item, idx) => {
        const precioNum = parseFloat(item.precio.replace(/[^\d.]/g, '')) || 0;
        const subtotal = precioNum * item.cantidad;
        total += subtotal;
        return `
            <div class="carrito-item">
                <img src="${item.img}" alt="${item.nombre}" style="width:60px;height:60px;object-fit:cover;">
                <div class="carrito-info">
                    <span>${item.nombre}</span>
                    <span>${item.precio}</span>
                    <div class="carrito-cantidad">
                        <button class="btn-cantidad menos" data-idx="${idx}" type="button">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-cantidad mas" data-idx="${idx}" type="button">+</button>
                        <span style="margin-left:10px;font-weight:500;">=</span>
                        <span style="margin-left:4px;">S/ ${subtotal.toFixed(2)}</span>
                    </div>
                </div>
                <button class="eliminar-item-carrito" data-idx="${idx}" type="button">&times;</button>
            </div>
        `;
    }).join('');
    totalDiv.innerHTML = `<strong>Total: S/ ${total.toFixed(2)}</strong><br><button class="btn-pagar-carrito" type="button">PAGAR</button>`;
    // Asignar eventos después de renderizar
    setTimeout(() => {
        document.querySelectorAll('.eliminar-item-carrito').forEach(btn => {
            btn.removeEventListener('click', btn._eliminarHandler);
            btn._eliminarHandler = function() {
                eliminarDelCarrito(parseInt(btn.getAttribute('data-idx')));
            };
            btn.addEventListener('click', btn._eliminarHandler);
        });
        document.querySelectorAll('.btn-cantidad').forEach(btn => {
            btn.removeEventListener('click', btn._cantidadHandler);
            btn._cantidadHandler = function() {
                const idx = parseInt(btn.getAttribute('data-idx'));
                if (btn.classList.contains('mas')) {
                    aumentarCantidadCarrito(idx);
                } else {
                    disminuirCantidadCarrito(idx);
                }
            };
            btn.addEventListener('click', btn._cantidadHandler);
        });
        const btnPagar = document.querySelector('.btn-pagar-carrito');
        if (btnPagar) {
            btnPagar.removeEventListener('click', btnPagar._pagarHandler);
            btnPagar._pagarHandler = mostrarFormularioPago;
            btnPagar.addEventListener('click', btnPagar._pagarHandler);
        }
    }, 10);
}

function mostrarFormularioPago() {
    const modal = document.getElementById('modal-carrito');
    const lista = modal.querySelector('.carrito-lista');
    const totalDiv = modal.querySelector('.carrito-total');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = carrito.reduce((acc, item) => {
        const precioNum = parseFloat(item.precio.replace(/[^\d.]/g, '')) || 0;
        return acc + precioNum * item.cantidad;
    }, 0);
    lista.innerHTML = `
        <form class="form-pago-carrito" style="display:flex;flex-direction:column;gap:16px;">
            <label>Tipo de Documento:<br>
                <select name="tipoDocumento" required style="width:100%;padding:8px;">
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                    <option value="CE">CE</option>
                    <option value="Pasaporte">Pasaporte</option>
                </select>
            </label>
            <label>Número de Documento:<br>
                <input type="text" name="numeroDocumento" required maxlength="20" style="width:100%;padding:8px;">
            </label>
            <label>Nombres:<br>
                <input type="text" name="nombres" required maxlength="100" style="width:100%;padding:8px;">
            </label>
            <label>Apellidos:<br>
                <input type="text" name="apellidos" maxlength="100" style="width:100%;padding:8px;">
            </label>
            <label>Correo:<br>
                <input type="email" name="correo" maxlength="100" style="width:100%;padding:8px;">
            </label>
            <label>Teléfono:<br>
                <input type="text" name="telefono" maxlength="20" style="width:100%;padding:8px;">
            </label>
            <label>Dirección:<br>
                <input type="text" name="direccion" id="input-direccion" maxlength="200" style="width:100%;padding:8px;" required>
                <button type="button" id="btn-abrir-mapa" class="btn-finalizar-pedido" style="margin-top:8px;margin-left:0;">Seleccionar en mapa</button>
            </label>
            <label>Comentario (opcional):<br>
                <textarea name="comentario" style="width:100%;padding:8px;"></textarea>
            </label>
            <label>Método de pago:<br>
                <select name="metodoPago" required style="width:100%;padding:8px;" id="select-metodo-pago">
                    <option value="">Cargando...</option>
                </select>
            </label>
            <button type="submit" class="btn-finalizar-pedido">FINALIZAR PEDIDO</button>
            <button type="button" class="btn-cancelar-pago">Cancelar</button>
        </form>
        <div id="modal-minimapa" style="display:none;position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;">
            <div style="background:#fff;padding:16px;border-radius:12px;max-width:98vw;max-height:98vh;position:relative;box-shadow:0 4px 24px #0003;">
                <button id="cerrar-minimapa" class="btn-cerrar-mapa" style="position:absolute;top:12px;right:12px;">&times;</button>
                <h3 style="margin-bottom:12px;">Selecciona tu ubicación</h3>
                <div id="mapa-direccion" style="width:600px;height:500px;max-width:95vw;max-height:80vh;border-radius:8px;overflow:hidden;"></div>
                <div style="margin-top:18px;text-align:center;">
                    <button id="btn-usar-ubicacion" class="btn-finalizar-pedido">Usar esta dirección</button>
                </div>
            </div>
        </div>
    `;
    totalDiv.innerHTML = `<strong>Total: S/ ${total.toFixed(2)}</strong>`;

    // Cargar métodos de pago desde el backend público y llenar el select
    fetch(`${API_BASE_URL}/api/publico/metodopago`)
        .then(res => res.json())
        .then(metodos => {
            const select = document.getElementById('select-metodo-pago');
            select.innerHTML = '<option value="">Selecciona un método</option>' +
                metodos.map(m => `<option value="${m.idMetodoPago}">${m.nombre}</option>`).join('');
            // Selecciona el primero automáticamente si solo hay uno
            if (metodos.length === 1) {
                select.value = metodos[0].idMetodoPago;
            }
        })
        .catch(() => {
            const select = document.getElementById('select-metodo-pago');
            select.innerHTML = '<option value="">No disponible</option>';
        });

    // Evento submit
    const form = modal.querySelector('.form-pago-carrito');
    form.onsubmit = function(e) {
        e.preventDefault();
        const datos = Object.fromEntries(new FormData(form));
        const detalles = carrito.map(item => ({
            productoCarta: item.nombre,
            cantidad: item.cantidad,
            precioUnitario: parseFloat(item.precio.replace(/[^\d.]/g, '')) || 0
        }));
        // Validar método de pago seleccionado
        const idMetodoPago = parseInt(form.metodoPago.value, 10);
        if (isNaN(idMetodoPago) || idMetodoPago <= 0) {
            alert('Selecciona un método de pago válido.');
            return;
        }
        const data = {
            cliente: {
                tipoDocumento: datos.tipoDocumento,
                numeroDocumento: datos.numeroDocumento,
                nombres: datos.nombres,
                apellidos: datos.apellidos || "",
                correo: datos.correo || "",
                telefono: datos.telefono || "",
                direccion: datos.direccion
            },
            detalles,
            idMetodoPago,
            comentario: datos.comentario || ""
        };
        // Mostrar el objeto en consola para depuración
        console.log('Objeto enviado al backend:', data);
        fetch(`${API_BASE_URL}/api/publico/carrito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // --- Guardar en historial del carrito ---
                const pedidoHistorial = {
                    fecha: new Date().toLocaleString(),
                    items: carrito.map(item => ({
                        nombre: item.nombre,
                        cantidad: item.cantidad,
                        precio: item.precio
                    })),
                    total: total,
                    tipoDocumento: datos.tipoDocumento,
                    numeroDocumento: datos.numeroDocumento,
                    nombres: datos.nombres,
                    apellidos: datos.apellidos || "",
                    correo: datos.correo || "",
                    telefono: datos.telefono || "",
                    direccion: datos.direccion,
                    metodoPago: form.metodoPago.options[form.metodoPago.selectedIndex]?.text || "",
                    comentario: datos.comentario || ""
                };
                let historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
                historial.push(pedidoHistorial);
                localStorage.setItem('historialPedidos', JSON.stringify(historial));
                // --- Fin historial ---
                lista.innerHTML = '<h3>¡Gracias por tu pedido! Pronto nos comunicaremos contigo.</h3>';
                totalDiv.innerHTML = '';
                localStorage.removeItem('carrito');
                actualizarContadorCarrito();
            } else {
                alert('Error al enviar el pedido');
            }
        })
        .catch(() => {
            alert('Error de red al enviar el pedido');
        });
    };
    // Botón cancelar
    form.querySelector('.btn-cancelar-pago').onclick = function() {
        renderizarCarrito();
    };

    // Mapa: solo carga si se abre el modal
    const btnAbrirMapa = document.getElementById('btn-abrir-mapa');
    const modalMinimapa = document.getElementById('modal-minimapa');
    let map, marker, selectedLatLng;

    btnAbrirMapa.onclick = function() {
        modalMinimapa.style.display = 'flex';
        // Cargar MapLibre GL JS solo una vez
        // Cambia la URL del style a tiles de MapTiler (que sí funcionan en sitios estáticos como GitHub Pages)
        if (!window.maplibregl) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.css';
            document.head.appendChild(link);
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.js';
            script.onload = function() {
                inicializarMapa();
            };
            document.body.appendChild(script);
        } else {
            inicializarMapa();
        }
        // ...cargar Google Maps Autocomplete si lo usas...
        if (typeof cargarGoogleMapsScript === 'function') {
            cargarGoogleMapsScript(inicializarGoogleAutocomplete);
        }
    };

    function inicializarMapa() {
        if (map) {
            map.resize();
            return;
        }
        // Usa MapTiler OSM style
        map = new maplibregl.Map({
            container: 'mapa-direccion',
            style: 'https://api.maptiler.com/maps/streets/style.json?key=ZgTUHkn0xjl3aHuyWf7B',
            center: [-77.0151, -12.1894], // [lng, lat]
            zoom: 15
        });

        marker = new maplibregl.Marker({draggable: true})
            .setLngLat([-77.0151, -12.1894])
            .addTo(map);

        selectedLatLng = {lat: -12.1894, lng: -77.0151};

        marker.on('dragend', function() {
            const lngLat = marker.getLngLat();
            selectedLatLng = {lat: lngLat.lat, lng: lngLat.lng};
        });

        map.on('click', function(e) {
            marker.setLngLat(e.lngLat);
            selectedLatLng = {lat: e.lngLat.lat, lng: e.lngLat.lng};
        });
    }

    document.getElementById('cerrar-minimapa').onclick = function() {
        modalMinimapa.style.display = 'none';
    };

    document.getElementById('btn-usar-ubicacion').onclick = function() {
        if (selectedLatLng) {
            // Geocoding con Nominatim (OpenStreetMap)
            const lat = selectedLatLng.lat;
            const lng = selectedLatLng.lng;
            const direccionInput = document.getElementById('input-direccion');
            direccionInput.value = `Cargando dirección...`;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
                .then(res => res.json())
                .then(data => {
                    if (data.display_name) {
                        direccionInput.value = data.display_name;
                    } else {
                        direccionInput.value = `Ubicación: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                    }
                })
                .catch(() => {
                    direccionInput.value = `Ubicación: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                });
            modalMinimapa.style.display = 'none';
        }
    };

    // Geocodificar dirección escrita y mostrar en el mapa solo si la encuentra (solo Perú)
    const inputDireccion = document.getElementById('input-direccion');
    inputDireccion.addEventListener('change', function() {
        const direccion = inputDireccion.value.trim();
        if (!direccion || !window.maplibregl || !map) return;
        // Limita la búsqueda a Perú usando el parámetro countrycodes=pe
        fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=pe&q=${encodeURIComponent(direccion)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    map.setCenter([lon, lat]);
                    map.setZoom(16);
                    marker.setLngLat([lon, lat]);
                    selectedLatLng = {lat, lng: lon};
                    // Quita mensaje de error si lo hubiera
                    mostrarErrorMapa('');
                } else {
                    mostrarErrorMapa('No se encontró la dirección en el mapa.');
                }
            })
            .catch(() => {
                mostrarErrorMapa('Error al buscar la dirección.');
            });
    });

    // Mostrar mensaje de error debajo del mapa si la dirección no se encuentra
    function mostrarErrorMapa(msg) {
        let errorDiv = document.getElementById('mapa-direccion-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'mapa-direccion-error';
            errorDiv.style.color = '#c0392b';
            errorDiv.style.marginTop = '8px';
            errorDiv.style.fontWeight = '500';
            const contenedor = document.getElementById('contenedor-minimapa') || document.getElementById('mapa-direccion').parentNode;
            contenedor.appendChild(errorDiv);
        }
        errorDiv.textContent = msg || '';
    }
}

// Sobre la API key de MapTiler:
// - La API key gratuita de MapTiler no expira, pero tiene límites de uso mensual (consultar en https://cloud.maptiler.com/).
// - Si superas el límite gratuito, el mapa dejará de cargar hasta el siguiente mes o hasta que actualices a un plan de pago.
// - No necesitas cambiar la clave periódicamente, solo si la revocas, la borras o MapTiler cambia sus políticas.
// - Si la clave se filtra y ves uso sospechoso, puedes regenerarla en el panel de MapTiler.

// Recomendación: revisa tu cuenta MapTiler cada cierto tiempo para ver el uso y posibles avisos de límite.

