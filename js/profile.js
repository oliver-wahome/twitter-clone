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

        //reading the data associated with the logged in user
        firebase.firestore().collection("users").doc(userId).get().then((doc) =>{
            var fname = doc.data().firstName;
            var lname = doc.data().lastName;
            var bio = doc.data().bio;

            document.getElementById("firstName").value = fname;
            document.getElementById("lastName").value = lname;
            document.getElementById("userBio").value = bio;
        })

        //update user information
        document.getElementById("saveInfo").onclick = function(){
            var firstName = document.getElementById("firstName").value;
            var lastName = document.getElementById("lastName").value;
            var bio = document.getElementById("userBio").value;

            firebase.firestore().collection("users").doc(userId).update({
                firstName: firstName,
                lastName: lastName,
                bio: bio
            })
            .then(() => {
                window.location.reload();
            })
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
    }
    else {
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