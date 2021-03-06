function readData() {
    var pid = localStorage.getItem('product');
    db.collection("equipments")
        .where("pid", "==", pid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                $("img#img1").attr("src", doc.data().imgurl);
                $("img#img2").attr("src", doc.data().imgurl1);
                $("img#img3").attr("src", doc.data().imgurl2);
                $("h1.prd-name").text(doc.data().name);
                $(".desc").text(doc.data().category);
                $(".cost").text(doc.data().cost);
                $(".product-descrip").text(doc.data().description);

                var starNo = Math.floor(doc.data().avgRating);
                starRating(starNo);

                $(".hght").text(doc.data().height);
                $(".wdth").text(doc.data().width);
                $(".lgth").text(doc.data().length);


                var slider = document.getElementById("weeks");
                var output = document.getElementById("rent");


                slider.oninput = function () {
                    var x = this.value;
                    var y = doc.data().cost;
                    var p = x * y
                    document.getElementById("xyz").innerHTML = p + " for " + x + " weeks";

                    if (x == 1) {
                        output.innerHTML = "You want to rent it for " + x + " week";
                    } else {
                        output.innerHTML = "You want to rent it for " + x + " weeks";
                    }
                    addCartListener(pid, x);
                }



                db.collection("reviews").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().pid == pid) {

                            var row = $("<div class='row'></div>");
                            $('#review').append(row);

                            var row2 = $("<div class='row'><div class='col'></div></div><br>");
                            $('#review').append(row2);

                            var col1 = $("<div class='col-3'><img src='./images/stockuser.jpg' alt='' style='border-radius: 50%; height: 50px; width: auto; float: left;'></div>");
                            $(row).append(col1);

                            var col2 = $("<div class='col-9'></div>");
                            $(row).append(col2);

                            let x = doc.data().stars;
                            for (var j = 1; j <= x; j++) {
                                $(".stars" + j).css("color", "orange");
                            }

                            let z = doc.data().name;
                            var name = $('<div class = "name">' + (doc.data().name) + '</div>')
                            $(col2).append(name);

                            var stars = $('<div class="star"> <span class="fa fa-star stars1"></span> <span class="fa fa-star stars2"></span><span class="fa fa-star stars3"></span><span class="fa fa-star stars4"></span><span class="fa fa-star stars5"></span></div>');
                            $(col2).append(stars);

                            let y = doc.data().description;
                            var description = $('<div class ="description">' + (doc.data().description) + '</div>')
                            $(row2).append(description);

                        }
                    })
                })


                document.getElementById("addReview").addEventListener("submit", submitReview);


                function submitReview(e) {
                    e.preventDefault();
                    var name = getIdVal("userName");
                    var email = getIdVal("userEmail");
                    var decrip = getIdVal("userDesc");
                    var star = getIdVal("starsRate");
                    var prodID = pid;

                    saveReview(name, email, decrip, star, prodID);

                    document.getElementById("reviewAlert").style.display = "block";

                    setTimeout(function () {
                        document.getElementById("reviewAlert").style.display = "none";
                    }, 3000);

                    document.getElementById("userName").value = " ";
                    document.getElementById("userEmail").value = " ";
                    document.getElementById("userDesc").value = " ";
                    document.getElementById("starsRate").value = " ";
                };

            });
        })
}

function starRating(x) {
    for (var j = 1; j <= x; j++) {
        $(".st" + j).css("color", "orange");
    }

}

readData();

function getIdVal(id) {
    return document.getElementById(id).value;
}

function saveReview(name, email, decrip, star, prodID) {

    db.collection("reviews").add({
        description: decrip,
        email: email,
        name: name,
        stars: star,
        pid: prodID,
    });
}

function addCartListener(id, week) {
    document.getElementById("Add-to-cart").addEventListener("click", function () {
        console.log("Add-to-cart was clicked!");
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var users = db.collection("cart").doc();
                users.set({
                    "user": user.uid,
                    "pid": id,
                    "week": week
                });
                document.getElementById("cartAlert").innerHTML = `<strong>Product added to your Cart!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
                document.getElementById("cartAlert").style.display = "block";

                setTimeout(function () {
                    document.getElementById("cartAlert").style.display = "none";
                }, 3000);
            } else {
                console.log("Login in first");
            }
        });
    });
}