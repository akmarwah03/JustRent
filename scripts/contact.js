function saveRequest(uEmail, uMessage) {

    db.collection("contact").add({
        email: uEmail,
        message: uMessage,
    });
}

document.getElementById("cont").addEventListener("submit", submitReview);

function submitReview(e) {
    e.preventDefault();

    let mail = document.querySelector("#userEmail").value;
    let mess = document.querySelector("#userMessage").value;

    saveRequest(mail, mess);

    document.querySelector("#alrt").style.display = "block";

    setTimeout(function () {
        document.querySelector("#alrt").style.display = "none";
    }, 3000);

    document.querySelector("#userEmail").value = "";
    document.querySelector("#userMessage").value = "";
}