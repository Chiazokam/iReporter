let status = "close";
let bodyboolean = false;
const mobileNav = document.getElementById("mobile-nav");

const redFlagRecord = document.getElementById("redflag-record");
const interventionRecord = document.getElementById("intervention-record");

const adminRedFlagSwitch = document.getElementById("admin-red-flag");
const adminInterventionSwitch = document.getElementById("admin-intervention");

const responseMessage = document.getElementById("responseMessage");

const loading = document.getElementById("loading");

const displayLatLng = document.getElementById("latlongdisplay");

const loaderOuterModal = document.getElementById("outer-modal");

//hide body nav before page loads
document.getElementsByTagName("body")[0].style.overflow = "hidden";

/**
 * Removes signin Nav
 */
const removeAuthNav = () => {
  const token = localStorage.getItem("token");
  const signinSignUp = document.querySelectorAll("li.removeAuthNav");
  const signout = document.querySelectorAll("a.signout");
  const hide = document.querySelectorAll("li.hide");
  let count;
  if (token !== null) {
    for (count = 0; count < signinSignUp.length; count++) {
      signinSignUp[count].remove();
    }
  } else if (token === null){
    for (count = 0; count < signout.length; count++) {
      signout[count].remove();
    }
    for (count = 0; count < hide.length; count++) {
      hide[count].remove();
    }
  }
};
removeAuthNav();

/**
 * Removes admin Nav
 */
const removeAdminNav = () => {
  const token = localStorage.getItem("token");
  const adminNav = document.querySelectorAll("li.adminNav");
  let decoded;

  if (token !== null) {
    decoded = jwt_decode(token);
    if (decoded.isAdmin !== true) {
      for (let count = 0; count < adminNav.length; count++) {
        adminNav[count].remove();
      }
    }
  }
};
removeAdminNav();



/**
 * Logout user
 */
window.addEventListener("click", (e) => {
  if (e.target.className === "signout") {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.setItem("logout", true);
    localStorage.clear();
    location.href = index;
  }
});


/**
 * Time out function to remove display
 * @return {undefined}
 */
const timeOut = (elem) => {
  setTimeout(() => {
    elem.innerHTML = " ";
  }, 2000);
};


/**
 * Switch to signin or signup form
 * @param {object} event - event object
 * @return {undefined}
 */
const switchForm = (event) => {
  const switchToSignup = document.getElementsByClassName("switch-signup")[0];
  const switchToSignin = document.getElementsByClassName("switch-signin")[0];
  const signupForm = document.getElementsByClassName("signup-form")[0];
  const signinForm = document.getElementsByClassName("signin-form")[0];
  if (/switch-signup/gm.test(event.target.className)){
    signinForm.style.display = "none";
    signupForm.style.display = "block";
    switchToSignin.style.color = "#162661";
    switchToSignup.style.color = "#fe0100";
  } else if (/switch-signin/gm.test(event.target.className)) {
    signupForm.style.display = "none";
    signinForm.style.display = "block";
    switchToSignup.style.color = "#162661";
    switchToSignin.style.color = "#fe0100";
  }
};

window.addEventListener("click", switchForm);
window.addEventListener("click", switchForm);



/**
 * Controls hamburger menu
 * @param {object} event - event object
 * @return {undefined}
 */
const controlHamburger = (event) => {
  const open = document.getElementById("open-hamburger");
  const close = document.getElementById("close-hamburger");
  if (bodyboolean === true && event.target.id !== "open-hamburger" && event.target.id !== "close-hamburger") {
    open.style.display = "inline-block";
    close.style.display = "none";
    mobileNav.style.display = "none";
    status = "close";
    bodyboolean = false;
  }
  if (event.target.id === "open-hamburger" || event.target.id === "close-hamburger") {
    if (status == "close") {
      open.style.display = "none";
      close.style.display = "inline-block";
      mobileNav.style.display = "block";
      status = "open";
      bodyboolean = true;
    } else if (status == "open") {
      open.style.display = "inline-block";
      close.style.display = "none";
      mobileNav.style.display = "none";
      status = "close";
      bodyboolean = false;
    }
  }
};
window.addEventListener("click", controlHamburger);


