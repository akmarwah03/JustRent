console.log("hello");
function readData() {
    db.collection("equipments")
        .where("pid", "==", "db6")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                $("img.pimg").attr("src", doc.data().imgurl);
                $("h1.prd-name").text(doc.data().name);
                $(".desc").text(doc.data().category);
                $(".cost").text(doc.data().cost);
                $(".product-descrip").text(doc.data().description);

                var starNo = Math.floor(doc.data().avgRating);
                starRating(starNo);
            });
        })    
}

function starRating(x) {
    for (var j = 1; j <= x; j++) {
        $(".st" + j).css("color", "orange");
    }
}

readData();