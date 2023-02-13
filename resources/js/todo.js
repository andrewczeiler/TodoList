function addForm(){
    formStr = "<div id='inputForm'>" + 
        "<form action='/todo' method='POST'>" + 
            "<input id='title' type='text' name='title' placeholder='Title..' required>" +
            "<br>" +
            "<input id='description' type='text' name='description' placeholder='Description..' required>" +
            "<br>" +
            "<input id='dueDate' type='date' name='dueDate'>" +
            "<br>" +
            "<input id='submitButton' type='submit' value='Add item'>" +
        "</form>" +
    "</div>";
    document.getElementById("addForm").innerHTML = formStr;
}

document.querySelector('#addTodo').addEventListener('click', addForm);

async function changeStatus(id, status){
    let todoItems = document.getElementsByClassName('todoItem');
    let item = 0;
    if (status == 1){
        for(let i = 0; i < todoItems.length; i++){
            if (todoItems[i].getAttribute("data-id") == id){
                item = i;
            }
        }
        try {
            let res = await fetch('/setComplete', {  
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"id": id}),
            })
            if (res.ok){
                let newHTML = "<button class='todoButton' id='completeButton' onclick='changeStatus(" + id + " , 0)' data-id=" + id + "> Complete </button>";
                todoItems[item].firstChild.innerHTML = newHTML;
            }
          }
        catch{
            console.log("Resolving error.");
        }
    }
    else{
        
        for(let i = 0; i < todoItems.length; i++){
            if (todoItems[i].getAttribute("data-id") == id){
                item = i;
            }
        }
        try {
            let res = await fetch('/setIncomplete', {  
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"id": id}),
            })
            if (res.ok){
                let newHTML = "<button class='todoButton' id='incompleteButton' onclick='changeStatus(" + id + " , 1)' data-id=" + id + "> In Progress </button>";
                todoItems[item].firstChild.innerHTML = newHTML;
            }
          }
        catch{
            console.log("Resolving error.");
        }

    }
}