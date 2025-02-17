document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuContent = document.getElementById("mobileMenuContent");
  const menuIcon = mobileMenuBtn.querySelector("i");

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    menuIcon.className = isMenuOpen
      ? "ri-close-line text-xl"
      : "ri-menu-line text-xl";

    mobileMenuContent.style.opacity = isMenuOpen ? "1" : "0";
    mobileMenuContent.style.transform = isMenuOpen
      ? "translateY(0)"
      : "translateY(-8px)";
    mobileMenuContent.style.pointerEvents = isMenuOpen ? "auto" : "none";
  }

  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", function (e) {
    if (
      isMenuOpen &&
      !mobileMenuContent.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      toggleMenu();
    }
  });
});

const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) =>
    indicator.classList.remove("bg-white", "bg-white/50")
  );

  slides[index].classList.add("active");
  indicators[index].classList.add("bg-white");

  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => showSlide(index));
});

setInterval(nextSlide, 3000);

showSlide(0);

function atualizarProximoCulto() {
  const agora = new Date();
  let proximoCulto = new Date();

  const diaSemanaAtual = agora.getDay();

  let diasAteQuarta = 3 - diaSemanaAtual;
  if (diasAteQuarta <= 0) diasAteQuarta += 7;
  const proxQuarta = new Date(agora);
  proxQuarta.setDate(agora.getDate() + diasAteQuarta);
  proxQuarta.setHours(19, 30, 0, 0);

  let diasAteDomingo = 0 - diaSemanaAtual;
  if (diasAteDomingo <= 0) diasAteDomingo += 7;
  const proxDomingo = new Date(agora);
  proxDomingo.setDate(agora.getDate() + diasAteDomingo);
  proxDomingo.setHours(18, 0, 0, 0);

  if (
    diaSemanaAtual === 3 &&
    agora < proxQuarta.getTime() - 7 * 24 * 60 * 60 * 1000
  ) {
    proxQuarta.setDate(proxQuarta.getDate() - 7);
  }

  if (
    diaSemanaAtual === 0 &&
    agora < proxDomingo.getTime() - 7 * 24 * 60 * 60 * 1000
  ) {
    proxDomingo.setDate(proxDomingo.getDate() - 7);
  }

  if (proxQuarta < proxDomingo) {
    proximoCulto = proxQuarta;
    document.getElementById("proximo-dia").textContent = "Quarta-feira, 19:30";
    document.getElementById("tipo-culto").textContent =
      "Culto de estudos doutrinários";
  } else {
    proximoCulto = proxDomingo;
    document.getElementById("proximo-dia").textContent = "Domingo, 18:00";
    document.getElementById("tipo-culto").textContent = "Culto Evangelístico";
  }

  if (proximoCulto < agora) {
    if (proximoCulto === proxQuarta) {
      proximoCulto = proxDomingo;
      document.getElementById("proximo-dia").textContent = "Domingo, 18:00";
      document.getElementById("tipo-culto").textContent = "Culto Evangelístico";
    } else {
      proximoCulto = new Date(proxQuarta);
      document.getElementById("proximo-dia").textContent =
        "Quarta-feira, 19:30";
      document.getElementById("tipo-culto").textContent =
        "Culto de estudos doutrinários";
    }
  }

  return proximoCulto;
}

function atualizarCountdown() {
  const proximoCulto = atualizarProximoCulto();
  const agora = new Date();

  const diff = proximoCulto - agora;

  if (diff <= 0) {
    document.getElementById("countdown").textContent = "Acontecendo agora!";
    setTimeout(atualizarCountdown, 60000);
    return;
  }

  const horas = Math.floor(diff / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);

  const horasFormatadas = String(horas).padStart(2, "0");
  const minutosFormatados = String(minutos).padStart(2, "0");
  const segundosFormatados = String(segundos).padStart(2, "0");

  document.getElementById(
    "countdown"
  ).textContent = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados} horas`;

  setTimeout(atualizarCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", atualizarCountdown);

document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popupComoChegar');
    const botaoFechar = document.getElementById('fecharPopup');
    const videoFrame = document.getElementById('videoComoChegar');
    
    const videoUrl =
      "https://www.youtube.com/embed/sassasas";
    
    function abrirPopup() {
        videoFrame.src = videoUrl;
        popup.classList.remove('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'hidden';
    }
    
    function fecharPopup() {
        popup.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            videoFrame.src = ''; 
        }, 300);
        document.body.style.overflow = '';
    }
    
    const botoesComoChegar = Array.from(document.querySelectorAll('button')).filter(botao => {
        return botao.textContent.trim() === 'Como Chegar';
    });
    
    if (botoesComoChegar.length > 0) {
        botoesComoChegar.forEach(botao => {
            botao.addEventListener('click', abrirPopup);
        });
    } else {
        console.error('Botão "Como Chegar" não encontrado');
    }
    
    if (botaoFechar) {
        botaoFechar.addEventListener('click', fecharPopup);
    } else {
        console.error('Botão de fechar popup não encontrado');
    }
    
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            fecharPopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !popup.classList.contains('opacity-0')) {
            fecharPopup();
        }
    });
        

    console.log(`Encontrados ${botoesComoChegar.length} botões "Como Chegar"`);
});