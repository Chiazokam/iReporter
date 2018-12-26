/**
 * Signup User
 */
window.addEventListener("click", (e) => {
  if (e.target.id === "signup") {
    e.preventDefault();
    const signupDetails = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      othername: document.getElementById("othername").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value,
    };
    const loader = document.getElementsByClassName("loader");
    loader[0].style.display = "inline-block";
    fetch(signup,
      {
        method: "POST",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json"
        },
        body: JSON.stringify(signupDetails)
      })
      .then((res) => res.json())
      .then((responseData) => {
        const { data, status, error } = responseData;
        if (status === 201) {
          loader[0].style.display = "none";
          toggleGeneralMessage("User Created", true);
          setTimeout(() => {
            localStorage.setItem("token", data[0].token);
            location.href = home;
          }, 2000);
        } else {
          loader[0].style.display = "none";
          toggleGeneralMessage(error, false);
          return;
        }
      })
      .catch(err => {
        loader[0].style.display = "none";
        return toggleGeneralMessage(err, false);
      });
  }
});




/**
 * Signin User
 */
window.addEventListener("click", (e) => {
  if (e.target.id === "signin") {
    e.preventDefault();
    const loginDetails = {
      emailUsername: document.getElementById("emailUsername").value,
      password: document.getElementById("loginPassword").value
    };
    const loader = document.getElementsByClassName("loader");
    loader[1].style.display = "inline-block";
    fetch(login,
      {
        method: "POST",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json"
        },
        body: JSON.stringify(loginDetails)
      })
      .then((res) => res.json())
      .then((responseData) => {
        const { data, status, error } = responseData;
        if (status === 200) {
          loader[1].style.display = "none";
          toggleGeneralMessage("login successful", true);
          setTimeout(() => {
            e.preventDefault();
            localStorage.setItem("token", data[0].token);
            location.href = home;
          }, 1000);
        } else {
          loader[1].style.display = "none";
          toggleGeneralMessage(error, false); }
      })
      .catch(err => {
        loader[1].style.display = "none";
        return toggleGeneralMessage(err, false);
      }); }
});
