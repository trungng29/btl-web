const categoryName = localStorage.getItem("category-name");
const heading = document.querySelector(".title h1");
const subTitle = document.querySelectorAll(".title-section h2");
let cateHolder = "";

heading.textContent = categoryName;

let background = document.querySelector(".background-image-danh-muc").getAttribute("src");

const categories = {
    xaHoi: ["Thời sự", "Giao thông", "Môi trường - Khí hậu"],
    khcn: ["Tin tức công nghệ", "Hoạt động công nghệ", "Tạp chí"],
    sucKhoe: ["Dinh dưỡng", "Làm đẹp", "Y tế"],
    theThao: ["Bóng đá", "Bóng rổ"],
    giaiTri: ["Âm nhạc", "Thời trang", "Điện ảnh - Truyền hình"],
    giaoDuc: ["Thi cử", "Đào tạo", "Học bổng - Du học"]
};

switch (categoryName) {
    case "Xã hội":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/xaHoiSectionBgImage.png");
        cateHolder = "xaHoi";
        break;

    case "Khoa học & Công nghệ":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/khcnSectionBgImage.png");
        cateHolder = "khcn";
        break;

    case "Sức khỏe":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/sucKhoeSectionBgImage.png");
        cateHolder = "sucKhoe";
        break;

    case "Giải trí":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/giaiTriSectionBgImage.png");
        cateHolder = "giaiTri";
        break;

    case "Thể thao":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/theThaoSectionBgImage.png");
        cateHolder = "theThao";
        break;
        
    case "Giáo dục":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/giaoDucSectionBgImage.png");
        cateHolder = "giaoDuc";
        break;

    default:
        break;
}

function alignCategories(cateHolder) {
    if (!categories[cateHolder]) {
        console.error("Danh mục không tồn tại!");
        return;
    }

    for (var i = 0; i < categories[cateHolder].length; i++) {
        console.log("OK");
        if (subTitle[i]) {
            subTitle[i].textContent = categories[cateHolder][i];
            subTitle[i].innerHTML += `<span><i class="bi bi-arrow-bar-right fs-2" ></i></span>`;
        }
    }
}


alignCategories(cateHolder);

