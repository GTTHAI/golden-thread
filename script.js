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
window.addEventListener('scroll', handleScrollNav, { passive: true });

const animated = document.querySelectorAll('[data-animate]');
if (animated.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  animated.forEach((el) => observer.observe(el));
}

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

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('[data-carousel-track]');
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');

  const scrollByAmount = () => {
    if (!track) return 0;
    const card = track.querySelector('.product');
    return card ? card.getBoundingClientRect().width + 24 : 260;
  };

  nextBtn?.addEventListener('click', () => {
    track?.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
  });

  prevBtn?.addEventListener('click', () => {
    track?.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
  });
}
