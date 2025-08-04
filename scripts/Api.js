class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // getUserProfile() {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: this.headers,
  //   }).then((res) => {
  //     if (!res.ok) {
  //       console.log("Error de respuesta de getUserProfile()");
  //     }
  //     console.log("Respuesta de getUserprofile() obtenida");
  //   });
  // }

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
        console.error("Error en changeUserInfo():", err);
      });
  }

  getInitialCards() {
    // ...
  }

  // otros métodos para trabajar con la API
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "2ab4707e-7e3e-46da-b541-9c275a49c25c",
    "Content-Type": "application/json",
  },
});
