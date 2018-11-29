const switchToSignup = document.getElementsByClassName("switch-signup")[0];
const switchToSignin = document.getElementsByClassName("switch-signin")[0];
const signupForm = document.getElementsByClassName("signup-form")[0];
const signinForm = document.getElementsByClassName("signin-form")[0];

const report =  "http://127.0.0.1:5500/ui/html/report.html";
const home = "http://127.0.0.1:5500/ui/html/home.html";
const admin = "http://127.0.0.1:5500/ui/html/admin.html";
const pageIndex = "http://127.0.0.1:5500/ui/index.html";

const ghPagesReport = "https://shaolinmkz.github.io/iReporter/ui/html/report.html";
const ghPagesHome = "https://shaolinmkz.github.io/iReporter/ui/html/home.html";
const ghPagesAdmin = "https://shaolinmkz.github.io/iReporter/ui/html/admin.html";
const ghpagesPageIndex = "https://shaolinmkz.github.io/iReporter/ui/";

let status = "close";

const hamburger = document.getElementsByClassName("hamburger")[0];
const hamburgerIndex = document.getElementById("hamburger");

const mobileNav = document.getElementById("mobile-nav");

const redFlagRecord = document.getElementById("redflag-record");
const interventionRecord = document.getElementById("intervention-record");

const recordFrame = document.getElementById("record-frame");

const adminRedFlagSwitch = document.getElementById("admin-red-flag");
const adminInterventionSwitch = document.getElementById("admin-intervention");


const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const errorMessage = document.getElementById("errorMessage");
const myCurrentPosition = document.getElementById("myCurrentLocation");

const src1 = "./images/menu_close_icon.png";
const src2 =  "./images/menu_icon.png";

/**
 * Switch to signin or signup form
 * @param {object} event - event object
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

/**
 * Hamburger menu initializer
 */
window.addEventListener("resize", () => {
	if (screen.availWidth > 999) {
		if (location.href === pageIndex || location.href === ghpagesPageIndex) {
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
 */
const switchToRecord = (event) => {
	if (event.target.id == "redflag-record") {
		redFlagRecord.className = "default";
		interventionRecord.className = "";
	} else if (event.target.id == "intervention-record") {
		redFlagRecord.className = "";
		interventionRecord.className = "default";
	}
};

window.addEventListener("click", switchToRecord);



window.addEventListener("click", (e) => {
	if (e.target.className == "picture-evidence") {
		document.getElementsByClassName("image-enlarge")[0].src = e.target.src;
		document.getElementsByClassName("outer-modal")[0].style.display = "block";
	} else if (e.target.className == "outer-modal") {
		document.getElementsByClassName("outer-modal")[0].style.display = "none";
	}
});


/**
 * Increases window length to accommodate content
 * @param {object} obj - window object
 */
const resizeIframe = () => {
	if (/report/gm.test(location.href)) {
		recordFrame.style.height = `${recordFrame.contentDocument.body.scrollHeight + 150}px`;
		document.getElementsByClassName("image-enlarge")[0].src = "../images/loader.gif";
		document.getElementsByClassName("image-enlarge")[0].style.width = "10%";
		document.getElementsByClassName("outer-modal")[0].style.textAlign = "center";
		document.getElementsByClassName("outer-modal")[0].style.display = "block";
		setTimeout(() => {
			document.getElementsByClassName("outer-modal")[0].style.display = "none";
		}, 1000);
	} else if (/home/gm.test(location.href)) {
		recordFrame.style.height = `${recordFrame.contentDocument.body.scrollHeight + 150}px`;
		document.getElementsByClassName("image-enlarge")[0].src = "../images/loader.gif";
		document.getElementsByClassName("image-enlarge")[0].style.width = "10%";
		document.getElementsByClassName("outer-modal")[0].style.textAlign = "center";
		document.getElementsByClassName("outer-modal")[0].style.display = "block";
		setTimeout(()=>{
			document.getElementsByClassName("outer-modal")[0].style.display = "none";
		},1000);
	}
};

recordFrame.addEventListener("load", resizeIframe);
window.addEventListener("resize", resizeIframe);

/**
 * Opens update status box modal for admin
 */
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

const loading = document.getElementById("loading");

/**
 * Find current location of user using the inbuilt geolocator fron the navigator object
 */
const findMe = (e) => {
	if (e.target.id !== "myCurrentLocation" ) {
		return;
	} else if (navigator.geolocation) {
		loading.style.display = "inline-block";
		navigator.geolocation.getCurrentPosition(revealCoordinates);		
	} else {
		loading.style.display = "none";
		errorMessage.innerHTML = "GPS location not supported on this browser";
	}
}

/**
 * Shows the coordinate position of user
 * @param {object} position 
 */
const revealCoordinates = (position) => {
	latitude.value = position.coords.latitude;
	longitude.value = position.coords.longitude;
	loading.style.display = "none";
}

window.addEventListener("click", findMe);

/**
 * Change color for report page
 * @param { object } event 
 */

const changeColor = (event) => {
	if (event.target.className === "theme-blue font-setting"){
		event.target.className = "white font-setting";
	} else if (event.target.className === "white font-setting"){
		event.target.className = "theme-blue font-setting"; 
	}
}

window.addEventListener("click", changeColor);




