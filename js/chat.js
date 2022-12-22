//checking if the user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        var userId = user.uid;

        console.log("userId : "+ userId);
    }
    else {
        console.log("user is not logged in");
    }
})