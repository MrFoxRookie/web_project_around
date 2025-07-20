export default class Section {
  constructor({ items, renderer }, cardSelector) {
    //array de datos que debes añadir a una página cuando se inicializa la clase//
    this._items = items;
    this._renderer = renderer;
    this._cardSelector = cardSelector;
    // console.log(items);
    // console.log(renderer);
    // console.log(cardSelector);
  }

  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._cardSelector.prepend(element);
  }
}
