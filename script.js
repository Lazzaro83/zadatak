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

// this requests the file and executes a callback with the parsed result once
//   it is available
fetchJSONFile('data.json', function(data){
    // parsed JSON data are being passed through for loop in order to populate appropriate parts of HTML 
    for(var i = 0; i<data.cars.length; i++){
    	document.getElementsByTagName("img")[i].src = data.cars[i].image;
    	document.getElementsByTagName("span")[i].innerHTML = data.cars[i].name;
    }
    //console.log(data.cars[2].image);
});
