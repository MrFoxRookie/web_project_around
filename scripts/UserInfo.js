// export default class UserInfo {
//   constructor({ userName, userDescription }) {
//     this._userName = userName;
//     this._userDescription = userDescription;
//   }

//   getUserInfo() {
//     return {
//       name: this._userName.textContent,
//       description: this._userDescription.textContent,
//     };
//   }

//   setUserInfo(userName, userDescription) {
//     this._userName.textContent = userName;
//     this._userDescription.textContent = userDescription;
//   }
// }
export default class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}
