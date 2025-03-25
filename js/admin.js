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


document.addEventListener("DOMContentLoaded", function () {
    let approveModal = document.getElementById("approveModal");
    let confirmApproveBtn = document.getElementById("confirmApprove");
    let cancelApproveBtn = document.getElementById("cancelApprove");
    let currentRow = null;

    // 1️⃣ Ẩn nút "Duyệt bài" nếu trạng thái là "Đã duyệt"
    document.querySelectorAll("tr").forEach(row => {
        let statusCell = row.querySelector(".status");
        let approveButton = row.querySelector(".btn-approve");

        if (statusCell && approveButton) {
            if (statusCell.innerText.trim() === "Đã duyệt") {
                approveButton.style.display = "none"; // Ẩn nút duyệt bài
            }
        }

    });

    // 2️⃣ Mở modal khi nhấn "Duyệt bài"
    document.querySelectorAll(".btn-approve").forEach(button => {
        button.addEventListener("click", function () {
            approveModal.style.display = "flex";
            currentRow = this.closest("tr");
        });
    });

    // 3️⃣ Khi nhấn "Có" => Cập nhật trạng thái, ẩn nút "Duyệt bài"
    confirmApproveBtn.addEventListener("click", function () {
        if (currentRow) {
            let statusCell = currentRow.querySelector(".status");
            statusCell.innerText = "Đã duyệt";

            let approveButton = currentRow.querySelector(".btn-approve");
            if (approveButton) {
                approveButton.remove(); // Xóa nút "Duyệt bài"
            }
        }
        approveModal.style.display = "none"; // Đóng modal
    });

    // 4️⃣ Đóng modal khi nhấn "Không"
    cancelApproveBtn.addEventListener("click", function () {
        approveModal.style.display = "none"; // Ẩn modal khi chọn "Không"
    });

    // 5️⃣ Đóng modal khi nhấn bên ngoài nội dung modal
    window.addEventListener("click", function (event) {
        if (event.target === approveModal) {
            approveModal.style.display = "none";
        }
    });
});

var btnSearch = document.querySelector('.search-box-btn')

btnSearch.addEventListener('click', function() {
    this.parentElement.classList.toggle('open')
    this.previousElementSibling.focus();
})