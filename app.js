document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       DOM CACHE
    ========================== */
    const DOM = {
        hamburgerMenu: document.querySelector('.hamburger-icon'),
        navLinks: document.querySelector('.nav-links'),
        navItems: document.querySelectorAll('.nav-list a'),
        sections: document.querySelectorAll('section'),
        revealElements: document.querySelectorAll(
            '.section-title, .section-text, .grid-card, .reveal-card, .about-container, .contact-info-container'
        )
    };

    /* =========================
       MOBILE MENU
    ========================== */
    function initMobileMenu() {

        function toggleMenu() {
            DOM.hamburgerMenu.classList.toggle('open');
            DOM.navLinks.classList.toggle('open');
        }
        DOM.hamburgerMenu.addEventListener('click', toggleMenu);

        DOM.navItems.forEach(link => {
            link.addEventListener('click', () => {
                if (DOM.navLinks.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    /* =========================
        ACTIVE LINK ON SCROLL
    ========================= */
    function initActiveLinks() {

        let ticking = false;

        function setActiveLink() {
            let currentSection = '';

            DOM.sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });

            DOM.navItems.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${currentSection}`
                );
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {       // prevents multiple calls at once
            if (!ticking) {
                window.requestAnimationFrame(setActiveLink);
                ticking = true;
            }
        });
    }

    /* ======================
       SCROLL REVEAL
    ====================== */
    function initScrollReveal() {

        DOM.revealElements.forEach(element => element.classList.add('reveal'));

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);      // stop observing after reveal
                }
            });
        }, {
            threshold: 0.15
        });

        DOM.revealElements.forEach(element => observer.observe(element));
    }

    /* ======================
       INIT ALL
    ====================== */
    function init() {
        initMobileMenu();
        initActiveLinks();
        initScrollReveal();
    }
    init();
    
});