function getProduct(){
    const parsedUrl = new URL(window.location.href);
    var id = parsedUrl.searchParams.get("id");
    var week = parsedUrl.searchParams.get("week");
    console.log("id = " + id + " weeks = " + week);

    db.collection("equipments")
        .doc(id)
        .get()
        .then(function(doc) {
            var name = doc.data().name;
            var cost = doc.data().cost;
            var urlImg = doc.data().imgurl;
            var calcCost = week * cost;
            console.log(name + " => " + calcCost);
            var alert = $("<div class='alert alert-success' role='alert' id='cart-message'>"+ name +" has been added to your cart.</div>");
            $(".cart-main").append(alert);
            var productImage = $("<div class='col-sm-3'><img id='productImg' src=" + urlImg +" alt='Product image'></div>");
            $(".cart-main").append(productImage);
            var productDescip = $("<div class='col-sm-6 desc'><h4>" + name + "</h4><br><p class='cartCost'>$" 
                + calcCost + " for " + week + " weeks</p></div>");
            $(".cart-main").append(productDescip);
            setTimeout(function(){
                $("#cart-message").fadeOut();
            },2000);
        })
}

getProduct();