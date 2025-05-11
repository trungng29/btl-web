let btn = document.querySelector("#btn");

let sidebar = document.querySelector(".sidebar");

btn.onclick = function() {
    console.time("Toggle Sidebar");
    sidebar.classList.toggle("active");
    console.timeEnd("Toggle Sidebar");
}

document.addEventListener("DOMContentLoaded", function () {
    let menuItems = document.querySelectorAll(".nav_list li a");
    let sections = {};
    const sectionIds = {
        "Thông tin cá nhân": "infoManagement",
        "Thông tin nhà báo": "info-nhabao-Management",
        "Danh sách bài viết": "statistic-nhabao-Management",
        "Thêm bài báo": "addPostManagement",
        "Thống kê dữ liệu": "staticManagement",
        "Quản lý bài viết": "postManagement",
        "Quản lý danh mục": "categoryManagement",
        "Quản lý người dùng": "userManagement",
        "Quản lý bình luận": "commentManagement",
    };

    for (const [key, id] of Object.entries(sectionIds)) {
        const element = document.getElementById(id);
        if (element) {
            sections[key] = element;
        }
    }

    menuItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();

            let menuName = this.querySelector(".links_name").innerText;

            // Kiểm tra nếu phần tử không tồn tại
            if (!sections[menuName]) {
                console.warn(`Section for menu "${menuName}" does not exist.`);
                return;
            }

            // Ẩn tất cả các phần nội dung
            Object.values(sections).forEach(section => {
                if (section) section.style.display = "none";
            });

            // Hiển thị nội dung của menu vừa nhấn
            sections[menuName].style.display = "block";

            // Xóa 'active' khỏi tất cả menu
            menuItems.forEach(link => link.parentElement.classList.remove("active"));

            // Đánh dấu menu được chọn là 'active'
            this.parentElement.classList.add("active");

            // Lưu panel hiện tại khi người dùng click menu
            localStorage.setItem("activePanel", menuName);
        });
    });

    // TAB info_management (bao gồm cả các mục thống kê nhà báo)
    const allTabs = document.querySelectorAll('.info_management-tab');
    const allTabContents = document.querySelectorAll('.info_management-tab-content');
    allTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Lấy group tab cha gần nhất
            const parent = this.closest('.info_management-side');
            const tabs = parent.querySelectorAll('.info_management-tab');
            const tabContents = parent.querySelectorAll('.info_management-tab-content');
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            tabContents.forEach(content => content.style.display = 'none');
            const tabId = this.dataset.tab;
            if(tabId) parent.querySelector(`#${tabId}`).style.display = 'block';
        });
    });

    // CRUD mẫu cho Bình luận của tôi
    let myComments = [
        {id: 1, post: 'Bài viết A', content: 'Bình luận 1', date: '2024-06-01'},
        {id: 2, post: 'Bài viết B', content: 'Bình luận 2', date: '2024-06-02'}
    ];
    function renderMyComments() {
        const tbody = document.getElementById('myCommentsBody');
        tbody.innerHTML = myComments.map(c => `
            <tr>
                <td>${c.id}</td>
                <td>${c.post}</td>
                <td>${c.content}</td>
                <td>${c.date}</td>
                <td>
                    <button class=\"info_management-action-btn\" onclick=\"deleteMyComment(${c.id})\">Xóa</button>
                </td>
            </tr>
        `).join('');
    }
    window.deleteMyComment = function(id) {
        myComments = myComments.filter(c => c.id !== id);
        renderMyComments();
    }
    renderMyComments();

    // CRUD mẫu cho Bình luận yêu thích
    let favoriteComments = [
        {id: 1, post: 'Bài viết A', content: 'Bình luận hay', date: '2024-06-01'},
        {id: 2, post: 'Bài viết B', content: 'Bình luận xuất sắc', date: '2024-06-02'}
    ];
    function renderFavoriteComments() {
        const tbody = document.getElementById('favoriteCommentsBody');
        tbody.innerHTML = favoriteComments.map(c => `
            <tr>
                <td>${c.id}</td>
                <td>${c.post}</td>
                <td>${c.content}</td>
                <td>${c.date}</td>
                <td>
                    <button class=\"info_management-action-btn\" onclick=\"deleteFavoriteComment(${c.id})\">Xóa</button>
                </td>
            </tr>
        `).join('');
    }
    window.deleteFavoriteComment = function(id) {
        favoriteComments = favoriteComments.filter(c => c.id !== id);
        renderFavoriteComments();
    }
    renderFavoriteComments();

    // Dữ liệu mẫu cho Thống kê bài viết của tôi
    let statisticMyArticles = [
        {id: 1, title: 'Bài viết A', views: 120, likes: 10, date: '2024-06-01', status: 'Đã duyệt'},
        {id: 2, title: 'Bài viết B', views: 80, likes: 5, date: '2024-06-02', status: 'Chờ duyệt'}
    ];
    function renderStatisticMyArticles() {
        const tbody = document.getElementById('statisticMyArticlesBody');
        if (!tbody) return;
        tbody.innerHTML = statisticMyArticles.map(a => `
            <tr>
                <td>${a.id}</td>
                <td>${a.title}</td>
                <td>${a.views}</td>
                <td>${a.likes}</td>
                <td>${a.date}</td>
                <td>${a.status}</td>
            </tr>
        `).join('');
    }
    renderStatisticMyArticles();

    // Dữ liệu mẫu cho Thông báo bài viết được duyệt
    let statisticApproveNotify = [
        'Bài viết "Bài viết A" đã được duyệt ngày 2024-06-01',
        'Bài viết "Bài viết B" đã được duyệt ngày 2024-06-02'
    ];
    function renderStatisticApproveNotify() {
        const ul = document.getElementById('statisticApproveNotifyList');
        if (!ul) return;
        ul.innerHTML = statisticApproveNotify.map(n => `<li>${n}</li>`).join('');
    }
    renderStatisticApproveNotify();

    // Dữ liệu mẫu cho Thống kê tổng quan của nhà báo
    let statisticOverview = {
        totalArticles: 12,
        totalViews: 3456,
        totalLikes: 234,
        totalComments: 78
    };
    function renderStatisticOverview() {
        if(document.getElementById('statisticTotalArticles'))
            document.getElementById('statisticTotalArticles').innerText = statisticOverview.totalArticles;
        if(document.getElementById('statisticTotalViews'))
            document.getElementById('statisticTotalViews').innerText = statisticOverview.totalViews;
        if(document.getElementById('statisticTotalLikes'))
            document.getElementById('statisticTotalLikes').innerText = statisticOverview.totalLikes;
        if(document.getElementById('statisticTotalComments'))
            document.getElementById('statisticTotalComments').innerText = statisticOverview.totalComments;
    }
    renderStatisticOverview();



    // Code chỉnh sửa thông tin cá nhân
    const changePasswordButton = document.getElementById("info_management-change-password");
    const passwordInput = document.getElementById("info_management-password");
    const usernameInput = document.getElementById("info_management-name");
    const saveBtn = document.getElementById("info_management-edit-name");

    // Hàm kiểm tra giá trị của các input
    function toggleSaveButton() {
        if (passwordInput.value.trim() === "" || usernameInput.value.trim() === "") {
            saveBtn.style.display = "none"; // Ẩn nút Save nếu cả hai input trống
        } else {
            saveBtn.style.display = "block"; // Hiển thị nút Save nếu có dữ liệu
        }
    }

    if (changePasswordButton && passwordInput && usernameInput && saveBtn) {
        // Sự kiện click để bật/tắt trạng thái disabled
        changePasswordButton.addEventListener("click", function () {
            const isDisabled = passwordInput.disabled && usernameInput.disabled;
            passwordInput.disabled = !passwordInput.disabled;
            usernameInput.disabled = !usernameInput.disabled;

            // Thay đổi thuộc tính type của passwordInput
            if (!passwordInput.disabled) {
                passwordInput.type = "text"; // Hiển thị mật khẩu
            } else {
                passwordInput.type = "password"; // Ẩn mật khẩu
            }

            // Kiểm tra giá trị input khi bật/tắt
            toggleSaveButton();

            // Thay đổi giao diện nút
            if (isDisabled) {
                changePasswordButton.innerText = "🔓"; // Biểu tượng mở khóa
            } else {
                changePasswordButton.innerText = "🔑"; // Biểu tượng khóa
                saveBtn.style.display = "none";
            }
        });

        // Sự kiện input để kiểm tra giá trị khi người dùng nhập
        passwordInput.addEventListener("input", toggleSaveButton);
        usernameInput.addEventListener("input", toggleSaveButton);
    }

    let savedPanel = localStorage.getItem("activePanel");
    if (savedPanel && sections[savedPanel]) {
        // Ẩn tất cả các phần
        Object.values(sections).forEach(section => {
            if (section) section.style.display = "none";
        });
        // Hiện lại phần đã lưu
        sections[savedPanel].style.display = "block";

        // Đánh dấu menu tương ứng là active
        menuItems.forEach(link => {
            const linkName = link.querySelector(".links_name").innerText;
            if (linkName === savedPanel) {
                link.parentElement.classList.add("active");
            } else {
                link.parentElement.classList.remove("active");
            }
        });
    }

    const themNguoiDungBtn = document.getElementById("btnAddUser")
    const modalThemNguoiDung = document.getElementById("modal-container")
    const closeBtnAddUser = document.getElementById("closeBtnAddUser")

    const updateUserBtns = document.querySelectorAll(".btn-sua"); // Lấy tất cả các nút "Sửa"
    const modalUpdateUser = document.getElementById("modal-container-update");
    const closeBtnFixUser = document.getElementById("closeBtnFixUser");

    // console.log("Danh sách các nút btn-sua:", updateUserBtns);

    // Các input trong modal
    const editUserId = document.getElementById("editUserId");
    const editUsername = document.getElementById("editUsername");
    const editEmail = document.getElementById("editEmail");
    const editPassword = document.getElementById("editPassword");
    const editRole = document.getElementById("editRole");

    // Gắn sự kiện click cho từng nút "Sửa"
    updateUserBtns.forEach((btn) => {
        btn.addEventListener("click", () => {

            // Lấy thông tin từ data-* của nút
            const userId = btn.getAttribute("data-id");
            const username = btn.getAttribute("data-username");
            const email = btn.getAttribute("data-email");
            const password = btn.getAttribute("data-password");
            const role = btn.getAttribute("data-role");

            // Gán thông tin vào các input trong modal
            editUserId.value = userId;
            editUsername.value = username;
            editEmail.value = email;
            editPassword.value = password;
            editRole.value = role;

            // Hiển thị modal
            modalUpdateUser.style.display = "block";


        });
    });

    // Gắn sự kiện đóng modal
    closeBtnFixUser.addEventListener("click", () => {
        modalUpdateUser.style.display = "none"; // Ẩn modal
    });

    themNguoiDungBtn.addEventListener("click", () => {
        if (modalThemNguoiDung.style.display == "none") {
            modalThemNguoiDung.style.display = "block";
        } else modalThemNguoiDung.style.display = "none"
    })

    closeBtnAddUser.addEventListener("click", () => {
        modalThemNguoiDung.style.display = "none";
    })

    const updateUserForm = document.getElementById("updateUserForm");

});

