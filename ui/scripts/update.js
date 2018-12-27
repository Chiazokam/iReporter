/**
 * Represents an update function for redflag and intervention
 * @return {undefined}
 */
const updateRecords = (httpMethod, recordURL, recordId, updateFieldKey, updatObject, loaderSelector) => {
  const token = localStorage.getItem("token");
  const loader = document.querySelectorAll(loaderSelector)[0];
  loader.style.display = "inline-block";
  return fetch(`${recordURL}/${recordId}/${updateFieldKey}`, {
    method: httpMethod,
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
      "authorization": token
    },
    body: JSON.stringify(updatObject)
  })
    .then((res) => res.json())
    .then((responseData) => {
      const { status, data, error } = responseData;
      if (status === 200) {
        loader.style.display = "none";
        toggleGeneralMessage(data[0].message, true);
        localStorage.setItem("return", true);
        return true;
      } else {
        loader.style.display = "none";
        localStorage.setItem("return", false);
        toggleGeneralMessage(error, false);
        return false;
      }
    });
};


//Update Comment
window.addEventListener("click", (event) => {
  if (event.target.id === "update-comment") {
    let recordURL;
    if (localStorage.getItem("record_type") == "red-flag") {
      recordURL = redflagURL;
    } else if (localStorage.getItem("record_type") == "intervention") {
      recordURL = interventionURL;
    }
    const target = event.target.parentNode.parentNode.parentNode;
    const target2 = event.target.parentNode.parentNode;
    const newComment = document.getElementById("updatedComment").value;
    const recordId = target.parentNode.id;
    const paragraph = target.children[0];
    const updateFieldKey = "comment";
    const updatObject = { comment: newComment };
    const loaderSelector = "#updateCommentLoader";

    const completed = updateRecords("PATCH", recordURL, recordId, updateFieldKey, updatObject, loaderSelector);

    Promise.all([completed])
      .then(result => {
        if (result[0] === true) {
          paragraph.innerHTML = newComment;
          const childrenLength = target.children.length;
          //display the paragragh inside the div with a class="story"
          paragraph.style.display = "block";
          //display the update button feature
          target.children[childrenLength - 1].style.display = "inline-block";
          //remove the content inside the div with class= "insert-editing-tag-here"
          target2.innerHTML = "";
        }
      });
  }
});


//Update Location
window.addEventListener("click", (event) => {
  if (event.target.id === "update-location") {
    let recordURL;
    if (localStorage.getItem("record_type") === "red-flag") {
      recordURL = redflagURL;
    } else if (localStorage.getItem("record_type") === "intervention") {
      recordURL = interventionURL;
    }
    const target = event.target.parentNode.parentNode.parentNode;
    const target2 = event.target.parentNode.parentNode;
    const newLocation = document.getElementById("newLocation").innerHTML;
    const recordId = target.id;
    const locationSpan = target.children[12];
    const updateFieldKey = "location";
    const updatObject = { location: newLocation };
    const loaderSelector = "#updateLocationLoader";

    const completed = updateRecords("PATCH", recordURL, recordId, updateFieldKey, updatObject, loaderSelector);

    Promise.all([completed])
      .then(result => {
        if (result[0] === true) {
          locationSpan.innerHTML = newLocation;
          //set the location back to default
          target.children[12].style.display = "inline-block";

          //set the modify button back to its original position
          target.children[15].style.display = "inline-block";

          //remove the content inside the div with class= "insert-editing-tag-here"
          target2.innerHTML = "";
        }
      });
  }
});


//Update Status
window.addEventListener("click", (event) => {
  if (event.target.className === "admin_update_status") {
    let recordURL;
    if (localStorage.getItem("record_type") === "red-flag") {
      recordURL = redflagURL;
    } else if (localStorage.getItem("record_type") === "intervention") {
      recordURL = interventionURL;
    }
    document.querySelectorAll(".profileLoader")[0].style.display = "none";//prevent profile loader from coming up
    const newStatus = document.querySelectorAll("#select-status")[0].value;
    const recordId = event.target.id;
    const updateFieldKey = "status";
    const updatObject = { status: newStatus.toLowerCase() };
    const loaderSelector = "#updateStatusLoader";

    const completed = updateRecords("PATCH", recordURL, recordId, updateFieldKey, updatObject, loaderSelector);

    Promise.all([completed])
      .then(result => {
        if (result[0] === true){
          document.getElementById("current-status").innerHTML = newStatus;
        }
      });
  }
});

//Delete a record
window.addEventListener("click", (event) => {
  if (RegExp("delete").test(event.target.className) === true) {
    const deleteButtonParent = event.target.parentNode;
    const article = deleteButtonParent.parentNode;
    const parentNode = article.parentNode;
    let recordURL;
    const recordType = localStorage.getItem("record_type");
    if (recordType === "red-flag") {
      recordURL = redflagURL;
    } else if (recordType === "intervention") {
      recordURL = interventionURL;
    }

    const recordId = article.id;
    const updateFieldKey = "";
    const updatObject = {};
    const loaderSelector = "#deleteLoader";
    deleteButtonParent.innerHTML += `
    <img src="../images/loader_blue.GIF"  id="deleteLoader" />`;
    const answer = confirm("DO YOU WANT TO DELETE THIS RECORD");
    if (answer) {
      const completed = updateRecords("DELETE", recordURL, recordId, updateFieldKey, updatObject, loaderSelector);

      Promise.all([completed])
        .then(result => {
          if (result[0] === true) {
            document.getElementById("deleteLoader").remove();
            localStorage.removeItem("newIncidentId");
            localStorage.removeItem("record_type");
            localStorage.removeItem("incidentURLType");
            parentNode.remove();
            if (recordType == "red-flag") {
              injectRedflagRecords();
            } else if (recordType == "intervention") {
              injectInterventionRecords();
            }
          } else {
            document.getElementById("deleteLoader").remove();
          }
        });
    }
  }
});

//Delete a record from profile
window.addEventListener("mousedown", (event) => {
  if (RegExp("delete-record").test(event.target.className) === true) {
    const deleteButtonParent = event.target.parentNode;
    const idTag = deleteButtonParent.children[0];

    let recordURL;
    if (RegExp("red-flag").test(event.target.className)) {
      recordURL = redflagURL;
    } else if (RegExp("intervention").test(event.target.className)) {
      recordURL = interventionURL;
    }

    const recordId = idTag.id;
    const updateFieldKey = "";
    const updatObject = {};
    const loaderSelector = "#deleteLoader";
    deleteButtonParent.innerHTML += `
    <img src="../images/loader_blue.GIF"  id="deleteLoader" />`;
    const answer = confirm("DO YOU WANT TO DELETE THIS RECORD");
    if (answer) {
      const completed = updateRecords("DELETE", recordURL, recordId, updateFieldKey, updatObject, loaderSelector);

      Promise.all([completed])
        .then(result => {
          if (result[0] === true) {
            document.getElementById("deleteLoader").remove();
            localStorage.removeItem("newIncidentId");
            localStorage.removeItem("record_type");
            localStorage.removeItem("incidentURLType");
            deleteButtonParent.remove();
            loadAllPersonalRedflags();
            loadAllPersonalInterventions();
            loadRedflagStatusCount();
            loadInterventionStatusCount();
          } else {
            document.getElementById("deleteLoader").remove();
          }
        });
    }
  }
});




