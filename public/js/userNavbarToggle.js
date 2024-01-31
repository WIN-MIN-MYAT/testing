document.addEventListener("DOMContentLoaded", function () {
    const inventoryButton = document.getElementById("inventoryButton");
    const shopButton = document.getElementById("shopButton");
    const registerButton = document.getElementById("registerButton");
    const profileButton = document.getElementById("profileButton");
    const logoutButton = document.getElementById("logoutButton");
    const loginButton = document.getElementById("loginButton");
  
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      inventoryButton.classList.remove("d-none");
      registerButton.classList.add("d-none");
      profileButton.classList.remove("d-none");
      logoutButton.classList.remove("d-none");
      shopButton.classList.remove("d-none");
      loginButton.classList.add("d-none");
      
    } else {
      inventoryButton.classList.add("d-none");
      registerButton.classList.remove("d-none");
      profileButton.classList.add("d-none");
      logoutButton.classList.add("d-none");
      loginButton.classList.remove("d-none");
      shopButton.classList.add("d-none");

    }
  
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("token");
      localStorage.removeItem("characterId");
      window.location.href = "index.html";
    });
  });