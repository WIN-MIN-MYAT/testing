document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem('token');
  if(!token){
    window.location.href="login.html"
    return;
  }
  const characterId = localStorage.getItem('characterId')
  const callbackForcharacterInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const characterName = document.getElementById("character_name");
    const character_id = document.getElementById("character_id");
    const level = document.getElementById("level");
    const gold = document.getElementById("gold");
    const created_on = document.getElementById("created_on");
    const email = document.getElementById("email");

    characterName.innerText = responseData.character_name
    character_id.innerText = responseData.character_id
    level.innerText = responseData.level
    gold.innerText = responseData.gold
    created_on.innerText = responseData.created_on
    email.innerText = responseData.email

  };

  const questLinkcallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const questList = document.getElementById("questList");
    const questTable = document.getElementById("questTable")
    const displayText = document.getElementById("nooneFinished")
    if (responseStatus == 200) {
      questTable.classList.remove("d-none")
      displayText.classList.add("d-none")
      responseData.forEach((quest) => {
        const displayItem = document.createElement("tr");
        displayItem.className =
          "p-3 ";
        if (quest.difficulty == "Easy") { displayItem.classList.add("table-success") }
        if (quest.difficulty == "Medium") { displayItem.classList.add("table-primary") }
        if (quest.difficulty == "Hard") { displayItem.classList.add("table-warning") }
        if (quest.difficulty == "Challenging") { displayItem.classList.add("table-danger") }
        displayItem.innerHTML = `
            <td class="fw-bold ">${quest.title}</td>
            <td class="">${quest.difficulty}</td>
            <td class="text-end">${quest.completed_on}</td>
              `;
        questList.appendChild(displayItem);
      });
    } else if (responseStatus == 404) {
      questTable.classList.add("d-none")
      displayText.classList.remove("d-none")
    }
  };

  const editButton = document.getElementById("editButton")
  const editForm = document.getElementById("editForm")
  const respondText = document.getElementById("respondText")
  

  editButton.addEventListener("click", (event) => {
    editButton.classList.add("d-none")
    editForm.classList.remove("d-none")

  });
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    respondText.classList.remove("d-none");  

    if (responseStatus == 201) {
      respondText.classList.add("text-bg-success")
      respondText.classList.remove("text-bg-danger")
      respondText.innerText = "✅ Character Name Updated Successfully";
      setTimeout(() => {
        respondText.classList.add("d-none");  // Hide the element after 2 second
        window.location.reload() 
      }, 1500);
    } else {
      respondText.classList.remove("text-bg-success")
      respondText.classList.add("text-bg-danger")
      respondText.innerText = `❌ ${responseData.message}`;
      setTimeout(() => {
        respondText.classList.add("d-none");  // Hide the element after 2 second
      }, 2000);
    }
    

  };
  editForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const character_name = document.getElementById("character_name1").value;
    const data = {
      character_name: character_name
    };
    
    fetchMethod(currentUrl + `/api/characters/${characterId}/name`, callback, "PUT", data,token);
    editForm.reset();
    editButton.classList.remove("d-none")
    editForm.classList.add("d-none")

  })



  fetchMethod(currentUrl + `/api/characters/${characterId}`, callbackForcharacterInfo);
  fetchMethod(currentUrl + `/api/characters/${characterId}/quest`, questLinkcallback);
});