const form = document.querySelector("form");
const titleInput = form.elements.title;
const descriptionInput = form.elements.description;

const customValidationTitleHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity("Minimal panjang adalah 5 karakter.");
    return;
  }
};

const customValidationDescriptionHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity("Minimal panjang adalah 10 karakter.");
    return;
  }
};

titleInput.addEventListener("change", customValidationTitleHandler);
titleInput.addEventListener("invalid", customValidationTitleHandler);

titleInput.addEventListener("blur", (event) => {
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;

  const connectedValidationId = event.target.getAttribute("aria-describedby");
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = "";
  }
});

descriptionInput.addEventListener("change", customValidationDescriptionHandler);
descriptionInput.addEventListener(
  "invalid",
  customValidationDescriptionHandler
);

descriptionInput.addEventListener("blur", (event) => {
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;

  const connectedValidationId = event.target.getAttribute("aria-describedby");
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = "";
  }
});