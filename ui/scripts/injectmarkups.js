/**
 * Indicates Current records switch
 * @param {object} event - event object
 * @return {undefined}
 */
const injectRedflagRecords = () => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  let displayPost = document.getElementsByClassName("post-display")[0];
  const incidentIcon = "../images/red_flag.png";
  displayPost.innerHTML = "";
  const loader = document.querySelector("#homeLoaderContainer .homeLoader");
  loader.style.display = "inline-block";

  fetch(`${redflagURL}`, {
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
      if (data.length < 1) {
        document.getElementsByClassName("post-display")[0].innerHTML = `
          <h1 style='color:grey; padding: 3em 0 0 0; text-align:center; font-size:2em'>NO RED-FLAG RECORDS</h1>
          `;
        loader.style.display = "none";
      } else if (status === 200) {
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

          if (decoded.id !== obj.createdby) {
            const editComment = document.querySelectorAll("button.edit-comment");
            const editLocation= document.querySelectorAll("button.edit-location");
            const deleteButton = document.querySelectorAll("button.delete");

            forEachRemove(editComment);
            forEachRemove(editLocation);
            forEachRemove(deleteButton);
            console.log(editComment, editLocation, deleteButton);
          }
        });
      }
      loader.style.display = "none";
    });
};

window.addEventListener("load", ()=> {
  const chooseRecord = document.getElementsByClassName("choose-record");
  if (chooseRecord.length > 0){
    injectRedflagRecords();
  }
});
document.getElementById("redflag-record").addEventListener("click", injectRedflagRecords);



const injectInterventionRecords = (event) => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  if (event.target.id === "intervention-record") {
    let displayPost = document.getElementsByClassName("post-display")[0];
    displayPost.innerHTML = "";
    const incidentIcon = "../images/intervene_icon.png";
    const loader = document.querySelector("#homeLoaderContainer .homeLoader");
    loader.style.display = "inline-block";

    fetch(`${interventionURL}`, {
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
        if (data.length < 1){
          document.getElementsByClassName("post-display")[0].innerHTML =`
          <h1 style='color:grey; padding: 3em 0 0 0; text-align:center; font-size:2em'>NO INTERVENTION RECORDS</h1>
          `;
          loader.style.display = "none";
        } else if (status === 200) {
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
        }
      });
  }
};

window.addEventListener("click", injectInterventionRecords);




