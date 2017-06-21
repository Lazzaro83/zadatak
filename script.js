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

// this requests the file and executes a callback with the parsed result once it is available
fetchJSONFile('data.json', function(data){
    // parsed JSON data are being passed through for loop in order to populate appropriate parts of HTML 
    for(var i = 0; i<data.cars.length; i++){
    	document.getElementsByTagName("img")[i].src = data.cars[i].image;
    	document.getElementsByTagName("span")[i].innerHTML = data.cars[i].name;
    }
})

// this function enables the user to press Enter on his keybord in order ot execute the search
function mySearch(event){
    if(event.which == 13 || event.keyCode == 13){
        search();
        //return false;
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
            //console.log(nodeArray[i]);
            if(carValue == nodeArray[i].innerHTML){
                console.log("Pronasao sam!");
                //handeling hits in querries
                var node = nodeList[i];
                var parentDiv = node.parentNode;
                var saveImgClass = parentDiv.firstChild.className;
                parentDiv.firstChild.className += "enlarged";
                console.log(parentDiv.firstChild);
                //changes appearance of the returned element
                var saveClass = parentDiv.className;
                parentDiv.className = "expand";
                // creates button that returns onclick everything tha way it was
                var button = document.createElement("button");
                button.innerHTML = "x";
                button.className = "smallButton";
                button.onclick = function turnOff(){
                    parentDiv.className = saveClass;
                    parentDiv.firstChild.className = saveImgClass;
                    button.parentNode.removeChild(button);
                };
                parentDiv.appendChild(button);
            } 
        }
    
    }
    document.getElementById("text-box").value = "";
}
