import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  //Lo que debe de obtener es el contenedor del popup
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitle = this._form.querySelector(".popup-cell__title");
    this._popupImage = this._form.querySelector(".popup-cell__image");
  }

  open(name, link) {
    super.open();
    this._popupTitle.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  }
}
