// self executing function here
document.addEventListener("DOMContentLoaded", function (event) {
    window.onload = makeArray(printTable);

    // Get the modal
    var modal = document.getElementById("myModal");
    // console.log(modal);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

function mOverColor(obj) {
    obj.firstElementChild.style = "filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(1293%) hue-rotate(206deg) brightness(119%) contrast(100%);";
    obj.style = "background-color:#1997c5;"
}

function mOutColor(obj) {
    obj.firstElementChild.style = "filter: brightness(0) saturate(100%) invert(58%) sepia(90%) saturate(4969%) hue-rotate(169deg) brightness(99%) contrast(80%);";
    obj.style = "background-color:white;"
}

function makeArray(callBack) {
    //Create an XMLHttpRequest Object
    var mynewnewXHR = new XMLHttpRequest();
    //Send a Request. Must use the open() and send() methods
    mynewnewXHR.open("GET", "https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20f60ccc78-d3b4-5c90-b0f4-2e42ddc57e4c%5D%3B");
    mynewnewXHR.setRequestHeader('Accept', 'application/json');
    mynewnewXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //Define a Callback Function to be executed when the request receives an answer.
    mynewnewXHR.onload = function () {
        if (mynewnewXHR.status == 200) {
            var jsonObjectArray = JSON.parse(this.responseText);
            callBack(jsonObjectArray);
        }
        else {

        }
    }
    mynewnewXHR.send();
}

var table;

function printTable(jsonObject) {
    // console.log(jsonObject);
    //Create an XMLHttpRequest Object
    var mynewXHR = new XMLHttpRequest();
    //Send a Request. Must use the open() and send() methods
    mynewXHR.open("GET", "https://gorest.co.in/public/v1/users/");

    //Define a Callback Function to be executed when the request receives an answer.
    mynewXHR.onload = function () {
        //retrieve resaults and put it in an array of objects.
        var jsonObjectArray2 = JSON.parse(this.responseText);
        //log that.
        //Set up the heading of the table
        table = "<tr><th><input type='checkbox'></th><th>ID</th><th>Customer name</th><th>Description</th><th>Date</th><th>Total</th></tr>"
        //automatically populate the Table
        for (var x = 0; x < jsonObjectArray2.data.length; x++) {
            table += "<tr><td><input type='checkbox' name='box' value='ticked' class='checkbox1'></td><td>" +
                jsonObjectArray2.data[x].id +
                "</td><td>" +
                jsonObjectArray2.data[x].name +
                "</td><td>" +
                jsonObject[x]["Measure Name"] +
                "</td><td>" +
                randomDate(new Date(2012, 0, 1), new Date()) +
                "</td><td>" +
                "$" + getRandomInt(100, 501) +
                "</td></tr>";
        }
        //Replace the interior of the table
        document.getElementById("tableElement").innerHTML = table;
    }
    mynewXHR.send();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    var newDate;

    if (date.getDate() < 10) {
        if (date.getMonth() < 9) {
            newDate = "0" + date.getDate() + "/0" + (date.getMonth() + 1) + "/" + date.getFullYear();
        }
        else {
            newDate =  "0" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        }
    }
    else {
        if (date.getMonth() < 9) {
            newDate = date.getDate() + "/0" + (date.getMonth() + 1) + "/" + date.getFullYear();
        }
        else {
            newDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        }
    }
    return newDate;
}

function deleteRow() {
    var query = document.getElementsByClassName('checkbox1');

    // console.log(query);

    for (var element of query) {
        if (element.checked) {
            element.checked = false;
            element.parentElement.parentElement.style = "display: none;";
        }
    }
}

function checkRowSelection() {
    var query = document.getElementsByClassName('checkbox1');

    var checked = 0;
    var checkedElement;

    for (var element of query) {
        if (element.checked) {
            checked++;
            checkedElement = element;
        }
    }
    if (checked != 1) {
        alert("To use the edit function you must have 1 row selected!");
    }
    else {
        // When the user clicks the button, open the modal 
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    //not sure if its ok to do this
    var changeButton = document.getElementById("changeButton");
    changeButton.onclick = function () {
        //find row that we will edit.
        var row = checkedElement.parentElement.parentElement;

        row.children[2].innerHTML = document.getElementById("newCName").value;
        row.children[3].innerHTML = document.getElementById("newCDesc").value;
        row.children[5].innerHTML = "$" + document.getElementById("newCTotal").value;

        modal.style.display = "none";
    }
}

function dateChange() {
    document.getElementById("tableElement").innerHTML = table;
    var tableS = document.getElementById("tableElement");
    var selectedDate = document.getElementById("range").value.split(/\s*\-\s*/g);

    for (var i = 1, row; row = tableS.rows[i]; i++) {
        var bad = true;
        var rowDate = row.children[4].innerHTML.split(/\s*\/\s*/g);
        if (selectedDate[0] == rowDate[2]) {
            if (selectedDate[1] == rowDate[1]) {
                if (selectedDate[2] == rowDate[0]) {
                    bad = false;
                }
            }
        }
        if (bad) {
            row.style = "display: none;";
        }
    }
}
