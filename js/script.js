const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Menu mobile (hambúrguer) */
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
const burgerIcon = navBurger.querySelector('i');

function closeMobileMenu() {
  navLinks.classList.remove('nav-open');
  navBurger.setAttribute('aria-expanded', 'false');
  burgerIcon.classList.remove('ti-x');
  burgerIcon.classList.add('ti-menu-2');
}

navBurger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('nav-open');
  navBurger.setAttribute('aria-expanded', String(isOpen));
  burgerIcon.classList.toggle('ti-menu-2', !isOpen);
  burgerIcon.classList.toggle('ti-x', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

/* Navbar: sombra ao rolar + botão voltar ao topo */
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  scrollTopBtn.hidden = window.scrollY < 300;
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

/* Scrollspy: marca o link da seção visível como ativo */
const sections = document.querySelectorAll('section[id]');
const navAnchors = navLinks.querySelectorAll('a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navAnchors.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-64px 0px -60% 0px', threshold: 0 });

sections.forEach((section) => spyObserver.observe(section));

/* Scroll reveal bidirecional: aparece ao entrar e desaparece ao sair da viewport */
if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('reveal-visible', entry.isIntersecting);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

/* Click ripple */
if (!prefersReducedMotion) {
  document.addEventListener('click', (event) => {
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

/* Links de projetos em desenvolvimento */
document.querySelectorAll('.project-link-wip').forEach((btn) => {
  btn.addEventListener('click', () => {
    const msg = btn.nextElementSibling;
    msg.textContent = 'Projeto em desenvolvimento, em breve mais detalhes.';
    clearTimeout(btn._wipTimer);
    btn._wipTimer = setTimeout(() => { msg.textContent = ''; }, 4000);
  });
});

/* Formulário de contato via EmailJS */
emailjs.init('gS9u4kVthylEivk8c');

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const formSubmit = contactForm.querySelector('.form-submit');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (contactForm.querySelector('[name="honeypot"]').value) return;

  formSubmit.disabled = true;
  formSubmit.textContent = 'Enviando...';

  emailjs.sendForm('service_hteqejs', 'template_wyi46u5', contactForm)
    .then(() => {
      formStatus.hidden = false;
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
      contactForm.reset();
    })
    .catch(() => {
      formStatus.hidden = false;
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Não foi possível enviar a mensagem agora. Tente novamente mais tarde.';
    })
    .finally(() => {
      formSubmit.disabled = false;
      formSubmit.textContent = 'Enviar mensagem';
    });
});
