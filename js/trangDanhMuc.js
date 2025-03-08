const categoryName = localStorage.getItem("category-name");

const heading = document.querySelector(".title h1");

heading.textContent = categoryName;