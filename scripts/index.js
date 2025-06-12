//Proyecto #7//

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

function handleOpenPopup() {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", popupEscKey);
}

function handleClosePopup() {
  popup.classList.remove("popup_opened");
}

function handleChangeUserInformation(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAboutMe.textContent = popupInputDescription.value;
  handleClosePopup();
}

profileEditButton.addEventListener("click", handleOpenPopup);

popupCloseButton.addEventListener("click", handleClosePopup);

form.addEventListener("submit", handleChangeUserInformation);

//Cerrar popup con click afuera//
popup.addEventListener("mousedown", function (evt) {
  if (evt.target === popup) {
    handleClosePopup();
  }
});
//Cerrar popup con tecla Esc//
function popupEscKey(evt) {
  console.log("hola");
  if (evt.key === "Escape") {
    handleClosePopup();
    document.removeEventListener("keydown", popupEscKey);
  }
}

//Proyecto #8//

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
  function handleOpenGridImagePopup() {
    cellPopup.style.display = "flex";
    cellPopupImage.src = gridImage.src;
    cellPopupImage.alt = title;
    cellPopupTitle.textContent = title;
  }

  gridImage.addEventListener("click", handleOpenGridImagePopup);

  // Cerrar popup de imagen
  function handleCloseGridPopupImage() {
    cellPopup.style.display = "none";
  }

  cellPopupImageCloseButton.addEventListener(
    "click",
    handleCloseGridPopupImage
  );

  // Cerrar popups con click afuera
  popupImage.addEventListener("mousedown", function (evt) {
    if (evt.target === popupImage) {
      popupImage.style.display = "none";
    }
  });

  cellPopup.addEventListener("mousedown", function (evt) {
    if (evt.target === cellPopup) {
      cellPopup.style.display = "none";
    }
  });
}

// Abrir popup para agregar imagen
imageAddButton.addEventListener("click", function () {
  popupImage.style.display = "flex";
});

// Cerrar popup para agregar imagen
popupImageCloseButton.addEventListener("click", function () {
  popupImage.style.display = "none";
});

// Submit para agregar imagen
function handleChangeImage(evt) {
  evt.preventDefault();
  const newCell = {
    name: popupImageInputTitle.value,
    link: popupImageInputUrl.value,
  };
  createCard(newCell.name, newCell.link);
  this.reset();
  popupImage.style.display = "none";
}

imageForm.addEventListener("submit", handleChangeImage);

// Proyecto #9

const formElements = document.querySelectorAll(".form");

formElements.forEach((form) => {
  const inputElements = Array.from(form.querySelectorAll("input"));
  const buttonElement = form.querySelector(".buttonclase");
  validateForm(inputElements);
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
});

function showInputError(input) {
  input.target.classList.add("form__input_type_error");
  console.log(input);
  const spanError = document.querySelector(`#${input.target.id}-error`);
  spanError.classList.add("form__input-error");
  spanError.textContent = input.target.validationMessage;
}

//Borrar span anterior//
function hideInputError(input) {
  input.target.classList.remove("form__input_type_error");
  const spanError = document.querySelector(`#${input.target.id}-error`);
  spanError.textContent = "";
}
function validateForm(inputElements, buttonElement) {
  inputElements.forEach((input) => {
    input.addEventListener("input", function (evt) {
      if (!evt.target.validity.valid) {
        showInputError(evt);
      } else {
        hideInputError(evt);
      }
      toggleButton(inputElements, buttonElement);
    });
  });
}

function toggleButton(inputElements, buttonElement) {}
