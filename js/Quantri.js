<<<<<<< HEAD
let articles = [
    {
        id: 1,
        title: "Tiêu đề bài báo 1",
        author: "Tác giả 1",
        link: "https://example.com/article1",
        mainCategory: { id: 1, name: "Xã hội" },
        subCategory: { id: 2, name: "Thời sự" },
        content: "Nội dung bài báo 1..."
    },
    {
        id: 2,
        title: "Tiêu đề bài báo 2",
        author: "Tác giả 2",
        link: "https://example.com/article2",
        mainCategory: { id: 1, name: "Xã hội" },
        subCategory: { id: 3, name: "Giao thông" },
        content: "Nội dung bài báo 2..."
    },
    {
        id: 3,
        title: "Tiêu đề bài báo 3",
        author: "Tác giả 3",
        link: "https://example.com/article3",
        mainCategory: { id: 9, name: "Sức khỏe" },
        subCategory: { id: 10, name: "Dinh dưỡng" },
        content: "Nội dung bài báo 3..."
    }
];


let categories = [
    { id: 1, name: "Xã hội", level: 1, parent: 0 },
    { id: 2, name: "Thời sự", level: 2, parent: 1 },
    { id: 3, name: "Giao thông", level: 2, parent: 1 },
    { id: 4, name: "Môi trường - Khí hậu", level: 2, parent: 1 },
    { id: 5, name: "Khoa học & Công nghệ", level: 1, parent: 0 },
    { id: 6, name: "Tin tức công nghệ", level: 2, parent: 5 },
    { id: 7, name: "Hoạt động công nghệ", level: 2, parent: 5 },
    { id: 8, name: "Tạp chí", level: 2, parent: 5 },
    { id: 9, name: "Sức khỏe", level: 1, parent: 0 },
    { id: 10, name: "Dinh dưỡng", level: 2, parent: 9 },
    { id: 11, name: "Làm đẹp", level: 2, parent: 9 },
    { id: 12, name: "Y tế", level: 2, parent: 9 },
    { id: 13, name: "Thể thao", level: 1, parent: 0 },
    { id: 14, name: "Bóng đá", level: 2, parent: 13 },
    { id: 15, name: "Bóng rổ", level: 2, parent: 13 },
    { id: 16, name: "Giải trí", level: 1, parent: 0 },
    { id: 17, name: "Âm nhạc", level: 2, parent: 16 },
    { id: 18, name: "Thời trang", level: 2, parent: 16 },
    { id: 19, name: "Điện ảnh - Truyền hình", level: 2, parent: 16 },
    { id: 20, name: "Giáo dục", level: 1, parent: 0 },
    { id: 21, name: "Thi cử", level: 2, parent: 20 },
    { id: 22, name: "Đào tạo", level: 2, parent: 20 },
    { id: 23, name: "Học bổng - Du học", level: 2, parent: 20 }
];

