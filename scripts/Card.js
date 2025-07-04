export class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
    this._element = document
      .querySelector("#template-card")
      .cloneNode(true)
      .content.querySelector(".grid__cell");
  }

  generateCard() {
    this.locationName = this._element.querySelector(".grid__location-name");
    this.locationUrl = this._element.querySelector(".grid__image");
    this.locationName.textContent = this.name;
    this.locationUrl.src = this.link;
    this.locationUrl.alt = this.name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".grid__like-button");
    const deleteButton = this._element.querySelector(".grid__delete-button");

    likeButton.addEventListener("click", this._handleLike);
    deleteButton.addEventListener("click", this._handleDelete);
  }

  _handleLike = () => {
    const likeButton = this._element.querySelector(".grid__like-button");
    likeButton.src = likeButton.src.includes("like-button.svg")
      ? "./images/like-button_active.svg"
      : "./images/like-button.svg";
  };

  _handleDelete = () => {
    this._element.remove();
  };
}
