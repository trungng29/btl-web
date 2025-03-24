let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");




btn.onclick = function() {
    sidebar.classList.toggle("active");
}


document.addEventListener("DOMContentLoaded", function () {
    let menuItems = document.querySelectorAll(".nav_list li a");
    let sections = {
        "Thống kê dữ liệu": document.getElementById("staticManagement"),
        "Quản lý bài viết": document.getElementById("postManagement"),
        "Quản lý danh mục": document.getElementById("categoryManagement"),
        "Quản lý người dùng": document.getElementById("userManagement"),
        "Quản lý bình luận": document.getElementById("commentManagement")
    };


    menuItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();


            // Lấy tên menu vừa click
            let menuName = this.querySelector(".links_name").innerText;


            // Ẩn tất cả các phần nội dung
            Object.values(sections).forEach(section => section.style.display = "none");


            // Hiển thị nội dung của menu vừa nhấn
            sections[menuName].style.display = "block";


            // Xóa 'active' khỏi tất cả menu
            menuItems.forEach(link => link.parentElement.classList.remove("active"));


            // Đánh dấu menu được chọn là 'active'
            this.parentElement.classList.add("active");
        });
    });
});