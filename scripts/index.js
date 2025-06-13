// Proyecto #7 //

const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupInputName = document.querySelector(".popup__input-name");
const popupInputDescription = document.querySelector(
  ".popup__input-description"
);
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
const form = document.querySelector(".popup__container");

popupInputName.value = profileName.textContent;
popupInputDescription.value = profileAboutMe.textContent;

function openProfilePopup() {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlePopupEscKey);
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileAboutMe.textContent;
}

function closeProfilePopup() {
  popup.classList.remove("popup_opened");
  clearFormErrors(popup);
}

function handleProfileFormSubmit(evt) {
  // Validacion de requerimientos del input
  const nameValidation = popupInputName.value.trim().length;
  const descriptionValidation = popupInputDescription.value.trim().length;
  if (
    nameValidation < 2 ||
    nameValidation > 40 ||
    descriptionValidation < 2 ||
    descriptionValidation > 200
  ) {
    // No hace nada si no pasa la validación
  } else {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAboutMe.textContent = popupInputDescription.value;
    closeProfilePopup();
  }
}

profileEditButton.addEventListener("click", openProfilePopup);

popupCloseButton.addEventListener("click", closeProfilePopup);

form.addEventListener("submit", handleProfileFormSubmit);

//Cerrar popup con click afuera//
popup.addEventListener("mousedown", function (evt) {
  if (evt.target === popup) {
    closeProfilePopup();
  }
});
//Cerrar popup con tecla Esc//
function handlePopupEscKey(evt) {
  if (evt.key === "Escape") {
    closeProfilePopup();
    document.removeEventListener("keydown", handlePopupEscKey);
  }
}

// Proyecto #8 //

const templateCard = document.querySelector("#template-card");
const grid = document.querySelector(".grid");
const addImageButton = document.querySelector(".profile__add-container");
const popupImage = document.querySelector(".popup-image");
const imageAddButton = document.querySelector(".profile__add-container");
const imageForm = document.querySelector(".popup-image__container");
const popupImageCloseButton = document.querySelector(
  ".popup-image__close-button"
);
const popupImageInputTitle = document.querySelector(
  ".popup-image__input-title"
);
const popupImageInputUrl = document.querySelector(".popup-image__input-url");
const cellPopup = document.querySelector(".cell-popup");
const cellPopupImage = cellPopup.querySelector(".cell-popup__image");
const cellPopupTitle = cellPopup.querySelector(".cell-popup__title");
const cellPopupImageCloseButton = cellPopup.querySelector(
  ".cell-popup__close-button"
);

// Función para cerrar popups con tecla Esc
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(
      '.popup-image[style="display: flex;"], .cell-popup[style="display: flex;"]'
    );
    if (openPopup) {
      openPopup.style.display = "none";
      clearFormErrors(openPopup);
      imageForm.reset();
    }
  }
}

// Agregar event listener para ESC
document.addEventListener("keydown", handleEscKey);

const initialCards = [
  {
    name: "Bosque Arashiyama",
    link: "./images/Bosque-de-Bambú-de-Arashiyama.jpg",
  },
  {
    name: "Cataratas Victoria",
    link: "./images/Cataratas-Victoria.jpg",
  },
  {
    name: "Cañon del Sumidero",
    link: "./images/Cañon-del-Sumidero.jpg",
  },
  {
    name: "Desierto de Atacama",
    link: "./images/Desierto-de-Atacama.jpg",
  },
  {
    name: "Cueva de Postojna",
    link: "./images/Postojna.jpg",
  },
  {
    name: "Bosque Schwarzwald",
    link: "./images/Schwarzwald.jpg",
  },
];

initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});

function createCard(title, link) {
  const gridCell = templateCard.content
    .querySelector(".grid__cell")
    .cloneNode(true);
  const gridLocationName = gridCell.querySelector(".grid__location-name");
  const gridImage = gridCell.querySelector(".grid__image");

  gridLocationName.textContent = title;
  gridImage.src = link;
  grid.prepend(gridCell);
  gridImage.alt = title;

  // Activar boton para eliminar imagen
  const gridDeleteButton = gridCell.querySelector(".grid__delete-button");
  gridDeleteButton.addEventListener("click", function () {
    gridCell.remove();
  });

  // Activar y desactivar boton de like
  const gridLikeButton = gridCell.querySelector(".grid__like-button");
  gridLikeButton.addEventListener("click", function () {
    if (this.src.includes("/images/like-button.svg")) {
      this.src = "./images/like-button_active.svg";
    } else {
      this.src = "./images/like-button.svg";
    }
  });

  // Abrir popup de imagen
  function openGridImagePopup() {
    cellPopup.style.display = "flex";
    cellPopupImage.src = gridImage.src;
    cellPopupImage.alt = title;
    cellPopupTitle.textContent = title;
  }

  gridImage.addEventListener("click", openGridImagePopup);

  // Cerrar popup de imagen
  function closeGridPopupImage() {
    cellPopup.style.display = "none";
  }
  //Cerrar popup de imagen con el boton de cierre//
  cellPopupImageCloseButton.addEventListener("click", closeGridPopupImage);

  // Cerrar popups con click afuera
  popupImage.addEventListener("mousedown", function (evt) {
    if (evt.target === popupImage) {
      popupImage.style.display = "none";
      clearFormErrors(popupImage);
      imageForm.reset();
    }
  });

  cellPopup.addEventListener("mousedown", function (evt) {
    if (evt.target === cellPopup) {
      cellPopup.style.display = "none";
      clearFormErrors(popupImage);
    }
  });
}

// Abrir popup para agregar imagen
imageAddButton.addEventListener("click", function () {
  popupImage.style.display = "flex";
  imageForm.reset();
  clearFormErrors(popupImage);
});

// Cerrar popup para agregar imagen con boton de cierre//
popupImageCloseButton.addEventListener("click", function () {
  popupImage.style.display = "none";
  clearFormErrors(popupImage);
  imageForm.reset();
});

// Submit para agregar imagen
function handleAddImageSubmit(evt) {
  evt.preventDefault();
  //Validador de Imagen/Url)
  const titleValue = popupImageInputTitle.value.trim();
  const urlValue = popupImageInputUrl.value.trim();
  const titleValidation = titleValue.length;
  function isValidUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (err) {
      return false;
    }
  }
  if (titleValidation < 2 || titleValidation > 30 || !isValidUrl(urlValue)) {
    return;
  } else {
    const newCell = {
      name: popupImageInputTitle.value,
      link: popupImageInputUrl.value,
    };
    createCard(newCell.name, newCell.link);
    evt.target.reset();
    popupImage.style.display = "none";
    clearFormErrors(popupImage);
  }
}

imageForm.addEventListener("submit", handleAddImageSubmit);

import { clearFormErrors } from "./validate.js";
import { enableValidation } from "./validate.js";
