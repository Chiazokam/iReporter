const loading2 = document.getElementById("loading2");

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

  return autocomplete;
};

window.addEventListener("input", (e) => {
  const incident_Address = document.getElementById("incident_address");
  if (e.target.id === "incident_address") {
    initAutocomplete(incident_Address);
  }
});

//Get geolocation on mouse down (click)
window.addEventListener("mousedown", (e) => {
  localStorage.setItem("allow", true);
  const allow = localStorage.getItem("allow");
  if (e.target.className === "geolocation" || e.path[4].id === "google-map") {
    localStorage.setItem("allow", false);
  } else if ((JSON.parse(allow) === true)) {
    e.path.forEach(elem => {
      if (RegExp("pac").test(elem.className) && RegExp("/report").test(location.href)) {
        setTimeout(() => {
          getAddress();
          localStorage.removeItem("allow");
        }, 100);
      }
    });
  }
});



/**
 * Gets the coordinates of a location
 * @param {object} event - event object
 * @return {undefined}
 */
const getAddress = (event) => {
  const responseMessage = document.getElementById("responseMessage");
  const allow = document.querySelectorAll(".allow");
  if (allow.length > 0 || event.target.id === "incident_address") {
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
  }
};

window.addEventListener("input", (e) => {
  if (e.target.id === "incident_address") {
    getAddress();
  }
});


/**
 * Gets the coordinates of a location
 * @param {object} event - event object
 * @return {undefined}
 */
const updateAddress = () => {
  const check = document.querySelectorAll("#location-input");
  if (check.length > 0) {
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
    });
  }
};

window.addEventListener("input", () => {
  const locationInput = document.querySelectorAll("#location-input");
  if (locationInput.length > 0) {
    updateAddress();
  }
});

window.addEventListener("mousedown", (e) => {
  localStorage.setItem("allow", "update");
  const allow = localStorage.getItem("allow");
  if ((allow === "update")) {
    e.path.forEach(elem => {
      if (RegExp("pac").test(elem.className) && (RegExp("/displayrecords").test(location.href) || RegExp("/report").test(location.href) || RegExp("/home").test(location.href))) {
        setTimeout(() => {
          updateAddress();
          localStorage.removeItem("allow");
        }, 100);
      }
    });
  }
});

window.addEventListener("input", (e)=>{
  const updateAddy = document.getElementById("location-input");
  if (e.target.id === "location-input") {
    initAutocomplete(updateAddy);
  }
});


/**
 * Show geolocation with address on google map
 * @param {object} geocode
 * @param {object} map
 * @param {object} infowindow
 * @return {undefined}
 */
const geocodeLatLng = (geocoder, map, infowindow) => {
  document.querySelectorAll(".map-outer-modal")[0].style.display = "block";
  const input = localStorage.getItem("geolocation");
  const latlngStr = input.split(",", 2);
  const latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
  geocoder.geocode({ "location": latlng }, (results, status)=> {
    if (status === "OK") {
      if (results[0]) {
        map.setZoom(11);
        const marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        toggleGeneralMessage("No results found", false);
      }
    } else {
      toggleGeneralMessage(`Geocoder failed due to ${status}`, false);
    }
  });
};


/**
 * Initialize google map
 * @return {undefined}
 */
const initMap = () => {
  const map = new google.maps.Map(document.getElementById("google-map"), {
    zoom: 8,
    center: { lat: 40.731, lng: -73.997 }
  });


  window.addEventListener("click", (e) => {
    if (e.target.className === "geolocation") {
      localStorage.setItem("geolocation", e.target.innerHTML);
      const geocoder = new google.maps.Geocoder;
      const infowindow = new google.maps.InfoWindow;
      geocodeLatLng(geocoder, map, infowindow);
    }
  });
};

window.addEventListener("load", () => {
  initMap();
});

window.addEventListener("click", (e) => {
  if (e.target.className === "map-outer-modal") {
    document.querySelectorAll(".map-outer-modal")[0].style.display = "none";
  }
});

//Fill input field with location geocode address
window.addEventListener("click", (event) => {
  if (/edit-location/gm.test(event.target.className)) {
    const geocoder = new google.maps.Geocoder;
    const locationInputField = event.target.parentNode.children[12].innerHTML;
    const latlngStr = locationInputField.split(",", 2);
    const latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
    geocoder.geocode({ "location": latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setTimeout(()=> {
            document.getElementById("location-input").value = results[0].formatted_address;
          }, 100);
        }
      }
    });
  }
});
