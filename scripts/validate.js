// Proyecto #9 //
function enableValidation() {
  const formElements = document.querySelectorAll(".form");

  formElements.forEach((form) => {
    const inputElements = Array.from(form.querySelectorAll("input"));
    const buttonElement = form.querySelector(".buttonclase");
    validateInputs(inputElements);
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });

  function showInputError(evt) {
    evt.target.classList.add("form__input_type_error");
    const spanError = document.querySelector(`#${evt.target.id}-error`);
    spanError.classList.add("form__input-error");
    spanError.textContent = evt.target.validationMessage;
  }

  //Borrar span anterior//
  function hideInputError(evt) {
    evt.target.classList.remove("form__input_type_error");
    const spanError = document.querySelector(`#${evt.target.id}-error`);
    spanError.textContent = "";
  }

  function validateInputs(inputElements) {
    inputElements.forEach((input) => {
      input.addEventListener("input", function (evt) {
        if (!evt.target.validity.valid) {
          showInputError(evt);
        } else {
          hideInputError(evt);
        }
      });
    });
  }
}
enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error",
});

//Función para eliminar spans de validacion una vez cerrados los popups//
function clearFormErrors(popupElement) {
  const errorSpans = popupElement.querySelectorAll(".form__input-error");
  const errorInputs = popupElement.querySelectorAll(".form__input_type_error");
  errorSpans.forEach((span) => {
    span.textContent = "";
    span.classList.remove("form__input-error");
  });
  errorInputs.forEach((input) => {
    input.classList.remove("form__input_type_error");
  });
}

export { clearFormErrors };
export { enableValidation };
