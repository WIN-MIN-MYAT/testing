document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const characterList = document.getElementById("characterList");
      responseData.forEach((character) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${character.username}</h5>
                  <p class="card-text">
                      Email: ${character.email}
                  </p>
                  <a href="singlecharacterInfo.html?character_id=${character.id}" class="btn btn-primary">View Details</a>
              </div>
          </div>
          `;
        characterList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/character", callback);
  });