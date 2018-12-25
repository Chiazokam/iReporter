const unpackImages = (arr) => {
  let markup = "";
  arr.forEach(elem => {
    markup += `<img src=${elem} class="picture-evidence" title="picture-evidence"/>`;
  });
  if (arr.length === 0) {
    return "<span></span>";
  } else {
    return markup;
  }
};

const unpackVideos = (arr) => {
  let markup = "";
  arr.forEach(elem => {
    markup += ` <video controls class="video-evidence">
                    <source src=${elem}>
                </video>`;
  });

  if (arr.length === 0) {
    return "<span></span>";
  } else {
    return markup;
  }
};
/**
 * Get an incident
 */
const fetchNewIncident = () => {
  let incidentURL;
  const newIncidentId = localStorage.getItem("newIncidentId");
  const token = localStorage.getItem("token");
  let incidentIcon;
  const incidentURLType = localStorage.getItem("incidentURLType");
  const decoded = jwt_decode(token);
  if (incidentURLType === redflagURL) {
    incidentURL = redflagURL;
    incidentIcon = "../images/red_flag.png";
  } else if (incidentURLType === interventionURL) {
    incidentURL = interventionURL;
    incidentIcon = "../images/intervene_icon.png";
  }
  fetch(`${incidentURL}/${newIncidentId}`, {
    method: "GET",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
      "authorization": token
    }
  })
    .then((res) => res.json())
    .then((responseData) => {
      const { status, data, error } = responseData;
      if (status === 200) {
        data.forEach((obj) => {
          document.getElementsByClassName("post-display")[0].innerHTML +=
            `          <div class="post">
                    <article class="actual-post">
                        <img src=${decoded.profileImage} class="avatar" title="avatar" /> <i class="profile-name"><a href="./profile.html">${decoded.username}</a></i>
                        <br>
                        <h1> ${obj.title}</h1>
                        <img src=${incidentIcon} class="red-flag-icon" title="Red flag" />

                        <div class="story">
                            <p>
${obj.comment}
                            </p>

                            <div class="insert-editing-tag-here"></div>

                            <button class="blue edit-comment" >modify comment</button>
                        </div>
                        <br>
                        <br>
                        <label class="blue">STATUS</label> : <span>${obj.status}</span> <br>
                        <label class="blue">LOCATION</label> : <span>${obj.location}</span>
                        <span> &nbsp; </span> <span class="insert-location-editing-tag-here"></span>
                        <button class="blue edit-location" >modify location</button><br>
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
                            <button class="red delete">delete</button>
                        </div>
                    </article>
                </div>
`;
        });
      } else {
        toggleGeneralMessage(error, false);
      }
    })
    .catch(err => err);
};
// window.addEventListener("load", fetchNewIncident);