let UsersAccount = [
    {
        id: 1,
        User: "Nguyễn Minh Kiệt",
        email: "Mkiet@gmail.com",
        password: "abc123",
        role: "Admin"
    },
    {
        id: 2,
        User: "Nguyễn Tuấn Kiệt",
        email: "Tkiet@gmail.com",
        password: "12345",
        role: "User"
    }
];
let chart;
function loadBoardCast(){
    localStorage.setItem("articles", JSON.stringify(articles));
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("users", JSON.stringify(UsersAccount));

    let article = JSON.parse(localStorage.getItem("articles")) || [];
    let category = JSON.parse(localStorage.getItem("categories")) || [];
    let user = JSON.parse(localStorage.getItem("users")) || [];

    document.getElementById("totalArticles").innerText = article.length;
    document.getElementById("totalCategories").innerText = category.length;
    document.getElementById("totalUsers").innerText = user.length;
=======

function SaveNPStorage(){
    var articles = [];
    var tableNP = document.getElementById("PageNewTable");
    var rowNP = Array.from(tableNP.querySelectorAll("tr"));
    console.log(rowNP)
    rowNP.forEach(row => {
        var getrow = Array.from(row.children).filter(cell => cell.tagName == "TD")
        console.log(getrow)
        if (getrow.length < 6) return;
        var article = {
            title: getrow[1].textContent.trim(),
            category: getrow[4].textContent.trim(),
            auther: getrow[2].textContent.trim()
        };
        articles.push(article);
    })
    return articles;
}
function SaveCTStorage(){
    var articles = [];
    var tableNP = document.getElementById("PageCateTable");
    var rowNP = Array.from(tableNP.querySelectorAll("tr"))

    rowNP.forEach(row => {
        var getrow = Array.from(row.children).filter(cell => cell.tagName == "TD")
        console.log(getrow)
        if (getrow.length < 2) return;
        var article = {
            title: getrow[1].textContent.trim(),
        };
        articles.push(article);
    })
    return articles;
}
function SaveUserStorage(){
    var articles = [];
    var tableNP = document.getElementById("PageUserTable");
    var rowNP = Array.from(tableNP.querySelectorAll("tr"))

    rowNP.forEach(row => {
        var getrow = Array.from(row.children).filter(cell => cell.tagName == "TD")
        console.log(getrow)
        if (getrow.length < 3) return;
        var article = {
            title: getrow[1].textContent.trim(),
            role: getrow[2].textContent.trim()
        };
        articles.push(article);
    })
    return articles;
}
var NewPage = SaveNPStorage();
var CatePage = SaveCTStorage();
var UserPage = SaveUserStorage();

let chart;
localStorage.setItem("articles", JSON.stringify(NewPage));

localStorage.setItem("categories", JSON.stringify(CatePage));

localStorage.setItem("users", JSON.stringify(UserPage));

function loadBoardCast(){
    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let users = JSON.parse(localStorage.getItem("users")) || [];

    document.getElementById("totalArticles").innerText = articles.length;
    document.getElementById("totalCategories").innerText = categories.length;
    document.getElementById("totalUsers").innerText = users.length;
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552

    let categoryStats = {};
    articles.forEach(article => {
        if (!categoryStats[article.category]) {
            categoryStats[article.category] = 0;
        }
        categoryStats[article.category]++;
    });

    let categoryNames = Object.keys(categoryStats);
    let categoryCounts = Object.values(categoryStats);
    
    let canvas = document.getElementById("articleChart");
    canvas.width = 1098;
    canvas.height = 500;
    let ctx = document.getElementById("articleChart").getContext("2d");
<<<<<<< HEAD

    if (chart) {
        chart.destroy(); 
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: categoryNames,
            datasets: [{
                label: "Số bài viết theo danh mục",
                data: categoryCounts,
                backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f39c12"]
            }]
        },
        options: {
            responsive: false, 
            maintainAspectRatio: false 
        }
    });
}

=======
    if(chart){
        chart.data.labels = categoryNames; 
        chart.data.datasets[0].data = categoryCounts;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: categoryNames,
                datasets: [{
                    label: "Số bài viết theo danh mục",
                    data: categoryCounts,
                    backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f39c12"]
                }]
            },
            options: {
                responsive: false, 
                maintainAspectRatio: false 
            }
        });
    }
}

window.addEventListener("storage", function(){
    loadBoardCast();
});

setInterval(() => {
    let newArticles = JSON.parse(localStorage.getItem("articles")) || [];
    let currentTotal = chart ? chart.data.datasets[0].data.reduce((a, b) => a + b, 0) : 0;

    if (newArticles.length !== currentTotal) {
        loadBoardCast();
    }
}, 1000);
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552

