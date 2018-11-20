const switchToSignup = document.getElementsByClassName("switch-signup")[0];
const switchToSignin = document.getElementsByClassName("switch-signin")[0];
const signupForm = document.getElementsByClassName("signup-form")[0];
const signinForm = document.getElementsByClassName("signin-form")[0];
/**
 * Switch forms
 * @param {object} e - event
 */
const switchForm = (e) => {
  if (e.target.className == "switch-signup"){
    signinForm.style.display = "none";
    signupForm.style.display = "block";
    switchToSignin.style.color = "#162661"
    switchToSignup.style.color = "#3456d1"
  } else if (e.target.className == "switch-signin") {
    signupForm.style.display = "none";
    signinForm.style.display = "block";
    switchToSignup.style.color = "#162661"
    switchToSignin.style.color = "#3456d1"
  }
}

window.addEventListener("click", switchForm);
window.addEventListener("click", switchForm);




