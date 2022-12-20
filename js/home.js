//check if a user is authenticated
firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        //if user is logged in
        //getting the user's id
        var userId = user.uid;

        //getting user data from firestore and printing to DOM
        firebase.firestore().collection("users").doc(userId).get()
            .then((doc) =>{
                var firstName = doc.data().firstName;
                var lastName = doc.data().lastName;
                var email = doc.data().email;

                //print firestore user data to their profile page
                document.getElementById("menuLeftProfileName").innerText = firstName +" "+ lastName;
                document.getElementById("menuLeftProfileHandle").innerText = "@"+firstName+lastName;
            })

        //logout user onclick of logout btn
        document.getElementById("logout").onclick = function() {
            firebase.auth().signOut();
        }

        //functions to change the tweet moreBtn on hover of its parent div
        //function to change the tweet more btn to blue on hover
        function moreBtnBlue(num) {
            document.getElementById("moreImage"+num).src = "images/moreBlue.png";
        }
        //function to return trendsMoreBtn back to grey onmouseout
        function moreBtnGrey(num){
            document.getElementById("moreImage"+num).src = "https://cdn-icons-png.flaticon.com/128/512/512142.png";
        }

        //send a tweet to firestore user collection
        document.getElementById("tweetBtn").onclick = function() {
            var tweet = document.getElementById("tweetTextarea").value;
            var timeStamp = new Date();

            //separating the firestore set function allows us to get the document id
            var sendTweet = firebase.firestore().collection("tweets").doc();
            sendTweet.set({
                tweetText:tweet,
                userId: userId,
                timeStamp: timeStamp,
                tweetId: sendTweet.id

            }).then(() => {
                window.location.reload();
            })
        }

        //send a tweet to firestore user collection
        window.addComment = function(tweetId) {
            //using jquery to output html to the DOM
            //getting specific tweet data and outputting it to comment modal
            firebase.firestore().collection("tweets").doc(tweetId).get()
            .then((doc) => {
                var content = "";
                var tweetText = doc.data().tweetText;
                var tweetId = doc.id;

                content += '<div class="tweet">';
                    content += '<img class="tweetProfilePic" src="https://cdn-icons-png.flaticon.com/512/236/236831.png" alt="profile-picture-icon-image" />';
                    content += '<div class="tweetContent">';
                        content += '<div class="tweetContentTopRow">';
                            content += '<div class="profileNames">';
                                content += '<p id="username"></p>';
                                content += '<p id="userHandle">userhandle</p>';
                                content += '<div class="topRowDot"></div>';
                                content += '<p id="tweetTime">10h</p>';
                            content += '</div>';
                            content += '<img id="tweetMoreBtn" src="https://cdn-icons-png.flaticon.com/128/512/512142.png" alt="more-icon-image" height="15px" />';
                        content += '</div>';
                        content += '<p id="tweetText">'+ tweetText +'</p>';
                        content += '<div class="tweetIcons">';
                            content += '<div class="tweetIcon commentIconSection" data-bs-toggle="modal" data-bs-target="#commentModal" onclick=addComment("'+tweetId+'") >';
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

                $("#commentModalTweet").replaceWith(content);

            });

            console.log(tweetId);

            document.getElementById("replyModalBtn").onclick = function(){
                var comment = document.getElementById("commentTextarea").value;
                var timeStamp = new Date();
                
                //separating the firestore set function allows us to get the document id
                var sendComment = firebase.firestore().collection("comments").doc();
                sendComment.set({
                    tweetId: tweetId,
                    comment: comment,
                    timeStamp: timeStamp,
                    userId: userId,
                    commentId: sendComment.id
                })
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error.message);
                })
            }
        }

        function openTweet(urlString){
            window.location.href = urlString;
        }

        //using jquery to output html to the DOM
        firebase.firestore().collection("tweets").get()
        .then((querySnapShot) => {
            var content = "";

            querySnapShot.forEach((doc) => {
                var tweetText = doc.data().tweetText;
                var tweetId = doc.id;
                var link = "tweet.html" + "?" + tweetId;

                content += '<div onclick=openTweet("'+link+'") class="tweet">';
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
                        content += '<p id="tweetText">'+ tweetText +'</p>';
                        content += '<div class="tweetIcons">';
                            content += '<div class="tweetIcon commentIconSection" data-bs-toggle="modal" data-bs-target="#commentModal" onclick=addComment("'+tweetId+'") >';
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
            $("#tweetsList").append(content);

        })

    }else {
        //else if user is not logged in
        window.location.href = "index.html";
    }
});