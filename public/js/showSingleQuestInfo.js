document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem('token');
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const questId = urlParams.get("quest_id");
  const characterId = localStorage.getItem('characterId')
  const questTitle = document.getElementById("quest-title");
  const questImage = document.getElementById("quest-image");
  const questDescription = document.getElementById("quest-description");
  const questDifficulty = document.getElementById("quest-difficulty");
  const questDifficultyBorder = document.getElementById("difficultyBorder");
  const questLink = document.getElementById("quest-link");
  const questItem = document.getElementById("quest-item");
  const questLevel = document.getElementById("quest-level");
  const questGold = document.getElementById("quest-gold");
  const questCreature = document.getElementById("quest-creature");
  const questHp = document.getElementById("quest-hp");
  const questDmg = document.getElementById("quest-dmg");
  const questRequiredLvl = document.getElementById("quest-requriedlevel");
  const respondText = document.getElementById("respondText")
  const resultText = document.getElementById("resultText")
  const characterList = document.getElementById("completedCharacterList");


  questLink.addEventListener("click", function () {
    if (token) {
      let data = {
        quest_id: questId,
        character_id: characterId
      }
      console.log(token)
      fetchMethod(currentUrl + "/api/quests/accept", callbackForQuest, "POST", data, token);

    }
    else {
      respondText.classList.remove("d-none");
      respondText.innerText = "You need to log in to do quest!"
      setTimeout(() => {
        respondText.classList.add("d-none");  // Hide the element after 2 second
      }, 2000);
    }
  })

  function resetCharacterList() {
    while (characterList.firstChild) {
      characterList.removeChild(characterList.firstChild);
    }
  }

  const callbackForQuest = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if(responseStatus==401){
      localStorage.removeItem("token");
      localStorage.removeItem("characterId");
      respondText.classList.remove("d-none");
      respondText.innerText = "Your token is expired.Please login back."
      setTimeout(() => {
        respondText.classList.add("d-none");  // Hide the element after 2 second
        window.location.href="login.html"
      }, 4000);
      return
    }
    if (responseData.winOrLose == "win") {
      resultText.classList.remove("d-none","border-white")
      resultText.classList.add("border-success")
      resultText.innerText = 
      `The creature ${responseData.creature_name} has appeared!\n
            The battle between two of you started!\n
            ---------------------------------------\n
            You defeated the ${responseData.creature_name}.\n
            🎉🎉YOU WIN🎉🎉
            Rewards:\n Gold: ${responseData.reward_gold} gold,\n Item: ${responseData.reward_item}.\n
            Your character level increases by ${responseData.reward_level}
      `
      setTimeout(()=>{
      fetchMethod(currentUrl + `/api/quests/${questId}/completedCharacters`, completedCharacterListcallback);
      },300)
    }
    else if(responseData.winOrLose == "lose"){
      resultText.classList.remove("d-none","border-white")
      resultText.classList.add("border-danger")
      resultText.innerText = 
      `The creature ${responseData.creature_name} has appeared!\n
            The battle between two of you started!\n
            ---------------------------------------\n
            You got defeated by the ${responseData.creature_name}.\n
            YOU LOST !!!!
      `
    }else if(responseData.winOrLose =="lowlevel"){
      respondText.classList.remove("d-none");
      respondText.innerText = responseData.message
        setTimeout(() => {
          respondText.classList.add("d-none");  // Hide the element after 2 second
        }, 2000);
    }
    setTimeout(()=>{
      resultText.classList.add("d-none")
    },8000)
  }

  const callbackForquestInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);




    if (responseStatus == 404) {
      characterInfo.innerHTML = `${responseData.message}`;
      return;
    }


    questImage.setAttribute("src", `../assets/quest_${questId}.png`)

    if (responseData.difficulty == "Easy") { questDifficultyBorder.classList.add("border-success", "text-success") }
    if (responseData.difficulty == "Medium") { questDifficultyBorder.classList.add("border-primary", "text-primary") }
    if (responseData.difficulty == "Hard") { questDifficultyBorder.classList.add("border-warning", "text-warning") }
    if (responseData.difficulty == "Challenging") { questDifficultyBorder.classList.add("border-danger", "text-danger") }

    questTitle.innerText = responseData.title
    questDescription.innerText = responseData.description
    questDifficulty.innerText = responseData.difficulty
    questItem.innerText = responseData.reward_item
    questLevel.innerText = responseData.reward_level
    questGold.innerText = responseData.reward_gold
    questCreature.innerText = responseData.creature_name
    questHp.innerText = responseData.creature_hp
    questDmg.innerText = responseData.creature_dmg
    questRequiredLvl.innerText = responseData.level_requirement

  };

  const completedCharacterListcallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    resetCharacterList()
    const characterTable = document.getElementById("character-Table")
    const displayText = document.getElementById("nooneFinished")

    if (responseStatus == 200) {
      characterTable.classList.remove("d-none")
      displayText.classList.add("d-none")
      responseData.forEach((character) => {
        const displayItem = document.createElement("tr");
        displayItem.className =
          "p-5";
        displayItem.innerHTML = `
            <td class="fw-bold text-center fs-4 text-capitalize">${character.character_name}</td>
            <td class="text-center fs-4">${character.completed_on}</td>
              `;
        characterList.appendChild(displayItem);
      });
    }
    else {
      characterTable.classList.add("d-none")
      displayText.classList.remove("d-none")
    }
  };

  fetchMethod(currentUrl + `/api/quests/${questId}`, callbackForquestInfo);
  fetchMethod(currentUrl + `/api/quests/${questId}/completedCharacters`, completedCharacterListcallback);
});