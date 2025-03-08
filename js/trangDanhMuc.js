const categoryName = localStorage.getItem("category-name");

const heading = document.querySelector(".title h1");

heading.textContent = categoryName;

let background = document.querySelector(".background-image-danh-muc").getAttribute("src");

switch (categoryName) {
    case "Xã hội":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/xaHoiSectionBgImage.png");
        break;

    case "Khoa học & Công nghệ":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/khcnSectionBgImage.png");
        break;

    case "Sức khỏe":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/sucKhoeSectionBgImage.png");
        break;

    case "Giải trí":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/giaiTriSectionBgImage.png");
        break;

    case "Thể thao":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/theThaoSectionBgImage.png");
        break;
        
    case "Giáo dục":
        document.querySelector(".background-image-danh-muc").setAttribute("src", "../assets/trangDanhMucBackgroundImages/giaoDucSectionBgImage.png");
        break;

    default:
        break;
}

