/* ============================================
   🏋️ ULTIMATE FITNESS GUIDE V2 - JavaScript
   Navigation, Tabs, 3D Cards, Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDaySelector();
  initExerciseToggles();
  initScrollAnimations();
  initDownload();
  initProgressTracker();
  initSmoothScroll();
  init3DCardEffects();
});

/* Navigation */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (links.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    navLinks.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
  });
}

/* Day Selector */
function initDaySelector() {
  const dayCards = document.querySelectorAll('.day-card:not(.rest-day)');
  const dayDetails = document.querySelectorAll('.day-detail');

  dayCards.forEach(card => {
    card.addEventListener('click', () => {
      dayCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      dayDetails.forEach(d => {
        d.classList.toggle('active', d.dataset.day === card.dataset.day);
      });
    });
  });
  if (dayCards.length > 0) dayCards[0].click();
}

/* Exercise Toggle (Expand/Collapse) */
function initExerciseToggles() {
  document.querySelectorAll('.exercise-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      const isOpen = details.classList.contains('open');
      
      details.classList.toggle('open');
      btn.classList.toggle('open');
      btn.innerHTML = isOpen 
        ? '📖 Show Form Guide & Tips <span class="arrow">▼</span>'
        : '📕 Hide Details <span class="arrow">▼</span>';
    });
  });
}

/* 3D Card Tilt Effect on Mouse Move */
function init3DCardEffects() {
  document.querySelectorAll('.exercise-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* Scroll Animations */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* Download / Print */
function initDownload() {
  document.querySelectorAll('.btn-download, [data-action="download"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Show all hidden content for printing
      document.querySelectorAll('.day-detail').forEach(d => d.style.display = 'block');
      document.querySelectorAll('.exercise-details').forEach(d => d.style.display = 'block');
      window.print();
      setTimeout(() => {
        document.querySelectorAll('.day-detail').forEach(d => d.style.display = '');
        document.querySelectorAll('.exercise-details').forEach(d => d.style.display = '');
      }, 1000);
    });
  });
}

/* Progress Tracker */
function initProgressTracker() {
  const form = document.getElementById('progressForm');
  if (!form) return;

  const savedData = JSON.parse(localStorage.getItem('gymProgress') || '[]');
  renderProgressLog(savedData);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const entry = {
      date: fd.get('date') || new Date().toISOString().split('T')[0],
      weight: fd.get('weight'), chest: fd.get('chest'),
      arms: fd.get('arms'), waist: fd.get('waist'),
      notes: fd.get('notes'), timestamp: Date.now()
    };
    const data = JSON.parse(localStorage.getItem('gymProgress') || '[]');
    data.push(entry);
    localStorage.setItem('gymProgress', JSON.stringify(data));
    renderProgressLog(data);
    form.reset();
    showToast('✅ Progress saved!');
  });
}

function renderProgressLog(data) {
  const log = document.getElementById('progressLog');
  if (!log) return;
  if (data.length === 0) {
    log.innerHTML = '<p style="text-align:center; color:var(--text-muted);">No entries yet. Start tracking! 📊</p>';
    return;
  }
  log.innerHTML = data.slice(-5).reverse().map(e => `
    <div class="info-card" style="margin-bottom:1rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
        <strong>📅 ${e.date}</strong>
        <span style="color:var(--primary);font-weight:700;">${e.weight} kg</span>
      </div>
      <div style="display:flex;gap:1rem;font-size:0.85rem;color:var(--text-secondary);">
        ${e.chest ? `<span>Chest: ${e.chest}"</span>` : ''}
        ${e.arms ? `<span>Arms: ${e.arms}"</span>` : ''}
        ${e.waist ? `<span>Waist: ${e.waist}"</span>` : ''}
      </div>
      ${e.notes ? `<p style="margin-top:0.5rem;font-size:0.85rem;">${e.notes}</p>` : ''}
    </div>
  `).join('');
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);padding:12px 24px;background:var(--success);color:white;border-radius:10px;font-weight:600;z-index:9999;animation:fadeInUp 0.3s ease;box-shadow:0 4px 20px rgba(16,185,129,0.4);';
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2500);
}

/* Smooth Scroll */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
