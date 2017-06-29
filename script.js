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
}

//seting global variables
var carSpeeds = [];
var raceDistance;
var firstSpeedLimit;
var secondSpeedLimit;
var traficLights;
var durationOfTraficLights;
// this requests the file and executes a callback with the parsed result once it is available
fetchJSONFile('data.json', function(data){
    // parsed JSON data are being passed through for loop in order to populate appropriate parts of HTML 
    for(var i = 0; i<data.cars.length; i++){
    	document.getElementsByTagName("img")[i].src = data.cars[i].image;
    	document.getElementsByTagName("span")[i].innerHTML = data.cars[i].name;
        document.getElementsByTagName("h5")[i].innerHTML = "Speed: " + data.cars[i].speed;
        document.getElementsByTagName("h6")[i].innerHTML = data.cars[i].description;
        carSpeeds.push(data.cars[i].speed);
    }
    raceDistance = data.distance;
    firstSpeedLimit = data.speed_limits[0].position;
    secondSpeedLimit = data.speed_limits[1].position;
    traficLights = data.traffic_lights[0].position;
    durationOfTraficLights = data.traffic_lights[0].duration;
    //console.log(traficLights + " " + durationOfTraficLights);

    document.getElementById("speedLimit1").innerHTML = data.speed_limits[0].speed;
    document.getElementById("speedLimit2").innerHTML = data.speed_limits[1].speed;
    divideCanvas(raceDistance, firstSpeedLimit, secondSpeedLimit, traficLights,);
    traficSigns(traficLights, durationOfTraficLights);
})

//this function creates 3 rows and 10 columns on canvas 
function divideCanvas(x, y, z, q){
    var c = document.getElementById("myCanvas");
    fitToContainer(c);
    function fitToContainer(c){
        c.style.width='100%';
        c.style.height='100%';
        c.width  = c.offsetWidth;
        c.height = c.offsetHeight;
    }
    //drawing rows
    var ctx=c.getContext("2d");
    ctx.strokeStyle = "#000000";    
    ctx.strokeRect(0, c.height/3, c.width, c.height/3);
    //drawing columns
    var columns = c.getContext("2d");
    columns.beginPath();
    for(var i = 0; i<c.width; i+=75){
        columns.moveTo(i, 0);
        columns.lineTo(i, c.height);
        columns.lineWidth = 1;
        columns.strokeStyle = "#a9acb2";
        columns.stroke();
    }
    //dividing canvas based on API distance
    var dividedDistance = x;
    var firstSign = y;
    var secondSign = z;
    var traficLites = q;
    var distanceUnit = c.width / dividedDistance;
    console.log(distanceUnit*firstSign);
    // positioning speed limits at API apropriate places
    //lines of first speed limit
    ctx.beginPath();
    ctx.setLineDash([35, 15]);
    ctx.moveTo(distanceUnit*firstSign, 0);
    ctx.lineTo(distanceUnit*firstSign, c.height);
    ctx.lineWidth = 4;
    ctx.stroke();
    //lines of second speed limit
    ctx.beginPath();
    ctx.setLineDash([35, 15]);
    ctx.moveTo(distanceUnit*secondSign, 0);
    ctx.lineTo(distanceUnit*secondSign, c.height);
    ctx.lineWidth = 4;
    ctx.stroke();
    //lines of trafic lighs
    ctx.beginPath();
    ctx.setLineDash([35, 15]);
    ctx.moveTo(distanceUnit*traficLites, 0);
    ctx.lineTo(distanceUnit*traficLites, c.height);
    ctx.lineWidth = 4;
    ctx.stroke();
}