function menutab() {
    const low_property = document.querySelector(".low_property");
    const low_property_tab = document.querySelector(".low_property_tab");
    const menutab = document.querySelector(".menutab") || document.querySelector(".low_menutab");
    const thempage = document.querySelectorAll(".CST")
    const thems = document.querySelectorAll(".Them")

    if (!menutab.dataset.originalContent) {
        menutab.dataset.originalContent = menutab.innerHTML;
        menutab.dataset.originalClass = menutab.className;

        
        menutab.innerHTML = "";
        menutab.className = "low_menutab";

        var hammenu = document.createElement("div");
        hammenu.innerHTML = '<i onclick="menutab()" style="color:white; position: absolute; margin-left:8px; top: 25px;" class="bi bi-list fs-2 no-select"></i>';
        menutab.appendChild(hammenu);

        low_property.classList.add("high_property")
        low_property_tab.classList.add("high_property_tab")

        thempage.forEach(there => {
            there.style.marginLeft = "-205px"
        })
        thems.forEach(them => {
            them.style.marginLeft = "17%"
        })
    } else {
        menutab.innerHTML = menutab.dataset.originalContent;
        menutab.className = menutab.dataset.originalClass;

        delete menutab.dataset.originalContent;
        delete menutab.dataset.originalClass;
            
        low_property.classList.remove("high_property")
        low_property_tab.classList.remove("high_property_tab")

        thempage.forEach(there => {
            there.style.marginLeft = "-60px"
        })
        thems.forEach(them => {
            them.style.marginLeft = "6%"
        })
    }
}

function displaybroadcast(){
    const boardcast = document.getElementById("boardcast");
    const PageNew = document.getElementById("PageNew");
    const category = document.getElementById("Categories")
    const MannageUser = document.getElementById("MannageUser");
    PageNew?.classList.toggle("hien", false); 
    PageNew?.classList.toggle("an", true); 

    boardcast?.classList.toggle("an", false);
    boardcast?.classList.toggle("hien", true);

    category?.classList.toggle("hien", false);
    category?.classList.toggle("an", true);

    MannageUser?.classList.toggle("hien", false);
    MannageUser?.classList.toggle("an", true);
}
function displayPageNew(){
    const boardcast = document.getElementById("boardcast");
    const PageNew = document.getElementById("PageNew");
    const category = document.getElementById("Categories")
    const MannageUser = document.getElementById("MannageUser");
    boardcast?.classList.toggle("hien", false); 
    boardcast?.classList.toggle("an", true); 

    PageNew?.classList.toggle("an", false);
    PageNew?.classList.toggle("hien", true);

    category?.classList.toggle("hien", false);
    category?.classList.toggle("an", true);

    MannageUser?.classList.toggle("hien", false);
    MannageUser?.classList.toggle("an", true);
}
function displayCategory(){
    const boardcast = document.getElementById("boardcast");
    const PageNew = document.getElementById("PageNew");
    const category = document.getElementById("Categories")
    const MannageUser = document.getElementById("MannageUser");
    boardcast?.classList.toggle("hien", false); 
    boardcast?.classList.toggle("an", true); 

    category?.classList.toggle("an", false);
    category?.classList.toggle("hien", true);

    PageNew?.classList.toggle("hien", false);
    PageNew?.classList.toggle("an", true);

    MannageUser?.classList.toggle("hien", false);
    MannageUser?.classList.toggle("an", true);
}
function displayMannageUser(){
    const boardcast = document.getElementById("boardcast");
    const PageNew = document.getElementById("PageNew");
    const category = document.getElementById("Categories")
    const MannageUser = document.getElementById("MannageUser");
    boardcast?.classList.toggle("hien", false); 
    boardcast?.classList.toggle("an", true);

    category?.classList.toggle("hien", false);
    category?.classList.toggle("an", true);

    MannageUser?.classList.toggle("an", false);
    MannageUser?.classList.toggle("hien", true);

    PageNew?.classList.toggle("hien", false);
    PageNew?.classList.toggle("an", true);

}

