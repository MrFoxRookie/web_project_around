// import Popup from "./Popup.js";

// export default class PopupWithForm extends Popup {
//   constructor(popupSelector, handleFormSubmit) {
//     super(popupSelector);
//     this._handleFormSubmit = handleFormSubmit;
//     this._form = this._popup.querySelector(".form");
//     console.log("PopupWithForm");
//   }

//   _getInputValues() {
//     const inputList = this._form.querySelectorAll(".form__input");
//     const inputValues = {};
//     inputList.forEach((input) => {
//       inputValues[input.name] = input.value;
//     });
//     return inputValues;
//   }

//   setEventListeners() {
//     super.setEventListeners();
//     this._form.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//       this._handleFormSubmit(this._getInputValues());
//     });
//     //El icono para cerrar ya esta en la funcion original de Popup//
//   }

//   close() {
//     super.close();
//     this._form.reset();
//   }
// }

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(".form__input");
    const inputValues = {};
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
