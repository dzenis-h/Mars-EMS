import { CLIENT_ID, gapi } from "../config/config";

class Auth {
  static init() {
    gapi.load("auth2", () => {
      gapi.auth2.init({
        client_id: CLIENT_ID
      });
    });
  }

  static signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log("User signed out.");
      localStorage.clear();
    });
  }

  static setStorage(googleUser) {
    localStorage.setItem("email", googleUser.profileObj.email);
    localStorage.setItem("token", googleUser.tokenId);
  }
}

export default Auth;
