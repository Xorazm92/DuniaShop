// Login va Register formalarini ko'rsatish/yashirish
function showLoginForm() {
    const loginForm = document.getElementById("LoginForm");
    const regForm = document.getElementById("RegForm");
    const indicator = document.getElementById("Indicator");
    
    loginForm.style.transform = "translateX(300px)";
    regForm.style.transform = "translateX(300px)";
    indicator.style.transform = "translateX(0px)";
}

function showRegisterForm() {
    const loginForm = document.getElementById("LoginForm");
    const regForm = document.getElementById("RegForm");
    const indicator = document.getElementById("Indicator");
    
    loginForm.style.transform = "translateX(0px)";
    regForm.style.transform = "translateX(0px)";
    indicator.style.transform = "translateX(100px)";
}

// Login va Register formalarini yuborish
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    try {
        const response = await window.auth.login(email, password);
        alert("Muvaffaqiyatli kirdingiz!");
        window.location.href = "/";
    } catch (error) {
        alert(error.message || "Kirishda xatolik yuz berdi");
    }
}

async function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    
    try {
        const response = await window.auth.register(username, email, password);
        alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
        window.location.href = "/";
    } catch (error) {
        alert(error.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
    }
}

// Xatolik va muvaffaqiyat xabarlarini yashirish
document.addEventListener('DOMContentLoaded', () => {
    // Flash xabarlarini 3 soniyadan keyin yashirish
    setTimeout(() => {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            alert.style.display = 'none';
        });
    }, 3000);
});
