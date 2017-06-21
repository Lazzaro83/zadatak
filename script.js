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
    // do something with your data
    for(var i = 0; i<6; i++){
    	document.getElementsByTagName("img")[i].src = data.cars[i].image;
    	document.getElementsByTagName("span")[i].innerHTML = data.cars[i].name;
    }
    //document.getElementById('demo').src = data.cars[2].image;
    console.log(data.cars[2].image);
});
