document.addEventListener("DOMContentLoaded", function () {
    const categoryName = localStorage.getItem("category-name");
    const heading = document.querySelector(".title h1");
    const subTitle = document.querySelectorAll(".title-section h2");
    const section = document.querySelectorAll(".section");
    let cateHolder = "";

    heading.textContent = categoryName;

    let background = document.querySelector(".background-image-danh-muc").getAttribute("src");

    const categories = {
        xaHoi: ["Thời sự", "Giao thông", "Môi trường - Khí hậu"],
        khcn: ["Tin tức công nghệ", "Hoạt động công nghệ", "Tạp chí"],
        sucKhoe: ["Dinh dưỡng", "Làm đẹp", "Y tế"],
        theThao: ["Bóng đá", "Bóng rổ"],
        giaiTri: ["Âm nhạc", "Thời trang", "Điện ảnh - Truyền hình", "test"],
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
    
        let availableCategories = categories[cateHolder].length;
        let sectionContainer = document.querySelector(".page-container"); // Khu vực chứa sections
        let footer = document.querySelector(".footer-page"); // Chọn footer để thêm vào trước nó
    
        // Lấy danh sách tất cả các phần tử .section
        let sections = document.querySelectorAll(".section");
    
        // Ẩn tất cả sections trước khi cập nhật
        sections.forEach(section => section.style.display = "none");
    
        for (let i = 0; i < availableCategories; i++) {
            if (sections[i]) {
                // Nếu section đã tồn tại, cập nhật nội dung và hiển thị lại
                let titleElement = sections[i].querySelector("h2");
                if (titleElement) {
                    titleElement.textContent = categories[cateHolder][i];
                    titleElement.innerHTML += `<span><i class="bi bi-arrow-bar-right fs-2"></i></span>`;
                }
                sections[i].style.display = "block"; // Hiển thị lại nếu trước đó bị ẩn
            } else {
                // Nếu không đủ section, tạo mới
                let newSection = document.createElement("div");
                newSection.classList.add("section", "con1000");
    
                // Phần tiêu đề section
                let titleSection = document.createElement("div");
                titleSection.classList.add("title-section");
    
                let h2 = document.createElement("h2");
                h2.textContent = categories[cateHolder][i];
                h2.innerHTML += `<span><i class="bi bi-arrow-bar-right fs-2"></i></span>`;
    
                let img = document.createElement("img");
                img.src = "../assets/trangDanhMucImages/danhMucRedLine.png"; // Đường gạch đỏ dưới tiêu đề
    
                titleSection.appendChild(h2);
                titleSection.appendChild(img);
                newSection.appendChild(titleSection);
    
                // Phần danh sách bài viết
                let gridSection = document.createElement("div");
                gridSection.classList.add("grid-section");
    
                for (let j = 0; j < 6; j++) { // Mặc định 3 bài viết
                    let gridItem = document.createElement("div");
                    gridItem.classList.add("grid-section-items");
    
                    let articleImg = document.createElement("img");
                    articleImg.src = "../assets/trangDanhMucImages/tienLinh.png"; // Ảnh mẫu
    
                    let newsContent = document.createElement("div");
                    newsContent.classList.add("news-content");
    
                    let articleTitle = document.createElement("h3");
                    articleTitle.textContent = `Tiến Linh giành Quả bóng vàng Việt Nam`;
    
                    let articleDate = document.createElement("p");
                    articleDate.classList.add("date");
                    articleDate.textContent = "Thứ Tư, 26/2/2025 19:22 (GMT+7)";
    
                    let articleDescription = document.createElement("p");
                    articleDescription.classList.add("content");
                    articleDescription.textContent = "Vượt qua Nguyễn Hoàng Đức và Phạm Tuấn Hải, tiền đạo Nguyễn Tiến Linh giành giải Quả Bóng Vàng nam Việt Nam 2024.";
    
                    newsContent.appendChild(articleTitle);
                    newsContent.appendChild(articleDate);
                    newsContent.appendChild(articleDescription);
    
                    gridItem.appendChild(articleImg);
                    gridItem.appendChild(newsContent);
                    gridSection.appendChild(gridItem);
                }
    
                newSection.appendChild(gridSection);
    
                // Phần "Xem thêm"
                let viewMoreDiv = document.createElement("div");
                viewMoreDiv.classList.add("view-more");
    
                let viewMoreButton = document.createElement("p");
                viewMoreButton.innerHTML = `Xem thêm<span><i class="bi bi-arrow-right" style="margin-left: 5px;"></i></span>`;
                viewMoreButton.style.cursor = "pointer";
                viewMoreButton.addEventListener("click", function () {
                    alert(`Xem thêm bài viết về ${categories[cateHolder][i]}`);
                });
    
                viewMoreDiv.appendChild(viewMoreButton);
                newSection.appendChild(viewMoreDiv);
    
                // Thêm section vào trước footer
                sectionContainer.insertBefore(newSection, footer);
            }
        }
    }
    
    
    
    alignCategories(cateHolder);

});