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

  //Activar boton para eliminar imagen//
  const gridDeleteButton = gridCell.querySelector(".grid__delete-button");
  gridDeleteButton.addEventListener("click", function () {
    gridCell.remove();
  });

  //Acivar y desactivar boton de like//
  const gridLikeButton = gridCell.querySelector(".grid__like-button");
  gridLikeButton.addEventListener("click", function () {
    if (this.src.includes("/images/like-button.svg")) {
      this.src = "./images/like-button_active.svg";
    } else {
      this.src = "./images/like-button.svg";
    }
  });

  //Abrir popup de imagen//
  function handleOpenGridImagePopup() {
    cellPopup.style.display = "flex";
    cellPopupImage.src = gridImage.src;
    cellPopupImage.alt = title;
    cellPopupTitle.textContent = title;
  }

  gridImage.addEventListener("click", handleOpenGridImagePopup);

  //Cerrar popup de imagen//
  function handleCloseGridPopupImage() {
    cellPopup.style.display = "none";
  }

  cellPopupImageCloseButton.addEventListener(
    "click",
    handleCloseGridPopupImage
  );
}

//Abrir popup para agregar imagen//
imageAddButton.addEventListener("click", function () {
  popupImage.style.display = "flex";
});

//Cerrar popup para agregar imagen//
popupImageCloseButton.addEventListener("click", function () {
  popupImage.style.display = "none";
});

//Submit para agregar imagen//
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

// Crear el elemento span

const formElements = document.querySelectorAll(".form");

formElements.forEach((form) => {
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  function showInputError(input) {
    input.target.classList.add("form__input_type_error");
    const spanError = document.createElement("span");
    spanError.classList.add("form__input-error");
    spanError.textContent = input.target.validationMessage;
    input.target.insertAdjacentElement("afterend", spanError);
  }

  function hideInputError(input) {
    input.target.classList.remove("form__input_type_error");
  }

  const inputElements = form.querySelectorAll("input");

  inputElements.forEach((input) => {
    input.addEventListener("input", function (evt) {
      if (!evt.target.validity.valid) {
        showInputError(evt);
      } else {
        hideInputError(evt);
      }
    });
  });
});
