document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Завантажуємо header
        const headerResponse = await fetch('../../components/header.html');
        const headerData = await headerResponse.text();
        document.querySelector('#header-container').innerHTML = headerData;

        // Тут більше не керуємо видимістю header — він завжди закріплений

        // Завантажуємо footer
        const footerResponse = await fetch('../../components/footer.html');
        const footerData = await footerResponse.text();
        document.querySelector('#footer-container').innerHTML = footerData;
    } catch (error) {
        console.error('Помилка завантаження компонентів:', error);
    }
});
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        hamburger.classList.add('active');
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        hamburger.classList.remove('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    hamburger.classList.remove('active');
}

// ================================================
// LANGUAGE SWITCHER FUNCTIONS
// ================================================

function toggleLanguageMenu() {
    const languageMenu = document.getElementById('languageMenu');
    const languageButton = document.querySelector('.language-button');
    
    if (languageMenu.classList.contains('hidden')) {
        languageMenu.classList.remove('hidden');
        languageButton.classList.add('active');
    } else {
        languageMenu.classList.add('hidden');
        languageButton.classList.remove('active');
    }
}

function changeLanguage(lang) {
    const currentLangElement = document.querySelector('.current-lang');
    const languageMenu = document.getElementById('languageMenu');
    const languageButton = document.querySelector('.language-button');
    
    // Оновлюємо відображення поточної мови
    if (lang === 'en') {
        currentLangElement.textContent = 'EN';
        translatePage('en'); // Використовуємо функцію з translations.js
        console.log('Змінено мову на English');
    } else if (lang === 'uk') {
        currentLangElement.textContent = 'UA';
        translatePage('uk'); // Використовуємо функцію з translations.js
        console.log('Змінено мову на Українська');
    }
    
    // Закриваємо меню
    languageMenu.classList.add('hidden');
    languageButton.classList.remove('active');
}

// Закриття меню мови при кліку поза ним
document.addEventListener('click', function(event) {
    const languageSwitcher = document.querySelector('.language-switcher');
    const languageMenu = document.getElementById('languageMenu');
    const languageButton = document.querySelector('.language-button');
    
    if (languageSwitcher && !languageSwitcher.contains(event.target)) {
        if (languageMenu && !languageMenu.classList.contains('hidden')) {
            languageMenu.classList.add('hidden');
            languageButton.classList.remove('active');
        }
    }
});

// Завантаження збереженої мови при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'uk';
    const currentLangElement = document.querySelector('.current-lang');
    
    // Оновлюємо кнопку мови після завантаження header
    setTimeout(() => {
        if (currentLangElement) {
            currentLangElement.textContent = savedLanguage === 'en' ? 'EN' : 'UA';
        }
    }, 100);
});

// ================================================
// HEADER SCROLL EFFECT
// ================================================

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add 'scrolled' class when scrolled down more than 50px
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, false);

// ================================================
// iOS VIDEO FIX - Force content to stay visible
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroVideo = document.querySelector('.hero-video');
    
    if (!heroContent || !heroVideo) return;
    
    // Force repaint on iOS when video starts playing
    heroVideo.addEventListener('loadeddata', function() {
        heroContent.style.opacity = '0.99';
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 50);
    });
    
    // Force video to play on iOS
    heroVideo.addEventListener('canplay', function() {
        heroVideo.play().catch(err => {
            console.log('Video autoplay prevented:', err);
        });
    });
    
    // Additional fix: Force GPU acceleration
    const forceRepaint = () => {
        heroContent.style.transform = 'translateZ(0.1px)';
        requestAnimationFrame(() => {
            heroContent.style.transform = 'translateZ(0)';
        });
    };
    
    // Force repaint on video events
    heroVideo.addEventListener('play', forceRepaint);
    heroVideo.addEventListener('playing', forceRepaint);
    
    // Ensure content is always visible
    setInterval(() => {
        if (heroContent.style.opacity !== '1') {
            heroContent.style.opacity = '1';
        }
    }, 1000);
});