let currentArticleId = null;

// Hiển thị modal xóa
function showDeleteModal(articleId) {
  currentArticleId = articleId;
  document.getElementById("formDeleteArticle").action =
    "/article/deleteArticle/" + articleId;
  document.getElementById("deletePostModal").style.display = "block";
}

// Ẩn modal xóa
function hideDeleteModal() {
  document.getElementById("deletePostModal").style.display = "none";
}

// Khi user nhấn vào bất kỳ đâu ngoài modal, đóng modal
window.onclick = function (event) {
  const modal = document.getElementById("deletePostModal");
  if (event.target == modal) {
    hideDeleteModal();
  }
};

// Thêm vào window object để TypeScript biết các hàm này được sử dụng
window.showDeleteModal = showDeleteModal;
window.hideDeleteModal = hideDeleteModal;


function confirmDelete(userId) {
    Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
    }).then((result) => {
        if (result.isConfirmed) {
            // Tạo một form ẩn để gửi yêu cầu xóa
            const form = document.createElement("form");
            form.method = "POST";
            form.action = "/user/deleteUser";

            // Thêm input ẩn chứa ID người dùng
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = "data-id"; // Phải khớp với key trong controller
            input.value = userId;

            form.appendChild(input);
            document.body.appendChild(form);

            // Gửi form
            form.submit();
        }
    });
}

