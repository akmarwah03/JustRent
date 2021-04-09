function getProduct() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var users = db.collection("cart").where("user", "==", user.uid);
            users.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let id = doc.data().pid;
                        let week = doc.data().week;
                        db.collection("equipments")
                            .doc(id)
                            .get()
                            .then(function (doc) {
                                var name = doc.data().name;
                                var cost = doc.data().cost;
                                var urlImg = doc.data().imgurl;
                                var calcCost = week * cost;
                                console.log(name + " => " + calcCost);
                                var productImage = $("<div class='col-sm-3'><img id='productImg' src=" + urlImg + " alt='Product image'></div>");
                                $(".cart-main").append(productImage);
                                var productDescip = $("<div class='col-sm-6 desc'><h4>" + name + "</h4><br><p class='cartCost'>$" +
                                    calcCost + " for " + week + " weeks</p></div>");
                                $(".cart-main").append(productDescip);
                            })
                    });
                });
        } else {
            console.log("Login in first");
        }
    });
}

getProduct();

$(".buy").click(() => {
    window.location = "./checkout.html";
})