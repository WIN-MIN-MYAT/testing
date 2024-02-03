document.addEventListener("DOMContentLoaded", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("characterId");
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
  
    const loginForm = document.getElementById("loginForm");
  
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
  
    loginForm.addEventListener("submit", function (event) {
      console.log("loginForm.addEventListener");
      event.preventDefault();
  
      const character_name = document.getElementById("character_name").value;
      const password = document.getElementById("password").value;
  
      const data = {
        character_name: character_name,
        password: password,
      };
      fetchMethod(currentUrl + "/api/login", callback, "POST", data);
      loginForm.reset();
    });
  });