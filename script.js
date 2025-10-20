// Loader de abertura
window.addEventListener('load', () => {
  document.getElementById('loader').style.display = 'none';
});

// Menu responsivo com animação
// Menu toggle - abre/fecha no mobile
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', (e) => {
    nav.classList.toggle('active');
    // alterna atributo aria-expanded para acessibilidade
    const expanded = nav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // fecha o menu quando clica em um link do menu (útil em mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) nav.classList.remove('active');
    });
  });

  // fecha se clicar fora do menu (opcional, melhora UX)
  document.addEventListener('click', (e) => {
    const isClickInside = nav.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInside && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });
}



// Scroll reveal simples
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-reveal]");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    elements.forEach(el => {
      const position = el.getBoundingClientRect().top;
      if (position < windowHeight - 100) {
        el.classList.add("revealed");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// Atualiza ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Confirmação visual após envio via Formspree
const orcamentoForm = document.getElementById('orcamentoForm');

if (orcamentoForm) {
  orcamentoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(this);

    fetch(this.action, {
      method: this.method,
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          alert('✅ Orçamento enviado com sucesso! Em breve entraremos em contato.');
          orcamentoForm.reset();
        } else {
          alert('❌ Ocorreu um erro ao enviar. Tente novamente.');
        }
      })
      .catch(() => alert('❌ Erro de conexão. Verifique sua internet.'));
  });
}

// ============================
// PORTFÓLIO INTERATIVO
// ============================
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

function updateCarousel() {
  const width = items[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);


