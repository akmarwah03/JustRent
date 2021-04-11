console.log("working");

function saveRequest(uEmail, uMessage) {

    db.collection("contact").add({
        email : uEmail,
        message : uMessage,
    });
    console.log("Request saved -> " + uEmail + ", " + uMessage);
}

document.getElementById("cont").addEventListener("submit",submitReview);

function submitReview(e) {
    e.preventDefault();
    console.log("Submit clicked");

    let mail = document.querySelector("#userEmail").value;
    let mess = document.querySelector("#userMessage").value;
    
    saveRequest(mail,mess);
}

