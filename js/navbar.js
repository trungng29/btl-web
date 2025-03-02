window.addEventListener("scroll", function(){
    var header = document.querySelector(".navbar-duoi");
    var bigMenu = document.getElementById("bigMenu");

    if (window.scrollY > 80) {
        header.classList.add("sticky");
        bigMenu.style.zIndex = "30"; // Đảm bảo big-menu luôn trên overlay
    } else {
        header.classList.remove("sticky");
        bigMenu.style.zIndex = "10"; // Đặt lại nếu không sticky
    }
});

document.getElementById("burgerIcon").addEventListener("click", function() {
    console.log("OK")
    // document.getElementById("overlay").classList.toggle("hidden-overlay")
    document.getElementById("bigMenu").classList.toggle("hidden-overlay")
    document.querySelectorAll(".sub-menu").forEach(el => {
        el.classList.toggle("hidden-overlay");
    });
})

// function updateOverlayPosition() {
//     let navbarTren = document.querySelector(".navbar-tren");
//     let navbarDuoi = document.querySelector(".navbar-duoi");
//     let overlay = document.getElementById("overlay");

//     let navbarTrenHeight = navbarTren.offsetHeight;
//     let navbarDuoiHeight = navbarDuoi.offsetHeight;

//     // Kiểm tra nếu navbar-duoi đang sticky (tức là navbar-tren đã bị ẩn)
//     if (navbarDuoi.classList.contains("sticky")) {
//         overlay.style.top = navbarDuoiHeight + "px"; // Overlay bắt đầu ngay dưới navbar-duoi
//         overlay.style.height = `calc(100vh - ${navbarDuoiHeight}px)`; // Chiều cao còn lại
//     } else {
//         let totalNavbarHeight = navbarTrenHeight + navbarDuoiHeight;
//         overlay.style.top = totalNavbarHeight + "px";
//         overlay.style.height = `calc(100vh - ${totalNavbarHeight}px)`;
//     }
// }

// // Gọi hàm ngay khi trang load
// window.addEventListener("load", updateOverlayPosition);

// // Gọi hàm mỗi khi cuộn trang để cập nhật nếu header thay đổi kích thước
// window.addEventListener("scroll", updateOverlayPosition);


const toggleScrollButton = document.getElementById('burgerIcon');

let isScrollDisabled = false;

toggleScrollButton.addEventListener('click', () => {
    isScrollDisabled = !isScrollDisabled;
    if (isScrollDisabled) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

       

