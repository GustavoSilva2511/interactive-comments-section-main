function CE(Name, nameClass, type, insert) {
    let element = document.createElement(Name);
    type == "id" ? element.id = nameClass : element.className = nameClass;
    
    if (insert) {
        element.innerHTML = insert
    }
    return element;
}

function createComment(comment, currentUser) {

    let commentAndReplies = CE("div", "comment-replies")
    commentAndReplies.style = `order: ${comment.score * -1}`
    commentAndReplies.id = comment.user.username + "-replies"

    let Comment = CE("div", "comment");
    Comment.id = comment.user.username
    Comment.style = `order: ${comment.score * -1}`

    let likesReply = CE("div", "mobile-likes-reply");


    let Likes = CE("div", "likes");

    let btnMore = CE("button", "btn-more", "class", "+");
    btnMore.addEventListener("click", () => {
        let likeNum = document.querySelector(`#${comment.user.username} #like`)
        likeNum.innerHTML = parseInt(likeNum.innerHTML) + 1
        document.getElementById(comment.user.username).style = `order: ${likeNum.innerHTML * -1}`
        document.getElementById(comment.user.username+"-replies").style = `order: ${likeNum.innerHTML * -1}`
    })
    let btnLess = CE("button", "btn-less", "class", "-");
    btnLess.addEventListener("click", () => {
        let likeNum = document.querySelector(`#${comment.user.username} #like`)
        likeNum.innerHTML = parseInt(likeNum.innerHTML) - 1
        document.getElementById(comment.user.username).style = `order: ${likeNum.innerHTML * -1}`
        document.getElementById(comment.user.username+"-replies").style = `order: ${likeNum.innerHTML * -1}`
    })

    let likeNum = CE("p", "like", "id", comment.score);

    [btnMore, likeNum, btnLess].map(async (ele) => {await Likes.appendChild(ele)});


    let userInfos = CE("div", "user-infos");
    let user = CE("div", "user");

    let userImg = CE("img", "photo");
    userImg.src = comment.user.image.png;
    let username = CE("p", "username", "class", comment.user.username);
    let indicator = CE("p", "indicator", "class", "you")
    currentUser.username == comment.user.username ? indicator.style = "diplay: block" : indicator.style = "display: none"
    let time = CE("div", "time", "class", comment.createdAt);
    [userImg, username, indicator, time].map((ele) => {user.appendChild(ele)});

    let reply = CE("div", "reply r-mobile") ;

    reply.addEventListener("click", () => {
        console.log("oi")
    })

    let replyIcon = CE("img", "reply-icon");
    replyIcon.src = "./images/icon-reply.svg"
    let replyText = CE("p", "reply-text", "class", "Reply");

    [replyIcon, replyText].map((ele) => {reply.appendChild(ele)});

    [user, reply].map((ele) => {userInfos.appendChild(ele)});

    reply.className = "reply r-mobile";
    [Likes, reply].map((ele) => {likesReply.appendChild(ele)})
    

    let div = CE("div", "none")
    let content = CE("div", "content")
    let contentText = CE("p", "content-text", "class", comment.content);
    content.appendChild(contentText);

    [userInfos, content].map((ele) => {div.appendChild(ele)});
    [likesReply, div].map((ele) => {Comment.appendChild(ele)});
    commentAndReplies.appendChild(Comment);

    let divReplies = CE("div", "replies");
    divReplies.style = `order: ${comment.score * -1}`;
    comment.replies?.map((ele) => {divReplies.appendChild(createComment(ele, currentUser))});
    
    commentAndReplies.appendChild(divReplies);

    return commentAndReplies;
}


fetch("./data.json")
.then(res => res.json())
.then(data => {
    let comments = data.comments;
    let currentUser = data.currentUser;
    
    comments.map((ele) => {
        let divComments = document.getElementById("comments");
        divComments.appendChild(createComment(ele, currentUser))
    })


})