let currentCommentId = null;

// Hiển thị modal xóa comment
function showDeleteCommentModal(commentId) {
    currentCommentId = commentId;
    const modal = document.getElementById('deleteCommentModal');
    const form = document.getElementById('formDeleteComment');
    
    // Cập nhật action của form
    form.action = `/comment/deleteComment/${commentId}`;
    
    // Hiển thị modal
    modal.style.display = 'block';
}

// Ẩn modal xóa comment
function hideCommentDeleteModal() {
    const modal = document.getElementById('deleteCommentModal');
    modal.style.display = 'none';
}

// Xử lý sự kiện click bên ngoài modal
window.onclick = function(event) {
    const articleModal = document.getElementById('deletePostModal');
    const categoryModal = document.getElementById('deleteCategoryModal');
    const commentModal = document.getElementById('deleteCommentModal');
    
    if (event.target == articleModal) {
        hideDeleteModal();
    }
    
    if (event.target == categoryModal) {
        hideCategoryDeleteModal();
    }

    if (event.target == commentModal) {
        hideCommentDeleteModal();
    }
}

// Đăng ký các hàm cho window object
window.showDeleteModal = showDeleteModal;
window.hideDeleteModal = hideDeleteModal;
window.showDeleteCategoryModal = showDeleteCategoryModal;
window.hideCategoryDeleteModal = hideCategoryDeleteModal;
window.showDeleteCommentModal = showDeleteCommentModal;
window.hideCommentDeleteModal = hideCommentDeleteModal;

