document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const characterList = document.getElementById("leaderboard");
      let rank=1
      responseData.forEach((character) => {
        const displayItem = document.createElement("tr");
        displayItem.className =
          "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3 align-middle";  
        displayItem.setAttribute("style", "cursor: pointer;")
        
        displayItem.addEventListener("click", function() {
            window.location.href = `singleCharacterInfo.html?character_id=${character.character_id}`;
        });
        let displayRank=" #"+rank
        if (rank==1 ){
          displayItem.classList.add("table-success")
          displayRank=`<img src="../assets/rank1.png" alt="Icon" width="40" height="40">`
        }
        else if(rank==2){
          displayRank=`<img src="../assets/rank2.png" alt="Icon" width="30" height="30">`
        }else if(rank==3){
          displayRank=`<img src="../assets/rank3.png" alt="Icon" width="30" height="30">`
        }

        if (rank==responseData.length ){displayItem.classList.add("table-danger")}
        displayItem.innerHTML = `
        <th scope="row" class="text-center">${displayRank}</th>
        <td class="fw-bold text-capitalize ">${character.character_name}</td>
        <td class="text-center">${character.level}</td>
        <td class="text-end">
        
        ${character.gold}<img src="../assets/dollar.png" alt="Icon" width="20" height="20" class="mr-2"></td>
          `;
        characterList.appendChild(displayItem);
        rank++
      });
    };
  
    fetchMethod(currentUrl + "/api/characters/rank", callback);
  });