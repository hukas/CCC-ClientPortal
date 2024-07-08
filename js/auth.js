class Auth {
  constructor() {
    document.querySelector("body").style.display = "none";
    const auth = localStorage.getItem("auth");
    this.validateAuth(auth);
  }
  validateAuth(auth) {
    if (auth != 1) {
      window.location.replace("/login.html");
    } else {
      document.querySelector("body").style.display = "block";
    }
  }

  logOut() {
    localStorage.removeItem("auth");
    localStorage.removeItem("customerID");
    localStorage.removeItem("gpURL");
    localStorage.removeItem("clientData");
    window.location.replace("/login.html");
  }
}