// Xử lý modal thêm danh mục
document.addEventListener('DOMContentLoaded', function() {
    const addCategoryBtn = document.querySelector('.add-category-btn');
    const addCategoryModal = document.getElementById('addCategoryModal');
    const closeBtn = addCategoryModal.querySelector('.action-modal-close');
    const parentCategorySelect = document.getElementById('parentCategory');
    const addCategoryForm = document.getElementById('addCategoryForm');
    const categoryNameInput = document.querySelector('input[name="category_name"]');
    const aliasNameInput = document.querySelector('input[name="alias_name"]');

    // Hiển thị modal thêm danh mục
    if(addCategoryBtn) {
        addCategoryBtn.onclick = function() {
            // Lấy danh sách danh mục cha
            fetch('/category/getAllCategories')
                .then(response => response.json())
                .then(categories => {
                    // Xóa các option cũ
                    parentCategorySelect.innerHTML = '<option value="">Không có danh mục cha</option>';
                    
                    // Chỉ hiển thị danh mục cha (không có id_parent)
                    categories.forEach(category => {
                        if (!category.id_parent) {
                            const option = document.createElement('option');
                            option.value = category.id_category;
                            option.textContent = category.category_name;
                            parentCategorySelect.appendChild(option);
                        }
                    });
                })
                .catch(error => console.error('Error:', error));

            // Reset form
            if(addCategoryForm) {
                addCategoryForm.reset();
            }

            addCategoryModal.style.display = 'block';
        };
    }

    // Đóng modal
    if(closeBtn) {
        closeBtn.onclick = function() {
            addCategoryModal.style.display = 'none';
        };
    }

    // Đóng modal khi click ra ngoài
    window.onclick = function(event) {
        if (event.target === addCategoryModal) {
            addCategoryModal.style.display = 'none';
        }
    }

    // Tự động tạo alias từ tên danh mục
    if(categoryNameInput) {
        categoryNameInput.addEventListener('blur', function() {
            if(aliasNameInput && !aliasNameInput.value.trim()) {
                // Tạo alias từ tên danh mục: chuyển thành chữ thường, thay khoảng trắng bằng dấu gạch ngang, loại bỏ dấu tiếng Việt
                let alias = categoryNameInput.value.trim()
                    .toLowerCase()
                    .normalize('NFD') // Tách dấu thành ký tự riêng
                    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
                    .replace(/[đĐ]/g, 'd') // Chuyển đ/Đ thành d
                    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
                    .replace(/[^\w\-]/g, ''); // Loại bỏ ký tự đặc biệt
                
                aliasNameInput.value = alias;
            }
        });
    }

});