<<<<<<< HEAD
let currentPage = 1;
let rowsPerPage = 15;
//Code riêng của quản lý bài báo
function OpenAddPageNew(){
=======

//Code riêng của quản lý bài báo
function OpenAddPageNew(){
    console.log(123)
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
    const GoiAP = document.getElementById("ThemPageNew");
    GoiAP.classList.add("hien");
}
function CloseAddPageNew(){
    const GoiAP = document.getElementById("ThemPageNew");
    GoiAP.classList.remove("hien");
}
<<<<<<< HEAD
function AddPageNeew(){
    var pp = document.getElementById("Paper").value;
    var at = document.getElementById("Auther").value;
    var lk = document.getElementById("link-bb").value;
    var Chinh = document.getElementById("DMC");
    var Phu = document.getElementById("DMP");
    var ND = document.getElementById("ND").value;
    
    articles.push({id:articles.length+1, title:pp,author:at,link:lk,mainCategory:{id: Chinh.selectedIndex, name: Chinh.value},subCategory:{id:Phu.selectedIndex,name:Phu.value},content:ND})
    CloseAddPageNew()
    displayTablePN();
    loadBoardCast()
=======
var sttpn = 1;
function AddPageNeew(){
    sttpn++;
    var AddNew = document.getElementById("PageNewbody")

    var AddNewRow = document.createElement("tr");

    var AddSTT = document.createElement("td")
    AddSTT.textContent = sttpn

    var TenBaiBao = document.createElement("td")
    TenBaiBao.textContent = document.getElementById("Paper").value

    var TacGia = document.createElement("td")
    TacGia.textContent = document.getElementById("Auther").value

    var Linkbaibao = document.createElement("td")
    Linkbaibao.textContent = document.getElementById("link-bb").value

    var DanhMuc = document.createElement("td")
    DanhMuc.textContent = document.getElementById("DM").value

    var NoiDung = document.createElement("td")
    NoiDung.textContent = document.getElementById("ND").value

    AddNewRow.appendChild(AddSTT)
    AddNewRow.appendChild(TenBaiBao)
    AddNewRow.appendChild(TacGia)
    AddNewRow.appendChild(Linkbaibao)
    AddNewRow.appendChild(DanhMuc)
    AddNewRow.appendChild(NoiDung)

    AddNew.appendChild(AddNewRow)
    CloseAddPageNew()
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
}

function OpenDeletePageNew(){
    console.log(123)
    const GoiAP = document.getElementById("XoaPageNew");
    GoiAP.classList.add("hien");
}
function CloseDeletePageNew(){
    const GoiAP = document.getElementById("XoaPageNew");
    GoiAP.classList.remove("hien");
}
function DeletePageNew(){
<<<<<<< HEAD
    const GoiAP = document.getElementById("XoaPageNew");
    let idToDelete = document.getElementById("DertId1").value;
    let index = articles.findIndex(item => item.id == idToDelete);
    if (index !== -1) {
        articles.splice(index, 1)
        console.log(articles);
        displayTablePN();
        CloseDeletePageNew();
        loadBoardCast();
    } 
=======
    var table = document.getElementById("PageNewTable");
    var rows = Array.from(table.querySelectorAll("tr"));
    var GoiAP = document.getElementById("XoaPageNew");

    var rowToDelete = rows.find(row => {
        var id = document.getElementById("DertId1").value
        var fier = row.querySelector("td:first-child");
        return fier && fier.textContent.trim() == id
    })  

    if(rowToDelete){
        rowToDelete.remove()
        sttpn = SortId(table, sttpn)
        CloseDeletePageNew()
    }
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
    else{
        if(document.getElementById("DeleteError")) return
        DeleteError(GoiAP)
    }
}
<<<<<<< HEAD
var pgphu= [...articles]
function searchPageNew() {
    var nd = document.getElementById("selectsearch1").value.trim().toLowerCase();
    if(nd === ""){
        articles = [...pgphu];
    }
    else{
        let filteredarticles = [...pgphu];

        if (nd.startsWith("auther")) {
            let result = nd.substring(6).trim().toLowerCase();
            filteredarticles = filteredarticles.filter(item => item.author.toLowerCase().includes(result));
        } 
        else if (nd.startsWith("link")) {
            let result = nd.substring(4).trim();
            filteredarticles = filteredarticles.filter(item => item.link.includes(result));
        }
        else if (nd.startsWith("DMC")) {
            let result = nd.substring(3).trim().toLowerCase();
            filteredarticles = filteredarticles.filter(item => item.mainCategory.name.toLowerCase().includes(result));
        }
        else if (nd.startsWith("DMP")) {
            let result = nd.substring(3).trim().toLowerCase();
            filteredarticles = filteredarticles.filter(item => item.subCategory.name.toLowerCase().includes(result));
        }
        else if (!isNaN(nd)) { 
            filteredarticles = filteredarticles.filter(item => item.id == nd);
        } 
        else {
            filteredarticles = filteredarticles.filter(item => item.title.toLowerCase().includes(nd));
        }

        articles = filteredarticles.length > 0 ? filteredarticles : [];
    }
    displayTablePN();
    articles = pgphu; 
}
function displayTablePN() {
    let tableBody = document.getElementById("PageNewbody");
    tableBody.innerHTML = "";

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let paginatedItems = articles.slice(start, end);

    paginatedItems.forEach((item, index) => {
        let row = `<tr>
            <td>${start + index + 1}</td>
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>${item.link}</td>
            <td>${item.mainCategory.name}</td>
            <td>${item.subCategory.name}</td>
            <td>${item.content}</td>
            <td><input type="checkbox"></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    displayPagination1();
}
function displayPagination1() {
    let totalPages = Math.ceil(articles.length / rowsPerPage);
    let pagination = document.getElementById("pagination1");
    pagination.innerHTML = "";
    pagination.style.position = "sticky"
    let prevDisabled = currentPage === 1 ? "disabled" : "";
    let nextDisabled = currentPage === totalPages ? "disabled" : "";

    pagination.innerHTML += `<button ${prevDisabled} onclick="changePage1(1)"><<</button>`;
    pagination.innerHTML += `<button ${prevDisabled} onclick="changePage1(currentPage - 1)"><</button>`;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage1(${i})">${i}</button>`;
    }

    pagination.innerHTML += `<button ${nextDisabled} onclick="changePage1(currentPage + 1)">></button>`;
    pagination.innerHTML += `<button ${nextDisabled} onclick="changePage1(${totalPages})">>></button>`;
}
function changePage1(page) {
    currentPage = page;
    displayTablePN();
}
displayTablePN();
//************************** */

//Code riêng của quản lý danh mục


=======
//************************** */

//Code riêng của quản lý dang mục
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
function OpenAddCate(){
    console.log(123)
    const GoiAP = document.getElementById("ThemCategories");
    GoiAP.classList.add("hien");
}
function CloseAddCate(){
    const GoiAP = document.getElementById("ThemCategories");
    GoiAP.classList.remove("hien");
}
<<<<<<< HEAD
function AddCate(){
    var level = document.getElementById("level").value;
    var parentid = document.getElementById("parentId").value;
    var GoiAP = document.getElementById("ThemCategories")

    if(level > 2 || level < 1 || parentid > categories.length || parentid < 0 || parentid!=0 && level==1 ||parentid==0 && level==2||level==1 && parentid!=0){
        if(document.getElementById("DeleteError")) return
        DeleteError(GoiAP)
    }
    else{
        categories.push({id:categories.length, name:document.getElementById("DM-Cate").value, level: level, parent: parentid})
        CloseAddCate()
        loadBoardCast()
    }
=======
var sttct = 1;
function AddCate(){
    sttct++;
    var AddNew = document.getElementById("Categorybody")

    var AddNewRow = document.createElement("tr");

    var AddSTT = document.createElement("td")
    AddSTT.textContent = sttct

    var TenDangMuc = document.createElement("td")
    TenDangMuc.textContent = document.getElementById("DM-Cate").value

    AddNewRow.appendChild(AddSTT)
    AddNewRow.appendChild(TenDangMuc)

    AddNew.appendChild(AddNewRow)
    CloseAddCate()
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
}

function OpenDeleteCate(){
    console.log(123)
    const GoiAP = document.getElementById("XoaCategory");
    GoiAP.classList.add("hien");
}
function CloseDeleteCate(){
    const GoiAP = document.getElementById("XoaCategory");
    GoiAP.classList.remove("hien");
}
function DeleteCate(){
<<<<<<< HEAD
    const GoiAP = document.getElementById("XoaCategory");
    let idToDelete = document.getElementById("DertId2").value;
    let index = categories.findIndex(item => item.id == idToDelete);
    if (index !== -1) {
        categories.splice(index,1);

        categories = categories.filter(item => item.parent !== index+1)

        let oldToNewId = {}; 
        categories.forEach((item, newIndex) => {
            oldToNewId[item.id] = newIndex + 1; 
            item.id = newIndex + 1;
        });
    
        categories.forEach(item => {
            if (item.parent in oldToNewId) {
                item.parent = oldToNewId[item.parent]; 
            }
        });
        displayTableCate();
        CloseDeleteCate();
        loadBoardCast();
    } 
=======
    var table = document.getElementById("PageCateTable");
    var rows = Array.from(table.querySelectorAll("tr"));
    var GoiAP = document.getElementById("XoaCategory");

    var rowToDelete = rows.find(row => {
        var id = document.getElementById("DertId2").value
        var fier = row.querySelector("td:first-child");
        return fier && fier.textContent.trim() == id
    })  

    if(rowToDelete){
        rowToDelete.remove()
        sttct = SortId(table, sttct)
        CloseDeleteCate()
    }
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
    else{
        if(document.getElementById("DeleteError")) return
        DeleteError(GoiAP)
    }
}
<<<<<<< HEAD
var catephu = categories;
function searchCate() {
    var nd = document.getElementById("selectsearch2").value.trim().toLowerCase();
    if(nd === ""){
        categories = catephu; 
    }
    else{
        let filteredCategories = categories;

        if (nd.includes("menulevel")) {
            let numValue = nd.replace(/\D/g, ""); 
            if (!isNaN(numValue) && numValue !== "") {
                filteredCategories = filteredCategories.filter(item => item.level == numValue);
            }
        } 
        else if (nd.includes("parent")) {
            let numValue = nd.replace(/\D/g, ""); 
            if (!isNaN(numValue) && numValue !== "") {
                filteredCategories = filteredCategories.filter(item => item.parent == numValue);
            }
        } 
        else if (!isNaN(nd)) { 
            filteredCategories = filteredCategories.filter(item => item.id == nd);
        } 
        else {
            filteredCategories = filteredCategories.filter(item => item.name.toLowerCase().includes(nd));
        }

        categories = filteredCategories.length > 0 ? filteredCategories : [];
    }
    displayTableCate();
    categories = catephu; 
}

function displayTableCate() {
    let tableBody = document.getElementById("Categorybody");
    tableBody.innerHTML = "";

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let paginatedItems = categories.slice(start, end);

    paginatedItems.forEach((item, index) => {
        let row = `<tr>
            <td>${start + index + 1}</td>
            <td>${item.name}</td>
            <td>${item.level}</td>
            <td>${item.parent}</td>
            <td><input type="checkbox"></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    displayPagination2();
}
function displayPagination2() {
    let totalPages = Math.ceil(categories.length / rowsPerPage);
    let pagination = document.getElementById("pagination2");
    pagination.innerHTML = "";
    pagination.style.position = "sticky"
    let prevDisabled = currentPage === 1 ? "disabled" : "";
    let nextDisabled = currentPage === totalPages ? "disabled" : "";

    pagination.innerHTML += `<button ${prevDisabled} onclick="changePage2(1)"><<</button>`;
    pagination.innerHTML += `<button ${prevDisabled} onclick="changePage2(currentPage - 1)"><</button>`;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage2(${i})">${i}</button>`;
    }

    pagination.innerHTML += `<button ${nextDisabled} onclick="changePage2(currentPage + 1)">></button>`;
    pagination.innerHTML += `<button ${nextDisabled} onclick="changePage2(${totalPages})">>></button>`;
}
function changePage2(page) {
    currentPage = page;
    displayTableCate();
}
displayTableCate();
=======
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
//************************** */

//Code riêng của quản lý người dùng
function OpenAddUser(){
    console.log(123)
    const GoiAP = document.getElementById("ThemUser");
    GoiAP.classList.add("hien");
}
function CloseAddUser(){
    const GoiAP = document.getElementById("ThemUser");
    GoiAP.classList.remove("hien");
}
<<<<<<< HEAD
function AddUser(){
    var rser = document.getElementById("Users").value;
    var el = document.getElementById("email").value;
    var pd = document.getElementById("password").value;
    var PQ = document.getElementById("PQ").value;
    var GoiAP = document.getElementById("ThemUser")

    if(rser == []||el==[]||pd==[]||PQ==[]){
        if(document.getElementById("DeleteError")) return
        DeleteError(GoiAP)
    }
    else{
        UsersAccount.push({id:UsersAccount.length+1, User: rser, email: el, password: pd, role:PQ})
        CloseAddUser()
        displayTableUser();
        loadBoardCast()
    }
}
=======
var sttu = 2;
function AddUser(){
    sttu++;
    var AddNew = document.getElementById("MannageUserbody")

    var AddNewRow = document.createElement("tr");

    var AddSTT = document.createElement("td")
    AddSTT.textContent = sttu

    var TenUser = document.createElement("td")
    TenUser.textContent = document.getElementById("Users").value

    var Role = document.createElement("td")
    Role.textContent = document.getElementById("PQ").value

    AddNewRow.appendChild(AddSTT)
    AddNewRow.appendChild(TenUser)
    AddNewRow.appendChild(Role)

    AddNew.appendChild(AddNewRow)
    CloseAddUser()
}

>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
function OpenDeleteUser(){
    console.log(123)
    const GoiAP = document.getElementById("XoaUser");
    GoiAP.classList.add("hien");
}
function CloseDeleteUser(){
    const GoiAP = document.getElementById("XoaUser");
    GoiAP.classList.remove("hien");
}
function DeleteUser(){
<<<<<<< HEAD
    const GoiAP = document.getElementById("XoaUser");
    let idToDelete = document.getElementById("DertId3").value.trim();
    let index = UsersAccount.findIndex(item => item.id == idToDelete);
    if (index !== -1) {
        UsersAccount.splice(index,1);
        let oldToNewId = {}; 
        UsersAccount.forEach((item, newIndex) => {
            oldToNewId[item.id] = newIndex + 1; 
            item.id = newIndex + 1;
        });
        
        displayTableUser();
        CloseDeleteUser();
        loadBoardCast();
    } 
=======
    var table = document.getElementById("PageUserTable");
    var rows = Array.from(table.querySelectorAll("tr"));
    var GoiAP = document.getElementById("XoaUser");

    var rowToDelete = rows.find(row => {
        var id = document.getElementById("DertId3").value
        var fier = row.querySelector("td:first-child");
        return fier && fier.textContent.trim() == id
    })  

    if(rowToDelete){
        rowToDelete.remove()
        sttu = SortId(table, sttu)
        CloseDeleteUser()
    }
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
    else{
        if(document.getElementById("DeleteError")) return
        DeleteError(GoiAP)
    }
}
<<<<<<< HEAD
var userphu = [...UsersAccount]
function searchUser() {
    var nd = document.getElementById("selectsearch3").value.trim().toLowerCase();
    if(nd === ""){
        Users = [...userphu];
    }
    else{
        let filteredUsers = [...userphu];

        if (nd.startsWith("role")) {
            let result = nd.substring(4).trim().toLowerCase();
            filteredUsers = filteredUsers.filter(item => item.role.toLowerCase().includes(result));
        } 
        else if (nd.startsWith("password")) {
            let result = nd.substring(8).trim();
            filteredUsers = filteredUsers.filter(item => item.password.includes(result));
        }
        else if (nd.startsWith("email")) {
            let result = nd.substring(5).trim().toLowerCase();
            filteredUsers = filteredUsers.filter(item => item.email.toLowerCase().includes(result));
        }
        
        else if (!isNaN(nd)) { 
            filteredUsers = filteredUsers.filter(item => item.id == nd);
        } 
        else {
            filteredUsers = filteredUsers.filter(item => item.User.toLowerCase().includes(nd));
        }

        UsersAccount = filteredUsers.length > 0 ? filteredUsers : [];
    }
    displayTableUser();
    UsersAccount = userphu; 
}
function displayTableUser() {
    let tableBody = document.getElementById("MannageUserbody");
    tableBody.innerHTML = "";

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let paginatedItems = UsersAccount.slice(start, end);

    paginatedItems.forEach((item, index) => {
        let row = `<tr>
            <td>${start + index + 1}</td>
            <td>${item.User}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td>${item.role}</td>
            <td><input type="checkbox"></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    displayPagination3();
}
function displayPagination3() {
    let totalPages = Math.ceil(UsersAccount.length / rowsPerPage);
    let pagination = document.getElementById("pagination3");
    pagination.innerHTML = "";
    pagination.style.position = "sticky"
    let prevDisabled = currentPage === 1 ? "disabled" : "";
    let nextDisabled = currentPage === totalPages ? "disabled" : "";

    pagination.innerHTML += `<button ${prevDisabled} onclick="changePage3(1)"><<</button>`;
    pagination.innerHTML += `<button ${prevDisabled} onclick="changePage3(currentPage - 1)"><</button>`;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage3(${i})">${i}</button>`;
    }

    pagination.innerHTML += `<button ${nextDisabled} onclick="changePage3(currentPage + 1)">></button>`;
    pagination.innerHTML += `<button ${nextDisabled} onclick="changePage3(${totalPages})">>></button>`;
}
function changePage3(page) {
    currentPage = page;
    displayTableUser();
}
displayTableUser();
//************************** */

=======
//************************** */
function SortId(table, stt){
    var rows = Array.from(table.querySelectorAll("tr"));
    if(rows.length > 1){
        for(var i=rows.length-1;i>=0;i--){
            var fier = rows[i].querySelector("td:first-child");
            if(fier && fier.textContent.trim() != i){
                fier.textContent = i;
            }
        }
        return rows.length - 1;
    }
    return stt;
}
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552
function DeleteError(GoiAP){
    var DER = document.createElement("div")
    DER.style.backgroundColor = "#B32A45"
    DER.textContent = "Lỗi"
    DER.innerHTML += '<button onclick="removeDeleteError(this)" type="button" class="close closs-css" aria-label="Close" style="    background-color: #B32A45;color: black;font-size: 30px;margin-left: 210px;border: none;"><span aria-hidden="true">&times;</span></button>'
    DER.style.width = "300px"
    DER.style.height = "150px"
    DER.style.marginTop = "-15%"
    DER.style.marginLeft = "38%"
    DER.style.position = "relative"
    DER.style.borderRadius = "10px"
    DER.style.color = "white"
    DER.id = "DeleteError"

    var Delte = document.createElement("div")
    Delte.textContent = "⚠ Lỗi! Không tồn tại id này"
    Delte.style.display = "block"
    Delte.style.backgroundColor = "white"
    Delte.style.color = "black"
    Delte.style.width = "220px"
    Delte.style.height = "70px"
    Delte.style.marginLeft = "42px"
    Delte.style.borderRadius = "10px"
    Delte.style.lineHeight = "66px"
    Delte.style.border = "3px inset yellow"

    DER.appendChild(Delte)
    GoiAP.appendChild(DER);
}
function removeDeleteError(button) {
    var DER = button.parentElement;
    DER.remove();
}

<<<<<<< HEAD
function SelectDMC() {
    var ere = categories.filter(item => item.level === 1);
    var DMC = document.getElementById("DMC");
    var DMP = document.getElementById("DMP");
    
    DMP.innerHTML = "";
    DMC.innerHTML = "";

    ere.forEach(cell => {
        var cet = document.createElement("option")
        cet.textContent = cell.name;
        DMC.appendChild(cet)
    })
}

function SelectDMP(){
    var ere1 = categories.filter(item => item.parent === 0);
    var DMC = document.getElementById("DMC").value.trim();
    var DMP = document.getElementById("DMP");
    DMP.innerHTML = "";
    var ere2 = categories.filter(item => item.level === 2);
    var ere = ere2.filter(item1 => ere1.some(item2 => item2.id === item1.parent && item2.name === DMC))
    ere.forEach(cell => {
        var cet = document.createElement("option")
        cet.textContent = cell.name;
        DMP.appendChild(cet)
    })
}


=======
>>>>>>> f6e4efcc6fea6071821c9cd88826bd6cdeb28552

