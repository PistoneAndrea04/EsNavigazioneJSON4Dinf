"use strict"

let jsonDoc;
let pos = 0;

//Primo progetto caricato su github

window.onload = function (){
    let json = localStorage.getItem("jsonBookstore");
    if (json != null) {
        jsonDoc = JSON.parse(json);
        console.log(jsonDoc);
        visualizza();
    }
}

function visualizza(){
    let tBody = document.getElementById("tabLibri");
    tBody.innerHTML = "";
    for (let i=0; i<jsonDoc.length; i++){
        let libro = jsonDoc[i];
        let tr = document.createElement("tr");
        tBody.append(tr);
        //Scooriamo le chiavi e otteniamo ogni singolo valore
        for (let key in libro){ //mi prende tutte le chiavi e me le scorre finop all'ultima
            let td = document.createElement("td");
            td.innerText = libro[key];
            tr.append(td);
        }
        let td = document.createElement("td");
        let btn = document.createElement("input");
        btn.type = "button";
        btn.value = "Elimina";
        btn.setAttribute("id", i);
        btn.addEventListener("click", function(){elimina(this.getAttribute("id"))})
        td.append(btn);
        tr.append(td);
    }
}

function elimina(id){
    jsonDoc.splice(id,1);
    let jsonS = JSON.stringify(jsonDoc);
    localStorage.setItem("jsonBookstore", jsonS);
    visualizza();
}

function aggiungi(){
    window.location.href = "aggiungi.html";
}

function leggiRecord(){
    let div = document.getElementById("contenuto");
    div.innerHTML = "";
    for (let key in jsonDoc[pos]){
        div.innerHTML += key + " : " + jsonDoc[pos][key] + "<br>";
    }
}

function primo(){
    pos = 0;
    leggiRecord();
}

function ultimo(){
    pos = jsonDoc.length-1;
    leggiRecord();
}

function avanti(){
    if (pos < jsonDoc.length-1) {
        pos++;
        leggiRecord();
    }
    else
        alert("Sei già all'ultimo libro!");
}

function indietro(){
    if (pos > 0) {
        pos--;
        leggiRecord();
    }
    else
        alert("Sei già al primo libro!");
}