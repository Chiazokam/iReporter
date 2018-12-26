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

    const completed = updateRecords(recordURL, recordId, updateFieldKey, updatObject, loaderSelector);

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

    const completed = updateRecords(recordURL, recordId, updateFieldKey, updatObject, loaderSelector);

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


