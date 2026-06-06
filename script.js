/* ============================================
   VIDYA PATHOLOGY — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Header scroll effect ----
  const header = document.getElementById('header');
  const scrollTop = document.getElementById('scroll-top');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    scrollTop.classList.toggle('visible', y > 500);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Scroll to top ----
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Mobile menu toggle ----
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // ---- Scroll reveal ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Hero particles ----
  const particlesContainer = document.getElementById('hero-particles');
  
  if (particlesContainer) {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.opacity = Math.random() * 0.3 + 0.05;
      
      particlesContainer.appendChild(particle);
    }
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Animated counter for hero stats ----
  const animateCounter = (element, target, suffix = '') => {
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (target - startValue) * eased);
      
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  // Observe hero stats
  const heroStats = document.querySelectorAll('.hero-stat-value');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        
        if (text.includes('50+')) {
          animateCounter(el, 50, '+');
        } else if (text.includes('4.7')) {
          // Special handling for decimal
          const duration = 2000;
          const startTime = performance.now();
          const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = (4.7 * eased).toFixed(1);
            el.textContent = current + '★';
            if (progress < 1) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
        } else if (text.includes('24')) {
          animateCounter(el, 24, 'hr');
        }
        
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  heroStats.forEach(stat => statsObserver.observe(stat));

  // ---- Service card stagger animation ----
  const serviceCards = document.querySelectorAll('.service-card');
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  serviceCards.forEach(card => cardObserver.observe(card));

  // ---- Active nav link highlighting ----
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNav = () => {
    const scrollY = window.scrollY + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.querySelectorAll('a').forEach(link => {
          link.style.opacity = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.opacity = '1';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
});
