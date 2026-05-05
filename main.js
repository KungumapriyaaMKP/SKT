// SRI KUNGUMAYI TRADERS - Interactivity

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    // Mobile menu toggle
    mobileBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        mobileBtn.querySelector('i').classList.toggle('fa-bars');
        mobileBtn.querySelector('i').classList.toggle('fa-xmark');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileBtn.querySelector('i').classList.add('fa-bars');
            mobileBtn.querySelector('i').classList.remove('fa-xmark');
        });
    });

    // Scroll Reveal implementation (simpler version)
    const observerOptions = {
        threshold: 0.1
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to sections
    document.querySelectorAll('.product-card, .section-title, #about div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        revealOnScroll.observe(el);
    });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// --- High-End Hero Slideshow Logic ---
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto-advance every 4 seconds
let slideInterval = setInterval(nextSlide, 4000);

// Manual Dot Navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 4000);
    });
});


// --- Mobile Menu Toggle Logic ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navRightActions = document.querySelector('.nav-right-actions');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navRightActions.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-xmark');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navRightActions.classList.contains('active')) {
            navRightActions.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
        }
    });
});


// --- Premium Contact Form Handler ---
const contactForm = document.getElementById('contact-form');
const formContainer = document.getElementById('form-container');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.innerHTML = 'SENDING...';
        submitBtn.disabled = true;

        // Convert FormData to a plain object for JSON submission
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Use the /ajax/ endpoint for background submission
            const ajaxUrl = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
            
            const response = await fetch(ajaxUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                formContainer.innerHTML = `
                    <div style='background: var(--bg-soft-blue); padding: 40px; border: 1px solid var(--primary-blue-light); text-align: center;'>
                        <div style='font-size: 3rem; color: var(--primary-blue); margin-bottom: 20px;'><i class='fas fa-circle-check'></i></div>
                        <h3 style='color: var(--secondary-navy); margin-bottom: 10px;'>Message Sent!</h3>
                        <p>Thank you for reaching out. Our team will get back to you at the earliest.</p>
                    </div>
                `;
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            submitBtn.innerHTML = 'ERROR - TRY AGAIN';
            submitBtn.disabled = false;
            console.error('Submission Error:', error);
            alert('Something went wrong. Please try again or call us directly.');
        }
    });
}

// --- High-Fidelity Scroll Observer ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Fix: Ensure clicking a link closes mobile menu
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navRight = document.querySelector('.nav-right-actions');
        if (navRight.classList.contains('active')) {
            navRight.classList.remove('active');
            const icon = document.querySelector('.mobile-menu-btn i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        }
    });
});

