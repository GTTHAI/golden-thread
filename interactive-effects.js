// Enhanced Interactive Effects

document.addEventListener('DOMContentLoaded', function() {

  // Removed Particle Background and Mouse Trail

  // Disabled parallax to prevent scroll issues
  function initParallax() {
    // Parallax disabled
  }

  // Disabled scroll reveal to prevent scroll issues
  function initScrollReveal() {
    // Auto-add revealed class to all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('scroll-reveal', 'revealed');
    });
  }

  // Counter Animation (Fixed to not exceed actual numbers)
  function animateCounters() {
    const counters = document.querySelectorAll('.hero__stat strong');

    counters.forEach(counter => {
      const target = counter.textContent;
      const isNumber = /^\d+/.test(target);

      if (isNumber) {
        const numberMatch = target.match(/\d+/);
        if (!numberMatch) return;

        const finalNumber = parseInt(numberMatch[0]);
        const suffix = target.replace(numberMatch[0], '');
        let currentNumber = 0;
        const increment = Math.max(1, Math.ceil(finalNumber / 30));

        const updateCounter = () => {
          if (currentNumber < finalNumber) {
            currentNumber = Math.min(currentNumber + increment, finalNumber);
            counter.textContent = currentNumber + suffix;
            setTimeout(updateCounter, 60);
          } else {
            counter.textContent = target; // Ensure final value is exact
          }
        };

        // Start animation immediately (no observer)
        setTimeout(updateCounter, 1000);
      }
    });
  }

  // Magnetic Effect for Buttons
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Text Glitch Effect - Removed

  // Floating Labels
  function initFloatingLabels() {
    const stats = document.querySelectorAll('.hero__stat');

    stats.forEach(stat => {
      stat.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'floating-tooltip';
        tooltip.textContent = 'Click for more info';
        tooltip.style.cssText = `
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 1000;
          animation: fadeInUp 0.3s ease;
        `;
        stat.style.position = 'relative';
        stat.appendChild(tooltip);
      });

      stat.addEventListener('mouseleave', () => {
        const tooltip = stat.querySelector('.floating-tooltip');
        if (tooltip) tooltip.remove();
      });
    });
  }

  // Ripple Effect
  function initRippleEffect() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // Initialize all effects
  initParallax();
  initScrollReveal();
  animateCounters();
  initMagneticButtons();
  initFloatingLabels();
  initRippleEffect();

});

// CSS Animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);