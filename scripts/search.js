var count = 1;
$('#search').click(function(e) 
{
    if (count % 2 == 0) {
     document.getElementById("searchbar").style.display = "none";
     document.getElementById("search").innerHTML = '<i class="fas fa-search"></i>'
    } else {
     document.getElementById("searchbar").style.display = "block";
     document.getElementById("search").innerHTML = '<i class="fas fa-times"></i>'
    }
    count++;
    
})


    