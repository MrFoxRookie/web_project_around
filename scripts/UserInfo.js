export default class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._userName = userName;
    this._userJob = userJob;
    this._userAvatar = document.querySelector(userAvatar);
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

  setUserAvatar(avatarUrl) {
    this._userAvatar.src = avatarUrl;
  }
}
