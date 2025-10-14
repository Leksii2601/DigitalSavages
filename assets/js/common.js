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