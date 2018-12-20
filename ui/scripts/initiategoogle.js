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
};

window.addEventListener("input", (e) => {
  const incident_Address = document.getElementById("incident_address");
  if (e.target.id === "incident_address") {
    initAutocomplete(incident_Address);
  }
});


/**
 * Gets the coordinates of a location
 * @param {object} event - event object
 * @return {undefined}
 */
const getAddress = (event) => {
  const responseMessage = document.getElementById("responseMessage");
  if (event.target.id === "incident_address") {
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
window.addEventListener("input", getAddress);


/**
 * Gets the coordinates of a location
 * @param {object} event - event object
 * @return {undefined}
 */
const updateAddress = (event) => {
  if (event.target.id === "location-input") {
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
window.addEventListener("input", updateAddress);

window.addEventListener("input", (e)=>{
  const updateAddy = document.getElementById("location-input");
  if (e.target.id === "location-input") {
    initAutocomplete(updateAddy);
  }
});


