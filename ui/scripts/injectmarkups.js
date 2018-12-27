/**
 * Load redflag records
 * @return {undefined}
 */
const injectRedflagRecords = () => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  let incidentURL;
  const recordId = localStorage.getItem("recordId");
  let displayPost = document.getElementsByClassName("post-display")[0];
  const incidentIcon = "../images/red_flag.png";
  displayPost.innerHTML = "";
  const loader = document.querySelector("#homeLoaderContainer .homeLoader");
  loader.style.display = "inline-block";
  const record_type = "red-flag";
  if (RegExp("/displayrecords").test(location.href)) {
    incidentURL = `${redflagURL}/${recordId}`;
  } else {
    incidentURL = redflagURL;
  }

  fetch(`${incidentURL}`, {
    method: "GET",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
      "authorization": token
    }
  })
    .then((res) => res.json())
    .then((responseData) => {
      const { status, data } = responseData;
      if (status === 200 && data.length > 0) {
        data.forEach((obj) => {
          document.getElementsByClassName("post-display")[0].innerHTML +=
              `   <div class="post">
                    <article class="actual-post" id=${obj.id}>
                        <img src=${obj.profileimage} class="avatar" title="avatar" /> <i class="profile-name"><span>${obj.firstname} ${obj.lastname.charAt(0)}.</span></i>
                        <br>
                        <h1> ${obj.title}</h1>
                        <img src=${incidentIcon} class="red-flag-icon" title="Red flag" />

                        <div class="story">
                            <p>
${obj.comment}
                            </p>

                            <div class="insert-editing-tag-here"></div>

                            <button class="blue edit-comment ${record_type}" >modify comment</button>
                        </div>
                        <br>
                        <br>
                        <label class="blue">STATUS</label> : <span>${obj.status}</span> <br>
                        <label class="blue">LOCATION</label> : <span class="geolocation" title="Click to view on map">${obj.location}</span>
                        <span> &nbsp; </span> <span class="insert-location-editing-tag-here"></span>
                        <button class="blue edit-location ${record_type}" >modify location</button><br>
                        <br>
                        <br>

                        <div class="image-display">
                        ${unpackImages(obj.images, "<h3 style=color:grey;>NO IMAGE EVIDENCE</h3>")}
                        </div>
                        <br>
                        <div class="video-display">
                        ${unpackVideos(obj.videos, "<h3 style=color:grey;>NO VIDEO EVIDENCE</h3>")}
                        </div>

                        <div class="delete-record-container">
                            <button class="red delete ${record_type}">delete</button>
                        </div>
                    </article>
                </div>
                `;

          if (decoded.id !== obj.createdby) {
            const editComment = document.querySelectorAll("button.edit-comment");
            const editLocation= document.querySelectorAll("button.edit-location");
            const deleteButton = document.querySelectorAll("button.delete");

            forEachRemove(editComment);
            forEachRemove(editLocation);
            forEachRemove(deleteButton);
          }
        });
        loader.style.display = "none";
      } else {
        document.getElementsByClassName("post-display")[0].innerHTML = `
          <h1 style='margin-bottom: 50%; color:grey; padding: 3em 0 0 0; text-align:center; font-size:2em'>NO RED-FLAG RECORDS</h1>
          `;
        loader.style.display = "none";
      }
    });
};

//Onload populate windows with redflag records(Default)
window.addEventListener("load", ()=> {
  const chooseRecord = document.getElementsByClassName("choose-record");
  if (chooseRecord.length > 0){
    injectRedflagRecords();
  }
});

//Onclick populate windows with redflag records
window.addEventListener("click", (e)=>{
  if (e.target.id === "redflag-record"){
    injectRedflagRecords();
  }
});

//Onload polulate window with redflag or intervention records
window.addEventListener("load", ()=> {
  const displayRecordsHere = document.querySelectorAll("#displayrecordshere");
  const recordType = localStorage.getItem("record-type");
  if (displayRecordsHere.length > 0 && recordType === "intervention") {
    injectInterventionRecords();
  } else if (displayRecordsHere.length > 0 && recordType === "red-flag") {
    injectRedflagRecords();
  }
});

/**
 * Load intervention records
 * @return {undefined}
 */
const injectInterventionRecords = () => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  let incidentURL;
  const recordId = localStorage.getItem("recordId");
  let displayPost = document.getElementsByClassName("post-display")[0];
  displayPost.innerHTML = "";
  const incidentIcon = "../images/intervene_icon.png";
  const loader = document.querySelector("#homeLoaderContainer .homeLoader");
  loader.style.display = "inline-block";
  const record_type = "intervention";
  if (RegExp("/displayrecords").test(location.href)) {
    incidentURL = `${interventionURL}/${recordId}`;
  } else {
    incidentURL = interventionURL;
  }

  fetch(`${incidentURL}`, {
    method: "GET",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
      "authorization": token
    }
  })
    .then((res) => res.json())
    .then((responseData) => {
      const { status, data } = responseData;
      if (status === 200 && data.length > 0) {
        let bool = true;
        data.forEach((obj) => {
          if (bool) {
            document.getElementsByClassName("post-display")[0].innerHTML = "";
            bool = false;
          }
          document.getElementsByClassName("post-display")[0].innerHTML +=
              `   <div class="post">
                    <article class="actual-post" id=${obj.id}>
                        <img src=${obj.profileimage} class="avatar" title="avatar" /> <i class="profile-name"><span>${obj.firstname} ${obj.lastname.charAt(0)}.</span></i>
                        <br>
                        <h1> ${obj.title}</h1>
                        <img src=${incidentIcon} class="red-flag-icon" title="Red flag" />

                        <div class="story">
                            <p>
${obj.comment}
                            </p>

                            <div class="insert-editing-tag-here"></div>

                            <button class="blue edit-comment ${record_type}" >modify comment</button>
                        </div>
                        <br>
                        <br>
                        <label class="blue">STATUS</label> : <span>${obj.status}</span> <br>
                        <label class="blue">LOCATION</label> : <span title="Click to view on map" class="geolocation">${obj.location}</span>
                        <span> &nbsp; </span> <span class="insert-location-editing-tag-here"></span>
                        <button class="blue edit-location ${record_type}" >modify location</button><br>
                        <br>
                        <br>

                        <div class="image-display">
                        ${unpackImages(obj.images, "<h3 style=color:grey;>NO IMAGE EVIDENCE</h3>")}
                        </div>
                        <br>
                        <div class="video-display">
                        ${unpackVideos(obj.videos, "<h3 style=color:grey;>NO VIDEO EVIDENCE</h3>")}
                        </div>

                        <div class="delete-record-container">
                            <button class="red delete ${record_type}">delete</button>
                        </div>
                    </article>
                </div>
                `;

          if (decoded.id !== obj.createdby) {
            const editComment = document.querySelectorAll("button.edit-comment");
            const editLocation = document.querySelectorAll("button.edit-location");
            const deleteButton = document.querySelectorAll("button.delete");

            forEachRemove(editComment);
            forEachRemove(editLocation);
            forEachRemove(deleteButton);
          }
        });
        loader.style.display = "none";
      } else {
        document.getElementsByClassName("post-display")[0].innerHTML = `
          <h1 style='margin-bottom: 50%; color:grey; padding: 3em 0 0 0; text-align:center; font-size:2em'>NO INTERVENTION RECORDS</h1>
          `;
        loader.style.display = "none";
      }
    });
};

window.addEventListener("mousedown", (e) => {
  if (e.target.id === "intervention-record") {
    injectInterventionRecords();
  }
});



