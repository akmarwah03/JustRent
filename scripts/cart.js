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
                                var row = $("<div class='cart-item row'></div><hr>");
                                $(".cart-main").append(row);
                                var productImage = $("<div class='col'><img id='productImg' src=" + urlImg + " alt='Product image'></div>");
                                $(".row").append(productImage);
                                var info = $("<div class='col info'><h4>" + name + "</h4><p class='des'>for " + week + " at $" + cost + "/week<p/><strong class='tco'>$ " + calcCost + "</strong>");
                                $(".row").append(info);
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