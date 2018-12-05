/**
 * Indicates Current records switch
 * @param {object} event - event object
 * @return {undefined}
 */
const injectIncidentRecord = (event) => {
    let displayPost = document.getElementsByClassName("post-display")[0];
    if (event.target.id === "redflag-record") {
        displayPost.innerHTML = "";
        displayPost.innerHTML =`
        <div class="post">
            <article class="actual-post">
                <img src="../images/avatar.png" class="avatar" title="avatar" /> <i class="profile-name"><a href="./profile.html">Mark</a></i>
                <br>
                <h1> Murder In XYZ Town</h1>
                <img src="../images/red_flag.png" class="red-flag-icon" title="Red flag" />

                <div class="story">
                    <p>
In a few days along comes the letter you expect. Your merchandise is quite good — in fact the writer likes it and wishes to talk to you about it if you will call at such and such a time.

Promptly on the minute you present yourself, trying not to beam. Yes, Mr. Jones, of Smith & Jones, to whom your goods were shown, thinks they’re just what the firm has been looking for. They’re going in to exploit them heavily for you.
All they want is their commission on any merchandise they sell.

Oh yes — there’s going to be the postage on the twenty-five or fifty thousand letters they’re going to send out to all their correspondents, with your prospectus in it.
They send out their letters by first-class mail — about two hundred dollars will cover it.

And you’ll be kind enough to send Smith & Jones enough circulars so there won’t be any delay.
                    </p>

                    <div class="insert-editing-tag-here"></div>

                    <button class="blue edit-comment" onclick=hideMe(this)>modify comment</button>
                </div>


                <br>
                <br>
                <label class="blue">STATUS</label> : <span>Under Investigation</span> <br>
                <label class="blue">LOCATION</label> : <span>-6.54579454, 13.3897463</span>
                <span> &nbsp; </span> <span class="insert-location-editing-tag-here"></span>
                <button class="blue edit-location" onclick=hideMe(this)>modify location</button><br>
                <br>
                <br>

                <div class="image-display">
                    <img src="../images/murder.jpg" class="picture-evidence" title="picture-evidence" />
                </div>
                <br>
                <div class="video-display">
                    <video controls class="video-evidence">
                        <source src="../videos/Fail_Like_a_Child_Inspiration_by_Jay_Shetty.mp4" >
                    </video>
                </div>

               <div class="delete-record-container">
                <button class="red delete">delete</button>
                </div>
            </article>
        </div>`;
    } else if (event.target.id === "intervention-record") {
        displayPost.innerHTML = "";
        displayPost.innerHTML =  `
         <div class="post">
        <article class="actual-post">
            <img src="../images/avatar.png" class="avatar" title="avatar" /> <i class="profile-name"><a href="./profile.html">Justice</a></i>
            <br>
            <h1>Its governments responsibility to care for the children</h1>
            <img src="../images/intervene_icon.png" class="red-flag-icon" title="Red flag" />

            <div class="story">
                <p>
In a few days along comes the letter you expect. Your merchandise is quite good — in fact the writer likes it and wishes to talk to you about it if you will call at such and such a time.

Promptly on the minute you present yourself, trying not to beam. Yes, Mr. Jones, of Smith & Jones, to whom your goods were shown, thinks they’re just what the firm has been looking for. They’re going in to exploit them heavily for you.
All they want is their commission on any merchandise they sell.

Oh yes — there’s going to be the postage on the twenty-five or fifty thousand letters they’re going to send out to all their correspondents, with your prospectus in it.
They send out their letters by first-class mail — about two hundred dollars will cover it.

And you’ll be kind enough to send Smith & Jones enough circulars so there won’t be any delay.
                </p>

                <div class="insert-editing-tag-here"></div>

                <button class="blue edit-comment" onclick=hideMe(this)>modify comment</button>
            </div>


            <br>
            <br>
            <label class="blue">STATUS</label> : <span>Resolved</span> <br>
            <label class="blue">LOCATION</label> : <span>-12.0779454, 1.1097463</span>
            <span> &nbsp; </span> <span class="insert-location-editing-tag-here"></span>
            <button class="blue edit-location" onclick="hideMe(this)">modify location</button><br>
            <br>
            <br>

            <div class="image-display">
                <img src="../images/baby.jpg" class="picture-evidence" title="picture-evidence" />
            </div>
            <br>
            <div class="video-display">
                <video controls class="video-evidence">
                    <source src="../videos/Fail_Like_a_Child_Inspiration_by_Jay_Shetty.mp4">
                </video>
            </div>

            <div class="delete-record-container">
                <button class="red delete">delete</button>
            </div>
        </article>
    </div>`;
    }
};

window.addEventListener("click", injectIncidentRecord);



