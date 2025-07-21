export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector(
      ".form__close-button"
    );
  }

  open() {
    this._popupSelector.style.display = "flex";
    this._handleEscClose();
  }

  close() {
    this._popupSelector.style.display = "none";
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupSelector) {
        this.close();
      }
    });
  }
}
