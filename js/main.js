// main.js

// Navbar active highlight and fade-in animation setup
document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    if (link.getAttribute('href') === path || (link.getAttribute('href') === 'index.html' && (path === '' || path === '/'))) {
      link.classList.add('active');
    }
  });

  // Fade-in animation for .fade-in elements
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeEls.forEach(el => observer.observe(el));
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Newsletter form validation
document.addEventListener('submit', function(e) {
  const form = e.target;
  if (form.querySelector('input[type="email"]')) {
    const email = form.querySelector('input[type="email"]').value;
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      e.preventDefault();
      alert('Please enter a valid email address.');
    }
  }
}, true);

// Scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '&uarr;';
scrollBtn.className = 'btn btn-dark scroll-top position-fixed';
scrollBtn.style.bottom = '30px';
scrollBtn.style.right = '30px';
scrollBtn.style.display = 'none';
scrollBtn.style.zIndex = '999';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  scrollBtn.style.display = (window.scrollY > 300) ? 'flex' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Portfolio filtering
document.querySelectorAll('.portfolio-filter').forEach(btn => {
  btn.addEventListener('click', function() {
    const filter = this.getAttribute('data-filter');
    document.querySelectorAll('.portfolio-item').forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.parentElement.style.display = 'block';
      } else {
        item.parentElement.style.display = 'none';
      }
    });
    // Active button style
    document.querySelectorAll('.portfolio-filter').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Newsletter modal on homepage after 5s
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  setTimeout(() => {
    const modalEl = document.getElementById('newsletterModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }, 5000);
}
