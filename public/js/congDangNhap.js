document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    
    // Khởi tạo popovers và lưu vào một Map để quản lý
    const popovers = new Map();
    popoverTriggerList.forEach(function (element) {
        // Chỉ khởi tạo popover cho các button disabled
        const relatedButton = element.querySelector('button');
        if (relatedButton && relatedButton.disabled) {
            const popover = new bootstrap.Popover(element);
            popovers.set(element, popover);
        }
    });

    // Theo dõi sự thay đổi của các button
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "disabled") {
                const button = mutation.target;
                const popoverElement = button.closest('[data-bs-toggle="popover"]');
                
                if (!button.disabled) {
                    // Nếu button được enable, hủy popover
                    const popover = popovers.get(popoverElement);
                    if (popover) {
                        popover.dispose();
                        popovers.delete(popoverElement);
                    }
                } else {
                    // Nếu button bị disable, tạo lại popover
                    if (!popovers.has(popoverElement)) {
                        const popover = new bootstrap.Popover(popoverElement);
                        popovers.set(popoverElement, popover);
                    }
                }
            }
        });
    });

    // Theo dõi tất cả các button
    document.querySelectorAll('button').forEach(button => {
        observer.observe(button, {
            attributes: true
        });
    });
});

document.getElementById('txt_dn').addEventListener('click', function() {
    document.getElementById('txt_dn').classList.add("clicked-effect");
    document.getElementById('txt_dk').classList.remove("clicked-effect");
});

document.getElementById('txt_dk').addEventListener('click', function() {
    document.getElementById('txt_dn').classList.remove("clicked-effect");
    document.getElementById('txt_dk').classList.add("clicked-effect");
}); 

const userEmailInp = document.getElementById("email1");
const userPwdInp = document.getElementById("password1");
const submitBtn = document.getElementById("loginBtn");

const userNameInp1 = document.getElementById("username5");
const userEmailInp1 = document.getElementById("email5");
const userPwdInp1 = document.getElementById("password5");
const registerBtn = document.getElementById("registerBtn");

function checkInputs() {
    if (userEmailInp.value.trim() !== "" && userPwdInp.value.trim() !== "") {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", "true");
    }

    if (userNameInp1.value.trim() !== "" && userEmailInp1.value.trim() !== "" && userPwdInp1.value.trim() !== "") {
        registerBtn.removeAttribute("disabled");
    }
    else {
        registerBtn.setAttribute("disabled", "true");
    }
}

[userEmailInp, userPwdInp, userNameInp1, userEmailInp1, userPwdInp1].forEach(input => {
    input.addEventListener("input", checkInputs);
});

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    try {
        // Lấy dữ liệu từ form và chuyển thành object
        const formData = new FormData(this);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Thêm header
            },
            body: JSON.stringify(formDataObject)  // Chuyển đổi thành JSON
        });

        if (!response.ok) {
            throw new Error(`Email đã tồn tại trong hệ thống hoặc có lỗi xảy ra`);
        }

        const data = await response.json();
        console.log('Response:', data); // Log để debug

        if (data.success) {
            alert(data.message);
            this.reset();
            document.getElementById('txt_dn')?.click();
            registerBtn.setAttribute("disabled", "true");
        } else {
            alert(data.message || 'Có lỗi xảy ra');
        }
    } catch (error) {
        console.error('Lỗi chi tiết:', error); // Log lỗi chi tiết
        alert('Lỗi: ' + error.message);
    }
});


