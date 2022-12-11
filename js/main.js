//function to add a users details to firebase authentication
function signUpSubmit(){
    document.getElementById("signUpBtn").style.display = "none";
    document.getElementById("signUpSpinnerBtn").style.display = "block";
    var firstName = document.getElementById("signUpFirstName").value;
    var lastName = document.getElementById("signUpLastName").value;
    var email = document.getElementById("signUpEmail").value;
    var password = document.getElementById("signUpPassword").value;

    console.log(email +" "+ password);

    //Implementing javascript promise to catch errors while authenticating on firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userInfo) =>{
            var userId = userInfo.user.uid;
            var timeStamp = new Date();

            //This is where the code to redirect users to logged in twitter will be.
            firebase.firestore().collection("users").doc(userId).set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                timeStamp: timeStamp,
                userId: userId
            }).then(() => {
                window.location.href = "home.html"
            })

        }).catch((error) => {
            console.log(error.message);
            document.getElementById("alertSignUp").style.display = "block";
            document.getElementById("alertSignUp").innerText = error.message;
        });
}

/* 
    function to check if a user has account in the firebase authentication 
    database and either logging them in or alertin them to create an account.
*/
function loginSubmit(){
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("loginSpinnerBtn").style.display = "block";
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userInfo) => {
            //Logged In
            window.location.href = "home.html";

        })
        .catch((error) => {
            console.log(error.message);
            document.getElementById("loginBtn").style.display = "block";
            document.getElementById("loginSpinnerBtn").style.display = "none";
            document.getElementById("alertLogin").style.display = "block";
            document.getElementById("alertLogin").innerText = error.message;
        });
}

// function to reset user email password through modal
function resetPassword(){
    var email = document.getElementById("resetPassEmail").value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            document.getElementById("alertSuccessResetPass").style.display = "block";
            document.getElementById("alertDangerResetPass").style.display = "none";
            document.getElementById("alertSuccessResetPass").innerText = "The Reset Link has been sent to your email.(Check both Inbox and spam folders)";
        })
        .catch((error) => {
            var errorMessage = error.message;
            document.getElementById("alertDangerResetPass").style.display = "block";
            document.getElementById("alertSuccessResetPass").style.display = "none";
            document.getElementById("alertDangerResetPass").innerText = errorMessage;
        });
}

//functions to change the trendsMoreBtn on hover of its parent div
//function to change the trends more btn to blue on hover
function moreBtnBlue(num) {
    document.getElementById("moreImage"+num).src = "images/moreBlue.png";
}
//function to return trendsMoreBtn back to grey onmouseout
function moreBtnGrey(num){
    document.getElementById("moreImage"+num).src = "https://cdn-icons-png.flaticon.com/128/512/512142.png";
}