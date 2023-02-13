function addForm(){
    formStr = "<div>" + 
        "<form action='http://localhost:3006' method='POST'>" + 
            "<label for='title'>Title: </label>" +
            "<input id='title' type='text' name='title' required>" +
            "<br>" +
            "<label for='description'>Description: </label>" +
            "<input id='description' type='text' name='description' required>" +
            "<br>" +
            "<input id='dueDate' type='date' name='dueDate'>" +
            "<br>" +
            "<input type='submit' value='Add item'>" +
        "</form>" +
    "</div>";
    document.getElementById("addForm").innerHTML = formStr;
}

document.querySelector('#addButton').addEventListener('click', addForm);