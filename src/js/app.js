document.addEventListener("DOMContentLoaded", function () {
  const e = document.getElementById("mobileMenuBtn"),
    t = document.getElementById("mobileMenuContent"),
    n = e.querySelector("i");
  let o = !1;
  function i() {
    (o = !o),
      (n.className = o ? "ri-close-line text-xl" : "ri-menu-line text-xl"),
      (t.style.opacity = o ? "1" : "0"),
      (t.style.transform = o ? "translateY(0)" : "translateY(-8px)"),
      (t.style.pointerEvents = o ? "auto" : "none");
  }
  e.addEventListener("click", function (e) {
    e.stopPropagation(), i();
  }),
    document.addEventListener("click", function (e) {
      o && !t.contains(e.target) && !e.contains(e.target) && i();
    });
});
const carousel = document.getElementById("carousel"),
  slides = document.querySelectorAll(".carousel-slide"),
  indicators = document.querySelectorAll(".indicator"),
  prevBtn = document.getElementById("prevBtn"),
  nextBtn = document.getElementById("nextBtn");
let currentSlide = 0;
function showSlide(e) {
  slides.forEach((e) => e.classList.remove("active")),
    indicators.forEach((e) => e.classList.remove("bg-white", "bg-white/50")),
    slides[e].classList.add("active"),
    indicators[e].classList.add("bg-white"),
    (currentSlide = e);
}
function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}
function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}
function atualizarProximoCulto() {
  const e = new Date();
  let t = new Date();
  const n = e.getDay();
  let o = 3 - n;
  o <= 0 && (o += 7);
  const i = new Date(e);
  i.setDate(e.getDate() + o), i.setHours(19, 30, 0, 0);
  let r = 0 - n;
  r <= 0 && (r += 7);
  const a = new Date(e);
  return (
    a.setDate(e.getDate() + r),
    a.setHours(18, 0, 0, 0),
    3 === n && e < i.getTime() - 6048e5 && i.setDate(i.getDate() - 7),
    0 === n && e < a.getTime() - 6048e5 && a.setDate(a.getDate() - 7),
    i < a
      ? ((t = i),
        (document.getElementById("proximo-dia").textContent =
          "Quarta-feira, 19:30"),
        (document.getElementById("tipo-culto").textContent =
          "Culto de estudos doutrinários"))
      : ((t = a),
        (document.getElementById("proximo-dia").textContent = "Domingo, 18:00"),
        (document.getElementById("tipo-culto").textContent =
          "Culto Evangelístico")),
    t < e &&
      (t === i
        ? ((t = a),
          (document.getElementById("proximo-dia").textContent =
            "Domingo, 18:00"),
          (document.getElementById("tipo-culto").textContent =
            "Culto Evangelístico"))
        : ((t = new Date(i)),
          (document.getElementById("proximo-dia").textContent =
            "Quarta-feira, 19:30"),
          (document.getElementById("tipo-culto").textContent =
            "Culto de estudos doutrinários"))),
    t
  );
}
function atualizarCountdown() {
  const e = atualizarProximoCulto(),
    t = new Date(),
    n = e - t;
  if (n <= 0)
    return (
      (document.getElementById("countdown").textContent = "Acontecendo agora!"),
      void setTimeout(atualizarCountdown, 6e4)
    );
  const o = Math.floor(n / 36e5),
    i = Math.floor((n % 36e5) / 6e4),
    r = Math.floor((n % 6e4) / 1e3),
    a = String(o).padStart(2, "0"),
    s = String(i).padStart(2, "0"),
    c = String(r).padStart(2, "0");
  (document.getElementById("countdown").textContent = `${a}:${s}:${c} horas`),
    setTimeout(atualizarCountdown, 1e3);
}
function initCarouselGC(e) {
  const t = document.querySelector(e);
  if (!t) return;
  const n = t.querySelectorAll(".carousel-slide-gc");
  let o = 0;
  function i(e) {
    n.forEach((t, n) => {
      n === e
        ? (t.classList.add("active"),
          (t.style.opacity = "1"),
          (t.style.transform = "translateX(0)"))
        : (t.classList.remove("active"),
          (t.style.opacity = "0"),
          (t.style.transform = "translateX(100%)"));
    });
  }
  function r() {
    (o = (o + 1) % n.length), i(o);
  }
  function a() {
    (o = (o - 1 + n.length) % n.length), i(o);
  }
  const s = document.createElement("button");
  (s.className =
    "absolute left-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors z-[2] bg-black/30 hover:bg-black/50 p-1 rounded-full"),
    (s.innerHTML = '<i class="ri-arrow-left-s-line text-xl"></i>'),
    t.appendChild(s);
  const c = document.createElement("button");
  (c.className =
    "absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors z-[2] bg-black/30 hover:bg-black/50 p-1 rounded-full"),
    (c.innerHTML = '<i class="ri-arrow-right-s-line text-xl"></i>'),
    t.appendChild(c),
    s.addEventListener("click", a),
    c.addEventListener("click", r);
  let l = 0,
    d = 0;
  t.addEventListener("touchstart", (e) => {
    l = e.changedTouches[0].screenX;
  }),
    t.addEventListener("touchend", (e) => {
      (d = e.changedTouches[0].screenX), l - d > 50 ? r() : d - l > 50 && a();
    });
  let u = setInterval(r, 5e3);
  t.addEventListener("mouseenter", () => {
    clearInterval(u);
  }),
    t.addEventListener("mouseleave", () => {
      u = setInterval(r, 5e3);
    }),
    n.forEach((e, t) => {
      0 === t
        ? ((e.style.opacity = "1"), (e.style.transform = "translateX(0)"))
        : ((e.style.opacity = "0"), (e.style.transform = "translateX(100%)")),
        (e.style.transition = "all 0.5s ease"),
        (e.style.position = "absolute"),
        (e.style.top = "0"),
        (e.style.left = "0"),
        (e.style.width = "100%"),
        (e.style.height = "100%");
    });
}
nextBtn.addEventListener("click", nextSlide),
  prevBtn.addEventListener("click", prevSlide),
  indicators.forEach((e, t) => {
    e.addEventListener("click", () => showSlide(t));
  }),
  setInterval(nextSlide, 3e3),
  showSlide(0),
  document.addEventListener("DOMContentLoaded", atualizarCountdown),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.getElementById("popupComoChegar"),
      t = document.getElementById("fecharPopup"),
      n = document.getElementById("videoComoChegar"),
      o = "https://www.youtube.com/embed/sassasas";
    function i() {
      (n.src = o),
        e.classList.remove("opacity-0", "pointer-events-none"),
        (document.body.style.overflow = "hidden");
    }
    function r() {
      e.classList.add("opacity-0", "pointer-events-none"),
        setTimeout(() => {
          n.src = "";
        }, 300),
        (document.body.style.overflow = "");
    }
    const a = Array.from(document.querySelectorAll("button")).filter(
      (e) => "Como Chegar" === e.textContent.trim()
    );
    a.length > 0
      ? a.forEach((e) => {
          e.addEventListener("click", i);
        })
      : console.error('Botão "Como Chegar" não encontrado'),
      t
        ? t.addEventListener("click", r)
        : console.error("Botão de fechar popup não encontrado"),
      e.addEventListener("click", function (t) {
        t.target === e && r();
      }),
      document.addEventListener("keydown", function (t) {
        "Escape" === t.key && !e.classList.contains("opacity-0") && r();
      }),
      console.log(`Encontrados ${a.length} botões "Como Chegar"`);
  }),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.querySelector("[data-share-horarios]"),
      t = document.getElementById("horarios-compartilhar");
    e &&
      t &&
      e.addEventListener("click", async function () {
        try {
          const e = document.createElement("div");
          (e.style.position = "fixed"),
            (e.style.top = "0"),
            (e.style.left = "0"),
            (e.style.zIndex = "-9999"),
            (e.style.width = "600px"),
            (e.style.height = "400px"),
            (e.innerHTML =
              '\n                <div class="w-[600px] h-[400px] bg-white p-8 rounded-xl" style="font-family: \'Poppins\', sans-serif; background-color: #FFFFFF;">\n                    <div class="h-full flex flex-col items-center justify-between relative rounded-lg overflow-hidden" style="background-color: #000000;">\n                        <div style="position: absolute; inset: 0; background-color: rgba(0,0,0,0.6);"></div>\n                        \n                        <div style="position: relative; z-index: 10; text-align: center; padding-top: 2rem;">\n                            <h2 style="font-size: 24px; font-weight: 700; color: #FFFFFF; margin-bottom: 0.5rem;">Horários dos Cultos</h2>\n                            <p style="color: #D1D5DB;">Uma casa para você!</p>\n                        </div>\n                        \n                        <div style="position: relative; z-index: 10; text-align: center; padding-bottom: 2rem;">\n                            <div style="margin-bottom: 1.5rem;">\n                                <h3 style="font-size: 20px; font-weight: 700; color: #FFFFFF; margin-bottom: 0.5rem;">Domingo - 18h</h3>\n                                <p style="color: #D1D5DB;">Culto Evangelístico</p>\n                            </div>\n                            \n                            <div style="margin-bottom: 1.5rem;">\n                                <h3 style="font-size: 20px; font-weight: 700; color: #FFFFFF; margin-bottom: 0.5rem;">Quarta - 19h30</h3>\n                                <p style="color: #D1D5DB;">Culto de Estudos Doutrinários</p>\n                            </div>\n                            \n                            <div style="font-size: 14px; color: #D1D5DB; margin-top: 1rem;">\n                                <p>Rua Educador Marcos Antônio da Silva, 75</p>\n                                <p>Cajá, Vitória de Santo Antão, PE</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            '),
            document.body.appendChild(e),
            await new Promise((e) => setTimeout(e, 100));
          const t = await html2canvas(e, {
              scale: 2,
              logging: !1,
              backgroundColor: "#FFFFFF",
            }),
            n = await new Promise((e) => t.toBlob(e, "image/png", 1));
          if (!n) throw new Error("Falha ao gerar imagem");
          const o = new File([n], "horarios-ongrace.png", {
            type: "image/png",
          });
          if (navigator.share && navigator.canShare({ files: [o] }))
            await navigator.share({
              title: "Horários dos Cultos - On Grace",
              text: "Confira os horários dos nossos cultos!",
              files: [o],
            });
          else {
            const e = document.createElement("a");
            (e.href = t.toDataURL("image/png")),
              (e.download = "horarios-ongrace.png"),
              document.body.appendChild(e),
              e.click(),
              document.body.removeChild(e);
          }
          document.body.removeChild(e);
        } catch (e) {
          console.error("Erro ao compartilhar:", e),
            alert(
              "Não foi possível compartilhar os horários. Por favor, tente novamente."
            );
        }
      });
  }),
  document.addEventListener("DOMContentLoaded", () => {
    initCarouselGC(".carousel-gc-obras"), initCarouselGC(".carousel-gc-casais");
  });
const styleGC = document.createElement("style");
(styleGC.textContent =
  "\n    .carousel-slide-gc {\n        display: none;\n    }\n    \n    .carousel-slide-gc.active {\n        display: block;\n    }\n"),
  document.head.appendChild(styleGC);
