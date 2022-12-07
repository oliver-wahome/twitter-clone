//check if a user is authenticated
firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        //if user is logged in
        console.log("user is logged in");

        //getting the user's id
        var userId = user.uid;
        console.log(userId);

        //logout user onclick of logout btn
        document.getElementById("logout").onclick = function() {
            firebase.auth().signOut();
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

    }else {
        //else if user is not logged in
        console.log("user isn't logged in");

        window.location.href = "index.html";
    }
})