class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error de respuesta de getUserProfile()");
        }
        return res.json();
      })
      .then((data) => {
        // console.log("Perfil del usuario obtenido correctamente", data);
        return data;
      })
      .catch((err) => {
        console.error("Error en getUserProfile()", err);
      });
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error de respuesta de changeUserInfo()");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Respuesta de changeUserInfo() exitosa");
        return data;
      })
      .catch((err) => {
        console.error("Error en changeUserInfo()", err);
      });
  }

  getInitialCards() {
    return fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error de respuesta de getInitialCards()");
        }
        return res.json();
      })
      .then((data) => {
        // console.log("Cartas iniciales obtenidas correctamente", data);
        return data;
      })
      .catch((err) => {
        console.log("Error en getInitialCards()", err);
      });
  }

  addCardToServer(name, link) {
    return fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error de respuesta de addCardToServer()");
      }
      return res.json();
    });
  }

  toggleCardLike(_id, isLiked) {
    return fetch(
      `https://around-api.es.tripleten-services.com/v1/cards/${_id}/likes`,
      {
        method: isLiked ? "DELETE" : "PUT",
        headers: this.headers,
      }
    ).then((res) => {
      if (!res.ok) {
        console.log("Respuesta de toggleCards");
      }
    });
  }
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "318a2160-9165-4111-ad8b-f6ac77574be8",
    "Content-Type": "application/json",
  },
});
