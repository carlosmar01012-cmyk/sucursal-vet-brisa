"use strict";

document.body.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#navigation");

function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menú";
}

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Cerrar" : "Menú";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});

const serviceSelect = document.querySelector("#visit-service");

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

const form = document.querySelector("#visit-form");
const summaryPanel = document.querySelector("#summary-panel");
const summary = document.querySelector("#visit-summary");
const copyStatus = document.querySelector("#copy-status");

form.addEventListener("input", () => {
  summaryPanel.hidden = true;
  copyStatus.textContent = "";
});

form.addEventListener("change", () => {
  summaryPanel.hidden = true;
  copyStatus.textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("#pet-name");
  const notesInput = document.querySelector("#visit-notes");

  const name = nameInput.value.trim();
  const notes = notesInput.value.trim();

  nameInput.setCustomValidity(name ? "" : "Escribe el nombre de tu mascota.");
  notesInput.setCustomValidity(notes ? "" : "Escribe tus observaciones o preguntas.");

  if (!form.reportValidity()) {
    return;
  }

  const species = document.querySelector("#pet-species").value;
  const service = serviceSelect.value;

  summary.textContent = [
    "FICHA PARA MI VISITA",
    "",
    `Mascota: ${name}`,
    `Especie: ${species}`,
    `Tema: ${service}`,
    "",
    "Observaciones y preguntas:",
    notes,
    "",
    "Esta ficha no confirma una cita ni constituye una evaluación médica."
  ].join("\n");

  summaryPanel.hidden = false;
  copyStatus.textContent = "Resumen preparado. Puedes copiarlo o seleccionar el texto.";
});

document.querySelectorAll("#pet-name, #visit-notes").forEach((input) => {
  input.addEventListener("input", () => input.setCustomValidity(""));
});

document.querySelector("#copy-summary").addEventListener("click", async () => {
  try {
    if (!navigator.clipboard) {
      throw new Error("Portapapeles no disponible");
    }

    await navigator.clipboard.writeText(summary.textContent);
    copyStatus.textContent = "Resumen copiado.";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(summary);
    selection.removeAllRanges();
    selection.addRange(range);

    copyStatus.textContent =
      "El navegador no permitió copiar automáticamente. El texto está seleccionado: usa Ctrl + C o la opción Copiar de tu celular.";
  }
});