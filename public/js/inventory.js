document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "login.html"
        return;
    }
    const characterId = localStorage.getItem('characterId')        
    const itemList = document.getElementById("itemList");
    let equippedItems=document.getElementById("equippedItems")

    const callbackForResponse=(responseStatus,responseData)=>{
        console.log(responseStatus)
        console.log(responseData)
        let respondText=document.getElementById("respondText")
        respondText.innerText=responseData.message
        respondText.classList.remove("d-none")
        setTimeout(()=>{
        respondText.classList.add("d-none")
        },2000)

    }
    function resetEquippedItemList() {
        while (equippedItems.firstChild) {
            equippedItems.removeChild(equippedItems.firstChild);
        }
    }
    const callback = async(responseStatus, responseData) => {
        if(responseStatus==401){
            localStorage.removeItem("token");
            localStorage.removeItem("characterId");
            window.alert("Your token is expired,please log in again!")
            window.location.href="login.html"
        }
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        responseData.forEach((item) => {
            const displayItem = document.createElement("div");
            displayItem.className = 'col-lg-3 p-3'
            displayItem.innerHTML = `
                <div class="card h-100">
                    <div class="card-header">
                        <h4>${item.item_name}</h4>
                    </div>
                    <div class="card-body">
                        <p>${item.description}</p>
                        <hr>
                        <p class="card-text mx-auto">
                            Type    : <span >${item.item_type}</span> <br>
                            Rarity  : <span >${item.rarity}</span> <br>
                            ATK     : +<span >${item.special_effect_attackDmg}</span> dmg <br>
                            HP      : +<span>${item.special_effect_health}</span> hp <br>
                        </p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <a href="" class="btn btn-success equipButton">Equip</a>
                        <a href="" class="btn btn-danger unequipButton">Unequip</a>
                    </div>
                </div>
                 `
            itemList.appendChild(displayItem)
            const equipButton = displayItem.querySelector('.equipButton');
            const unequipButton = displayItem.querySelector('.unequipButton');
            let data = {
                item_id: item.item_id
            }
            equipButton.addEventListener('click', function (event) {
                event.preventDefault();
                fetchMethod(currentUrl + `/api/characters/${characterId}/equipItem`, callbackForResponse, "POST", data, token);
                setTimeout(()=>{
                    fetchMethod(currentUrl+ `/api/characters/${characterId}`,callbackForCurrentStats,"GET",data, token)
                    fetchMethod(currentUrl+ `/api/characters/${characterId}/showEquippedItems`,callbackForEquippedItems,"GET",data, token)
                },300)
                
                console.log(`Equip button clicked for item with ID ${item.item_id}`);
            });

            unequipButton.addEventListener('click', function (event) {
                event.preventDefault();
                fetchMethod(currentUrl + `/api/characters/${characterId}/unequipItem`, callbackForResponse, "DELETE", data, token)
                setTimeout(()=>{
                    fetchMethod(currentUrl+ `/api/characters/${characterId}`,callbackForCurrentStats,"GET",null, token)
                    fetchMethod(currentUrl+ `/api/characters/${characterId}/showEquippedItems`,callbackForEquippedItems,"GET",null, token)
                },500)
                console.log(`Unequip button clicked for item with ID ${item.item_id}`);
            });
        })
    }
    const callbackForCurrentStats=(responseStatus,responseData)=>{
    if(responseStatus==401){
        window.alert("Your token is expired,please log in again!")
        localStorage.removeItem("token");
        localStorage.removeItem("characterId");
        window.location.href="login.html"
    }
        let character_name=document.getElementById("character_name")
        character_name.innerText=responseData.character_name
        let hp=document.getElementById("hp")
        hp.innerText=responseData.hp
        let dmg=document.getElementById("dmg")
        dmg.innerText=responseData.dmg
        console.log("dmg:"+responseData.dmg)
    }
    const callbackForEquippedItems=(responseStatus,responseData)=>{
        if(responseStatus==401){
            window.alert("Your token is expired,please log in again!")
            localStorage.removeItem("token");
            localStorage.removeItem("characterId");
            window.location.href="login.html"
        }
        resetEquippedItemList()
        console.log(responseData)
        responseData.forEach((items)=>{
            const displayItem = document.createElement("li");
            displayItem.className='my-2'
            displayItem.innerText=items.item_name
            equippedItems.appendChild(displayItem)
        })
    }
    fetchMethod(currentUrl + `/api/characters/${characterId}/inventory`, callback,"GET",null, token);
    fetchMethod(currentUrl+ `/api/characters/${characterId}`,callbackForCurrentStats)
    fetchMethod(currentUrl+ `/api/characters/${characterId}/showEquippedItems`,callbackForEquippedItems,"GET",null, token)
})  