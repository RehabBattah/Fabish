
const firstName = document.getElementById("firstname-input");
const divfirstname= document.getElementsByClassName("divFirstname")[0];
const email = document.getElementById("email-input");
const divemail=document.getElementsByClassName("divEmail")[0];
const password = document.getElementById("password-input");
const divpassword= document.getElementsByClassName("divPass")[0];
const confirmPassword = document.getElementById("confirm-password-input");
const divconfirmpassword= document.getElementsByClassName("divPassconf")[0];
const namergx = /^[a-zA-Z\u0600-\u06FF\s]+$/;
const emailrgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordrgx = /^[A-Za-z\d!@#$%^&*()-_=+]{8,}$/;  
const error_message = document.getElementById("error-message");
const success_message = document.getElementById("success-message");


if (document.title === "Register") {
document.getElementById("sub").addEventListener("click", function (e) {
    e.preventDefault();
    var valid = true;
    var errorMessage = "";

    document.querySelectorAll(".incorrect").forEach(el => el.classList.remove("incorrect"));
    
    if (firstName.value.trim().length < 3 || !namergx.test(firstName.value.trim())) {
        errorMessage += "Invalid name.<br>";
        divfirstname.classList.add("incorrect");
        valid = false;
    }

    if (!emailrgx.test(email.value.trim())) {
        errorMessage += "Invalid email format.<br>";
        divemail.classList.add("incorrect");
        valid = false;
    }

    if (!passwordrgx.test(password.value)) {
        errorMessage += "Password must be at least 8 characters long.<br>";
        divpassword.classList.add("incorrect");
        valid = false;
    }

    if (password.value !== confirmPassword.value) {
        errorMessage += "Passwords do not match.<br>";
        divconfirmpassword.classList.add("incorrect");
        divpassword.classList.add("incorrect");
        valid = false;
    }

    if (!valid) {
        error_message.innerHTML = errorMessage;
        error_message.style.display = "block";
        return;
    } else {
        error_message.style.display = "none";
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email.value.trim())) {
        error_message.innerHTML = "This email is already registered. Redirecting to login page...";
        error_message.style.display = "block";

        setTimeout(() => {
            window.location.href = "Login.html"; // to login 
        }, 3000);

        return;
    }

    const newUser = {
        name: firstName.value.trim(),
        email: email.value.trim(),
        password: password.value,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Redirecting to login page.");
    setTimeout(() => {
        window.location.href = "Login.html";
    }, 3000);
});

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function () {
        this.parentElement.classList.remove("incorrect");
        error_message.style.display = "none"; 
    });
});
}

if (document.title === "Login") {

    document.querySelector("button[type='submit']").addEventListener("click", function (e) {
        e.preventDefault();

        // Clear previous messages and classes
        error_message.innerText = "";
        success_message.innerText = "";
        divemail.classList.remove("incorrect");
        divpassword.classList.remove("incorrect");

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user =>
            user.email === email.value.trim() && user.password === password.value
        );

        if (user) {
            success_message.innerText = `Welcome, ${user.name}! You are now logged in.`;
            success_message.style.display = "block";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            error_message.innerText = "Invalid email or password. Please try again.";
            error_message.style.display = "block";
            divemail.classList.add("incorrect");
            divpassword.classList.add("incorrect");
        }
    });

    // Remove error styles on typing
    email.addEventListener("input", () => {
        divemail.classList.remove("incorrect");
        error_message.innerText = "";
        error_message.style.display = "none";
    });

    password.addEventListener("input", () => {
        divpassword.classList.remove("incorrect");
        error_message.innerText = "";
        error_message.style.display = "none";
    });
}


