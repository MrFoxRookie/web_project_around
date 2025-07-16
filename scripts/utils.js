//Manejan el comportamiento de los popups, abrir y cerrar//

export function handlePopupBehavior(button, form) {
  function _handleOpenPopup() {
    form.style.display = "flex";
    if (form.classList.contains("popup")) {
      const nameInput = form.querySelector("#name");
      const descriptionInput = form.querySelector("#description");
      const profileName = document.querySelector(".profile__name");
      const profileDescription = document.querySelector(
        ".profile__description"
      );
      nameInput.value = profileName.textContent;
      descriptionInput.value = profileDescription.textContent;
    } else if (form.classList.contains("popup-image")) {
      form.querySelector("#card-title").value = "";
      form.querySelector("#image-url").value = "";
    } else if (form.classList.contains("popup-cell")) {
      const popupImage = form.querySelector(".popup-cell__image");
      popupImage.src = button.src;
      popupImage.alt = button.alt;
      const popupTitle = form.querySelector(".popup-cell__title");
      const card = button.closest(".grid__cell");
      popupTitle.textContent = card.querySelector(
        ".grid__location-name"
      ).textContent;
    }
  }

  function _resetFormErrors() {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.classList.remove("form__input_invalid");
      const errorSpan = form.querySelector(`#${input.id}-error`);
      if (errorSpan) errorSpan.textContent = "";
    });
  }

  function _handleClosePopup(evt) {
    evt.preventDefault();
    form.style.display = "none";
    _resetFormErrors();
  }

  function _handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      _handleClosePopup(evt);
    }
  }

  function _handleClickOutside(evt) {
    if (evt.target === form) {
      _handleClosePopup(evt);
    }
  }

  button.addEventListener("click", _handleOpenPopup);
  const closeButton = form.querySelector(".form__close-button");
  closeButton.addEventListener("click", _handleClosePopup);
  document.addEventListener("keydown", _handleEscapeKey);
  form.addEventListener("mousedown", _handleClickOutside);

  return {
    open: _handleOpenPopup,
    close: _handleClosePopup,
  };
}
