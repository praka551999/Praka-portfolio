/* ============================================
   PREMIUM PRO PORTFOLIO - ADVANCED JAVASCRIPT
   ============================================ */

// ========== SCROLL PROGRESS BAR ==========
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ========== TYPED TEXT ANIMATION ==========
const typed = document.querySelector('.typed-text');
if (typed) {
    const textArray = ['AI Full Stack Developer', 'ML Engineer', 'LLM Specialist', 'AI Innovator'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];

        if (isDeleting) {
            typed.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typed.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

// ========== COUNTER ANIMATION ==========
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 20);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// ========== PROJECT FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ========== SKILL PROGRESS ANIMATION ==========
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const targetWidth = progress.getAttribute('data-progress');
            setTimeout(() => {
                progress.style.width = targetWidth + '%';
            }, 100);
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress').forEach(progress => {
    progressObserver.observe(progress);
});

// ========== TESTIMONIAL SLIDER ==========
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const sliderDots = document.querySelector('.slider-dots');

let currentTestimonial = 0;

// Create dots
if (sliderDots && testimonialCards.length > 0) {
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.borderRadius = '50%';
        dot.style.background = index === 0 ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)';
        dot.style.cursor = 'pointer';
        dot.style.transition = 'all 0.3s ease';

        dot.addEventListener('click', () => {
            showTestimonial(index);
        });

        sliderDots.appendChild(dot);
    });
}

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialCards[index].classList.add('active');

    // Update dots
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.style.background = i === index ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)';
    });

    currentTestimonial = index;
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
        showTestimonial(currentTestimonial);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTestimonial = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
        showTestimonial(currentTestimonial);
    });
}

// Auto-play testimonials
if (testimonialCards.length > 0) {
    setInterval(() => {
        currentTestimonial = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// ========== CONTACT FORM ==========
// Form is now handled by FormSubmit service
// No JavaScript needed - form submits directly to email

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for fade-in
document.querySelectorAll('.service-card, .project-card, .skill-category, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(el);
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.hero-particles');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('%c🚀 Premium Portfolio Loaded Successfully!', 'color: #00ff88; font-size: 16px; font-weight: bold;');

// ========== IMAGE GALLERY ==========
const galleryImages = {
    crypto: [
        'images/Screenshot (464).png',
        'images/Screenshot (465).png',
        'images/Screenshot (466).png',
        'images/Screenshot (467).png',
        'images/Screenshot (468).png'
    ]
};

let currentGallery = [];
let currentImageIndex = 0;

function openGallery(projectType) {
    currentGallery = galleryImages[projectType] || [];
    currentImageIndex = 0;

    const modal = document.getElementById('imageGallery');
    const totalImages = document.getElementById('totalImages');

    totalImages.textContent = currentGallery.length;

    // Generate thumbnails
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    thumbnailsContainer.innerHTML = '';
    currentGallery.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.classList.add('gallery-thumbnail');
        if (index === 0) thumb.classList.add('active');
        thumb.onclick = () => {
            currentImageIndex = index;
            updateGalleryImage();
        };
        thumbnailsContainer.appendChild(thumb);
    });

    updateGalleryImage();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('imageGallery');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = currentGallery.length - 1;
    } else if (currentImageIndex >= currentGallery.length) {
        currentImageIndex = 0;
    }

    updateGalleryImage();
}

function updateGalleryImage() {
    const img = document.getElementById('galleryImage');
    const currentCounter = document.getElementById('currentImage');

    img.src = currentGallery[currentImageIndex];
    currentCounter.textContent = currentImageIndex + 1;

    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Close gallery on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGallery();
    } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    }
});

// Close gallery when clicking outside the image
document.getElementById('imageGallery')?.addEventListener('click', (e) => {
    if (e.target.id === 'imageGallery') {
        closeGallery();
    }
});
