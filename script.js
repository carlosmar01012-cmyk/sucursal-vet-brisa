"use strict";

const filters = document.querySelectorAll("[data-filter]");
const guides = document.querySelectorAll("[data-species]");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visible = 0;

    filters.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    guides.forEach((guide) => {
      const show =
        filter === "todos" ||
        guide.dataset.species === "ambos" ||
        guide.dataset.species === filter;

      guide.hidden = !show;
      if (show) visible++;
    });

    document.querySelector("#filter-status").textContent =
      `${visible} guías disponibles`;
  });
});

document.querySelectorAll(".quiz article").forEach((card) => {
  card.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      card.querySelectorAll("[data-answer]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });

      const feedback = card.querySelector(".feedback");
      const explanation = card.querySelector(".explanation");

      feedback.textContent =
        button.dataset.answer === "correcto"
          ? "¡Correcto!"
          : "Revisa esta explicación:";

      feedback.hidden = false;
      explanation.hidden = false;
    });
  });
});

document.querySelector("#reset").addEventListener("click", () => {
  document.querySelectorAll(".quiz article").forEach((card) => {
    card.querySelectorAll("[data-answer]").forEach((button) => {
      button.setAttribute("aria-pressed", "false");
    });
    card.querySelector(".feedback").hidden = true;
    card.querySelector(".explanation").hidden = true;
  });
});