// Thêm code mới cho việc xóa danh mục
let currentCategoryId = null;

// Hiển thị modal xóa danh mục
function showDeleteCategoryModal(categoryId) {
    currentCategoryId = categoryId;
    const modal = document.getElementById('deleteCategoryModal');
    const form = document.getElementById('formDeleteCategory');
    
    // Cập nhật action của form
    form.action = `/category/deleteCategory/${categoryId}`;
    
    // Hiển thị modal
    modal.style.display = 'block';
    
    // Thêm xử lý sự kiện cho nút xác nhận
    const confirmBtn = document.getElementById('confirmDeleteCate');
    if (confirmBtn) {
        confirmBtn.onclick = function() {
            form.submit();
        };
    }
}

// Ẩn modal xóa danh mục
function hideCategoryDeleteModal() {
    const modal = document.getElementById('deleteCategoryModal');
    modal.style.display = 'none';
}

// Xử lý sự kiện click bên ngoài modal
window.onclick = function(event) {
    const articleModal = document.getElementById('deletePostModal');
    const categoryModal = document.getElementById('deleteCategoryModal');
    
    if (event.target == articleModal) {
        hideDeleteModal();
    }
    
    if (event.target == categoryModal) {
        hideCategoryDeleteModal();
    }
}

// Đăng ký các hàm cho window object
window.showDeleteModal = showDeleteModal;
window.hideDeleteModal = hideDeleteModal;
window.showDeleteCategoryModal = showDeleteCategoryModal;
window.hideCategoryDeleteModal = hideCategoryDeleteModal;



function getAllChildCategoryIds(categories, currentId) {
    // Lấy tất cả id của các danh mục con (đệ quy)
    let result = [];
    function findChildren(id) {
        categories.forEach(cat => {
            if (cat.id_parent === id) {
                result.push(cat.id_category);
                findChildren(cat.id_category);
            }
        });
    }
    findChildren(currentId);
    return result;
}

function showEditCategoryModal(categoryId, categoryName, aliasName, parentId) {
    const modal = document.getElementById('editCategoryModal');
    document.getElementById('editCategoryId').value = categoryId;
    document.getElementById('editCategoryName').value = categoryName;
    document.getElementById('editCategoryAlias').value = aliasName;

    fetch('/category/getAllCategories')
        .then(response => response.json())
        .then(categories => {
            const parentSelect = document.getElementById('editParentCategory');
            parentSelect.innerHTML = '<option value="">Không có danh mục cha</option>';
            categories.forEach(category => {
                // Chỉ hiển thị danh mục gốc, không hiển thị chính nó
                if ((category.id_parent === null || category.id_parent === '' || category.id_parent === undefined) && category.id_category !== categoryId) {
                    const option = document.createElement('option');
                    option.value = category.id_category;
                    option.textContent = category.category_name;
                    if (category.id_category == parentId) {
                        option.selected = true;
                    }
                    parentSelect.appendChild(option);
                }
            });
        })
        .catch(error => console.error('Error:', error));
    modal.style.display = 'block';
}

function hideEditCategoryModal() {
    const modal = document.getElementById('editCategoryModal');
    modal.style.display = 'none';
}

// Đóng modal khi click nút đóng
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeBtnFixCategory');
    if(closeBtn) {
        closeBtn.onclick = hideEditCategoryModal;
    }

    // Xử lý submit form cập nhật danh mục
    const updateForm = document.getElementById('updateCategoryForm');
    if(updateForm) {
        updateForm.onsubmit = function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu từ form theo cách thủ công để đảm bảo không bị undefined
            const formData = {
                id_category: document.getElementById('editCategoryId').value,
                category_name: document.getElementById('editCategoryName').value,
                alias_name: document.getElementById('editCategoryAlias').value,
                id_parent: document.getElementById('editParentCategory').value
            };
            
            // Nếu không chọn danh mục cha, gửi null hoặc chuỗi rỗng
            if (!formData.id_parent) {
                formData.id_parent = null;
            }
            
            fetch('/category/updateCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                redirect: 'follow' // Cho phép theo dõi chuyển hướng
            })
            .then(response => {
                if (response.redirected) {
                    // Nếu server chuyển hướng, theo URL chuyển hướng
                    window.location.href = response.url;
                    return;
                }
                
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Lỗi không xác định');
                    });
                }
                
                // Nếu không có chuyển hướng nhưng thành công
                hideEditCategoryModal();
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Lỗi: ' + error.message);
            });
        };
    }

    // Đóng modal khi click bên ngoài
    window.onclick = function(event) {
        const editCategoryModal = document.getElementById('editCategoryModal');
        if (event.target == editCategoryModal) {
            hideEditCategoryModal();
        }
    }
});

