import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import { api } from "../scripts/Api.js";
import PopupWithConfirmation from "../scripts/PopupWithConfirmation.js";

//Botones//
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image");
//Contenedores de formulario//
const profileFormContainer = document.querySelector(".popup-profile");
const imageFormContainer = document.querySelector(".popup-image");
const popupImageContainer = document.querySelector(".popup-cell");
const popupConfirmationContainer = document.querySelector(
  ".popup-confirmation"
);
const popupAvatarContainer = document.querySelector(".popup-avatar");
//Formularios//
const profileForm = profileFormContainer.querySelector(
  ".popup-profile__container"
);
const imageForm = imageFormContainer.querySelector(".popup-image__container");
const avatarForm = popupAvatarContainer.querySelector(
  ".popup-avatar__container"
);

//
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = profileFormContainer.querySelector("#name");
const descriptionInput = profileFormContainer.querySelector("#description");

const cardName = imageFormContainer.querySelector("#card-title");
const cardLink = imageFormContainer.querySelector("#image-url");

const grid = document.querySelector(".grid");

const newAvatar = new PopupWithForm(".popup-avatar", (data) => {
  newAvatar.loadingInformation(true);
  api
    .changeUserAvatar(data.avatar)
    .then(() => {
      avatarButton.src = data.avatar;
      newAvatar.close();
    })
    .catch((err) => console.error(err))
    .finally(() => newAvatar.loadingInformation(false));
});

avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  newAvatar.open();
});

api
  .getAvatarFromServer()
  .then((avatarUrl) => {
    userInfo.setUserAvatar(avatarUrl);
  })
  .catch((err) => {
    console.error(err);
  });

//Instancias de Popup de profile//
//Se especifica el objeto dentro de los parametros de UserInfo al crear la instancia//

const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileDescription,
  userAvatar: ".profile__image",
});
//Se crea la instancia del popup del formulario profile, y se obtienen los datos de los valores del input a traves del data, el cual se pasa al index.js//
//Api para caragar perfil inicial//
api.getUserProfile().then((data) => {
  //Este data incluye name, _id, avatar y about
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
});

const newProfile = new PopupWithForm(".popup-profile", (data) => {
  newProfile.loadingInformation(true);

  //Se pasa a la funcion setUserInfo de la instancia userInfo los valores de los inputs, que en ese caso son la data antes mencionada, ademas de que los inputs deben de tener el mismo name que se ponen dentro del constructor, en este caso name y description//
  api
    .changeUserInfo({ name: data.name, about: data.description })
    .then(() => {
      userInfo.setUserInfo(data.name, data.description);
      newProfile.close();
    })
    .catch((err) => console.error(err))
    .finally(() => newProfile.loadingInformation(false));
});

editButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  newProfile.open();
});

// Instancias de Popup de imagen//

const imagePopup = new PopupWithImage(".popup-cell", (_id) =>
  api.deleteCardFromServer(_id)
);
imagePopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation(
  ".popup-confirmation",
  (cardId) => api.deleteCardFromServer(cardId)
);
confirmationPopup.setEventListeners();

function createCard(item) {
  const card = new Card(
    item,
    (name, link) => imagePopup.open(name, link),
    (_id, isLiked) =>
      api.toggleCardLike(_id, isLiked).then(() => card.isLikedToggle()),
    (_id, removeCardCallback) => confirmationPopup.open(_id, removeCardCallback)
  );
  return card.generateCard();
}

let newSection;

api.getInitialCards().then((cardsFromServer) => {
  newSection = new Section(
    {
      //El primer argumento es la lista del array//
      items: cardsFromServer,
      // el segundo argument es la funcion que se aplicara a cada una de las cartas mediante la funcion renderer() dentro de la class Section
      renderer: (item) => {
        const cardElement = createCard(item);

        //Aqui se encuentran los isLiked, owner, y el _id del elemento//
        // console.log(item);
        //Se activ ala funcion dentro del section el cual hace que el cardElement sea empujado al grid//
        newSection.addItem(cardElement);
      },
    },
    // el grid al cual se emplujan las cartas ya completadas
    grid
  );
  // Hace que se rendericen todas las tarjetas iniciales
  newSection.renderer();
});

const newImage = new PopupWithForm(".popup-image", (data) => {
  newImage.loadingInformation(true);

  api
    .addCardToServer(data.name, data.link)
    .then((cardDataFromServer) => {
      const cardElement = createCard(cardDataFromServer);
      newSection.addItem(cardElement);
      newImage.close();
    })
    .catch((err) => {
      console
        .error("Error al agregar tarjeta:", err)
        .finally(() => newImage.loadingInformation(false));
    });
});

addButton.addEventListener("click", () => {
  imageFormValidator.resetValidation();
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

const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();
