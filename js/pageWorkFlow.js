document.addEventListener("DOMContentLoaded", function () {

    const subMenuParent = document.querySelectorAll(".sub-menu-parent a")
    const burgerIconSubMenuParent = document.querySelectorAll(".cat-set-big-title")

    function chuyenTrang(name) {
        const categoryName = name.textContent;

        window.localStorage.setItem("category-name", categoryName);
        window.location.href = "../html/trangDanhMuc.html";
    }

    for ( let i = 0; i < subMenuParent.length; i++ ) {
        subMenuParent[i].addEventListener("click", function(e) {
            e.preventDefault();
            chuyenTrang(subMenuParent[i])
        })
    }

    for ( let i = 0; i < burgerIconSubMenuParent.length; i++ ) {
        burgerIconSubMenuParent[i].addEventListener("click", function(e) {
            e.preventDefault();
            chuyenTrang(burgerIconSubMenuParent[i])
        })
    }







































});
