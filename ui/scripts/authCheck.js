let booleanStatus = true;
/**
 * Redirects user
 * @param {string} link
 */
const redirect = (link) => {
  location.href = link;
};

//checks if token is valid
const checkAuth = () => {
  if (localStorage.getItem("token") !== null) {
    let current_time = new Date().getTime();
    current_time = parseInt(current_time / 1000);
    const decoded = jwt_decode(localStorage.getItem("token"));

    if (decoded.isAdmin !== true && /admin/gm.test(location.href)) {
      localStorage.setItem("admin", false);
      redirect(home);
    }

    if ((decoded.exp > current_time)) {
      if (location.href === index || /index/gm.test(location.href) || location.href == index2) {
        return redirect(home);
      }
    }
  }
};

checkAuth();

window.addEventListener("load", checkAuth);

/**
 * Secure Pages
 */
const serverAuth = () => {
  const token = localStorage.getItem("token");
  fetch(securePages, {
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
      "authorization": token
    }
  })
    .then((res) => res.json())
    .then((responseData) => {
      const { status, message } = responseData;
      if (status === 401) {
        const pageArray = ["/home", "/report", "/displayrecords", "/admin", "/profile"];
        for (let page = 0; page < pageArray.length; page++) {
          if (RegExp(pageArray[page]).test(location.href)) {
            localStorage.setItem("authRequired", true);
            localStorage.removeItem("token");
            return redirect(index);
          }
        }
      }
    })
    .catch((err) => err);
};

if (booleanStatus) {
  booleanStatus = false;
  serverAuth();
}


