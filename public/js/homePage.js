const myCarousel = document.getElementById('carouselExampleAutoplaying')
const secondNewsCarousel = document.getElementById("carouselExampleSlidesOnlySecondNews")
const bigNewsHeading = document.getElementsByClassName("big-news-heading")[0]
const bigNewsArticle = document.getElementsByClassName("big-news-article")[0]
const secondNewsHeading = document.getElementsByClassName("second-news-title-text")[0]


class Article {
    constructor(articleHeading, articleParagraph) {
        this.articleHeading = articleHeading;
        this.articleParagraph = articleParagraph;
    }
}

class ArticleSecondNews {
    constructor(articleHeading) {
        this.articleHeading = articleHeading;
    }
}

let danhSachArticle = [
    new Article("Nvidia reports earnings today. Here's what to expect after the DeepSeek shock", "Nvidia (NVDA) stock advanced by more than 3% ahead of the AI chip giant's scheduled release of its fiscal fourth-quarter earnings after the close today. The shares of chip designers Broadcom (AVGO) and Micron (MU) also gained."),
    new Article("Ông Zelensky sẵn sàng gặp lại ông Trump để 'nói chuyện nghiêm túc", "Tổng thống Ukraine Zelensky nói sẵn sàng gặp lại người đồng cấp Mỹ nếu được mời, nhưng cho hay đó phải là cuộc thảo luận nghiêm túc. "),
    new Article("Elon Musk nói về khả năng AI tiêu diệt nhân loại", "Tỷ phú Elon Musk cho rằng AI thông minh hơn con người là mối đe dọa hiện hữu dù chỉ có 20% khả năng tiêu diệt nhân loại.")
];

let danhSachArticle2ndNews = [
    new ArticleSecondNews("Hà Nội công bố môn thi thứ 3 vào lớp 10"),
    new ArticleSecondNews("Bộ Y tế yêu cầu kiểm tra quảng cáo kẹo rau củ"),
    new ArticleSecondNews("Nhiều trường ở TP HCM dự kiến giảm tuyển sinh lớp 10")
];


// myCarousel.addEventListener('slide.bs.carousel', event => {
//     let activeIndex = event.to;
//     bigNewsHeading.textContent = danhSachArticle[activeIndex].articleHeading;
//     bigNewsArticle.textContent = danhSachArticle[activeIndex].articleParagraph;
// })

myCarousel.addEventListener('slide.bs.carousel', event => {
    let activeIndex = event.to;

    // 2️⃣ Ẩn chữ để chuẩn bị hiệu ứng fade-in
    bigNewsHeading.style.opacity = "0";
    bigNewsArticle.style.opacity = "0";

    // 3️⃣ Thêm delay 0.5 giây rồi mới thay đổi chữ và áp dụng hiệu ứng fade-in
    setTimeout(() => {
        bigNewsHeading.textContent = danhSachArticle[activeIndex].articleHeading;
        bigNewsArticle.textContent = danhSachArticle[activeIndex].articleParagraph;

        // Áp dụng hiệu ứng fade-in
        bigNewsHeading.style.transition = "opacity 0.5s ease-in-out";
        bigNewsArticle.style.transition = "opacity 0.5s ease-in-out";
        bigNewsHeading.style.opacity = "1";
        bigNewsArticle.style.opacity = "1";
    }, 300); // Delay 0.5 giây
});


secondNewsCarousel.addEventListener('slide.bs.carousel', event => {
    let activeIndex = event.to;

    // Ẩn chữ để chuẩn bị hiệu ứng fade-in
    secondNewsHeading.style.opacity = "0";

    // Thêm delay 0.5 giây rồi mới thay đổi chữ và áp dụng hiệu ứng fade-in
    setTimeout(() => {
        secondNewsHeading.textContent = danhSachArticle2ndNews[activeIndex].articleHeading;
        secondNewsHeading.style.transition = "opacity 0.5s ease-in-out"; // Hiệu ứng mượt
        secondNewsHeading.style.opacity = "1"; // Hiển thị chữ với hiệu ứng fade-in
    }, 500); // Delay 0.5 giây
});


const thirdNewsCarousel = document.getElementById("carouselExampleSlidesOnlyThirdNews");
const thirdNewsHeading = document.getElementsByClassName("third-news-heading")[0];
const thirdNewsArticle = document.getElementsByClassName("third-news-article")[0];

let danhSachArticle3rdNews = [
    new Article("Cú đúp danh hiệu cho Nguyễn Xuân Son", "Đúng với dự đoán, tiền đạo Nguyễn Xuân Son đã dễ dàng giành giải thưởng Ngoại binh Xuất sắc nhất giải đấu."),
    new Article("Ryan Peake - từ tù nhân tới nhà vô địch golf", "Từng ngồi tù 5 năm, golfer người Australia Ryan Peake đăng quang ở sự kiện New Zealand Open tuần qua."),
    new Article("Hòa Minzy đưa người thôn Lạc Xá đi diễn", "Hòa Minzy đưa gần 20 người thôn Lạc Xá, Bắc Ninh, trong đó có nhiều cụ bà, lên sân khấu diễn live.")
];

thirdNewsCarousel.addEventListener('slide.bs.carousel', event => {
    let activeIndex = event.to;

    // Ẩn chữ để chuẩn bị hiệu ứng fade-in
    thirdNewsHeading.style.opacity = "0";
    thirdNewsArticle.style.opacity = "0";

    // Thêm delay rồi cập nhật chữ
    setTimeout(() => {
        thirdNewsHeading.textContent = danhSachArticle3rdNews[activeIndex].articleHeading;
        thirdNewsArticle.textContent = danhSachArticle3rdNews[activeIndex].articleParagraph;

        // Áp dụng hiệu ứng fade-in
        thirdNewsHeading.style.transition = "opacity 0.5s ease-in-out";
        thirdNewsArticle.style.transition = "opacity 0.5s ease-in-out";
        thirdNewsHeading.style.opacity = "1";
        thirdNewsArticle.style.opacity = "1";
    }, 600);
});
