import Card from "./card.js";
import FormValidator from "./FormValidator.js";
// import { handlePopupBehavior } from "./utils.js";

//Pruebas de nuevos modulos//

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

//Prueba//
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
//Instancias de Popup de profile//
//Se especifica el objeto dentro de los parametros de UserInfo al crear la instancia//
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileDescription,
});
//Se crea la instancia del popup del formulario profile, y se obtienen los datos de los valores del input a traves del data, el cual se pasa al index.js//
const newProfile = new PopupWithForm(".popup", (data) => {
  newProfile.close();
  //Se pasa a la funcion setUserInfo de la instancia userInfo los valores de los inputs, que en ese caso son la data antes mencionada, ademas de que los inputs deben de tener el mismo name que se ponen dentro del constructor, en este caso name y description//
  userInfo.setUserInfo(data.name, data.description); //Recordar que el name del html debe de ser igual//
});

editButton.addEventListener("click", () => {
  newProfile.open();
});

// Instancias de Popup de imagen//
// Las cartas iniciales//
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

function createCard(name, link) {
  // Se crea la instancia de la carta
  const card = new Card(name, link);
  console.log(card.generateCard());
  // Se obtiene el html de las cartas//
  return card.generateCard();
}

const newSection = new Section(
  {
    //El primer argumento es la lista del array//
    items: initialCards,
    // el segundo argument es la funcion que se aplicara a cada una de las cartas mediante la funcion renderer() dentro de la class Section
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link);
      //Se activ ala funcion dentro del section el cual hace que el cardElement sea empujado al grid//
      newSection.addItem(cardElement);
    },
  },
  // el grid al cual se emplujan las cartas ya completadas
  grid
);
// Hace que se rendericen todas las tarjetas iniciales
newSection.renderer();

const newImage = new PopupWithForm(".popup-image", (data) => {
  const cardElement = createCard(data.name, data.link);
  newSection.addItem(cardElement);
  newImage.close();
});

addButton.addEventListener("click", () => {
  newImage.open();
});

// Configuración validación
const validationConfig = {
  inputSelector: "input",
  submitButtonSelector: ".form__submit-button",
  inputErrorClass: "form__input_invalid",
};

// Instancias de validación
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const imageFormValidator = new FormValidator(validationConfig, imageForm);
imageFormValidator.enableValidation();

// Handlers de popup
// const profilePopupHandler = handlePopupBehavior(
//   editButton,
//   profileFormContainer
// );
// const imagePopupHandler = handlePopupBehavior(addButton, imageFormContainer);

// Submit imagen
// imageForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   imagePopupHandler.close(evt);
//   createCard({ name: cardName.value, link: cardLink.value });
// });

// // Se aplica la funcion a cada carta//
// initialCards.forEach(createCard);
