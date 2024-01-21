// let RunSentimentAnalysis = ()=>{
//     let textToAnalyze = document.getElementById("textToAnalyze").value;

//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("system_response").innerHTML = xhttp.responseText;
//         }
//         else{
//             document.getElementById("system_response").innerHTML = "Please wait...";
        
//         }
//     };
//     xhttp.open("GET", "http://localhost:5000/emotionDetector?textToAnalyze="+textToAnalyze, true);
//     xhttp.send();
// }
let RunSentimentAnalysis = ()=>{
    let textToAnalyze = document.getElementById("textToAnalyze").value;
    const path = `http://localhost:5000/emotionDetector/${encodeURIComponent(textToAnalyze)}`
    fetch(path).then((response)=>{  
        response.text().then((data)=>{
            document.getElementById("system_response").innerHTML = data;
        })
    })
}