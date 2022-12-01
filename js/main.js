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
            document.getElementById("closeBtn").click();
        },
        function(errorString) {
            console.log(errorString);
        }
    );
}

function loginSubmit(){
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    console.log(email + " " + password);
}