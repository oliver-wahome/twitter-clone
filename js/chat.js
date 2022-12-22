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
                    var link = "chat.html" + "?" + doc.data().userId;


                    content += '<a href="'+link+'" class="tweet">';
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
                    content += '</a>';
                });
                $("#userDirectMessages").append(content);
                
            });

        //getting the userId from the url to know which dms to show user
        var recipientId = decodeURIComponent(window.location.search).substring(1);

        //outputting the recipient details on the top of the user's direct message section
        firebase.firestore().collection("users").doc(recipientId).get()
            .then((doc) => {
                var username = doc.data().firstName + " " + doc.data().lastName;
                var content = '';

                content = '<div class="recipientDetailsContainer">';
                    content += '<img class="tweetProfilePic" src="https://cdn-icons-png.flaticon.com/512/236/236831.png" alt="profile-picture-icon-image" />';
                    content += '<p class="recipientUsername" >'+username+'</p>';
                content += '</div>';

                $("#recipientDetails").replaceWith(content);
                
            });

        //sending messages to firestore onclick of the send button
        document.getElementById("sendDmBtn").onclick = function() {
            //getting the message from the message inputfield
            var message = document.getElementById("messageInput").value;
            var timestamp = new Date();

            //creating a document variable
            var messageDoc = firebase.firestore().collection("messages").doc();

            //adding a firestore collection to store the user messages
            messageDoc.set({
                message: message,
                timestamp: timestamp,
                senderId: userId,
                recipientId: recipientId,
                messageId: messageDoc.id
            })
            .then(() => {
                window.location.reload();
            });
        }

        //getting all the messages between the user and recipient
        firebase.firestore().collection("messages").get()
            .then((allMessages) => {
                var content = '';

                //looping through all message documents in messages collections
                allMessages.forEach((doc) => {
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var sender_id = doc.data().senderId;
                    var recipient_id = doc.data().recipientId;
                    var message = doc.data().message;
                    var msgdate = doc.data().timestamp.toDate();
                    var minutes = msgdate.getMinutes();

                    //to add the '0' to minutes < ten
                    if(minutes < 10){
                        minutes = "0"+minutes;
                    }
                    
                    var timeSent = months[msgdate.getMonth()] + " " + msgdate.getDate() + ", " + msgdate.getFullYear() + " " + msgdate.getHours() + ":" + minutes;

                    //if logged in user sent the message and that message was meant for recipient
                    if(userId == sender_id && recipientId == recipient_id){
                        content += '<div class="messageContainer senderMessageContainer">';
                            content += '<p class="message senderMessage">'+message+'</p>';
                            content += '<p class="messageTimeSent senderMessageTimeSent">'+timeSent+'</p>';
                        content += '</div>';
                    }

                    //if message was received by logged in user and that it was sent to them
                    if(userId == recipient_id && recipientId == sender_id){
                        content += '<div class="messageContainer recipientMessageContainer">';
                            content += '<p class="message recipientMessage">'+message+'</p>';
                            content += '<p class="messageTimeSent recipientMessageTimeSent">'+timeSent+'</p>';
                        content += '</div>';
                    }
                    
                });

                $("#messages").append(content);
            })
    }
    else {
        console.log("user is not logged in");
    }
})