/** Hamburger menu initializer */
window.addEventListener("resize", () => {
  const open = document.getElementById("open-hamburger");
  const close = document.getElementById("close-hamburger");

  if (document.body.clientWidth > 1000) {
    mobileNav.style.display = "none";
    status = "close";
    open.style.display = "none";
    close.style.display = "none";
  } else if (document.body.clientWidth <= 1000) {
    mobileNav.style.display = "none";
    status = "close";
    open.style.display = "inline-block";
    close.style.display = "none";
  }
});


/** Enlarges an image */
window.addEventListener("click", (e) => {
  if (e.target.className == "picture-evidence"){
    document.getElementsByClassName("image-enlarge")[0].src = e.target.src;
    document.getElementsByClassName("outer-modal")[0].style.display = "block";
  } else if (e.target.className == "outer-modal"){
    document.getElementsByClassName("outer-modal")[0].style.display = "none";
  }
});


/**
 * Indicates Current records switch
 * @param {object} event - event object
 * @return {undefined}
 */
const switchToRecord = (event) => {
  if (event.target.id === "redflag-record") {
    redFlagRecord.className = "default";
    interventionRecord.className = "";
  } else if (event.target.id === "intervention-record") {
    redFlagRecord.className = "";
    interventionRecord.className = "default";
  }
};

window.addEventListener("click", switchToRecord);


/** Opens update status box modal for admin */
window.addEventListener("click", (e) => {
  if (e.target.className == "change") {
    document.getElementsByClassName("outer-modal")[0].style.display = "block";
  } else if (e.target.className == "outer-modal") {
    document.getElementsByClassName("outer-modal")[0].style.display = "none";
  }
});


/**
 * Admin Category switch
 * @param {object} event - event object
 * @return {undefined}
 */
const switchCategory = (event) => {
  if (/admin/gm.test(location.href)){
    if (event.target.id === adminRedFlagSwitch.id) {
      adminRedFlagSwitch.className = "admin-current";
      adminInterventionSwitch.className = "";
      document.getElementsByClassName("admin-redflag-list")[0].style.display = "block";
      document.getElementsByClassName("admin-intervention-list")[0].style.display = "none";
    } else if (event.target.id  === adminInterventionSwitch.id) {
      adminRedFlagSwitch.className = "";
      adminInterventionSwitch.className = "admin-current";
      document.getElementsByClassName("admin-redflag-list")[0].style.display = "none";
      document.getElementsByClassName("admin-intervention-list")[0].style.display = "block";
    }
  }
};

window.addEventListener("click", switchCategory);
window.addEventListener("click", switchCategory);


/**
 * Find current location of user using the inbuilt geolocator fron the navigator object
 * @return {undefined}
 */
const findMe = (e) => {
  if (e.target.id !== "myCurrentLocation" ) {
    return;
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(revealCoordinates, errorResponse);
    document.getElementById("incident_address").style.display = "none";
    loading.style.display = "inline-block";
    responseMessage.style.marginTop = "1em";
  } else {
    loading.style.display = "none";
    responseMessage.innerHTML = `
    <span style="color:#ff0000">GPS location not supported on this browser</span>
    `;
    timeOut(responseMessage);
  }
};

window.addEventListener("click", findMe);

/**
 * Shows the coordinate position of user
 * @param {object} position
 * @return {undefined}
 */
const revealCoordinates = (position) => {
  const latitude = document.getElementById("latitude");
  const longitude = document.getElementById("longitude");
  latitude.innerHTML = Number(position.coords.latitude).toPrecision(10);
  longitude.innerHTML = Number(position.coords.longitude).toFixed(10);
  displayLatLng.style.display = "inline-block";
  responseMessage.innerHTML = "<span style=\"color: green; font-weight: bold;\"> LOCATION FOUND <span>";
  timeOut(responseMessage);
  loading.style.display = "none";
};




