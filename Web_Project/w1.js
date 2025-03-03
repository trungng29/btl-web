function menuHamburger(){
    const menuH = document.getElementById("menuH")
    alert('1234')
    menuH.classList.add("cerq")
}
function removemenuHamburger(){
    alert('112')
    const menuH = document.getElementById("menuH")
    menuH.classList.remove("cerq")
}
function CongDangnhap(){
    alert("123")
    let cdn = document.getElementById("CongDangnhap")
    cdn.classList.add("cerq")
}
function DongDangnhap(){
    let cdn = document.getElementById("CongDangnhap")
    cdn.classList.remove("cerq")
}

function switchToSignup() {
    // Ẩn form đăng nhập
    document.getElementById('Dangnhap').classList.remove('active');
    document.getElementById('txt_dn').classList.add('ut');
    // Hiển thị form đăng ký
    document.getElementById('Dangky').classList.add('active');
    document.getElementById('txt_dk').classList.add('rt');
}

function switchToLogin() {
    // Ẩn form đăng ký
    document.getElementById('Dangky').classList.remove('active');
    document.getElementById('txt_dn').classList.remove('ut');
    // Hiển thị form đăng nhập
    document.getElementById('Dangnhap').classList.add('active');
    document.getElementById('txt_dk').classList.remove('rt');
}
var email = "kiet@gmail.com"
var password = "123"
var account_email = [email];
var account_pass = [password];
let drt = document.getElementById("User");

function TaiKhoan(user_name,nrd_name){
    nrd_name.style.marginLeft = "30px";  
    nrd_name.style.marginTop = "20px";   
    nrd_name.style.fontSize = "18px";
    nrd_name.addEventListener("click", function(){
        let li = document.createElement("li")
        li.innerHTML += "Thoát";
        li.style.textAlign = "center";

        let ul = document.createElement("ul")
        ul.appendChild(li);
        ul.style.listStyle = "none";
        ul.style.position = "absolute"

        li.addEventListener("click", function(){
            user_name.removeChild(nrd_name);
            user_name.appendChild(drt);
            document.getElementById("Quantri").classList.add("cer");
        })
        nrd_name.appendChild(ul);
        nrd_name.removeEventListener("click", handleClick);
    })
    user_name.appendChild(nrd_name);
}
function Login(){
    for(var i=0;i<account_email.length;i++){
        if(account_email[i] === document.getElementById("email1").value && account_pass[i] === document.getElementById("password1").value){
            document.getElementById("Quantri").classList.remove("cer");
            document.getElementById("CongDangnhap").classList.remove("cerq");

            let user_name = document.getElementById("User_name");
            user_name.removeChild(drt);
            let nrd_name = document.createElement("div");
            nrd_name.textContent += account_email[i];
            console.log(nrd_name)
            console.log(user_name)
            TaiKhoan(user_name,nrd_name);
            break;
        }
    }
    
}
function CreateLogin(){
    var email = document.getElementById("email2").value;
    var pw = document.getElementById("password2").value;
    account_email.push(email);
    account_pass.push(pw)
    console.log(account_email+" "+account_pass)
    switchToLogin()
}

