
function submit_recommendation(){
    const name = document.getElementById("name-input").value;
    const recommendation_text = document.getElementById("recommendation-text").value;
    document.getElementById("name-input").value = "";
    document.getElementById("recommendation-text").value = "";
    const name_element = document.createElement("div")
    name_element.innerHTML = name;
    name_element.classList.add("reference-name");
    const recommendation_text_element = document.createElement("div")    
    recommendation_text_element.innerHTML = recommendation_text;
    recommendation_text_element.classList.add("recommendation-text");
    const recommendation_element = document.createElement("div");
    recommendation_element.classList.add("recommendation");
    recommendation_element.appendChild(name_element);
    recommendation_element.appendChild(recommendation_text_element);
    document.getElementById("recommendation-list").appendChild(recommendation_element);
    document.getElementById("popup").classList.remove("invisible");
    
}
function close_popup(){
    document.getElementById("popup").classList.add("invisible");
}