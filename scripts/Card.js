export default class Card {
  constructor(
    item,
    handleCardClick,
    handleLikeToggle,
    handleDeleteConfirmation
  ) {
    this.name = item.name;
    this.link = item.link;
    this._id = item._id;
    this.isLiked = item.isLiked;
    this._handleCardClick = handleCardClick;
    this._handleLikeToggle = handleLikeToggle;
    this._handleDeleteConfirmation = handleDeleteConfirmation;
    this._element = document
      .querySelector("#template-card")
      .content.querySelector(".grid__cell")
      .cloneNode(true);
  }

  generateCard() {
    this.locationName = this._element.querySelector(".grid__location-name");
    this.locationUrl = this._element.querySelector(".grid__image");

    this.locationName.textContent = this.name;
    this.locationUrl.src = this.link;
    this.locationUrl.alt = this.name;

    const likeButton = this._element.querySelector(".grid__like-button");
    likeButton.src = this.isLiked
      ? "./images/like-button_active.svg"
      : "./images/like-button.svg";
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".grid__like-button");
    const deleteButton = this._element.querySelector(".grid__delete-button");

    likeButton.addEventListener("click", this._handleLike);
    deleteButton.addEventListener("click", this._handleDelete);

    //Aquí está la conexión con el popup
    this.locationUrl.addEventListener("click", () => {
      this._handleCardClick(this.name, this.link);
    });
  }

  isLikedToggle() {
    this.isLiked = !this.isLiked;
  }

  _handleLike = () => {
    const likeButton = this._element.querySelector(".grid__like-button");

    if (likeButton.src.includes("like-button.svg")) {
      likeButton.src = "./images/like-button_active.svg";
      this.isLiked = false;
      console.log("like activado");
      this._handleLikeToggle(this._id, this.isLiked);
    } else {
      likeButton.src = "./images/like-button.svg";
      console.log("like desactivado");

      this._handleLikeToggle(this._id, this.isLiked);
    }
  };

  _handleDelete = () => {
    this._handleDeleteConfirmation();

    // this._element.remove();
  };
}
