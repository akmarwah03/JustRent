$(document).ready(() => {
    $('#db').click(()=>{
        localStorage.setItem('category',"db");
    });

    $('#wp').click(()=>{
        localStorage.setItem('category',"wp");
    });

    $('#kb').click(()=>{
        localStorage.setItem('category',"kb");
    });
});