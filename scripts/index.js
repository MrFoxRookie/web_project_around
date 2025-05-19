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
