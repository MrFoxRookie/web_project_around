let profileEditButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let popupInputName = document.querySelector(".popup__input-name");
let popupInputDescription = document.querySelector(".popup__input-description");
let profileName = document.querySelector(".profile__name");
let profileAboutMe = document.querySelector(".profile__about-me");
let form = document.querySelector(".popup__container");

let botonPrueba = document.querySelector("popup__save-button");

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
