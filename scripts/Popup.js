// export default class Popup {
//   constructor(popupSelector) {
//     this._popup = document.querySelector(popupSelector);
//     this._closeButton = this._popup.querySelector(".form__close-button");
//   }

//   open() {
//     this._popup.style.display = "flex";
//     this._handleEscClose();
//     this.setEventListeners();
//   }

//   close() {
//     this._popup.style.display = "none";
//   }

//   _handleEscClose() {
//     document.addEventListener("keydown", (evt) => {
//       if (evt.key === "Escape") {
//         this.close();
//       }
//     });
//   }

//   setEventListeners() {
//     this._closeButton.addEventListener("click", () => {
//       this.close();
//     });
//     this._popup.addEventListener("mousedown", (evt) => {
//       if (evt.target === this._popup) {
//         this.close();
//       }
//     });
//   }
// }

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._form = this._popupSelector.querySelector(".popup__container");
    this._closeButton = this._form.querySelector(".form__close-button");
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
