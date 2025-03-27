document.getElementById('txt_dn').addEventListener('click', function() {
    document.getElementById('txt_dn').classList.add("clicked-effect");
    document.getElementById('txt_dk').classList.remove("clicked-effect");
});

document.getElementById('txt_dk').addEventListener('click', function() {
    document.getElementById('txt_dn').classList.remove("clicked-effect");
    document.getElementById('txt_dk').classList.add("clicked-effect");
}); 
