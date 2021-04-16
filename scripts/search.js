var count = 1;
document.getElementById("searchbar").style.display = "none";
$('#search').click(function (e) {
    if (count % 2 == 0) {
        document.getElementById("searchbar").style.display = "none";
        document.getElementById("search").innerHTML = '<i class="fas fa-search"></i>'
    } else {
        document.getElementById("searchbar").style.display = "block";
        document.getElementById("search").innerHTML = '<i class="fas fa-times"></i>'
    }
    count++;

})

document.querySelector('#searchform').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearch(formData.get("searchbar"));
    window.location = "./search.html";
});

async function setSearch(search) {
    localStorage.setItem("search", search);
}