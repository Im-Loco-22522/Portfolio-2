const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const folderSpines = document.querySelectorAll(".folder-spine");
const projectPanes = document.querySelectorAll(".project-pane");
const headsCard = document.getElementById("headsCard");
const headsWrap = document.querySelector(".heads-wrap");
const heads = document.querySelectorAll(".head");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

folderSpines.forEach((spine) => {
  spine.addEventListener("click", () => {
    const projectId = spine.dataset.project;

    folderSpines.forEach((item) => item.classList.remove("active"));
    projectPanes.forEach((pane) => pane.classList.remove("active"));

    spine.classList.add("active");
    const activePane = document.getElementById(projectId);
    if (activePane) activePane.classList.add("active");
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
