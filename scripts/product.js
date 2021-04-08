//console.log("hello");

function readData() {
    var pid = localStorage.getItem('product'); 
    db.collection("equipments")
        .where("pid", "==", pid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                //console.log(doc.id, " => ", doc.data());
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

                
                var slider = document.getElementById("weeks");
                var output = document.getElementById("rent");


                slider.oninput = function() {
                    var x = this.value;
                    var y = doc.data().cost;
                    var p = x*y
                    document.getElementById("xyz").innerHTML = p + " for " + x + " weeks";
                    //console.log(y*x);
                    if(x == 1) {
                        output.innerHTML = "You want to rent it for " + x + " week";
                    } else {    
                    output.innerHTML = "You want to rent it for " + x + " weeks";
                    }
                    addCartListener(pid,x);
                }

                //addCartListener(pid,x);

                db.collection("reviews").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        //console.log(doc);
                        if (doc.data().pid == "db1") {
                            let x = doc.data().stars;
                            for (var j = 1; j <= x; j++) {
                                $(".stars" + j).css("color", "orange");                    
                            }
                            var stars = $('<div class="star"> <span class="fa fa-star stars1"></span> <span class="fa fa-star stars2"></span><span class="fa fa-star stars3"></span><span class="fa fa-star stars4"></span><span class="fa fa-star stars5"></span></div>');
                            $("#alen").append(stars);
            
                            var data = $()
                        
                        }
                    })
                } )

                let review = firebase.database().ref("ratings");
                document.getElementById("addReview").addEventListener("submit",submitReview);


                function submitReview(e){
                    e.preventDefault();
                    var name = getIdVal("userName");
                    var email = getIdVal("userEmail");
                    var decrip = getIdVal("userDesc");
                    var star = getIdVal("starsRate");
                    var prodID = pid;

                    saveReview(name, email, decrip, star, prodID);

                    console.log(name + " " + email + " " + decrip + " " + star + " " + prodID);

                    document.getElementById("reviewAlert").style.display = "block";

                    setTimeout(function(){
                        document.getElementById("reviewAlert").style.display = "none";
                    },3000);

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

function getIdVal(id){
    return document.getElementById(id).value;
}

function saveReview(name, email, decrip, star, prodID){   
    
    db.collection("reviews").add({         //write to firestore
        description : decrip,
        email : email,
        name : name,
        stars : star,
        pid : prodID,                          //with authenticated user's ID (user.uid)
    });    
}

function addCartListener(id,week) {
    document.getElementById("Add-to-cart").addEventListener("click", function () {
      console.log("Add-to-cart was clicked!");     
      window.location.assign("cart.html?id=" + id +"&week=" + week);   
    });
  }