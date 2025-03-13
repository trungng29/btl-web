
function SaveNPStorage(){
    var articles = [];
    var tableNP = document.getElementById("PageNewTable");
    var rowNP = Array.from(tableNP.querySelectorAll("tr"));
    rowNP.forEach(row => {
        var getrow = Array.from(row.children).filter(cell => cell.tagName == "TD")
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
        if (getrow.length < 3) return;
        var article = {
            title: getrow[1].textContent.trim(),
            role: getrow[2].textContent.trim()
        };
        articles.push(article);
    })
    return articles;
}


let chart;
function loadBoardCast(){
    var NewPage = SaveNPStorage();
    var CatePage = SaveCTStorage();
    var UserPage = SaveUserStorage();
    localStorage.setItem("articles", JSON.stringify(NewPage));
    localStorage.setItem("categories", JSON.stringify(CatePage));
    localStorage.setItem("users", JSON.stringify(UserPage));

    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let users = JSON.parse(localStorage.getItem("users")) || [];

    document.getElementById("totalArticles").innerText = articles.length;
    document.getElementById("totalCategories").innerText = categories.length;
    document.getElementById("totalUsers").innerText = users.length;

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


//Code riêng của quản lý bài báo
function OpenAddPageNew(){
    const GoiAP = document.getElementById("ThemPageNew");
    GoiAP.classList.add("hien");
}
function CloseAddPageNew(){
    const GoiAP = document.getElementById("ThemPageNew");
    GoiAP.classList.remove("hien");
}
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
    loadBoardCast()
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
        loadBoardCast()
    }
    else{
        if(document.getElementById("DeleteError")) return
        DeleteError(GoiAP)
    }
}
//************************** */

//Code riêng của quản lý dang mục
function OpenAddCate(){
    console.log(123)
    const GoiAP = document.getElementById("ThemCategories");
    GoiAP.classList.add("hien");
}
function CloseAddCate(){
    const GoiAP = document.getElementById("ThemCategories");
    GoiAP.classList.remove("hien");
}
var sttct = 6;
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
    loadBoardCast()
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
        loadBoardCast()
    }
    else{
        if(document.getElementById("DeleteError")) return
        DeleteError(GoiAP)
    }
}
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
var sttu = 2;
function AddUser(){
    sttu++;
    var AddNew = document.getElementById("MannageUserbody")

    var AddNewRow = document.createElement("tr");

    var AddSTT = document.createElement("td")
    AddSTT.textContent = sttu

    var TenUser = document.createElement("td")
    TenUser.textContent = document.getElementById("Users").value

    var email = document.createElement("td")
    email.textContent = document.getElementById("email").value

    var password = document.createElement("td")
    password.textContent = document.getElementById("password").value

    var Role = document.createElement("td")
    Role.textContent = document.getElementById("PQ").value

    AddNewRow.appendChild(AddSTT)
    AddNewRow.appendChild(TenUser)
    AddNewRow.appendChild(email)
    AddNewRow.appendChild(password)
    AddNewRow.appendChild(Role)

    AddNew.appendChild(AddNewRow)
    CloseAddUser()
    loadBoardCast()
}

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
        loadBoardCast()
    }
    else{
        if(document.getElementById("DeleteError")) return
        DeleteError(GoiAP)
    }
}
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
    return stt-1;
}
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

function SelectDM(){
    var DMTable = document.getElementById("PageCateTable");
    var RowDM = Array.from(DMTable.querySelectorAll("tr"))

    var SelectDM = document.getElementById("DM")
    SelectDM.innerHTML = "";
    RowDM.forEach(row => {
        var CreateOp = document.createElement("option");
        var DMvalue = Array.from(row.children).filter(cell => cell.tagName == "TD")
        if(DMvalue < 1) return
        console.log(DMvalue)
        CreateOp.textContent = DMvalue[1].textContent.trim();
        console.log(CreateOp)
        SelectDM.appendChild(CreateOp);
    })
   
}
