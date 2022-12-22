//check if user is authenticated
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        //if user is logged in

        //getting tweetId from the url
        var urlString = decodeURIComponent(window.location.search);
        var tweetId = urlString.substring(1);

        //posting the tweet to the tweet page
        firebase.firestore().collection("tweets").doc(tweetId).get()
            .then((doc) => {
                var tweetText = doc.data().tweetText;
                var content = "";

                content += '<div class="tweetContainer">';
                    content += '<div class="tweet">';
                        content += '<img class="tweetProfilePic" src="https://cdn-icons-png.flaticon.com/512/236/236831.png" alt="profile-picture-icon-image" />';
                        content += '<div class="tweetContent">';
                            content += '<div class="tweetContentTopRow">';
                                content += '<div class="profileNames">';
                                    content += '<p id="username">username</p>';
                                    content += '<p id="userHandle">@userhandle</p>';
                                    content += '<div class="topRowDot"></div>';
                                    content += '<p id="tweetTime">10h</p>';
                                content += '</div>';
                            content += '</div>';
                            content += '<p id="tweetText">'+ tweetText +'</p>';
                        content += '</div>';
                        content += '<div onmouseover="moreBtnBlue(\'tweetMoreImage_tweetPage)" onmouseout="moreBtnGrey(\'tweetMoreImage_tweetPage)" class="tweetMoreBtn">';
                            content += '<img id="tweetMoreImage_tweetPage" src="https://cdn-icons-png.flaticon.com/128/512/512142.png" alt="more-icon-image" height="15px" />';
                        content += '</div>';
                    content += '</div>';

                    content += '<div class="tweetIcon comment" >';
                        content += '<span class="icon commentIcon"><i class="fa fa-comment-o" aria-hidden="true"></i></span>';
                        content += '<p id="comments">1000</p>';
                    content += '</div>';
                    content += '<div class="tweetIcon retweet">';
                            content += '<span class="icon retweetIcon"><i class="fa fa-retweet" aria-hidden="true"></i></span>';
                            content += '<p id="retweets">1000</p>';
                    content += '</div>';
                    content += '<div class="tweetIcon like">';
                        content += '<span class="icon likeIcon"><i class="fa fa-heart-o" aria-hidden="true"></i></span>';
                        content += '<p id="likes">1000</p>';
                    content += '</div>';
                    content += '<div class="tweetIcon share">';
                        content += '<span class="icon shareIcon"><i class="fa fa-upload" aria-hidden="true"></i></span>';
                    content += '</div>';

                content += '</div>';


                $("#tweet").append(content);
            })
        
        //retrieving the tweet's comments and posting them on the tweet page
        firebase.firestore().collection("comments").where("tweetId", "==", tweetId).get()
            .then((allComments) => {
                console.log(tweetId);
                var content = "";

                allComments.forEach((doc) => {
                    var commentText = doc.data().comment;

                    console.log(commentText);

                    content += '<div class="tweet">';
                        content += '<img class="tweetProfilePic" src="https://cdn-icons-png.flaticon.com/512/236/236831.png" alt="profile-picture-icon-image" />';
                        content += '<div class="tweetContent">';
                            content += '<div class="tweetContentTopRow">';
                                content += '<div class="profileNames">';
                                    content += '<p id="username">username</p>';
                                    content += '<p id="userHandle">userhandle</p>';
                                    content += '<div class="topRowDot"></div>';
                                    content += '<p id="tweetTime">10h</p>';
                                content += '</div>';
                                content += '<img id="tweetMoreBtn" src="https://cdn-icons-png.flaticon.com/128/512/512142.png" alt="more-icon-image" height="15px" />';
                            content += '</div>';
                            content += '<p id="tweetText">'+ commentText +'</p>';
                            content += '<div class="tweetIcons">';
                                content += '<div class="tweetIcon commentIconSection" data-bs-toggle="modal" data-bs-target="#commentModal" >';
                                    content += '<span class="icon commentIcon"><i class="fa fa-comment-o" aria-hidden="true"></i></span>';
                                    content += '<p id="comments">1000</p>';
                                content += '</div>';
                                content += '<div class="tweetIcon">';
                                        content += '<span class="icon retweetIcon"><i class="fa fa-retweet" aria-hidden="true"></i></span>';
                                        content += '<p id="retweets">1000</p>';
                                content += '</div>';
                                content += '<div class="tweetIcon">';
                                    content += '<span class="icon likeIcon"><i class="fa fa-heart-o" aria-hidden="true"></i></span>';
                                    content += '<p id="likes">1000</p>';
                                content += '</div>';
                                content += '<div class="tweetIcon">';
                                    content += '<span class="icon shareIcon"><i class="fa fa-upload" aria-hidden="true"></i></span>';
                                content += '</div>';
                            content += '</div>';
                        content += '</div>';
                    content += '</div>';
                })

                $("#commentsList").append(content);
            })
    }else {
        //if user is not logged in;
        window.location.href = "index.html";
    }
});

//functions to change the tweet moreBtn on hover of its parent div
//function to change the tweet more btn to blue on hover
function moreBtnBlue(elementId) {
    document.getElementById(elementId).src = "../images/moreBlue.png";
}
//function to return trendsMoreBtn back to grey onmouseout
function moreBtnGrey(elementId){
    document.getElementById(elementId).src = "https://cdn-icons-png.flaticon.com/128/512/512142.png";
}