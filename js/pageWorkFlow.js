document.addEventListener("DOMContentLoaded", function () {

    const subMenuParent = document.querySelectorAll(".sub-menu-parent a")

    for ( let i = 0; i < subMenuParent.length; i++ ) {
        subMenuParent[i].addEventListener("click", function(e) {
            e.preventDefault();
            const categoryName = subMenuParent[i].textContent;
            console.log(categoryName);

            window.localStorage.setItem("category-name", categoryName);
            window.location.href = "../html/trangDanhMuc.html";
        })
    }




































});
