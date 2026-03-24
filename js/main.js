/**
 * main.js — Hotel Pousada Romelândia
 * Efeitos: Parallax hero, Sticky nav, Fade-in-up scroll, Hamburger menu,
 *          GLightbox, Formulário reserva → WhatsApp
 */

/* ====================================================
   1. STICKY NAV COM BLUR AO SCROLLAR
   ==================================================== */
(function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function atualizarNav() {
    if (window.scrollY > 40) {
      navbar.classList.add('com-scroll');
    } else {
      navbar.classList.remove('com-scroll');
    }
  }

  window.addEventListener('scroll', atualizarNav, { passive: true });
  atualizarNav(); // roda no carregamento
})();


/* ====================================================
   2. PARALLAX NO HERO (JS para mobile-safe)
   ==================================================== */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  // Desativa no mobile para evitar glitch no iOS
  const ehMobile = () => window.innerWidth < 768;

  function aplicarParallax() {
    if (ehMobile()) {
      heroBg.style.transform = '';
      return;
    }
    const scrollY = window.scrollY;
    // Fator 0.4 = 40% da velocidade do scroll
    heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
  }

  window.addEventListener('scroll', aplicarParallax, { passive: true });
  window.addEventListener('resize', aplicarParallax, { passive: true });
})();


/* ====================================================
   3. FADE-IN-UP AO SCROLL (IntersectionObserver)
   ==================================================== */
(function initFadeInUp() {
  const elementos = document.querySelectorAll('.fade-in-up');
  if (!elementos.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visivel');
          // Para de observar após animar (performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,       // aciona quando 12% do elemento está visível
      rootMargin: '0px 0px -40px 0px' // margem inferior negativa para animar um pouco antes
    }
  );

  elementos.forEach((el) => observer.observe(el));
})();


/* ====================================================
   4. MENU HAMBURGER — MOBILE
   ==================================================== */
(function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.navbar-menu-mobile');
  const navbar = document.querySelector('.navbar');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const aberto = btn.classList.toggle('aberto');
    menu.classList.toggle('aberto', aberto);
    // Garante que a navbar fique opaca quando o menu está aberto
    navbar.classList.toggle('com-scroll', aberto || window.scrollY > 40);
    // Acessibilidade
    btn.setAttribute('aria-expanded', String(aberto));
  });

  // Fecha ao clicar em qualquer link do menu mobile
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      btn.classList.remove('aberto');
      menu.classList.remove('aberto');
      btn.setAttribute('aria-expanded', 'false');
      if (window.scrollY <= 40) navbar.classList.remove('com-scroll');
    });
  });

  // Fecha ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) {
      btn.classList.remove('aberto');
      menu.classList.remove('aberto');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ====================================================
   5. GLIGHTBOX — GALERIA DE FOTOS
   ==================================================== */
(function initLightbox() {
  // Aguarda o GLightbox carregar via CDN
  if (typeof GLightbox === 'undefined') return;

  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    openEffect: 'fade',
    closeEffect: 'fade',
    slideEffect: 'slide',
    plyr: {
      css: 'https://cdn.plyr.io/3.7.8/plyr.css',
      js: 'https://cdn.plyr.io/3.7.8/plyr.js',
    },
  });
})();

// O GLightbox é carregado via CDN, então inicializamos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      openEffect: 'fade',
      closeEffect: 'fade',
    });
  }
});


/* ====================================================
   6. FORMULÁRIO DE RESERVA → REDIRECT WHATSAPP
   ==================================================== */
(function initFormReserva() {
  const form = document.getElementById('form-reserva');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Coleta os dados do formulário
    const nome       = form.querySelector('[name="nome"]')?.value.trim()       || '';
    const telefone   = form.querySelector('[name="telefone"]')?.value.trim()    || '';
    const chegada    = form.querySelector('[name="chegada"]')?.value            || '';
    const saida      = form.querySelector('[name="saida"]')?.value              || '';
    const hospedes   = form.querySelector('[name="hospedes"]')?.value           || '';
    const quarto     = form.querySelector('[name="quarto"]')?.value             || '';
    const observacao = form.querySelector('[name="observacao"]')?.value.trim()  || '';

    // Formata data BR
    const formatarData = (isoDate) => {
      if (!isoDate) return '-';
      const [ano, mes, dia] = isoDate.split('-');
      return `${dia}/${mes}/${ano}`;
    };

    // Monta a mensagem para o WhatsApp
    let msg = `Olá! Gostaria de fazer uma reserva:%0A%0A`;
    msg += `👤 *Nome:* ${nome}%0A`;
    if (telefone) msg += `📱 *WhatsApp:* ${telefone}%0A`;
    msg += `🏨 *Quarto:* ${quarto}%0A`;
    msg += `📅 *Chegada:* ${formatarData(chegada)}%0A`;
    msg += `📅 *Saída:* ${formatarData(saida)}%0A`;
    msg += `👥 *Hóspedes:* ${hospedes}%0A`;
    if (observacao) msg += `📝 *Obs:* ${observacao}%0A`;

    const numero = '5549984008534';
    const url = `https://wa.me/${numero}?text=${msg}`;

    window.open(url, '_blank', 'noopener,noreferrer');

    // Mostra mensagem de sucesso
    const sucesso = document.getElementById('form-sucesso');
    if (sucesso) {
      sucesso.classList.add('visivel');
      sucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
})();


/* ====================================================
   7. FORMULÁRIO DE CONTATO → REDIRECT WHATSAPP
   ==================================================== */
(function initFormContato() {
  const form = document.getElementById('form-contato');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome      = form.querySelector('[name="nome"]')?.value.trim()    || '';
    const email     = form.querySelector('[name="email"]')?.value.trim()   || '';
    const assunto   = form.querySelector('[name="assunto"]')?.value.trim() || '';
    const mensagem  = form.querySelector('[name="mensagem"]')?.value.trim()|| '';

    let msg = `Olá! Entrei em contato pelo site:%0A%0A`;
    msg += `👤 *Nome:* ${nome}%0A`;
    msg += `📧 *E-mail:* ${email}%0A`;
    if (assunto) msg += `📌 *Assunto:* ${assunto}%0A`;
    if (mensagem) msg += `💬 *Mensagem:* ${mensagem}%0A`;

    const numero = '5549984008534';
    const url = `https://wa.me/${numero}?text=${msg}`;

    window.open(url, '_blank', 'noopener,noreferrer');

    const sucesso = document.getElementById('contato-sucesso');
    if (sucesso) {
      sucesso.classList.add('visivel');
      sucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
})();


/* ====================================================
   8. LINK ATIVO NA NAVEGAÇÃO
   ==================================================== */
(function marcarNavAtivo() {
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .navbar-menu-mobile a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === pagina || (pagina === '' && href === 'index.html')) {
      link.classList.add('ativo');
    }
  });
})();
