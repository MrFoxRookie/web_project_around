export class FormValidator {
  constructor(config, formElement) {
    this._config = config; //Se refiere al objeto de configuración que contiene las clases y selectores para la validación //
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector) //Se forma un array de los elementos input que estan dentro del formulario //
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector //Se selecciona el boton de submit del formulario //
    );
  }

  enableValidation() {
    this._setEventListeners(); //Activa los listeners de eventos para la validación del formulario //
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    }); //A cada uno de los inputs del formulario  se les agrega un listener input, el cual hace que las funciones _checkInputValidity y _toggleButtonState se ejecuten cada vez que el usuario escribe en el input.//
  }

  //Cada vez que se escriba en un input, esta funcion se ejecuta//
  //Agrega o remueve el mensaje de error segun la validez del input//
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    ); //Selecciona el id del span de error que se encuentra dentro del formulario//
    if (!inputElement.validity.valid) {
      //Si el input no es valido//
      inputElement.classList.add(this._config.inputErrorClass); //Se agrega la clase al input que hace que los bordes se pongan rojos//
      errorElement.textContent = inputElement.validationMessage; //Se agrega el mensaje de error por defecto del navegador al span de error//
    } else {
      //Caso contrario//
      inputElement.classList.remove(this._config.inputErrorClass); //Se remueven los bordes rojos del input//
      errorElement.textContent = ""; //Se remueve el mensaje de error del span de error//
    }
  }

  //Cada vez que se escriba en un input, esta funcion se ejecuta//
  //Controla el comportamiento del boton de submit, si hay al menos un input que no es valido, el boton se desactiva, caso contrario, se activa//
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      //Si hay al menos un input que no es valido//
      this._buttonElement.disabled = true; //Si hay al menos un input que no es valido, se desactiva el boton de submit//
      this._buttonElement.classList.add(this._config.inactiveButtonClass); //Se agrega la clase que hace que el boton se vea desactivado//
    } else {
      this._buttonElement.disabled = false; //Si todos los inputs son validos, se activa el boton de submit//
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid); //Revisa si hay algun input dentro del formulario el cual no sea valid//
  }
}
