function getProduct(){
    const parsedUrl = new URL(window.location.href);
    var id = parsedUrl.searchParams.get("id");
    var week = parsedUrl.searchParams.get("week");
    console.log("id = " + id + " weeks = " + week);
}

getProduct();