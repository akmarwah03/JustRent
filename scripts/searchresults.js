db.collection("equipments").get().then((querySnapshot) => {
    let group = $('<div class="row row-cols-1 row-cols-md-2 g-4"></div>');
    $('#main').append(group);
    let search = localStorage.getItem("search");
    querySnapshot.forEach((doc) => {
        if (doc.data().name.toLowerCase().includes(search)) {
            let col = $('<div class="col"></div>');
            $(group).append(col);
            let pid = doc.data().pid;
            let out = $('<div class="card border-dark" id = "' + pid + '"></div>');
            out.click(() => {
                localStorage.setItem('product', pid);
                window.location.href = "./product.html";
            });
            $(col).append(out);
            let img = $('<img class="card-img-top"/>');
            let cardbody = $('<div class="card-body"></div>');
            let title = $('<h5 class="card-title"></h5>');
            let star1 = $('<span class="fa fa-star"></span>');
            let star2 = $('<span class="fa fa-star"></span>');
            let star3 = $('<span class="fa fa-star"></span>');
            let star4 = $('<span class="fa fa-star"></span>');
            let star5 = $('<span class="fa fa-star"></span>');
            let text = $('<p class="card-text"></p>');
            $(out).append(img, cardbody);
            $(cardbody).append(title, star1, star2, star3, star4, star5, text);
            img.attr("src", doc.data().imgurl);
            title.html(doc.data().name);
            text.html(doc.data().description);
            if (doc.data().avgRating >= 1) {
                star5.addClass("checked");
                if (doc.data().avgRating >= 2) {
                    star4.addClass("checked");
                    if (doc.data().avgRating >= 3) {
                        star3.addClass("checked");
                        if (doc.data().avgRating >= 4) {
                            star2.addClass("checked");
                            if (doc.data().avgRating == 5) {
                                star1.addClass("checked");
                            }
                        }
                    }
                }
            }
        }
    });
});