document.addEventListener("DOMContentLoaded", function () {
const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const questList = document.getElementById("questList");
    responseData.forEach((quest) => {
        const displayItem = document.createElement("div");
        displayItem.className =
            "col-md-4 p-3";
        let difficultyClass;
        if (quest.difficulty=="Easy" ){difficultyClass='border rounded-2 p-2 fw-bold border-success text-success w-25   text-center '}
        if (quest.difficulty=="Medium" ){difficultyClass='border rounded-2 p-2 fw-bold border-primary text-primary w-50   text-center '}
        if (quest.difficulty=="Hard" ){difficultyClass='border rounded-2 p-2 fw-bold border-warning text-warning w-25 text-center '}
        if (quest.difficulty=="Challenging" ){difficultyClass=' border rounded-2 p-2 fw-bold border-danger text-danger w-50   text-center '}
        displayItem.innerHTML = `
          <div class="card  m-2  shadow-sm border-2 " style="height:18em;">
            <h4 class="card-header bg-black text-white py-3 px-2 ">${quest.title}</h4>
            <div class="card-body p-2">
                <h5>Description</h5>
                <p class="card-text">${quest.description}</p>
            </div>
            <div class="card-footer d-flex justify-content-end">
            <p class="${difficultyClass}">${quest.difficulty}</p>
            </div>  
          </div>
          `;
          displayItem.addEventListener("click", function() {
            window.location.href = `singleQuestInfo.html?quest_id=${quest.quest_id}`;
        });
        questList.appendChild(displayItem);

    });
};

fetchMethod(currentUrl + "/api/quests", callback);})