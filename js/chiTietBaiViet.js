"use strict";

const userId = {
    name: null,
    identity: null,
    image: null,
    message: null,
    date: null
};

const userComment = document.querySelector(".user-comment")
const publishBtn = document.querySelector("#publish-button")
const comments = document.querySelector(".comments")
const userName = document.querySelector(".user-name")
const userAvatar = document.querySelector(".user-avatar").src;

userComment.addEventListener("input", e => {
    if (!userComment.value) {
        publishBtn.setAttribute("disabled", "disabled");
        publishBtn.classList.remove("abled");
    } else {
        publishBtn.removeAttribute("disabled");
        publishBtn.classList.add("abled");
    }
});

function addPost() {
    console.log("The button works")
    if (!userComment.value) return;
    userId.name = userName.innerHTML;
    userId.identity = true;
    userId.image = userAvatar;
    userId.message = userComment.value;
    userId.date = new Date().toLocaleString();
    let published = 
    `<div class="parents">
        <div class="info-commented-container">
            <img src="${userId.image}">
            <div class="user-commented">
                <div class="user-commented-info">
                    <h3>${userId.name}<h3>
                    <span class="date">${userId.date}</span>
                </div>
                <p>${userId.message}<p>
            </div>
        </div>
        
        <div class="user-commented-message con900">
            <div class="engagements"></div>
        </div>
    </div>`

    comments.innerHTML += published;
    userComment.value = "";
    let commentNums = document.querySelectorAll(".parents").length;
    document.querySelector(".comment-num").textContent = commentNums;
}

publishBtn.addEventListener("click", addPost)