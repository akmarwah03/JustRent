var total = 0;

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
                                var calcCost = week * cost;
                                total += calcCost;
                                let code = $('<div class="item"><span class="price">$' + calcCost + '</span><p class="item-name">' + name + '</p><p class="item-description">' + doc.data().description + '</p></div>');
                                $(".products .title").after(code);
                                $(".total .price").html("$" + total);
                            })

                    });

                });
        } else {
            console.log("Login in first");
        }
    });
}

getProduct();

$(".checker").click(() => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var users = db.collection("cart").where("user", "==", user.uid);
            users.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    db.collection("orders").doc(doc.uid).set(doc.data());
                    doc.ref.delete();
                });
            });

        } else {
            console.log("Login in first");
        }
    });
})