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
    }
    else {
        console.log("user is not logged in");
    }
})