/**
 * Error response if location couldn't be found
 * @param {object} error
 * @return {undefined}
 */
const errorResponse = (err) => {
  loading.style.display = "none";
  responseMessage.style.marginTop = "0";
  timeOut(responseMessage);
  if (err.PERMISSION_DENIED === err.code) {
    responseMessage.innerHTML = "<span style=\"color: red\">User denied the request for Geolocation</span>";
  } else if (err.POSITION_UNAVAILABLE === err.code) {
    responseMessage.innerHTML = "<span style=\"color: red\">Location information is unavailable</span>";
  } else if (err.TIMEOUT === err.code) {
    responseMessage.innerHTML = "<span style=\"color: red\">The request to get user location timed out</span>";
  } else if (err.UNKNOWN_ERROR === err.code) {
    responseMessage.innerHTML = "<span style=\"color: red\">An unknown error occurred</span>";
  }

};


/**
 * Edit comment
 * @param {object} - click event object
 * @return {undefined}
 */
const editComment = (event) => {
  const initialComment = event.target.parentNode.children[0].innerHTML.trim();
  const editCommentTag = document.getElementsByClassName("editing-tag");
  if (/edit-comment/gm.test(event.target.className)) {
    //target the parent node of the target element
    const target = event.target.parentNode;

    if (editCommentTag.length > 0) {
      toggleGeneralMessage("save all active comment update", false);
      return;
    } else{
      hideMe(event.target);
    }


    //hide the paragragh inside the div with a class="story"
    target.children[0].style.display = "none";

    //Insert HTML mark-up into the the second child of the target element
    target.children[1].innerHTML = `
        <textarea class="editing-tag" id="updatedComment">${initialComment}</textarea>
        <span class="editing-tag"><a class="red edit cancel">cancel</a> <span>&nbsp;</span><a class="blue edit">update</a></span>
        `;
  }
};
window.addEventListener("click", editComment);


/**
 * Cancels modification of the comment field
 * @return {undefined}
 */
const cancelCommentUpdate = () => {
  if (/cancel/gm.test(event.target.className)) {
    const target = event.target.parentNode.parentNode.parentNode;
    const childrenLength = target.children.length;

    //display the paragragh inside the div with a class="story"
    target.children[0].style.display = "block";

    //display the update button feature
    target.children[childrenLength - 1].style.display = "inline-block";

    //remove the content inside the div with class= "insert-editing-tag-here"
    target.children[1].innerHTML = "";
  }
};

window.addEventListener("click", cancelCommentUpdate);


/**
 * Removes an element from the DOM
 * @param { elem } elem - html element/tag
 * @return {undefined}
 */
const removeMe = (elem) => {
  elem.parentNode.remove();
};

//REMOVE UPLOADED EVIDENCE
window.addEventListener("click", (e) => {
  if (e.target.className === "remove-element") {
    removeMe(e.target);
  }
});

/**
 * Hide an element
 * @param { elem } elem - html element/tag
 * @return {undefined}
 */
const hideMe = (elem) => {
  elem.style.display = "none";
};



/**
 * Edit location
 * @param {object} event - event object
 * @return {undefined}
 */
const editLocation = (event) => {
  if (/edit-location/gm.test(event.target.className)) {
    let locationEditingTag = document.getElementsByClassName("location-input");
    //target the parent node of the target element
    const target = event.target.parentNode;
    const initialLoaction = target.children[12];

    if (locationEditingTag.length > 0) { //can only edit one at a time
      toggleGeneralMessage("save all active location update", false);
      return;
    } else {
      hideMe(event.target);
    }


    //hide the initial location field
    initialLoaction.style.display = "none";

    //insert the string of mark-up into the HTML element with class="insert-location-editing-tag-here"
    target.children[14].innerHTML += `
        <span>
        <input type="text" id="location-input" class="location-input" placeholder="Please enter address" />
        <br>
        <br>
        <span class="green" id="newLocation"></span> <br> <span id="locationMessage" class="green"></span>
        </span>
        <span class="editing-button-tag">
        <a class="red edit exit">cancel</a>
        <span>&nbsp;</span><a class="blue edit">update</a></span> `;
  }
};

