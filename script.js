const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');

const toggleNav = () => {
  navLinks?.classList.toggle('is-open');
};

navToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleNav();
});

document.addEventListener('click', (event) => {
  if (!navToggle || !navLinks || !nav) return;
  if (!nav.contains(event.target)) {
    navLinks.classList.remove('is-open');
  }
});

const handleScrollNav = () => {
  if (!nav) return;
  if (window.scrollY > 24) {
    nav.classList.add('is-scrolled');
  } else {
    nav.classList.remove('is-scrolled');
  }
};

handleScrollNav();
// Disabled scroll event listener to prevent scroll issues
// window.addEventListener('scroll', handleScrollNav, { passive: true });

// Disabled animation observers to prevent scroll issues
// const animated = document.querySelectorAll('[data-animate]');
// if (animated.length) {
//   animated.forEach((el) => el.classList.add('is-visible'));
// }

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const parallaxCard = document.querySelector('[data-tilt]');
if (parallaxCard && !prefersReducedMotion) {
  const ensureDepth = () => {
    const layers = parallaxCard.querySelectorAll('[data-depth]');
    if (layers.length === 0) {
      const mainImage = parallaxCard.querySelector('.hero-card__main');
      if (mainImage) mainImage.setAttribute('data-depth', '0.2');
    }
  };

  ensureDepth();

  parallaxCard.addEventListener('mousemove', (event) => {
    const rect = parallaxCard.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    parallaxCard.querySelectorAll('[data-depth]').forEach((layer) => {
      const depth = parseFloat(layer.getAttribute('data-depth') || '0');
      const moveX = ((offsetX - centerX) / centerX) * depth * -26;
      const moveY = ((offsetY - centerY) / centerY) * depth * -22;
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  });

  parallaxCard.addEventListener('mouseleave', () => {
    parallaxCard.querySelectorAll('[data-depth]').forEach((layer) => {
      layer.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

// Carousel functionality removed - showing all cards in grid now

// Touch-friendly interactions
document.addEventListener('DOMContentLoaded', () => {
  // Add touch feedback to interactive elements
  const interactiveElements = document.querySelectorAll('.button, .product, .feature, .hero__stat');

  interactiveElements.forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    }, { passive: true });

    element.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }, { passive: true });
  });

  // Improve form elements for mobile
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      // Prevent zoom on iOS
      this.style.fontSize = '16px';
    });
  });

  // Add momentum scrolling
  const scrollableElements = document.querySelectorAll('.carousel__track');
  scrollableElements.forEach(element => {
    element.style.webkitOverflowScrolling = 'touch';
  });
});
