document.addEventListener('DOMContentLoaded', function() {
    const scrollableContent = document.querySelector('.scrollableContentThoisu');
    const scrollbarButton = document.querySelector('.scrollbarButtonThoisu');
    const customScrollbar = document.querySelector('.customScrollbarThoisu');
    const newsItems = document.querySelectorAll('.newsItemThoisu');
    const mainImage = document.querySelector('.mainImageThoisu');
    const articleTitle = document.querySelector('.articleTitleThoisu');
    const articleParagraph = document.querySelector('.articleParagraphThoisu');
    const containerThoisu = document.querySelector('.containerThoisu');


    if (!scrollableContent || !scrollbarButton || !customScrollbar || !mainImage || !articleTitle || !articleParagraph || !containerThoisu) {
        console.error("Scrollbar or content elements not found");
        return;
    }

    let isDragging = false;
    let startY = 0;
    let currentY = 0;
    let contentScrollTop = 0; // sync scroll

    scrollbarButton.addEventListener('mousedown', function(e) {
        isDragging = true;
        startY = e.clientY - scrollbarButton.offsetTop;
        document.body.classList.add('no-select'); // ko select text khi grab
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        const scrollbarTrackHeight = customScrollbar.offsetHeight;
        const scrollButtonHeight = scrollbarButton.offsetHeight;
        const maxScrollTopButton = scrollbarTrackHeight - scrollButtonHeight;

        currentY = e.clientY - startY;
        if (currentY < 0) {
            currentY = 0;
        }
        if (currentY > maxScrollTopButton) {
            currentY = maxScrollTopButton;
        }

        scrollbarButton.style.top = currentY + 'px';

        // tinh toan % scroll
        const scrollPercentage = currentY / maxScrollTopButton;
        contentScrollTop = scrollPercentage * (scrollableContent.scrollHeight - scrollableContent.offsetHeight);
        scrollableContent.scrollTop = contentScrollTop;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        document.body.classList.remove('no-select');
    });

    // ko select text khi drag
    document.body.addEventListener('selectstart', function(e){
        if (document.body.classList.contains('no-select')) {
            e.preventDefault();
        }
    });

    // hover effect
    newsItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const mainImage = document.querySelector('.mainImageThoisu');
            const articleTitle = document.querySelector('.articleTitleThoisu');
            const articleParagraph = document.querySelector('.articleParagraphThoisu');
            const newsImage = item.querySelector('.newsImageThoisu');
            const newsTitle = item.querySelector('.newsTitleThoisu');
            const newsParagraph = item.querySelector('.newsParagraphThoisu'); // Get news paragraph
    
            // ... (existing code to update main image and article) ...
            mainImage.src = item.dataset.img;
            articleTitle.textContent = item.dataset.title;
            articleParagraph.textContent = item.dataset.paragraph;
    
    
            // --- Dynamic Text Color based on Image for Title --- (Existing code - keep it)
            const imgForTitle = new Image(); // Separate Image object for title color analysis
            imgForTitle.src = newsImage.src;
    
            imgForTitle.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = imgForTitle.width;
                canvas.height = imgForTitle.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(imgForTitle, 0, 0);
    
                const imageData = ctx.getImageData(0, 0, imgForTitle.width, imgForTitle.height).data;
                let totalLuminance = 0;
                for (let i = 0; i < imageData.length; i += 4) {
                    const r = imageData[i];
                    const g = imageData[i + 1];
                    const b = imageData[i + 2];
                    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
                    totalLuminance += luminance;
                }
                const averageLuminance = totalLuminance / (imgForTitle.width * imgForTitle.height);
    
                if (averageLuminance < 128) {
                    newsTitle.style.color = 'white';
                } else {
                    newsTitle.style.color = '#333';
                }
            };
    
            // --- Dynamic Text Color based on Image for Paragraph --- (New code for Paragraph)
            const imgForParagraph = new Image(); // Separate Image object for paragraph color analysis
            imgForParagraph.src = newsImage.src;
    
            imgForParagraph.onload = function() {
                const canvasPara = document.createElement('canvas'); // Separate canvas for paragraph
                canvasPara.width = imgForParagraph.width;
                canvasPara.height = imgForParagraph.height;
                const ctxPara = canvasPara.getContext('2d'); // Separate context for paragraph canvas
                ctxPara.drawImage(imgForParagraph, 0, 0);
    
                const imageDataPara = ctxPara.getImageData(0, 0, imgForParagraph.width, imgForParagraph.height).data;
                let totalLuminancePara = 0;
                for (let i = 0; i < imageDataPara.length; i += 4) {
                    const r = imageDataPara[i];
                    const g = imageDataPara[i + 1];
                    const b = imageDataPara[i + 2];
                    const luminancePara = (0.299 * r + 0.587 * g + 0.114 * b);
                    totalLuminancePara += luminancePara;
                }
                const averageLuminancePara = totalLuminancePara / (imgForParagraph.width * imgForParagraph.height);
    
                if (averageLuminancePara < 128) {
                    newsParagraph.style.color = 'white';
                } else {
                    newsParagraph.style.color = '#666'; // Original paragraph color (#666)
                }
            };
    
    
        });
    });

    newsItems.forEach(item => {
        // ... (mouseenter event listener - updated above) ...
    
        item.addEventListener('mouseleave', function() {
            const newsTitle = item.querySelector('.newsTitleThoisu');
            const newsParagraph = item.querySelector('.newsParagraphThoisu');
    
            newsTitle.style.color = ''; // Reset title color to default (from CSS)
            newsParagraph.style.color = ''; // Reset paragraph color to default (from CSS)
        });
    });


     // Scroll
     containerThoisu.addEventListener('wheel', function(e) {
        e.preventDefault(); // ko default scroll

        const scrollSensitivity = 80; // scroll speed
        const scrollAmount = e.deltaY * (scrollSensitivity/100) ; // so luong scroll
        const scrollbarTrackHeight = customScrollbar.offsetHeight;
        const scrollButtonHeight = scrollbarButton.offsetHeight;
        const maxScrollTopButton = scrollbarTrackHeight - scrollButtonHeight;
        const contentScrollHeight = scrollableContent.scrollHeight - scrollableContent.offsetHeight;


        // tinh scrollTop moi cho content
        contentScrollTop += scrollAmount; // update tracked contentScrollTop
        if (contentScrollTop < 0) {
            contentScrollTop = 0;
        }
        if (contentScrollTop > contentScrollHeight) {
            contentScrollTop = contentScrollHeight;
        }
        scrollableContent.scrollTop = contentScrollTop; // ap dung scroll cho content


        // tinh % scroll cho content (not button)
        const scrollPercentage = contentScrollHeight === 0 ? 0 : contentScrollTop / contentScrollHeight;


        // tinh vi tri top moi cho scroll button
        let newScrollButtonTop = scrollPercentage * maxScrollTopButton;
        if (newScrollButtonTop < 0) {
            newScrollButtonTop = 0;
        }
        if (newScrollButtonTop > maxScrollTopButton) {
            newScrollButtonTop = maxScrollTopButton;
        }


        scrollbarButton.style.top = newScrollButtonTop + 'px'; // di chuyen button

    });


    // setup vi tri scrollbar button on load neu co content de scroll
    if (scrollableContent.scrollHeight > scrollableContent.offsetHeight) {
        scrollbarButton.style.top = '0px'; // reset to top on load if scrollable
    } else {
        customScrollbar.style.display = 'none'; // hide custom scrollbar neu ko can
    }
});
// fill newsParagraphThoisu tu data-paragraph on load
const newsItemsParagraphs = document.querySelectorAll('.newsItemThoisu');
newsItemsParagraphs.forEach(newsItem => {
    const paragraphContent = newsItem.dataset.paragraph;
    const paragraphElement = newsItem.querySelector('.newsParagraphThoisu');
    if (paragraphElement && paragraphContent) {
        paragraphElement.textContent = paragraphContent;
        // shorten paragraph
        if (paragraphContent.length > 100) {
            paragraphElement.textContent = paragraphContent.substring(0, 140) + "..."; //shorten to 140
        }
    }
});