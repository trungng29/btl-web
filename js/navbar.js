window.addEventListener("scroll", function(){
    var header = document.querySelector(".navbar-duoi")
    header.classList.toggle("sticky", this.window.scrollY > 80)
});