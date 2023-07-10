import React from "react";

class SignUpForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    // Get form input values
    const vendorName = document.getElementById("name_register").value;
    const vendorEmail = document.getElementById("email_register").value;
    const vendorPassword = document.getElementById("password").value;
    const vendorConfirmPassword =
      document.getElementById("confirm_password").value;
    const vendorWebsite = document.getElementById("website").value;

    // Create an object to hold the form data including the reCAPTCHA response
    const formData = {
      vendor_name: vendorName,
      vendor_email: vendorEmail,
      vendor_password: vendorPassword,
      vendor_confirm_password: vendorConfirmPassword,
      vendor_website: vendorWebsite,
    };

    // Make the API call
    fetch("http://localhost:3002/gaming-vendor-auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async function (response) {
        if (response.ok) {
          // Success case
          return response.json();
        } else {
          // Error case
          const data = await response.json();
          throw new Error(JSON.stringify(data.errors));
        }
      })
      .then(function (data) {
        // Handle the API response
        toastFunction(data.message);
        document.getElementById("name_register").value = "";
        document.getElementById("email_register").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirm_password").value = "";
        document.getElementById("website").value = "";

        setTimeout(function () {
        }, 3500);
      })
      .catch(function (error) {
        console.log(error);

        // Display the error messages on the front end
        const errorMessages = JSON.parse(error.message);

        // Clear any previous error messages
        const errorDivs = document.getElementsByClassName("error-message");
        for (var i = 0; i < errorDivs.length; i++) {
          errorDivs[i].textContent = "";
        }

        // Update the content of each error <div> with the corresponding error message
        errorMessages.forEach(function (errorMessage, index) {
          if (errorDivs[index]) {
            toastFunction(errorMessage);
          }
        });
      });

    function toastFunction(message) {
      const x = document.getElementById("toast");
      x.textContent = message;
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
  };

  render() {

    return (
      <form id="register-1" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Company Name*"
            name="vendor_name"
            id="name_register"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address*"
            name="vendor_email"
            id="email_register"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password*"
            name="password"
            id="password"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password*"
            name="confirm_password"
            id="confirm_password"
          />
        </div>
        <div className="form-group">
          <input
            type="url"
            className="form-control"
            placeholder="Website*"
            name="website"
            id="website"
          />
        </div>
        <div className="text-center form-group">
          <input
            type="submit"
            className="btn_1 medium pulse_bt"
            value="Join Now"
            id="join-now-btn"
          />
        </div>
      </form>
    );
  }
}

export default SignUpForm;
