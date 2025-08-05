import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector(".form");
  }
  open() {
    super.open();
    this._handleEscClose();
  }
}
