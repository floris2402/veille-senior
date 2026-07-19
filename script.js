document.addEventListener("DOMContentLoaded", function() {
    // 1. MENU MOBILE
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // 2. LOGIQUE CARROUSEL
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        let carouselArray = [...galleryItems];

        function updateGallery() {
            carouselArray.forEach(el => {
                el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3');
            });
            carouselArray.slice(0, 3).forEach((el, i) => {
                el.classList.add(`gallery-item-${i + 1}`);
            });
        }

        function moveNext() {
            carouselArray.push(carouselArray.shift());
            updateGallery();
        }

        function movePrev() {
            carouselArray.unshift(carouselArray.pop());
            updateGallery();
        }

        // SCROLL SOURIS
        let isThrottled = false;
        window.addEventListener('wheel', (e) => {
            const preview = document.getElementById('preview');
            const rect = preview.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !isThrottled) {
                e.deltaY > 0 ? moveNext() : movePrev();
                isThrottled = true;
                setTimeout(() => isThrottled = false, 500);
            }
        }, { passive: true });

        // SWIPE MOBILE
        let startX = 0;
        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer) {
            galleryContainer.addEventListener('touchstart', e => {
                startX = e.touches[0].clientX;
            }, { passive: true });

            galleryContainer.addEventListener('touchend', e => {
                let endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) moveNext();
                if (endX - startX > 50) movePrev();
            }, { passive: true });
        }

        updateGallery(); // Init
    }
});

function telechargerApp() {
    alert("Bientôt disponible sur le Play Store !");
}
