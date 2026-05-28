const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const themeToggle = document.querySelector(".theme-toggle");
const logoImg = document.querySelector(".logo img");
const folderSpines = document.querySelectorAll(".folder-spine");
const projectPanes = document.querySelectorAll(".project-pane");
const headsCard = document.getElementById("headsCard");
const headsWrap = document.querySelector(".heads-wrap");
const heads = document.querySelectorAll(".head");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const toTopBtn = document.querySelector(".to-top");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-image") : null;
const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
const lightboxBackdrop = lightbox ? lightbox.querySelector(".lightbox-backdrop") : null;
const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

const sunIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12m0-14.14-2.12 2.12m-9.9 9.9-2.12 2.12"></path>
  </svg>
`;

const moonIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5z"></path>
  </svg>
`;

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const setTheme = (theme) => {
  document.body.classList.toggle("light-theme", theme === "light");
  localStorage.setItem("theme", theme);
  if (logoImg) {
    const darkSrc = logoImg.dataset.darkSrc;
    const lightSrc = logoImg.dataset.lightSrc;
    if (darkSrc && lightSrc) {
      logoImg.src = theme === "light" ? lightSrc : darkSrc;
    }
  }
  if (themeToggle) {
    themeToggle.innerHTML = theme === "light" ? moonIcon : sunIcon;
    themeToggle.setAttribute("aria-label", `Переключить на ${theme === "light" ? "темную" : "светлую"} тему`);
  }
};

const storedTheme = localStorage.getItem("theme");
setTheme(storedTheme || "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    setTheme(isLight ? "dark" : "light");
  });
}

document.querySelectorAll(".magnetic, .btn").forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 7;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });

  element.addEventListener("pointerleave", () => {
    element.style.transform = "";
  });
});

folderSpines.forEach((spine) => {
  spine.addEventListener("click", () => {
    const projectId = spine.dataset.project;

    folderSpines.forEach((item) => item.classList.remove("active"));
    projectPanes.forEach((pane) => pane.classList.remove("active"));

    spine.classList.add("active");
    const activePane = document.getElementById(projectId);
    if (activePane) activePane.classList.add("active");

    const folderContent = document.querySelector(".folder-content");
    if (folderContent) {
      folderContent.style.transform = "scaleY(0.96)";
      folderContent.style.opacity = "0.85";
      requestAnimationFrame(() => {
        folderContent.style.transform = "scaleY(1)";
        folderContent.style.opacity = "1";
      });
    }
  });
});

if (headsCard && headsWrap && heads.length) {
  headsCard.addEventListener("pointermove", (event) => {
    const rect = headsCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    headsWrap.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -6}deg)`;

    heads.forEach((head, index) => {
      const intensity = (index + 1) * 3.3;
      head.style.transform = `translateZ(${14 + index * 8}px) rotateY(${x * intensity}deg) rotateX(${y * intensity}deg)`;
    });
  });

  headsCard.addEventListener("pointerleave", () => {
    headsWrap.style.transform = "rotateY(0deg) rotateX(0deg)";
    heads.forEach((head) => {
      head.style.transform = "translateZ(0) rotateY(0deg) rotateX(0deg)";
    });
  });
}

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Сообщение отправлено. Спасибо, скоро свяжусь с вами.";
    contactForm.reset();
  });
}

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImg || !lightboxCaption) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightboxCaption.textContent = alt || "";
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
};

if (lightboxBackdrop) {
  lightboxBackdrop.addEventListener("click", closeLightbox);
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

document.querySelectorAll(".gallery-item").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});

if (toTopBtn) {
  const toggleToTop = () => {
    const shouldShow = window.scrollY > 420;
    toTopBtn.classList.toggle("show", shouldShow);
  };

  window.addEventListener("scroll", toggleToTop, { passive: true });
  toggleToTop();

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
