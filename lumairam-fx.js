/* =========================================================
   LUMAIRAM FX ENGINE — Efeitos Futuristas Centralizados
   ========================================================= */

(function () {
  'use strict';

  // ─── 1. MATRIX CODE RAIN ─────────────────────────────────
  function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]()<>=;:+-*/&|!@#$%^~`const let var function return if else for while class import export async await';
    const charArr = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    // Randomize initial positions
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100;
    }

    function draw() {
      ctx.fillStyle = 'rgba(5, 5, 15, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character (bright)
        const hue = 140 + Math.sin(Date.now() * 0.001 + i * 0.1) * 30;
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.95)`;
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(char, x, y);

        // Trail characters (dimmer)
        if (drops[i] > 1) {
          const trailChar = charArr[Math.floor(Math.random() * charArr.length)];
          ctx.fillStyle = `hsla(${hue}, 80%, 45%, 0.3)`;
          ctx.fillText(trailChar, x, y - fontSize);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ─── 2. REACTIVE SCROLL GRADIENT ─────────────────────────
  function initGradientMorph() {
    const root = document.documentElement;

    // 4 cores marcantes, nítidas e perfeitamente equilibradas na paleta tecnológica
    // (1. Ciano Elétrico -> 2. Violeta Tech -> 3. Azul Cobalto -> 4. Verde Esmeralda/Menta)
    const colorStops = [
      { pos: 0.00, bg: [5, 10, 24],  accent: [0, 242, 255],  glow: [0, 120, 255]   }, // 1. Ciano Elétrico (#00f2ff)
      { pos: 0.33, bg: [7, 8, 26],   accent: [168, 85, 247], glow: [124, 58, 237] }, // 2. Violeta Tech (#a855f7)
      { pos: 0.66, bg: [5, 10, 26],  accent: [59, 130, 246], glow: [29, 78, 216]  }, // 3. Azul Cobalto (#3b82f6)
      { pos: 1.00, bg: [5, 12, 24],  accent: [16, 240, 160], glow: [5, 150, 105]  }, // 4. Esmeralda Tech (#10f0a0)
    ];

    function lerp(a, b, t) { return a + (b - a) * t; }

    function lerpColor(c1, c2, t) {
      return [
        Math.round(lerp(c1[0], c2[0], t)),
        Math.round(lerp(c1[1], c2[1], t)),
        Math.round(lerp(c1[2], c2[2], t)),
      ];
    }

    function updateColors() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const docHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      ) - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

      // Find the two color stops we're between
      let lower = colorStops[0], upper = colorStops[1];
      for (let i = 0; i < colorStops.length - 1; i++) {
        if (progress >= colorStops[i].pos && progress <= colorStops[i + 1].pos) {
          lower = colorStops[i];
          upper = colorStops[i + 1];
          break;
        }
      }

      const segmentRange = upper.pos - lower.pos || 1;
      const segmentProgress = Math.min(Math.max((progress - lower.pos) / segmentRange, 0), 1);
      const bg = lerpColor(lower.bg, upper.bg, segmentProgress);
      const accent = lerpColor(lower.accent, upper.accent, segmentProgress);
      const glow = lerpColor(lower.glow, upper.glow, segmentProgress);

      root.style.setProperty('--primary-bg', `rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`);
      root.style.setProperty('--secondary-bg', `rgb(${bg[0] + 6}, ${bg[1] + 6}, ${bg[2] + 6})`);
      root.style.setProperty('--neon-cyan', `rgb(${accent[0]}, ${accent[1]}, ${accent[2]})`);
      root.style.setProperty('--neon-blue', `rgb(${glow[0]}, ${glow[1]}, ${glow[2]})`);
      root.style.setProperty('--accent-glow', `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.35)`);
      root.style.setProperty('--accent-glow-strong', `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.65)`);
    }

    window.addEventListener('scroll', updateColors, { passive: true });
    window.addEventListener('resize', updateColors, { passive: true });
    updateColors();
  }

  // ─── 3. SCROLL REVEAL (Intersection Observer) ────────────
  function initScrollReveal() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Stagger children if they have data-reveal-child
          const children = entry.target.querySelectorAll('[data-reveal-child]');
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.1}s`;
            child.classList.add('revealed');
          });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  // ─── 4. 3D TILT EFFECT ON CARDS ──────────────────────────
  function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // ─── 5. COUNTER ANIMATION ────────────────────────────────
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(entry.target.dataset.counter);
          const suffix = entry.target.dataset.counterSuffix || '';
          const duration = 2000;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            entry.target.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  // ─── 6. TYPING ANIMATION ────────────────────────────────
  function initTyping() {
    const el = document.querySelector('[data-typing]');
    if (!el) return;

    const phrases = el.dataset.typing.split('|');
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseAfterType = 2500;
    const pauseAfterDelete = 500;

    function tick() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        el.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
      } else {
        el.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
      }

      let delay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIdx === currentPhrase.length) {
        delay = pauseAfterType;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = pauseAfterDelete;
      }

      setTimeout(tick, delay);
    }
    tick();
  }

  // ─── 7. HAMBURGER MENU ──────────────────────────────────
  function initHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      menu.classList.toggle('nav-open');
      document.body.classList.toggle('menu-open');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        btn.classList.remove('active');
        menu.classList.remove('nav-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ─── 8. CUSTOM CURSOR ───────────────────────────────────
  function initCustomCursor() {
    // Only on non-touch devices
    if ('ontouchstart' in window) return;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .neon-card, .neon-button, .pilar-card-vendas, .project-card, [data-tilt]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      });
    });
  }

  // ─── 9. SCROLL PROGRESS BAR ──────────────────────────────
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ─── 10. LOADING SCREEN ──────────────────────────────────
  function initLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
        setTimeout(() => loader.remove(), 600);
      }, 800);
    });
  }

  // ─── 11. PARALLAX ON HERO BG ──────────────────────────────
  function initParallax() {
    const heroBg = document.querySelector('.hero-bg-tech');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const fadePoint = 700;
      let opacity = 1 - (scrollY / fadePoint);
      if (opacity < 0) opacity = 0;
      heroBg.style.opacity = opacity;
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }, { passive: true });
  }

  // ─── 12. GLITCH TEXT EFFECT ───────────────────────────────
  function initGlitchText() {
    const glitchElements = document.querySelectorAll('[data-glitch]');
    glitchElements.forEach(el => {
      const text = el.textContent;
      el.setAttribute('data-text', text);
    });
  }

  // ─── 13. MAGNETIC BUTTONS ────────────────────────────────
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.neon-button');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ─── 14. SMOOTH SCROLL HEADER HIDE/SHOW ──────────────────
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ─── INIT ALL ────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initMatrixRain();
    initGradientMorph();
    initScrollReveal();
    initTiltEffect();
    initCounters();
    initTyping();
    initHamburger();
    initCustomCursor();
    initScrollProgress();
    initParallax();
    initGlitchText();
    initMagneticButtons();
    initHeaderScroll();
  });

})();
