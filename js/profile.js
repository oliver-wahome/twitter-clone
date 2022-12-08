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
        })

    }
    else {
        window.location.href = "index.html";
    }
})