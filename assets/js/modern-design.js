/* ==================== MODERN DESIGN JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== THEME TOGGLE ====================
    
    const themeToggleDesktop = document.getElementById('themeToggleDesktop');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeToggles = [themeToggleDesktop, themeToggleMobile].filter(el => el !== null);
    
    // Check for saved theme preference or use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    // Function to apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggles.forEach(btn => {
                if (btn) {
                    btn.classList.remove('light-mode');
                }
            });
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeToggles.forEach(btn => {
                if (btn) {
                    btn.classList.add('light-mode');
                }
            });
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Apply initial theme
    applyTheme(savedTheme);
    
    // Theme toggle event - Works for both desktop and mobile
    themeToggles.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isDarkMode = document.body.classList.contains('dark-mode');
                applyTheme(isDarkMode ? 'light' : 'dark');
                
                // Close menu after click on mobile
                closeMenu();
            });
            
            // Touch event for mobile
            btn.addEventListener('touchend', function(e) {
                e.preventDefault();
                const isDarkMode = document.body.classList.contains('dark-mode');
                applyTheme(isDarkMode ? 'light' : 'dark');
                
                // Close menu after touch on mobile
                closeMenu();
            });
        }
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === null) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    // ==================== MOBILE NAVIGATION TOGGLE ====================
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Toggle overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navToggle.classList.contains('active') ? 'hidden' : '';
        
        // Update aria-expanded
        const isExpanded = navToggle.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeMenu();
            setActiveLink(this);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ==================== ACTIVE LINK HIGHLIGHTING ====================

    function setActiveLink(link) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }

    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').slice(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });

    // ==================== SCROLL ANIMATIONS ====================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .service-card, .project-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ==================== FORM HANDLING ====================

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        try {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        } catch (error) {
            showNotification('Error sending message. Please try again.', 'error');
        }
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ==================== PROGRESS BARS ANIMATION ====================

    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.transition = 'width 1s ease';
                    entry.target.style.width = width;
                }, 100);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // ==================== HEADER SHADOW ON SCROLL ====================

    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // ==================== SCROLL TO TOP BUTTON ====================

    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Show/Hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            if (scrollToTopBtn) {
                scrollToTopBtn.classList.add('show');
            }
        } else {
            if (scrollToTopBtn) {
                scrollToTopBtn.classList.remove('show');
            }
        }
    });

    // Smooth scroll to top
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Touch support for mobile
        scrollToTopBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Keyboard shortcut: Home key to scroll to top
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // ==================== KEYBOARD NAVIGATION ====================

    let currentFocusIndex = -1;
    const focusableElements = document.querySelectorAll('a, button, input, textarea');

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const totalElements = focusableElements.length;
            
            if (e.shiftKey) {
                currentFocusIndex--;
                if (currentFocusIndex < 0) {
                    currentFocusIndex = totalElements - 1;
                }
            } else {
                currentFocusIndex++;
                if (currentFocusIndex >= totalElements) {
                    currentFocusIndex = 0;
                }
            }
            
            e.preventDefault();
            focusableElements[currentFocusIndex].focus();
        }
    });

}); // End of DOMContentLoaded

// ==================== ADD CSS ANIMATIONS ====================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;

document.head.appendChild(style);

// ==================== PERFORMANCE OPTIMIZATION ====================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== UTILITY FUNCTIONS ====================

// Get query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== KEEN SLIDER - PROJECTS CAROUSEL ====================

// Variable global para el slider
let projectsSlider = null;

// Función para cargar Keen Slider
function loadKeenSlider() {
    return new Promise((resolve) => {
        // Si ya está cargado, resolver inmediatamente
        if (typeof KeenSlider !== 'undefined') {
            console.log('✅ Keen Slider already available');
            resolve();
            return;
        }

        // Cargar el script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.js';
        script.async = false; // Cargar sincrónicamente para evitar problemas
        script.onload = () => {
            console.log('✅ Keen Slider loaded from CDN');
            resolve();
        };
        script.onerror = () => {
            console.error('❌ Failed to load Keen Slider');
            resolve(); // Resolver de todos modos para no bloquear
        };
        document.head.appendChild(script);
    });
}

// Función para actualizar los dots
function updateCarouselDots(slider) {
    const dotsContainer = document.getElementById('projectsDots');
    if (!dotsContainer || !slider) return;

    dotsContainer.innerHTML = '';

    const slideCount = slider.track.details.slides.length;
    const currentSlide = slider.track.details.rel;

    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.type = 'button';
        
        if (i === currentSlide) {
            dot.classList.add('active');
        }
        
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        
        dot.addEventListener('click', () => {
            slider.moveToIdx(i);
        });
        
        dotsContainer.appendChild(dot);
    }
}

// Inicializar el carrusel
async function initProjectsCarousel() {
    console.log('🔄 Initializing Projects Carousel...');
    
    // Cargar la librería
    await loadKeenSlider();

    // Verificar que KeenSlider esté disponible
    if (typeof KeenSlider === 'undefined') {
        console.error('❌ KeenSlider not available');
        return;
    }

    // Verificar que el elemento existe
    const carouselElement = document.getElementById('projectsCarousel');
    if (!carouselElement) {
        console.error('❌ Carousel element not found');
        return;
    }

    try {
        // Crear el slider
        projectsSlider = new KeenSlider(
            '#projectsCarousel',
            {
                loop: true,
                mode: "snap",
                slides: {
                    perView: 1,
                    spacing: 24
                },
                breakpoints: {
                    '(min-width: 768px)': {
                        slides: {
                            perView: 2,
                            spacing: 24
                        }
                    }
                },
                created: (s) => {
                    console.log('✅ Carousel created');
                    updateCarouselDots(s);
                },
                slideChanged: (s) => {
                    updateCarouselDots(s);
                }
            }
        );

        // Conectar botones de navegación
        const prevBtn = document.getElementById('projectsPrev');
        const nextBtn = document.getElementById('projectsNext');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                projectsSlider.prev();
                console.log('⬅️ Previous');
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                projectsSlider.next();
                console.log('➡️ Next');
            });
        }

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('input, textarea')) return;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                projectsSlider.prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                projectsSlider.next();
            }
        });

        console.log('🎉 Carousel initialized successfully!');

    } catch (error) {
        console.error('❌ Error initializing carousel:', error);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsCarousel);
} else {
    initProjectsCarousel();
}

// ==================== KEEN SLIDER - TESTIMONIALS CAROUSEL ====================

// Variable global para el slider de testimonios
let testimonialsSlider = null;

// Función para actualizar los dots de testimonios
function updateTestimonialsDots(slider) {
    const dotsContainer = document.getElementById('testimonialsDots');
    if (!dotsContainer || !slider) return;

    dotsContainer.innerHTML = '';

    const slideCount = slider.track.details.slides.length;
    const currentSlide = slider.track.details.rel;

    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.type = 'button';
        
        if (i === currentSlide) {
            dot.classList.add('active');
        }
        
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        
        dot.addEventListener('click', () => {
            slider.moveToIdx(i);
        });
        
        dotsContainer.appendChild(dot);
    }
}

// Inicializar el carrusel de testimonios
async function initTestimonialsCarousel() {
    console.log('🔄 Initializing Testimonials Carousel...');
    
    // Esperar a que Keen Slider esté disponible
    if (typeof KeenSlider === 'undefined') {
        console.warn('⚠️ KeenSlider not available for testimonials');
        return;
    }

    // Verificar que el elemento existe
    const carouselElement = document.getElementById('testimonialsCarousel');
    if (!carouselElement) {
        console.warn('⚠️ Testimonials carousel element not found');
        return;
    }

    try {
        // Crear el slider
        testimonialsSlider = new KeenSlider(
            '#testimonialsCarousel',
            {
                loop: true,
                mode: "snap",
                slides: {
                    perView: 1,
                    spacing: 24
                },
                breakpoints: {
                    '(min-width: 768px)': {
                        slides: {
                            perView: 2,
                            spacing: 24
                        }
                    },
                    '(min-width: 1200px)': {
                        slides: {
                            perView: 3,
                            spacing: 24
                        }
                    }
                },
                created: (s) => {
                    console.log('✅ Testimonials carousel created');
                    updateTestimonialsDots(s);
                },
                slideChanged: (s) => {
                    updateTestimonialsDots(s);
                }
            }
        );

        // Conectar botones de navegación
        const prevBtn = document.getElementById('testimonialsPrev');
        const nextBtn = document.getElementById('testimonialsNext');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                testimonialsSlider.prev();
                console.log('⬅️ Previous testimonial');
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                testimonialsSlider.next();
                console.log('➡️ Next testimonial');
            });
        }

        console.log('🎉 Testimonials Carousel initialized successfully!');

    } catch (error) {
        console.error('❌ Error initializing testimonials carousel:', error);
    }
}

// Inicializar testimonios después de que los proyectos estén listos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initTestimonialsCarousel, 500); // Esperar medio segundo después del DOM
    });
} else {
    setTimeout(initTestimonialsCarousel, 500);
}


 // Validate email and message ok  
const $form = document.querySelector('form');
if ($form) {
    $form.addEventListener('submit', handleSubmit);
    console.log('mesagge' + $form);
    async function handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(this);
        const response = await fetch(this.action, {
            method: this.method,
            body: form,
            headers: {
                'Accept': 'Application/json'
            }

        })
        if (response.ok) {
            this.reset();

        }

    }
}


// Validate email de web site
function validate(email) {
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var okvalide = expReg.test(email);
    if (okvalide == true) {

    } else {

    }

}


// Console message
console.log('%c Welcome to Emmanuel Sandoval Portfolio', 'font-size: 24px; color: #0066ff; font-weight: bold;');
console.log('%c Cloud Architect & Senior Software Engineer', 'font-size: 14px; color: #666; margin-top: 10px;');