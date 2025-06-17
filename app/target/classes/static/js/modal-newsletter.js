
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const modalNewsletter = document.getElementById('modal-newsletter');
    const cerrarModalNewsletter = document.getElementById('cerrar-modal-newsletter');
    if(newsletterForm && modalNewsletter && cerrarModalNewsletter) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="text"]');
            const email = input.value.trim();
            const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                input.style.border = '2px solid #e14b50';
                input.focus();
                input.setCustomValidity('Por favor, ingresa un correo válido.');
                input.reportValidity();
                setTimeout(() => { input.setCustomValidity(''); }, 2000);
                return;
            } else {
                input.style.border = '';
            }
            modalNewsletter.style.display = 'block';
            newsletterForm.reset();
        });
        cerrarModalNewsletter.addEventListener('click', function() {
            modalNewsletter.style.display = 'none';
        });
        // Cierra el modal al hacer click fuera del contenido
        window.addEventListener('click', function(e) {
            if (modalNewsletter.style.display === 'block' && !modalNewsletter.contains(e.target) && e.target !== newsletterForm.querySelector('button')) {
                modalNewsletter.style.display = 'none';
            }
        });
    }
});
