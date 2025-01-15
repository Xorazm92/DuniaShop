// Sahifa yuklanganda ishlaydi
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sahifa yuklandi');
    
    // Navigatsiya havolalarini animatsiyali qilish
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === window.location.pathname) {
                e.preventDefault();
            }
        });
    });
});
