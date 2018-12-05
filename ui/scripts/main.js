const switchToSignup = document.getElementsByClassName("switch-signup")[0];
const switchToSignin = document.getElementsByClassName("switch-signin")[0];
const signupForm = document.getElementsByClassName("signup-form")[0];
const signinForm = document.getElementsByClassName("signin-form")[0];


const pageIndex = "http://127.0.0.1:5500/ui/index.html";


const ghpagesPageIndex = "https://shaolinmkz.github.io/iReporter/ui/";

let status = "close";

const hamburger = document.getElementsByClassName("hamburger")[0];
const hamburgerIndex = document.getElementById("hamburger");

const mobileNav = document.getElementById("mobile-nav");

const redFlagRecord = document.getElementById("redflag-record");
const interventionRecord = document.getElementById("intervention-record");

const adminRedFlagSwitch = document.getElementById("admin-red-flag");
const adminInterventionSwitch = document.getElementById("admin-intervention");


const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const responseMessage = document.getElementById("responseMessage");

const loading = document.getElementById("loading");

const displayLatLng = document.getElementById("latlongdisplay");

/** Dummy login function */
window.addEventListener("click", (e) => {
  if (e.target.id === "signup" || e.target.id === "signin") {
    location.assign("./html/home.html");
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
 * Control hamburger menu
 * @param {object} event - event object
 * @return {undefined}
 */

const controlHamburgerForOtherPages = (event) => {
  if (event.target.className == "hamburger") {
    if (event.target.id == "") {
      if (status == "close") {
        hamburger.src = "../images/menu_close_icon.png";
        mobileNav.style.display = "block";
        status = "open";
      } else if (status == "open") {
        hamburger.src = "../images/menu_icon.png";
        mobileNav.style.display = "none";
        status = "close";
      }
    }
  }
};

/**
 * Control hamburger menu for the index-page
 * @param {object} event - event object
 * @return {undefined}
 */
const controlHamburger = (event) => {
  if(location.href === pageIndex || location.href === ghpagesPageIndex || /index/gm.test(location.href)) {
    if (event.target.id === hamburgerIndex.id) {
      if (status == "close") {
        hamburger.src = "./images/menu_close_icon.png";
        mobileNav.style.display = "block";
        status = "open";
      } else if (status == "open") {
        hamburger.src = "./images/menu_icon.png";
        mobileNav.style.display = "none";
        status = "close";
      }
    }
  }
  controlHamburgerForOtherPages(event);
};


window.addEventListener("click", controlHamburger);


/** Hamburger menu initializer */
window.addEventListener("resize", () => {
  if (screen.availWidth > 999) {
    if (location.href === pageIndex || location.href === ghpagesPageIndex || /index/gm.test(location.href)) {
      mobileNav.style.display = "none";
      hamburger.src = "./images/menu_icon.png";
      status = "close";
    } else {
      mobileNav.style.display = "none";
      hamburger.src = "../images/menu_icon.png";
      status = "close";
    }
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
  latitude.innerHTML = Number(position.coords.latitude).toPrecision(10);
  longitude.innerHTML = Number(position.coords.longitude).toFixed(10);
  displayLatLng.style.display = "block";
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

const loading2 = document.getElementById("loading2");
const incident_Address = document.getElementById("incident_address");
/**
 * Initiates google autocomplete
 * @return {undefined}
 */
const initAutocomplete = (incident_Address) => {
  const incidentAddress = (incident_Address);
  const autocomplete = new google.maps.places.Autocomplete(incidentAddress);
  autocomplete.setTypes(["geocode"]);
  google.maps.event.addListener(autocomplete, "place_changed", () => {
    let place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ""),
        (place.address_components[1] && place.address_components[1].short_name || ""),
        (place.address_components[2] && place.address_components[2].short_name || "")
      ].join(" ");
    }
  });
};

if (/report/gm.test(location.href)) {
  window.addEventListener("input", initAutocomplete(incident_Address));
}


/**
 * Gets the coordinates of a location
 * @param {object} event - event object
 * @return {undefined}
 */
const getAddress = (event) => {
  if (event.target.id !== "incident_address") {
    return;
  }
  const geocoder = new google.maps.Geocoder();
  const address = document.getElementById("incident_address").value;
  loading2.style.display = "inline-block";
  geocoder.geocode({ "address": address }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      document.getElementById("latitude").innerHTML = Number(results[0].geometry.location.lat()).toPrecision(10);
      document.getElementById("longitude").innerHTML = Number(results[0].geometry.location.lng()).toPrecision(10);
      displayLatLng.style.display = "block";
      responseMessage.innerHTML = "<span style=\"color: green; font-weight: bold;\"> LOCATION FOUND <span>";
      timeOut(responseMessage);
      loading2.style.display = "none";
    }

    else {
      responseMessage.innerHTML = `<span style="color: red">${status}</span>`;
      timeOut(responseMessage);
      loading2.style.display = "none";
    }
  });
};
window.addEventListener("input", getAddress);



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
 * Gets the coordinates of a location
 * @param {object} event - event object
 * @return {undefined}
 */
const updateAddress = (event) => {
  if (event.target.id !== "location-input") {
    return;
  }
  const geocoder = new google.maps.Geocoder();
  const address = document.getElementById("location-input").value;
  const locationMessage = document.getElementById("locationMessage");

  geocoder.geocode({ "address": address }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      locationMessage.innerHTML = "<br><small style=\"color: green;\"> LOCATION FOUND!!!<small><br>";
      timeOut(locationMessage);

      let newCords = `${Number(results[0].geometry.location.lat()).toPrecision(10)}, ${Number(results[0].geometry.location.lng()).toPrecision(10)}`;

      document.getElementById("newLocation").innerHTML = newCords;

    }

    else {
      responseMessage.innerHTML = `<span style="color: red">${status}</span>`;
      timeOut(responseMessage);
      loading2.style.display = "none";
    }
  });
};
window.addEventListener("input", updateAddress);





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
 */
const toggleGeneralMessage = (message, error) => {
  const generalMessage = document.getElementById("generalMessage");
  generalMessage.style.boxShadow = "1px 1px 20px 1px #162661";
  generalMessage.style.top = "3em";
  generalMessage.innerHTML = `${message}`;
  if (error === true) {
    generalMessage.style.color = "#162661";
    generalMessage.style.background = "white";
  } else if (error === false){
    generalMessage.style.color = "white";
    generalMessage.style.background = "#1e3792";
  }
  setTimeout(() => {
    generalMessage.style.top = "100000em";
  }, 3000);

};