// Thêm hàm vào window để có thể gọi từ HTML
window.showEditCategoryModal = showEditCategoryModal;
window.hideEditCategoryModal = hideEditCategoryModal;


// CSS cho checkbox trạng thái
const style = document.createElement('style');
style.textContent = `
    .status-checkbox {
        position: relative;
        display: inline-block;
        width: 20px;
        height: 20px;
    }

    .status-checkbox input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 2px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
    }

    .status-checkbox input:checked ~ .checkmark {
        background-color: #4CAF50;
        border-color: #4CAF50;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .status-checkbox input:checked ~ .checkmark:after {
        display: block;
    }

    .status-checkbox .checkmark:after {
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
`;
document.head.appendChild(style);

// Xử lý sự kiện khi checkbox trạng thái được click
function initStatusToggles() {
    const statusToggles = document.querySelectorAll('.status-toggle');
    
    statusToggles.forEach(toggle => {
        // Xóa tất cả event listener trước đó để tránh trùng lặp
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        newToggle.addEventListener('change', function() {
            const articleId = this.dataset.articleId;
            const newStatus = this.checked ? 'Đã duyệt' : 'Chưa duyệt';
            
            // Gửi request cập nhật trạng thái mà không chờ đợi
            fetch(`/api/article/updateStatus/${articleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            })
            .catch(error => {
                console.error('Error updating status:', error);
                // Không đảo ngược trạng thái checkbox, không hiển thị thông báo
            });
        });
    });
}

// CSS cho checkbox nổi bật
const featuredStyle = document.createElement('style');
featuredStyle.textContent = `
    .featured-checkbox {
        position: relative;
        display: inline-block;
        width: 20px;
        height: 20px;
    }

    .featured-checkbox input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
    }

    .featured-checkbox .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 2px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
    }

    .featured-checkbox input:checked ~ .checkmark {
        background-color: #2196F3;
        border-color: #2196F3;
    }

    .featured-checkbox .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .featured-checkbox input:checked ~ .checkmark:after {
        display: block;
    }

    .featured-checkbox .checkmark:after {
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
`;
document.head.appendChild(featuredStyle);

// Xử lý sự kiện khi checkbox nổi bật được click
function initFeaturedToggles() {
    const featuredToggles = document.querySelectorAll('.featured-toggle');
    
    featuredToggles.forEach(toggle => {
        // Xóa tất cả event listener trước đó để tránh trùng lặp
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        newToggle.addEventListener('change', function() {
            const articleId = this.dataset.articleId;
            const isFeatured = this.checked ? 1 : 0;
            
            // Gửi request cập nhật trạng thái nổi bật
            fetch(`/api/article/updateFeatured/${articleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_featured: isFeatured })
            })
            .catch(error => {
                console.error('Error updating featured status:', error);
            });
        });
    });
}

// Chạy khi trang đã tải xong
document.addEventListener('DOMContentLoaded', function() {
    initStatusToggles();
    initFeaturedToggles();
    
    // Thêm xử lý cho trường hợp nội dung được tải động (AJAX)
    const tbodyArticle = document.getElementById('tbodyArticle');
    if (tbodyArticle) {
        // Theo dõi thay đổi trong bảng bài viết
        const observer = new MutationObserver(function(mutations) {
            initStatusToggles();
            initFeaturedToggles();
        });
        
        observer.observe(tbodyArticle, { childList: true, subtree: true });
    }
});


