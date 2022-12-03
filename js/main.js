//function to add a users details to firebase authentication
function signUpSubmit(){
    var firstName = document.getElementById("signUpFirstName").value;
    var lastName = document.getElementById("signUpLastName").value;
    var email = document.getElementById("signUpEmail").value;
    var password = document.getElementById("signUpPassword").value;

    console.log(email +" "+ password);

    //Implementing javascript promise to complete firebase auth before closeBtn.click()
    let authPromise = new Promise(function(myResolve, myReject){
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password);
            myResolve();
        } catch (error){
            myReject(error.message);
        }
    });

    authPromise.then(
        function() {
            console.log("This was a success");
            document.getElementById("signUpCloseBtn").click();
        },
        function(errorString) {
            console.log(errorString);
        }
    );
}

/* 
    function to check if a user has account in the firebase authentication 
    database and either logging them in or alertin them to create an account.
*/
function loginSubmit(){
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    console.log(email + " " + password);
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