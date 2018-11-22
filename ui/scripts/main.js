const switchToSignup = document.getElementsByClassName("switch-signup")[0];
const switchToSignin = document.getElementsByClassName("switch-signin")[0];
const signupForm = document.getElementsByClassName("signup-form")[0];
const signinForm = document.getElementsByClassName("signin-form")[0];

let status = "close";

const hamburger = document.getElementsByClassName("hamburger")[0];
const closeMenu = document.getElementsByClassName("menu_close")[0];
const mainNav = document.getElementsByClassName("main-nav")[0];

const desktopNav = document.getElementById("desktop-nav");
const mobileNav = document.getElementById("mobile-nav");


/**
 * Switch to signin or signup form
 * @param {object} event - event object
 */
const switchForm = (event) => {
  if (event.target.className == "switch-signup"){
    signinForm.style.display = "none";
    signupForm.style.display = "block";
    switchToSignin.style.color = "#162661";
    switchToSignup.style.color = "#fe0100";
  } else if (event.target.className == "switch-signin") {
    signupForm.style.display = "none";
    signinForm.style.display = "block";
    switchToSignup.style.color = "#162661";
    switchToSignin.style.color = "#fe0100";
  }
}

window.addEventListener("click", switchForm);
window.addEventListener("click", switchForm);

/**
 * Control hamburger menu
 * @param {object} event - event object
 */
const controlHamburger = (event) => {
  if(event.target.className == "hamburger"){
    if (status == "close") {
      hamburger.src = "../images/menu_close_icon.png";
      mobileNav.style.display = "block";
      status = "open";
    } else if (status == "open") {
      hamburger.src = "../images/menu_icon.png";
      mobileNav.style.display = "none";
      status= "close";
    } 
  }
}

window.addEventListener("click", controlHamburger);


window.addEventListener("resize", () => {
  if(screen.availWidth > 999) {
    mobileNav.style.display = "none";
    hamburger.src = "../images/menu_icon.png";
    status = "close";
  }     
});


window.addEventListener("click", (e) => {
  if (e.target.className == "picture-evidence"){
    document.getElementsByClassName("image-enlarge")[0].src = e.target.src;
    document.getElementsByClassName("outer-modal")[0].style.display = "block";
  } else if (e.target.className == "outer-modal"){
    document.getElementsByClassName("outer-modal")[0].style.display = "none";
  }
})