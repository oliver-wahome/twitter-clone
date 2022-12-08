//lets check if a user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        //get user id
        var userId = user.uid;
        console.log(userId);

        //reading user data from firestore db
        firebase.firestore().collection("users").doc(userId).get().then((doc) => {
            var firstName = doc.data().firstName;
            var lastName = doc.data().lastName;
            var email = doc.data().email;

            //print firestore user data to their profile page
            document.getElementById("profileName").innerText = firstName +" "+ lastName;
            document.getElementById("profileEmail").innerText = email;
            document.getElementById("menuLeftProfileName").innerText = firstName + " " + lastName;
            document.getElementById("menuLeftProfileHandle").innerText = "@"+firstName+lastName;
        })

        //send a tweet to firestore user collection
        function tweetBtnOnclick() {
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

    }
    else {
        window.location.href = "index.html";
    }
})