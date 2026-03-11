document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       DYNAMIC YEAR IN FOOTER
       ========================================= */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const toggleIcon = navToggle.querySelector('i');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');

            // Change icon
            if (navMenu.classList.contains('show-menu')) {
                toggleIcon.classList.remove('ph-list');
                toggleIcon.classList.add('ph-x');
            } else {
                toggleIcon.classList.remove('ph-x');
                toggleIcon.classList.add('ph-list');
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            toggleIcon.classList.remove('ph-x');
            toggleIcon.classList.add('ph-list');
        });
    });

    /* =========================================
       HEADER BACKGROUND ON SCROLL
       ========================================= */
    const header = document.querySelector('.header');

    function scrollHeader() {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', scrollHeader);

    // Check initial state
    scrollHeader();

    /* =========================================
       ACTIVE LINK ON SCROLL
       ========================================= */
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.scrollY;

        navLinks.forEach(link => link.classList.remove('active'));

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
                return;
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    /* =========================================
       SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
       ========================================= */
    const animationElements = document.querySelectorAll('.fade-in, .fade-up, .slide-right, .slide-left, .scale-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated to keep them visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        observer.observe(el);
    });

    /* =========================================
       FORM SUBMISSION WITH FORMSUBMIT
       ========================================= */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Enviando...';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        btn.innerHTML = 'Mensagem Enviada! <i class="ph-fill ph-check-circle"></i>';
                        btn.style.background = 'var(--primary-green, #2ecc71)';
                        contactForm.reset();
                    } else {
                        btn.innerHTML = 'Erro ao enviar <i class="ph-fill ph-x-circle"></i>';
                        btn.style.background = '#e74c3c';
                    }
                })
                .catch(error => {
                    btn.innerHTML = 'Erro de rede <i class="ph-fill ph-warning-circle"></i>';
                    btn.style.background = '#e74c3c';
                })
                .finally(() => {
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = ''; // reset to default css gradient
                        btn.disabled = false;
                    }, 4000);
                });
        });
    }
});
