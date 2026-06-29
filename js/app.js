// ===== DOM Elements =====
const body = document.body;
const darkModeToggle = document.getElementById('darkModeToggle');
const backToTopBtn = document.getElementById('backToTop');
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');
const navLinks = document.querySelectorAll('.nav-list a');
const loader = document.getElementById('loader');
const newsletterForm = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentTestimonial = 0;

// ===== LOADER =====
window.addEventListener('load', () => {
  if (loader) {
    loader.style.display = 'none';
  }
});

// ===== DARK MODE =====
// Check for saved dark mode preference or default to light mode
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
  body.classList.add('dark-mode');
  updateDarkModeIcon();
}

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  updateDarkModeIcon();
});

function updateDarkModeIcon() {
  const icon = darkModeToggle.querySelector('i');
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// ===== BACK TO TOP BUTTON =====
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== HAMBURGER MENU =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navList.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navList.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-list') && !e.target.closest('.hamburger')) {
    hamburger.classList.remove('active');
    navList.classList.remove('active');
  }
});

// ===== SCROLL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-aos-delay') || 0;
      setTimeout(() => {
        entry.target.style.opacity = '1';
      }, parseInt(delay));
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
  observer.observe(element);
});

// ===== TESTIMONIAL CAROUSEL =====
function showTestimonial(index) {
  testimonialCards.forEach(card => card.classList.remove('active'));
  testimonialCards[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
  showTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
});

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}, 5000);

// ===== NEWSLETTER FORM =====
newsletterForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('emailInput').value;

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('Mohon masukkan email yang valid', 'error');
    return;
  }

  // Simulate API call (replace with actual API endpoint)
  try {
    formMessage.textContent = 'Sedang memproses...';
    formMessage.className = 'form-message';

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success response
    showMessage('✓ Terima kasih! Email Anda telah berhasil didaftarkan.', 'success');
    newsletterForm.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }, 5000);

  } catch (error) {
    showMessage('Terjadi kesalahan. Silakan coba lagi.', 'error');
  }
});

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

// ===== ADD TO CART BUTTONS =====
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const productName = btn.closest('.product-card').querySelector('h3').textContent;
    
    // Show notification
    const notification = createNotification(`${productName} ditambahkan ke keranjang`);
    document.body.appendChild(notification);

    // Animate button
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 200);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  });
});

function createNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    background-color: #51cf66;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideInUp 0.3s ease;
    z-index: 500;
    font-weight: 600;
  `;
  notification.textContent = `✓ ${message}`;
  return notification;
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImages = document.querySelectorAll('.hero-section .content-image img');
  
  heroImages.forEach(img => {
    img.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
});

// ===== PRODUCT FILTER ANIMATION =====
document.querySelectorAll('.product-card').forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// Add ripple animation if not already defined
if (!document.getElementById('ripple-styles')) {
  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// ===== KEYBOARD NAVIGATION =====
// ESC key to close mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    navList.classList.remove('active');
  }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ===== PAGE VISIBILITY =====
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations or stop auto-play when tab is not visible
    document.querySelectorAll('video').forEach(video => {
      video.pause();
    });
  } else {
    // Resume when tab becomes visible
    document.querySelectorAll('video').forEach(video => {
      video.play();
    });
  }
});

// ===== CONSOLE LOG MESSAGE =====
console.log(
  '%cPustaka Muslim Official Store',
  'font-size: 20px; font-weight: bold; color: #257180;'
);
console.log(
  '%cWebsite dibuat dengan ❤️ menggunakan HTML, CSS, dan JavaScript',
  'font-size: 14px; color: #666;'
);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Set initial testimonial
  showTestimonial(0);

  // Add fade animation to elements
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
  });
});

// ===== LOG PAGE LOAD TIME =====
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`%cPage loaded in ${loadTime.toFixed(2)}ms`, 'color: green;');
});
