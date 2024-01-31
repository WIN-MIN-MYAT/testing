document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const characterId = urlParams.get("character_id");

  const token = localStorage.getItem('token');
    const callbackForcharacterInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const characterName = document.getElementById("character_name");
      const character_id = document.getElementById("character_id");
      const level = document.getElementById("level");
      const gold = document.getElementById("gold");
      const created_on=document.getElementById("created_on");
  
      characterName.innerText=responseData.character_name
      character_id.innerText=responseData.character_id
      level.innerText=responseData.level
      gold.innerText=responseData.gold
      created_on.innerText=responseData.created_on

    };

    const questLinkcallback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const questList = document.getElementById("questList");
      const questTable=document.getElementById("questTable")
      const displayText=document.getElementById("nooneFinished")
      if(responseStatus==200){
        questTable.classList.remove("d-none")
        displayText.classList.add("d-none")
        responseData.forEach((quest) => {
          const displayItem = document.createElement("tr");
          displayItem.className =
            "p-3 ";
          if (quest.difficulty=="Easy" ){displayItem.classList.add("table-success")}
          if (quest.difficulty=="Medium" ){displayItem.classList.add("table-primary")}
          if (quest.difficulty=="Hard" ){displayItem.classList.add("table-warning")}
          if (quest.difficulty=="Challenging" ){displayItem.classList.add("table-danger")}
          displayItem.innerHTML = `
          <td class="fw-bold ">${quest.title}</td>
          <td class="">${quest.difficulty}</td>
          <td class="text-end">${quest.completed_on}</td>
            `;
          questList.appendChild(displayItem);
        });
      }else if(responseStatus==404){
        questTable.classList.add("d-none")
        displayText.classList.remove("d-none")
      }
    };
    
    fetchMethod(currentUrl + `/api/characters/${characterId}`, callbackForcharacterInfo);
    fetchMethod(currentUrl + `/api/characters/${characterId}/quest`, questLinkcallback);
  });