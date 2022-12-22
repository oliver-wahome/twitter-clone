//checking if the user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        var userId = user.uid;

        //getting user data from firestore and printing to DOM
        firebase.firestore().collection("users").doc(userId).get()
            .then((doc) =>{
                var firstName = doc.data().firstName;
                var lastName = doc.data().lastName;

                //print firestore user data to their profile page
                document.getElementById("menuLeftProfileName").innerText = firstName +" "+ lastName;
                document.getElementById("menuLeftProfileHandle").innerText = "@"+firstName+lastName;
            });

        //getting all users and outputting them in dm section except logged in user
        firebase.firestore().collection("users").where("userId", "!=", userId).get()
            .then((allUsers) =>{
                var content = "";

                allUsers.forEach((doc) => {
                    var username = doc.data().firstName + " " + doc.data().lastName;
                    var handle = "@" + doc.data().firstName + doc.data().lastName;

                    content += '<div class="tweet">';
                        content += '<img class="tweetProfilePic" src="https://cdn-icons-png.flaticon.com/512/236/236831.png" alt="profile-picture-icon-image" />';
                        content += '<div class="tweetContent">';
                            content += '<div class="tweetContentTopRow">';
                                content += '<div class="profileNames">';
                                    content += '<p id="username">'+username+'</p>';
                                    content += '<p id="userHandle">'+handle+'</p>';
                                    content += '<div class="topRowDot"></div>';
                                    content += '<p id="tweetTime">10h</p>';
                                content += '</div>';
                            content += '</div>';
                        content += '</div>';
                    content += '</div>';
                });
                $("#userDirectMessages").append(content);
                
            })
    }
    else {
        console.log("user is not logged in");
    }
})