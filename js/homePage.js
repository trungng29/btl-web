const myCarousel = document.getElementById('carouselExampleAutoplaying')
const bigNewsHeading = document.getElementsByClassName("big-news-heading")[0]
const bigNewsArticle = document.getElementsByClassName("big-news-article")[0]


class Article {
    constructor(articleHeading, articleParagraph) {
        this.articleHeading = articleHeading;
        this.articleParagraph = articleParagraph;
    }
}

let danhSachArticle = [
    new Article("Nvidia reports earnings today. Here's what to expect after the DeepSeek shock", "Nvidia (NVDA) stock advanced by more than 3% ahead of the AI chip giant's scheduled release of its fiscal fourth-quarter earnings after the close today. The shares of chip designers Broadcom (AVGO) and Micron (MU) also gained."),
    new Article("Ông Zelensky sẵn sàng gặp lại ông Trump để 'nói chuyện nghiêm túc", "Tổng thống Ukraine Zelensky nói sẵn sàng gặp lại người đồng cấp Mỹ nếu được mời, nhưng cho hay đó phải là cuộc thảo luận nghiêm túc."),
    new Article("Elon Musk nói về khả năng AI tiêu diệt nhân loại", "Tỷ phú Elon Musk cho rằng AI thông minh hơn con người là mối đe dọa hiện hữu dù chỉ có 20% khả năng tiêu diệt nhân loại.")
];


myCarousel.addEventListener('slide.bs.carousel', event => {
    let activeIndex = event.to;
    bigNewsHeading.textContent = danhSachArticle[activeIndex].articleHeading;
    bigNewsArticle.textContent = danhSachArticle[activeIndex].articleParagraph;
    // document.getElementById('carouselText').innerText = textList[activeIndex];
})