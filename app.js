// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) nav.classList.remove('open');
});

// Listings tab filter
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.property-card');

function showTab(type) {
  cards.forEach(card => {
    if (card.dataset.type === type) {
      card.classList.add('visible');
      card.style.display = 'flex';
    } else {
      card.classList.remove('visible');
      card.style.display = 'none';
    }
  });
}
showTab('sale');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showTab(tab.dataset.tab);
  });
});

// Contact form
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'שולח...';
  btn.disabled = true;
  setTimeout(() => {
    successMsg.classList.add('show');
    form.reset();
    btn.textContent = 'שלח הודעה';
    btn.disabled = false;
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 1000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    nav.classList.remove('open');
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .property-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
