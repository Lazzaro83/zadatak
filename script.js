// creating AJAX call for fetching data.json and parsing it as an javascript object
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
    divideCanvas();
}

// this requests the file and executes a callback with the parsed result once it is available
fetchJSONFile('data.json', function(data){
    // parsed JSON data are being passed through for loop in order to populate appropriate parts of HTML 
    for(var i = 0; i<data.cars.length; i++){
    	document.getElementsByTagName("img")[i].src = data.cars[i].image;
    	document.getElementsByTagName("span")[i].innerHTML = data.cars[i].name;
        document.getElementsByTagName("h5")[i].innerHTML = "Speed: " + data.cars[i].speed;
        document.getElementsByTagName("h6")[i].innerHTML = data.cars[i].description;
    }
})
//this function creates 3 rows and 10 columns on canvas 


function divideCanvas(){
    var canvasWidth = 750;
    var canvasHeight = 300;
    var c = document.getElementById("myCanvas");
    //drawing rows
    var ctx=c.getContext("2d");
    ctx.strokeStyle = "#000000";    
    ctx.strokeRect(-0.5, 48.5, 301, 56);
    //drawing columns
    var columns = c.getContext("2d");
    columns.beginPath();
    for(var i = 30.5; i<300; i+=30.5){
        columns.moveTo(i, 0);
        columns.lineTo(i, 150);
        columns.lineWidth = 1;
        columns.strokeStyle = "#a9acb2";
        columns.stroke();
    };
}

// this function enables the user to press Enter on his keybord in order ot execute the search
function mySearch(event){
    if(event.which == 13 || event.keyCode == 13){
        search();
    }
}



// function takes entered word and displays the result
function search(){
    var carValue = document.getElementById("text-box").value;
    if(carValue != ""){
        console.log(carValue);
        // makes a NodeList to compare eneterd value with it's content
        var nodeList = document.getElementsByTagName("span");
        // transforms node list to array
        var nodeArray = [];
        for (var i = 0; i < nodeList.length; ++i) {
            nodeArray[i] = nodeList[i];
            if(carValue == nodeArray[i].innerHTML){
                console.log("Pronasao sam!");
                //handeling hits in querries
                var node = nodeList[i];
                var parentDiv = node.parentNode;
                var saveImgClass = parentDiv.firstChild.className;
                parentDiv.firstChild.className += "enlarged";
                //changes appearance of the returned element
                var saveClass = parentDiv.className;
                parentDiv.className = "expand";
                // creates button that returns onclick everything tha way it was
                var button = document.createElement("button");
                button.innerHTML = "x";
                button.className = "smallButton";
                parentDiv.appendChild(button);
                button.onclick = function turnOff(){
                    parentDiv.className = saveClass;
                    parentDiv.firstChild.className = saveImgClass;
                    button.parentNode.removeChild(button);
                };
                
            } 
        }
    }
    document.getElementById("text-box").value = "";    
}
//eventlistener for mouseclick event on picture of the car
var pictures = document.getElementsByTagName("div");
var first = document.getElementById("first");
var second = document.getElementById("second");
var third = document.getElementById("third");
var racingCars = document.getElementsByName("racingCar");
var chosenItem;
var clonedItem;
//this for loop goes through the divs of car pictures, takes firstChild element of clicked divs, clones it and adds it to apropriate place
// if else conditions are controling where should next click be cloned
for(var i = 0; i < pictures.length; i++){
    pictures[i].addEventListener("click", function(e){
        if(first.childElementCount < 1){
            chosenItem = e.currentTarget.firstChild;
            clonedItem = chosenItem.cloneNode(true);
            first.appendChild(clonedItem);
            } else if(first.hasChildNodes() && second.firstChild == null){
                chosenItem = e.currentTarget.firstChild;
                clonedItem = chosenItem.cloneNode(true);
                second.appendChild(clonedItem);
            } else if(second.hasChildNodes() && third.firstChild == null){
                chosenItem = e.currentTarget.firstChild;
                clonedItem = chosenItem.cloneNode(true);
                third.appendChild(clonedItem);
            }
    } );
}
  //this for loop serves for click events to remove car from race if user has chosen wrong car

for(var i = 0; i < racingCars.length; i++){
    racingCars[i].addEventListener("click", function(e){
        var chosenCar = e.currentTarget;
        chosenCar.removeChild(chosenCar.childNodes[0]);
        console.log("Umaknuto");
    })
}
