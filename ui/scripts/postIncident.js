// const sendIncident = document.getElementById("send-Incicent");

const postIncident = (event) => {
  const target = event.target.id;
  const token = localStorage.getItem("token");
  event.preventDefault();
  const img_uploads = document.querySelectorAll("i.image-link");
  const vid_uploads = document.querySelectorAll("i.vid-uploads");
  let uploads;
  let incidnentURL;
  const imagesUploads = [];
  const videosUploads = [];
  let latitude = document.getElementById("latitude").innerHTML;
  let longitude = document.getElementById("longitude").innerHTML;
  const redflag = document.getElementById("red-flag");
  const intervention = document.getElementById("intervention");

  if (event.target.id === target) {
    if (img_uploads.length > 0) {
      for (uploads = 0; uploads < img_uploads.length; uploads++) {
        imagesUploads.push(img_uploads[uploads].innerHTML);
      }
    }

    if (vid_uploads.length > 0) {
      for (uploads = 0; uploads < vid_uploads.length; uploads++) {
        videosUploads.push(vid_uploads[uploads].innerHTML);
      }
    }

    const reportObject = {
      title: document.getElementById("title").value,
      comment: document.getElementById("post-text-area").value,
      location: `${latitude}, ${longitude}`,
      images: imagesUploads,
      videos: videosUploads
    };

    if (redflag.checked) {
      incidnentURL = redflagURL;
    } else if (intervention.checked) {
      incidnentURL = interventionURL;
    }
    fetch(incidnentURL, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-type": "application/json",
        "authorization": token
      },
      body: JSON.stringify(reportObject)
    })
      .then((res) => res.json())
      .then((responseData) => {
        const { status, data, error } = responseData;
        if (status === 201) {
          localStorage.removeItem("saveVideoUploads");
          localStorage.removeItem("saveImageUploads");
          document.getElementById("title").value = "";
          document.getElementById("post-text-area").value = "";
          document.getElementById("latlongdisplay").style.display = "none";
          document.getElementById("incident_address").value = "";
          document.getElementById("incident_address").style.display = "inline-block";
          redflag.checked = false;
          intervention.checked = false;
          document.getElementById("place-images").innerHTML = "";
          document.getElementById("place-videos").innerHTML = "";
          toggleGeneralMessage(data[0].message, true);
        } else {
          toggleGeneralMessage(error, false);
        }
      })
      .catch(err => err);
  }


};

window.addEventListener("submit", postIncident);

//Turn on loader
const loaderOn = (num) => {
  if (document.body.clientWidth > 500) {
    return document.querySelectorAll("img.uploadLoader")[num].style.display = "inline-block";
  } else {
    return document.querySelectorAll("img.uploadLoader")[num].style.display = "block";
  }
};

//Turn off loader
const loaderOff = (num) => {
  return document.querySelectorAll("img.uploadLoader")[num].style.display = "none";
};


const uploadVideoEvidence= (event) => {
  loaderOn(1);
  const videoFile = document.getElementById("video-upload");
  const placeVideos = document.getElementById("place-videos");
  const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/shaolinmkz/video/upload";
  const CLOUDINARY_UPLOAD_PRESET = "opnviynn";
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (typeof data.secure_url !== "undefined") {
        loaderOff(1);
        placeVideos.innerHTML += `
     <li title="uploaded file" class="video-uploads theme-orange">
        <img title="attachment icon" src="../images/attachment.png" class="attachment">
        <small>Video Evidence</small> <i class="vid-uploads" >${data.secure_url}</i>
        <span class="remove-element" title="remove attachment"> &times;</span>
      </li>
    `;
        toggleGeneralMessage("Video evidence uploaded", true);
        videoFile.value = "";
        collectUploads();
      } else {
        loaderOff(1);
        toggleGeneralMessage("uploading failed", false);
      }
    })
    .catch(err => {
      loaderOff(1);
      toggleGeneralMessage(err, false);
    });
};
//add event listener to the video input field
document.getElementById("video-upload")
  .addEventListener("change", uploadVideoEvidence);


const uploadImageEvidence = (event) => {
  loaderOn(0);
  const placeImages = document.getElementById("place-images");
  const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/shaolinmkz/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "opnviynn";
  const pictureFile = document.getElementById("picture-upload");
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (typeof data.secure_url !== "undefined") {
        loaderOff(0);
        placeImages.innerHTML += `
  <li title="uploaded file" class="image-uploads theme-orange">
    <img title="attachment icon" src="../images/attachment.png" class="attachment">
    <small>Image Evidence</ssmall> <img src=${data.secure_url} title="evidence" class="img-uploads" />
    <i class="image-link" style="display:none">${data.secure_url}</i>
    <span  class="remove-element" title="remove attachment"> &times;</span>
  </li>
    `;
        toggleGeneralMessage("picture evidence uploaded", true);
        pictureFile.value = "";
        collectUploads(0);
      } else{
        loaderOff(0);
        toggleGeneralMessage("uploading failed", false);
      }
    })
    .catch(err =>{
      loaderOff(0);
      toggleGeneralMessage(err, false);
    });
};
//add event listener to image
const uploadImage = document.getElementById("picture-upload");
uploadImage.addEventListener("change", uploadImageEvidence);


const collectUploads = () =>{
  const img_uploads = document.querySelectorAll("i.image-link");
  const vid_uploads = document.querySelectorAll("i.vid-uploads");
  let uploads;
  const imgArray = [];
  const vidArray = [];

  for (uploads = 0; uploads < img_uploads.length; uploads++){
    imgArray.push(img_uploads[uploads].innerHTML);
  }
  localStorage.setItem("saveImageUploads", JSON.stringify(imgArray));

  for (uploads = 0; uploads < vid_uploads.length; uploads++) {
    vidArray.push(vid_uploads[uploads].innerHTML);
  }
  localStorage.setItem("saveVideoUploads", JSON.stringify(vidArray));
};

//Take collections of uploads
window.addEventListener("click", (e) => {
  if (e.target.className === "remove-element") {
    collectUploads();
  }
});



// window.addEventListener("load", collectUploads);


const loadImageEvidence = () =>{
  const InsertImages = document.getElementById("place-images");
  let uploads;

  const img_uploads = JSON.parse(localStorage.getItem("saveImageUploads")) || [];

  for (uploads = 0; uploads < img_uploads.length; uploads++) {
    InsertImages.innerHTML += `
  <li title="uploaded file" class="image-uploads theme-orange">
    <img title="attachment icon" src="../images/attachment.png" class="attachment">
    <small>Image Evidence${uploads + 1}</small> <img src=${img_uploads[uploads]} title="evidence" class="img-uploads" />
    <i class="image-link" style="display:none">${img_uploads[uploads]}</i>
    <span  class="remove-element" title="remove attachment"> &times;</span>
  </li>
    `;
  }

};

const loadVideoEvidence = () => {
  const InsertVideos = document.getElementById("place-videos");
  let uploads;

  const vid_uploads = JSON.parse(localStorage.getItem("saveVideoUploads")) || [];

  for (uploads = 0; uploads < vid_uploads.length; uploads++) {
    InsertVideos.innerHTML += `
    <li title="uploaded file" class="video-uploads theme-orange">
      <img title="attachment icon" src="../images/attachment.png" class="attachment">
      <small>Video Evidence${uploads + 1}</small> <i class="vid-uploads">${vid_uploads[uploads]}</i>
      <span class="remove-element" title="remove attachment"> &times;</span>
    </li>
    `;
  }

};

window.addEventListener("load", loadImageEvidence);
window.addEventListener("load", loadVideoEvidence);
