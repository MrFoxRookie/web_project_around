import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { handlePopupBehavior } from "./utils.js";

// Elementos DOM / globales//
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const profileFormContainer = document.querySelector(".popup");
const imageFormContainer = document.querySelector(".popup-image");
const popupImageContainer = document.querySelector(".popup-cell");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = profileFormContainer.querySelector("#name");
const descriptionInput = profileFormContainer.querySelector("#description");

const cardName = imageFormContainer.querySelector("#card-title");
const cardLink = imageFormContainer.querySelector("#image-url");

const profileForm = profileFormContainer.querySelector(".popup__container");
const imageForm = imageFormContainer.querySelector(".popup-image__container");

const grid = document.querySelector(".grid");

// Configuración validación
const validationConfig = {
  inputSelector: "input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_invalid",
};

// Instancias de validación
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const imageFormValidator = new FormValidator(validationConfig, imageForm);
imageFormValidator.enableValidation();

// Handlers de popup
const profilePopupHandler = handlePopupBehavior(
  editButton,
  profileFormContainer
);
const imagePopupHandler = handlePopupBehavior(addButton, imageFormContainer);

// Submit perfil
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profilePopupHandler.close(evt);
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
});

// Submit imagen
imageForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  imagePopupHandler.close(evt);
  createCard({ name: cardName.value, link: cardLink.value });
});

// Crear tarjeta
function createCard({ name, link }) {
  const newCard = new Card(name, link);
  const cardElement = newCard.generateCard();
  const cardImage = cardElement.querySelector(".grid__image");
  grid.prepend(cardElement);
  handlePopupBehavior(cardImage, popupImageContainer);
}

//Las cartas que estan al inicia tambien reciben la funcion createCard//
const initialCards = [
  {
    name: "Bosque Arashiyama",
    link: "./images/Bosque-de-Bambú-de-Arashiyama.jpg",
  },
  { name: "Cataratas Victoria", link: "./images/Cataratas-Victoria.jpg" },
  { name: "Cañon del Sumidero", link: "./images/Cañon-del-Sumidero.jpg" },
  { name: "Desierto de Atacama", link: "./images/Desierto-de-Atacama.jpg" },
  { name: "Cueva de Postojna", link: "./images/Postojna.jpg" },
  { name: "Bosque Schwarzwald", link: "./images/Schwarzwald.jpg" },
];
//Recordar que el forEach se aplica a cada carta//
initialCards.forEach(createCard);
