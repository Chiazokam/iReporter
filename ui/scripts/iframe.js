/**
 * Enlarge picture
 */
window.addEventListener("click", (e) => {
    if (e.target.className == "picture-evidence") {
        document.getElementsByClassName("image-enlarge")[0].src = e.target.src;
        document.getElementsByClassName("outer-modal")[0].style.display = "block";
    } else if (e.target.className == "outer-modal") {
        document.getElementsByClassName("outer-modal")[0].style.display = "none";
    }
});


