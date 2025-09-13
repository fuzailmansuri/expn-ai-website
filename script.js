document.addEventListener('DOMContentLoaded', function () {
    // Aurora Gradient Initialization
    if (document.getElementById('aurora-canvas')) {
        new Aurora(document.getElementById('aurora-canvas'));
    }

    // Theme Toggler
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    };

    themeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || (body.classList.contains('light-mode') ? 'light' : 'dark');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const faqCard = header.closest('.faq-card');
            const content = faqCard.querySelector('.faq-content');
            
            document.querySelectorAll('.faq-card.active').forEach(openCard => {
                if (openCard !== faqCard) {
                    openCard.classList.remove('active');
                    openCard.querySelector('.faq-content').style.display = 'none';
                }
            });

            faqCard.classList.toggle('active');
            if (faqCard.classList.contains('active')) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });

    // Scroll Reveal Animations
    const revealElements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.revealDelay || '0';
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, parseFloat(delay) * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
});
