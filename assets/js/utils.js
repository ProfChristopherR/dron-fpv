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

  // ---------- Lightbox Modal con Zoom (+ / - / Reset / Drag) ----------
  function initLightbox() {
    let modal = document.querySelector('.lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'lightbox-modal';
      modal.innerHTML = `
        <div class="lightbox-controls">
          <button class="lightbox-btn btn-zoom-in" title="Acercar (+)">+</button>
          <button class="lightbox-btn btn-zoom-out" title="Alejar (-)">−</button>
          <button class="lightbox-btn btn-zoom-reset" title="Restablecer (1:1)" style="font-size:0.72rem; font-weight:700;">1:1</button>
          <span class="lightbox-zoom-level">100%</span>
          <button class="lightbox-btn lightbox-close" title="Cerrar (Esc)" style="margin-left:6px; background:rgba(239,68,68,0.25); border-color:rgba(239,68,68,0.5);">&times;</button>
        </div>
        <div class="lightbox-container">
          <img class="lightbox-img" src="" alt="Vista ampliada">
        </div>
      `;
      document.body.appendChild(modal);
    }

    const container = modal.querySelector('.lightbox-container');
    const modalImg = modal.querySelector('.lightbox-img');
    const closeBtn = modal.querySelector('.lightbox-close');
    const btnIn = modal.querySelector('.btn-zoom-in');
    const btnOut = modal.querySelector('.btn-zoom-out');
    const btnReset = modal.querySelector('.btn-zoom-reset');
    const zoomText = modal.querySelector('.lightbox-zoom-level');

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function updateTransform() {
      modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      zoomText.textContent = `${Math.round(scale * 100)}%`;
    }

    function setScale(newScale) {
      scale = Math.min(Math.max(0.1, newScale), 20); // 10% a 2000%
      if (scale === 1) {
        translateX = 0;
        translateY = 0;
      }
      updateTransform();
    }

    function openModal(src, alt) {
      modalImg.src = src;
      modalImg.alt = alt || 'Imagen ampliada';
      scale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Botones de Zoom
    btnIn.addEventListener('click', (e) => { e.stopPropagation(); setScale(scale + 0.5); });
    btnOut.addEventListener('click', (e) => { e.stopPropagation(); setScale(scale - 0.5); });
    btnReset.addEventListener('click', (e) => { e.stopPropagation(); setScale(1); });
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeModal(); });

    // Rueda del ratón (Wheel Zoom)
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.4 : -0.4;
      setScale(scale + delta);
    }, { passive: false });

    // Arrastrar (Pan / Drag)
    container.addEventListener('mousedown', (e) => {
      if (e.target.closest('.lightbox-controls')) return;
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      container.classList.add('dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        container.classList.remove('dragging');
      }
    });

    // Cerrar al hacer clic en el fondo
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        closeModal();
      }
    });

    // Teclas directas
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === '+' || e.key === '=') setScale(scale + 0.5);
      if (e.key === '-' || e.key === '_') setScale(scale - 0.5);
      if (e.key === '0' || e.key.toLowerCase() === 'r') setScale(1);
    });

    // Asignar a todas las imágenes .img-frame img y .img-zoomable
    document.querySelectorAll('.img-frame img, .img-zoomable').forEach(img => {
      img.classList.add('img-zoomable');
      img.title = 'Haz clic para abrir en el visor HD con zoom (+ / -)';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(img.src, img.alt);
      });
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
