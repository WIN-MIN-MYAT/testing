document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const messageList = document.getElementById("messageList");
    const characterId = localStorage.getItem("characterId");
    const sendForm = document.getElementById("sendForm");
    const submitButton = document.getElementById("submitButton");
    let editingMessageId = null;


    // Function to clear/reset the messageList
    function resetMessageList() {
        while (messageList.firstChild) {
            messageList.removeChild(messageList.firstChild);
        }
    }

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        resetMessageList();

        responseData.forEach((message, msgIndex) => {
            const displayItem = document.createElement("div");
            displayItem.className = "my-3  mx-0";

            if (message.character_id == characterId) {
                displayItem.innerHTML = `
          <div class="container-fluid d-flex justify-content-end align-items-center px-2 mt-2">
            <div class="w-auto">
              <p class="text-end  me-2 mb-2 ">
                <span class="btn p-0 editButton" >
                  <img src="../assets/pen.png" width="20" height="20" alt="" data-messageId="${message.message_id}">
                </span>
                <span  class="deleteButton p-0 mx-2 btn">
                  <img src="../assets/bin.png" width="20" height="20" alt="" data-messageId="${message.message_id}">
                </span>
              </p>
              <div class="m-0 h-auto p-3 rounded-4 rounded border bg-secondary ">
                ${message.message}
              </div>
              <p class="text-end m-0 mt-1" style="font-size: smaller;">${message.created_on}</p>
            </div>
          </div>
        `;
            } else {
                displayItem.innerHTML = `
          <div class="container-fluid d-flex justify-content-start align-items-center px-2 mt-2">
            <img src="../assets/default-avatar.jpg" class="me-2 mt-2 rounded-circle border border-success border-4" alt="" width="50" height="50"/> 
            <div class="w-auto">
              <p class="text-start m-0 ms-2 mb-2 text-warning ">${message.character_name}</p>
              <div class="m-0 h-auto p-3 rounded-4 rounded border bg-secondary">
                ${message.message}
              </div>
              <p class="text-start m-0 ms-2 mt-1 " style="font-size: smaller;">${message.created_on}</p>
            </div>
          </div>
        `;
            }
            let editButton = displayItem.querySelector('.editButton');
            if (editButton) {
                    editButton.addEventListener('click', function (event) {
                    editingMessageId = event.target.getAttribute('data-messageId');
                    let messageContent = event.target.closest('.container-fluid').querySelector('.rounded.border.bg-secondary').innerText.trim();
                    document.getElementById("newMessage").focus()
                    document.getElementById("newMessage").value = messageContent
                    submitButton.innerText = "Edit"
                });
            }
            let deleteButton = displayItem.querySelector('.deleteButton');
            if (deleteButton) {
                deleteButton.addEventListener('click', function (event) {
                    let messageId = event.target.getAttribute('data-messageId');
                    fetchMethod(currentUrl + `/api/messages/${messageId}`, callbackForSubmit, "DELETE", null, token);
                    fetchMethod(currentUrl + "/api/messages", callback);
                });
            }
            messageList.appendChild(displayItem);
            if (msgIndex == responseData.length - 1) {
                displayItem.scrollIntoView()
            }
        });
    };


    const callbackForSubmit = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // After sending a new message, fetch and display messages again
        resetMessageList();
        fetchMethod(currentUrl + "/api/messages", callback);
    };

    sendForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newMessage = document.getElementById("newMessage").value;

        if (editingMessageId) {
            const data = {
                message: newMessage,
                message_id: editingMessageId,
            };
            fetchMethod(currentUrl + "/api/messages/" + editingMessageId, callbackForSubmit, "PUT", data, token);
            editingMessageId = null;
            document.getElementById("newMessage").value = "Type Message Here"
            submitButton.innerText = "Send";
            fetchMethod(currentUrl + "/api/messages", callback);
        }
        else {
            const data = {
                message: newMessage,
                character_id: characterId,
            };
            fetchMethod(currentUrl + "/api/messages", callbackForSubmit, "POST", data, token);
            document.getElementById("newMessage").value = ""
            submitButton.innerText = "Send";
            fetchMethod(currentUrl + "/api/messages", callback);
        }

    });
    // Initial fetch and display of messages
    fetchMethod(currentUrl + "/api/messages", callback);
});
//real

