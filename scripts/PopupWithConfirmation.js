import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteCardFromServer) {
    super(popupSelector);
    this._handleDeleteCardFromServer = handleDeleteCardFromServer;
    this._form = this._popupSelector.querySelector(".form");
  }

  open(cardId, removeCardCallback) {
    this._cardId = cardId;
    this._removeCardCallback = removeCardCallback; // <-- nuevo: guardar la función que borra del DOM
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleDeleteCardFromServer(this._cardId)
        .then(() => {
          if (this._removeCardCallback) {
            this._removeCardCallback(); // borrar del DOM
          }
          this.close();
        })
        .catch((err) => {
          console.error("Error al borrar tarjeta:", err);
        });
    });
  }
}
