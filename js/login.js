class Login {
  constructor(form, passwordField) {
    this.form = form;
    this.passwordField = passwordField;
    this.validateOnSubmit();
  }

  async validateOnSubmit() {
    var self = this;
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      var error = 0;
      const loginBtn = document.getElementById("loginBtn");
      loginBtn.innerHTML = `
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `;
      const formInput = document.querySelector(`#${this.passwordField}`);
      console.log(formInput.value);

      await self.validateFields(formInput).then((result) => {
        console.log(result);
        if (result == false) {
          error++;
          loginBtn.innerHTML = `Login`;
        }

        if (error == 0) {
          console.log("Success!");
          var customerID = document.getElementById("password").value;
          localStorage.setItem("auth", 1);
          localStorage.setItem("customerID", customerID);
          this.form.submit();
        }
      });
    });
  }

  //Check if the user inputed password is present in dynamics GP.
  //@return true if the ID exists, false if it does not.
  async validateFields(field) {
    var url =
      "https://dynamicsgpapi.azurewebsites.net/api/GetSalesTransactions?code=raOjlKZYFeP1MIGYq8H6LrbFrEa/Q0xDcCpfJAdQ1sYYCgY4tubJBw==&customerID=" +
      field.value +
      "&commandid=saleslist";
    const response = await fetch(url);
    const customerInfo = await response.json();
    console.log(customerInfo);

    if (customerInfo["data"].length != 0) {
      this.setStatus(field, null, "success");
      localStorage.setItem("gpURL", url);
      localStorage.setItem("clientData", JSON.stringify(customerInfo["data"]));
      var data = localStorage.getItem("clientData");
      console.log(data);
      //localStorage.setItem("clientData", data[0]);
      return true;
    }
    this.setStatus(field, `Cannot find Client ID: ${field.value}`, "error");
    return false;
  }

  setStatus(field, message, status) {
    const errorMessage = document.querySelector(".errorMessage");
    const inputBox = document.querySelector(".errorInputBox");

    if (status == "error") {
      errorMessage.innerText = message;
      field.classList.add("input-Error");
      errorMessage.classList.add("card");
      inputBox.classList.add("is-invalid");
    }
    if (status == "success") {
      errorMessage.innerText = "";
      field.classList.remove("input-error");
      errorMessage.classList.remove("card");
      inputBox.classList.remove("is-invalid");
      inputBox.classList.add("is-valid");
    }
  }
}

const form = document.querySelector(".loginForm");

if (form) {
  const fields = ["password"];
  const validator = new Login(form, fields);
}

// I40064337
// I40066009
// I40066245
// I40067469
// I40070308
// I40071080
// I40075068
// I40075682
// I40076233
// I40076234
// I40076235
// I40076809
// I40077333
// I40077747
// I40079535
// I40080636
// I40081344
// I40082740
// I40083011
// I40083032
// I40083216
// I40083436
// I40084098
// I40084165
// I40084411
// I40084424
// I40084634
