"use strict";
/** To hold any existing template on the editor , just an fucking experiment 
 * It ll hold the components one by one 
 * Great Idea Lets See 
 * **/
 
 var classCounter = 0;

 /** Variables to Drop elements to the canvas **/
 var selectedElement;
 var canvas = document.getElementById("canvas");

 resizeCanvas("desktop");
 toggleEditorCSS();
 selectElement();
 dropElementinSpace();

 /** Resize Canvas Based on Mobile or Desktop Device **/
 function resizeCanvas(device){
    if (device === "mobile") {
        document.getElementById("canvas").style.height = "600px";
        document.getElementById("canvas").style.width = "325px";
    } else {
        document.getElementById("canvas").style.height = "95vh";
        document.getElementById("canvas").style.width = "calc(100% - 150px)";
    }
}
/** toggle elements **/
function showHideVisualElements(){
    let state = document.getElementsByClassName('visualElements')[0].style.display == "none" ? "block" : "none";
    document.getElementsByClassName('visualElements')[0].style.display = state
}

/** apply editor's css **/
function toggleEditorCSS(){
}


function selectElement(){
    let elements = document.querySelectorAll(".visualElements ul li")
    for(let i=0;i<elements.length;i++){
      let element = elements[i];
      element.addEventListener("click",function(){
        elements.forEach(el => {
            el.classList.remove("selected")
        })
        element.classList.add("selected")
        selectedElement = this.innerText;
        showAlert(selectedElement + " Selected")
    })
  }
}

function showAlert(message){
    let alert = document.getElementById("alert");
    alert.innerText = message
    alert.style.display = "block";
    setTimeout(() => {
     alert.style.display = "none";
 }, 1000);
}

function dropElementinSpace(){
    canvas.addEventListener('click',function(){
        if(selectedElement){
            appendElement(selectedElement)
            let elements = document.querySelectorAll(".visualElements ul li")
            elements.forEach(el => {
                el.classList.remove("selected")
            })
            selectedElement = null
        }
    })
}

function onDrag(e){
  let element = e.target;
  let getStyle = window.getComputedStyle(element);
  let left = parseInt(getStyle.left)
  let top = parseInt(getStyle.top)
  element.style.left = `${left+e.movementX}px`
  element.style.top = `${top+e.movementY}px`
}

function appendElement(elementType){
    let element = document.createElement(elementType);
    element.className = "btn btn-primary class-"+classCounter
    element.id = "identification-"+(classCounter++)
    element.innerText = "Click Me"
    element.style.position = "relative"
    canvas.appendChild(element);
    /** to make the element draggable **/
    element.addEventListener("mousedown",()=>{
         element.classList.add("dragging")
         element.addEventListener("mousemove",onDrag,false)
    },false)
    element.addEventListener("mouseup",()=>{
         element.classList.remove("dragging")
         element.removeEventListener("mousemove",onDrag,false)
    },false)
    element.addEventListener("mouseleave",()=>{
         element.classList.remove("dragging")
         element.removeEventListener("mousemove",onDrag,false)
    },false)

    /** to make the element resizable **/
    // $( "#-"+element.id ).resizable();
}
