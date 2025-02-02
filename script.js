document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".login-container form").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const email = document.querySelector(".login-container input[type='email']").value;
        const password = document.querySelector(".login-container input[type='password']").value;
        
        if (!email || !password) {
            Swal.fire({
                title: "Error",
                text: "Please fill in all fields",
                icon: "error"
            });
            return;
        }
        
        try {
            const response = await fetch("https://asia-southeast2-awangga.cloudfunctions.net/idbiz/auth/login/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) throw new Error("Login failed");
            
            const data = await response.json();
            document.cookie = `login=${data.token}; path=/;`; // Store token in cookie
            
            Swal.fire({
                title: "Success",
                text: "Login successful",
                icon: "success"
            }).then(() => {
                window.location.href = "https://www.id.biz.id/admin/";
            });
        } catch (error) {
            console.error("Error logging in:", error);
            Swal.fire({
                title: "Error",
                text: "Invalid email or password",
                icon: "error"
            });
        }
    });
});
