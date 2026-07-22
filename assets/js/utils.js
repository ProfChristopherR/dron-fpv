/**
 * ============================================
 * UTILIDADES - Drone FPV Manta
 * Scroll reveal, acordeones, navbar, partículas
 * ============================================
 */

(function() {
  'use strict';

  // ---------- Scroll Reveal ----------
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ---------- Navbar scroll effect ----------
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ---------- Mobile menu toggle ----------
  function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.navbar-nav');
    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Smooth scroll ----------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    });
  }

  // ---------- Ripple effect ----------
  function initRippleEffect() {
    document.querySelectorAll('.ripple').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ---------- Parallax en hero ----------
  function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }

  // ---------- Accordion ----------
  function initAccordion() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isOpen = this.classList.contains('open');

        // Cerrar todos los del mismo accordion
        const accordion = this.closest('.accordion');
        if (accordion) {
          accordion.querySelectorAll('.accordion-trigger').forEach(t => {
            t.classList.remove('open');
            if (t.nextElementSibling) t.nextElementSibling.classList.remove('show');
          });
        }

        // Abrir el actual si estaba cerrado
        if (!isOpen) {
          this.classList.add('open');
          if (content) content.classList.add('show');
        }
      });
    });
  }

  // ---------- Partículas animadas ----------
  function initParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    const count = 12;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 80 + 20;
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
      `;
      container.appendChild(particle);
    }
  }

  // ---------- Active nav link ----------
  function initActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }

  // ---------- Lightbox Modal (Pantalla Completa) ----------
  function initLightbox() {
    let modal = document.querySelector('.lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'lightbox-modal';
      modal.innerHTML = `
        <button class="lightbox-close" aria-label="Cerrar">&times;</button>
        <img class="lightbox-img" src="" alt="Vista ampliada">
      `;
      document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector('.lightbox-img');
    const closeBtn = modal.querySelector('.lightbox-close');

    function openModal(src, alt) {
      modalImg.src = src;
      modalImg.alt = alt || 'Imagen en pantalla completa';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.img-frame img, .img-zoomable').forEach(img => {
      img.classList.add('img-zoomable');
      img.title = 'Haz clic para ver en pantalla completa';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(img.src, img.alt);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ---------- Init ----------
  function init() {
    initScrollReveal();
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();
    initRippleEffect();
    initParallax();
    initAccordion();
    initParticles();
    initActiveNavLink();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
