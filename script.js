document.addEventListener('DOMContentLoaded', () => {

  /* ===== SCROLL PROGRESS ===== */
  (function() {
    const bar = document.getElementById('scrollBar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const pct = (window.pageYOffset) / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      bar.style.width = pct + '%';
    });
  })();

  /* ===== NAVBAR ===== */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navLinks?.classList.remove('active');
    });
  });

  /* ===== TYPEWRITER ===== */
  const typer = document.getElementById('typer');
  if (typer) {
    const phrases = [
      'VAPT Engineer',
      'Certified Ethical Hacker (CEH v13)',
      'Full-Stack Developer',
      'AI Engineer (Vibe Coding)',
      'Security Tool Developer',
      'Open to Full-Stack & AI Roles'
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const cur = phrases[pi];
      typer.textContent = deleting ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
      if (!deleting) ci++; else ci--;

      if (!deleting && ci === cur.length) { deleting = true; setTimeout(type, 2000); return; }
      if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }

      setTimeout(type, deleting ? 35 : 75);
    }
    type();
  }

  /* ===== SCROLL REVEAL ===== */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));

  /* ===== COUNTERS ===== */
  const counters = document.querySelectorAll('.stat-num');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const max = parseInt(el.getAttribute('data-target'));
        let cur = 0;
        const inc = Math.ceil(max / 35);
        function upd() {
          cur += inc;
          if (cur > max) { el.textContent = max + '+'; return; }
          el.textContent = cur + '+';
          setTimeout(upd, Math.floor(1300 / 35));
        }
        upd();
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ===== RESUME DOWNLOAD ===== */
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', e => {
      e.preventDefault();
      const a = document.createElement('a');
      a.href = 'Aniket_Roy_Resume.pdf';
      a.download = 'Aniket_Dulal_Roy_Resume.pdf';
      a.click();
    });
  }


  /* ===== PARALLAX ===== */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const s = window.pageYOffset;
      if (s < window.innerHeight) {
        heroContent.style.transform = `translateY(${s * 0.12}px)`;
        heroContent.style.opacity = 1 - (s / window.innerHeight) * 0.4;
      }
    });
  }

  /* ===== HERO GRID PARALLAX ===== */
  const heroGrid = document.querySelector('.hero-grid');
  if (heroGrid) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth) * 16 - 8;
      const y = (e.clientY / window.innerHeight) * 16 - 8;
      heroGrid.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ===== MATRIX RAIN ===== */
  (function() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/{}[]!@#$%^&*';
    const fontSize = 14;
    let cols, drops;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < cols; i++) drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
    }
    resize();

    function draw() {
      ctx.fillStyle = 'rgba(10,14,23,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        const alpha = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0,255,65,${alpha})`;
        ctx.fillText(ch, i * fontSize, y);
        if (y > 0 && Math.random() > 0.98) {
          ctx.fillStyle = '#fff';
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y - fontSize);
        }
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    window.addEventListener('resize', resize);
    setInterval(draw, 55);
  })();

  /* ===== SIDE NAV DOTS ===== */
  (function() {
    const dots = document.querySelectorAll('.side-dot');
    if (!dots.length) return;

    const sections = [];
    dots.forEach(d => {
      const id = d.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) sections.push({ dot: d, section: sec });
    });

    function update() {
      const pos = window.pageYOffset + 150;
      sections.forEach(({ dot, section }) => {
        const top = section.offsetTop;
        const bot = top + section.offsetHeight;
        if (pos >= top && pos < bot) {
          dots.forEach(d => d.classList.remove('active'));
          dot.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', update);
    update();
  })();

  /* ===== PROJECT REPO LINKS ===== */
  document.querySelectorAll('.project-card[data-repo]').forEach(card => {
    card.addEventListener('click', () => {
      const repo = card.getAttribute('data-repo');
      if (repo) window.open(repo, '_blank', 'noopener');
    });
  });

  /* ===== 3D TILT ===== */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      const rx = (y - cy) / cy * -6;
      const ry = (x - cx) / cx * 6;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ===== PROFICIENCY BARS ===== */
  (function() {
    const fills = document.querySelectorAll('.prof-fill');
    if (!fills.length) return;
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const fill = e.target;
          fill.style.width = fill.getAttribute('data-w') + '%';
          barObs.unobserve(fill);
        }
      });
    }, { threshold: 0.25 });
    fills.forEach(f => barObs.observe(f));
  })();

  /* ===== BACK TO TOP ===== */
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.pageYOffset > 500);
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ===== CERT MODAL ===== */
  (function() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const closeBtn = modal?.querySelector('.cert-modal-close');
    const overlay = modal?.querySelector('.cert-modal-overlay');

    document.querySelectorAll('.cert-card[data-cert]').forEach(card => {
      card.addEventListener('click', () => {
        const certFile = card.getAttribute('data-cert');
        modalImg.src = certFile;
        modalImg.alt = card.querySelector('h3')?.textContent || 'Certificate';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      modalImg.src = '';
      document.body.style.overflow = '';
    }
    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });
  })();

  /* ===== CONSOLE EASTER EGG ===== */
  console.log('%c Aniket Dulal Roy // Cybersecurity Portfolio ', 'background: #00ff41; color: #0a0e17; padding: 8px 16px; font-size: 14px; font-weight: bold; border-radius: 4px;');
  console.log('%c Securing digital frontiers — one vulnerability at a time.', 'color: #94a3b8; font-size: 12px;');

  /* ===== EASTER EGG — KONAMI CODE ===== */
  (function() {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    let seq = [];
    let unlocked = false;

    document.addEventListener('keydown', e => {
      if (unlocked) return;
      seq.push(e.key);
      if (seq.length > konami.length) seq.shift();
      if (seq.length === konami.length && seq.every((k, i) => k === konami[i])) {
        unlocked = true;
        triggerEgg();
      }
    });

    // Also allow typing 'hack' or 'admin' quickly
    let typed = '';
    document.addEventListener('keydown', e => {
      if (unlocked) return;
      if (e.key.length === 1) {
        typed += e.key.toLowerCase();
        if (typed.length > 10) typed = typed.slice(-10);
        if (typed.includes('hack') || typed.includes('admin')) {
          unlocked = true;
          triggerEgg();
        }
      }
    });

    function triggerEgg() {
      const overlay = document.getElementById('eggOverlay');
      const terminal = document.getElementById('eggTerminal');
      const reveal = document.getElementById('eggReveal');
      if (!overlay) return;

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      const lines = terminal.querySelectorAll('.egg-line');
      let maxDelay = 0;
      lines.forEach(line => {
        const d = parseInt(line.getAttribute('data-delay')) || 0;
        maxDelay = Math.max(maxDelay, d);
        setTimeout(() => line.classList.add('visible'), d);
      });

      setTimeout(() => {
        terminal.classList.add('done');
        reveal.classList.add('visible');
      }, maxDelay + 800);

      const closeBtn = document.getElementById('eggClose');
      const handleClose = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        terminal.classList.remove('done');
        reveal.classList.remove('visible');
        lines.forEach(l => l.classList.remove('visible'));
      };
      closeBtn?.addEventListener('click', handleClose);
      overlay.querySelector('.egg-bg')?.addEventListener('click', handleClose);
    }
  })();

  /* ===== PROJECT FILTER TABS ===== */
  const ftabs = document.getElementById('filterTabs');
  if (ftabs) {
    ftabs.querySelectorAll('.ftab').forEach(btn => {
      btn.addEventListener('click', () => {
        ftabs.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
          const show = f === 'all' || card.dataset.cat === f;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

});
