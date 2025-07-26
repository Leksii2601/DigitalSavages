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