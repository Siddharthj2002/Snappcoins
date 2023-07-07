const signInBtn = document.getElementById("sign-in-btn");
const toggleBtn = document.getElementById("toggle-btn");

// Determine whether it's Sign Up or Sign In
var isSignUp = signInBtn.style.display;

if (isSignUp) {
  document
    .getElementById("register-1")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting

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
      fetch("http://localhost:3001/gaming-vendor-auth/signup", {
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

          isSignUp = "none";
          setTimeout(function () {
            toggleFormFields();
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
    });
}

function toastFunction(message) {
  const x = document.getElementById("toast");
  x.textContent = message;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

toggleBtn.addEventListener("click", toggleFormFields);

function toggleFormFields() {
  const toggleText = document.getElementById("toggle-text");

  if (isSignUp) {
    toggleText.innerHTML =
      'Not a <a href="../html/index.html">SnappCoins</a> partner?';
    isSignUp = "";

    document.getElementById("register-1").style.display = "none";
    document.getElementById("register-2").style.display = "";
    signInBtn.style.display = "";
    toggleBtn.textContent = "Join Now";

    document
      .getElementById("register-2")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting

        const vendorId = document.getElementById("vendor_id").value;
        const password = document.getElementById("password-signin").value;

        const formData = {
          vendor_id: vendorId,
          vendor_password: password,
        };

        // Make the API call
        fetch("http://localhost:3001/gaming-vendor-auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then(async function (response) {
            if (response.ok) {
              // Success case
              window.location.href = `../html/partner-home.html?vendorId=${vendorId}`;
              return response.json();
            } else {
              // Error case
              const data = await response.json();
              throw new Error(JSON.stringify(data.message));
            }
          })
          .then(function (data) {
            // Handle the API response
            toastFunction(data.message);
          })
          .catch(function (error) {
            console.log(error);
            toastFunction(JSON.parse(error.message));
          });
      });
  } else {
    toggleText.innerHTML =
      'Already a <a href="../html/index.html">SnappCoins</a> partner?';
    isSignUp = "none";

    document.getElementById("register-1").style.display = "";
    document.getElementById("register-2").style.display = "none";
    toggleBtn.textContent = "Sign In";
  }
}
