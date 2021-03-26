console.log("hello");
function readData() {
    db.collection("equipments")
        .where("pid", "==", "db1")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                console.log(doc.id, " => ", doc.data());
                $("img.pimg").attr("src", doc.data().imgurl);
                $("h1.prd-name").text(doc.data().name);
                $(".desc").text(doc.data().category);
                $(".cost").text(doc.data().cost);
                $(".product-descrip").text(doc.data().description);

                var starNo = Math.floor(doc.data().avgRating);
                starRating(starNo);

                $(".hght").text(doc.data().height);
                $(".wdth").text(doc.data().width);
                $(".lgth").text(doc.data().lenght);
            });
        })    
}

function starRating(x) {
    for (var j = 1; j <= x; j++) {
        $(".st" + j).css("color", "orange");
    }

}

readData();