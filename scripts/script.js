
// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    if (themeBtn) themeBtn.textContent = '☀️';
}
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme);
    });
}


// Mobile Menu
const navMenu = document.getElementById('navMenu');
const mobileToggle = document.getElementById('mobileToggle');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// -------------------------
// Modal (Contact + Gallery)
// -------------------------
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

if (contactForm && modal && modalClose) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            modal.classList.add('active');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });

    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

// Gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length && modal && modalTitle && modalMessage) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const overlay = item.querySelector('.gallery-overlay');
            modalTitle.textContent = overlay.querySelector('h3').textContent;
            modalMessage.textContent = overlay.querySelector('p').textContent;
            modal.classList.add('active');
        });
    });
}

// -------------------------
// Scroll Animations
// -------------------------
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// -------------------------
// Button Ripple Effect
// -------------------------
document.querySelectorAll('.hero-btn, .submit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleCSS = `
@keyframes ripple {
    to { transform: scale(4); opacity: 0; }
}`;
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// -------------------------
// Keyboard support
// -------------------------
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});

