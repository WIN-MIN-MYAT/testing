document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const character_name = document.getElementById("character_name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password === confirmPassword) {
            warningCard.classList.add("d-none");
            const data = {
                character_name: character_name,
                email: email,
                password: password,
            };

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                
                if (responseStatus == 200) {
                    if (responseData.token) {
                        localStorage.setItem("token", responseData.token);
                        localStorage.setItem("characterId", responseData.character_id);
                        window.location.href = "profile.html";
                    }
                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            fetchMethod(currentUrl + "/api/register", callback, "POST", data);

            signupForm.reset();
        } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = "Passwords do not match";
        }
    });
});