document.addEventListener("DOMContentLoaded", function () {
  const hamburguer = document.querySelector(".hamburguer");
  const nav = document.querySelector(".nav");

  if (hamburguer && nav) {
    console.log("Hamburguer e nav encontrados.");
    hamburguer.addEventListener("click", () => {
      nav.classList.toggle("active");
      console.log("Menu hamburguer clicado. Classe 'active' toggled.");
    });
  } else {
    console.log("Hamburguer ou nav não encontrados!");
  }

  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.classList.toggle("active");
        console.log("Dropdown toggled em dispositivo mobile.");
      }
    });
  });
});