function traficSigns(p, r){
    //speed limit sign
    var bool = true; //switch for changing colors on traic lights sign
    var lightDuration = r;
    var lightPosition = p;
    var d = document.getElementById("mySecondCanvas");
    fitToContainer(d);
    function fitToContainer(d){
        d.style.width='100%';
        d.style.height='100%';
        d.width  = d.offsetWidth;
        d.height = d.offsetHeight;
    }
    //first speed firstSign
    var ctx1 = d.getContext("2d");
    ctx1.strokeStyle = "#969490";
    ctx1.beginPath();
    ctx1.arc(335, 65, 30, 0, 2*Math.PI);
    ctx1.stroke();
    ctx1.moveTo(335, 10);
    ctx1.lineTo(335, 0);
    ctx1.stroke();
    //second speed sign
    var ctx1 = d.getContext("2d");
    ctx1.strokeStyle = "#969490";
    ctx1.beginPath();
    ctx1.arc(680, 65, 30, 0, 2*Math.PI);
    ctx1.stroke();
    ctx1.moveTo(680, 10);
    ctx1.lineTo(680, 0);
    ctx1.stroke();
    //trafic lights sign
    function first(){
        bool = false;
        var ctx2 = d.getContext("2d");
        ctx2.strokeStyle = "#969490";
        ctx2.beginPath();
        ctx2.rect(410, 25, 30, 80); 
        ctx2.stroke();
        //trafic lights
        ctx2.fillStyle = "red";
        ctx2.beginPath();
        ctx2.arc(424, 45, 10, 0, 2*Math.PI);
        ctx2.stroke();
        ctx2.fill();
        var ctx3 = d.getContext("2d");
        ctx3.fillStyle = "white";
        ctx3.beginPath();
        ctx3.arc(424, 85, 10, 0, 2*Math.PI);
        ctx3.stroke();
        ctx3.fill();
        // line
        ctx3.beginPath();
        ctx3.moveTo(423, 10);
        ctx3.lineTo(423, 0);
        ctx3.stroke();
    } 
    first();
    function second(){
        bool = true;
        var ctx2 = d.getContext("2d");
        ctx2.strokeStyle = "#969490";
        ctx2.beginPath();
        ctx2.rect(410, 25, 30, 80); 
        ctx2.stroke();
        //trafic lights
        ctx2.fillStyle = "white";
        ctx2.beginPath();
        ctx2.arc(424, 45, 10, 0, 2*Math.PI);
        ctx2.stroke();
        ctx2.fill();
        var ctx3 = d.getContext("2d");
        ctx3.fillStyle = "green";
        ctx3.beginPath();
        ctx3.arc(424, 85, 10, 0, 2*Math.PI);
        ctx3.stroke();
        ctx3.fill();
        // line
        ctx3.beginPath();
        ctx3.moveTo(423, 10);
        ctx3.lineTo(423, 0);
        ctx3.stroke();
    }
    
    setInterval(function(){
        bool == true ? first() : second();
    }, lightDuration)
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
        // makes a NodeList to compare eneterd value with it's content
        var nodeList = document.getElementsByTagName("span");
        // transforms node list to array
        var nodeArray = [];
        for (var i = 0; i < nodeList.length; ++i) {
            nodeArray[i] = nodeList[i];
            if(carValue == nodeArray[i].innerHTML){
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
//this saves speed value for rading animations
var firstSpeed;
var secondSpeed;
var thirdSpeed;
//this for loop goes through the divs of car pictures, takes firstChild element of clicked divs, clones it and adds it to apropriate place
// if else conditions are controling where should next click be cloned
for(var i = 0; i < pictures.length; i++){
    pictures[i].addEventListener("click", function(e){
        if(first.childElementCount < 1){
            chosenItem = e.currentTarget.firstChild;
            firstSpeed = e.currentTarget.childNodes[2].innerHTML.slice(7);
            clonedItem = chosenItem.cloneNode(true);
            first.appendChild(clonedItem);
            } else if(first.hasChildNodes() && second.firstChild == null){
                chosenItem = e.currentTarget.firstChild;
                secondSpeed = e.currentTarget.childNodes[2].innerHTML.slice(7);
                clonedItem = chosenItem.cloneNode(true);
                second.appendChild(clonedItem);
            } else if(second.hasChildNodes() && third.firstChild == null){
                chosenItem = e.currentTarget.firstChild;
                thirdSpeed = e.currentTarget.childNodes[2].innerHTML.slice(7);
                clonedItem = chosenItem.cloneNode(true);
                third.appendChild(clonedItem);
            }
    } );
}
//this for loop serves for click events to remove car from race if user has chosen wrong car
// and wants to put other one in race

for(var i = 0; i < racingCars.length; i++){
    racingCars[i].addEventListener("click", function(e){
        var chosenCar = e.currentTarget;
        chosenCar.removeChild(chosenCar.childNodes[0]);
    })
}

function startRace(){
    console.log(carSpeeds);
    var speedOfAnimation = document.getElementById("speed-box").value;
    if(speedOfAnimation == NaN || speedOfAnimation == ""){
        alert("You need to enter a number for animation speed!");
    } else{
        document.getElementById("speed-box").value = "";
        var speedOne = 0;
        var speedTwo = 0;
        var speedThree = 0;
        setInterval(function(){
            var one = document.getElementById("first");
            if (speedOne >= 680) {
                clearInterval();
                one.style.left = 680+"px";
            } else {
                speedOne += parseInt(firstSpeed); 
                one.style.left = speedOne +'px'; 
            }
            var two = document.getElementById("second");
            if (speedTwo >= 680) {
                clearInterval();
                two.style.left = 680+"px";
            } else {
                speedTwo += parseInt(secondSpeed); 
                two.style.left = speedTwo +'px'; 
            }
            var three = document.getElementById("third");
            if (speedThree >= 680) {
                clearInterval();
                three.style.left = 680+"px";
            } else {
                speedThree += parseInt(thirdSpeed); 
                three.style.left = speedThree +'px'; 
        }
        
    },speedOfAnimation)
    }
    
}
