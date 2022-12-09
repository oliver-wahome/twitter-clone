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

        //using jquery to output html to the DOM
        firebase.firestore().collection("tweets").get()
            .then((querySnapShot) => {
                var content = "";

                querySnapShot.forEach((doc) => {
                    var tweetText = doc.data().tweetText;

                    console.log(tweetText);
                })

            })

    }else {
        //else if user is not logged in
        window.location.href = "index.html";
    }
})