window.addEventListener("click", editLocation);



/**
 * Cancel Edit
 * @param {object} event
 * @return {undefined}
 */
const cancelLocationUpdate = (event) => {
  if (/exit/gm.test(event.target.className)) {
    const target = event.target.parentNode;

    //set the location back to default
    target.parentNode.parentNode.children[12].style.display = "inline-block";

    //set the modify button back to its original position
    target.parentNode.parentNode.children[15].style.display = "inline-block";

    //Remove the edit location input field
    target.parentNode.innerHTML = "";
  }
};

window.addEventListener("click", cancelLocationUpdate);



/**
 * Spits out success or error messages
 * @param {string} message - display alert
 * @param {boolean} style - type of display box
 */
const toggleGeneralMessage = (message, style) => {
  const generalMessage = document.getElementById("generalMessage");
  generalMessage.style.boxShadow = "1px 1px 20px 1px #162661";
  generalMessage.style.top = "3em";
  generalMessage.innerHTML = `${message}`;
  if (style === true) { // for success
    generalMessage.style.color = "green";
    generalMessage.style.background = "white";
  } else if (style === false){ //for error/ warning alerts
    generalMessage.style.color = "white";
    generalMessage.style.background = "#1e3792";
  }
  setTimeout(() => {
    generalMessage.style.top = "100000em";
  }, 5000);

};

/**
 * Sends message to user if authentication issues occur
 */
window.addEventListener("load", () => {
  const auth = localStorage.getItem("authRequired");
  const logout = localStorage.getItem("logout");
  const admin = localStorage.getItem("admin");
  if (JSON.parse(auth) === true) {
    toggleGeneralMessage("session ended, please reauthenticate", false);
    localStorage.removeItem("authRequired");
  }

  if (JSON.parse(logout) === true) {
    toggleGeneralMessage("logout successful", true);
    localStorage.removeItem("logout");
  }

  if (JSON.parse(admin) === false) {
    toggleGeneralMessage("your not an admin", false);
    localStorage.removeItem("admin");
  }
});

/**
 * loops over elements and removes them
 * @param {array} elem
 */
const forEachRemove = (arrayElem) => {
  arrayElem.forEach(elem => {
    elem.remove();
  });
};


/**
 * unpacks an array of  images
 * @param {array} arr
 */
const unpackImages = (arr, returnTag) => {
  let markup = "";
  arr.forEach(elem => {
    markup += `<img src=${elem} class="picture-evidence" title="picture-evidence"/>`;
  });
  if (arr.length === 0) {
    return returnTag;
  } else {
    return markup;
  }
};

/**
 * unpacks an array of videos
 * @param {array} arr
 */
const unpackVideos = (arr, returnTag) => {
  let markup = "";
  arr.forEach(elem => {
    markup += ` <video controls class="video-evidence">
                    <source src=${elem}>
                </video>`;
  });

  if (arr.length === 0) {
    return returnTag;
  } else {
    return markup;
  }
};

let time = 0;
const timeInterval = setInterval(()=>{
  time++;
}, 1000);

const endTimer = () => {
  if (time > 60) {
    clearInterval(timeInterval);
    clearInterval(clearTimeInterval);
    loaderOuterModal.style.display = "none";
    document.getElementsByTagName("body")[0].style.overflow = "scroll";
    toggleGeneralMessage("please check internet connection", false);
  }
};

const clearTimeInterval = setInterval(() => {
  endTimer();
}, 1000);

window.addEventListener("load", () => {
  clearInterval(timeInterval);
  clearInterval(clearTimeout);
  loaderOuterModal.style.display = "none";
  document.getElementsByTagName("body")[0].style.overflow = "scroll";
});






