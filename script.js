/* ============================================================
   CHEEPSY — script.js
   ============================================================ */

// Nav scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// Smooth anchor scrolling with nav offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Entrance animations — fade + lift on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation styles dynamically so they don't flash before JS loads
const animStyle = document.createElement('style');
animStyle.textContent = `
  .anim {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .anim.delay-1 { transition-delay: 0.1s; }
  .anim.delay-2 { transition-delay: 0.2s; }
  .anim.delay-3 { transition-delay: 0.3s; }
  .anim.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(animStyle);

// Apply animation class to elements
const animTargets = [
  '.step',
  '.who-card',
  '.price-card',
  '.pain-list li',
  '.agnostic-bar',
  '.problem-text p',
];

animTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('anim');
    if (i === 1) el.classList.add('delay-1');
    if (i === 2) el.classList.add('delay-2');
    if (i === 3) el.classList.add('delay-3');
    observer.observe(el);
  });
});

// Form submission
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('signupForm');
  const success = document.getElementById('formSuccess');

  // Basic validation
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const company = form.querySelector('[name="company"]').value.trim();

  if (!name || !email || !company) return;

  // In production: POST to your backend / Mailchimp / Resend / Supabase here
  // Example:
  // fetch('/api/signup', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ name, email, company })
  // });

  form.style.display = 'none';
  success.classList.add('visible');

  // Log to console for now so you can see it works
  console.log('Demo request:', { name, email, company });
}
