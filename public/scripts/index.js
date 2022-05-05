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
        console.log("selectedElement",selectedElement)
        if(selectedElement != null || selectedElement != undefined){
            console.log("Create Element")
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
  e.preventDefault()  
  let element = e.target;
  let getStyle = window.getComputedStyle(element);
  let left = parseInt(getStyle.left)
  let top = parseInt(getStyle.top)
  element.style.left = `${left+e.movementX}px`
  element.style.top = `${top+e.movementY}px`
}

function makeResizable(element, minW = 100, minH = 100, size = 20)
{
    const top = document.createElement('div');
    top.style.width = '100%';
    top.style.height = size + 'px';
    top.style.backgroundColor = 'blue';
    top.style.position = 'absolute';
    top.style.top = - (size/2) + 'px';
    top.style.left = '0px';
    top.style.cursor = 'n-resize';

    top.addEventListener('mousedown',resizeYNegative())

    element.appendChild(top);

    const bottom = document.createElement('div');
    bottom.style.width = '100%';
    bottom.style.height = size + 'px';
    bottom.style.backgroundColor = 'blue';
    bottom.style.position = 'absolute';
    bottom.style.bottom = - (size/2) + 'px';
    bottom.style.left = '0px';
    bottom.style.cursor = 'n-resize';

    bottom.addEventListener('mousedown',resizeYPositive())

    element.appendChild(bottom);

    const left = document.createElement('div');
    left.style.width = size + 'px';
    left.style.height = '100%';
    left.style.backgroundColor = 'blue';
    left.style.position = 'absolute';
    left.style.top = '0px';
    left.style.left = - (size/2) + 'px';
    left.style.cursor = 'e-resize';

    left.addEventListener('mousedown',resizeXNegative())

    element.appendChild(left);

    const right = document.createElement('div');
    right.style.width = size + 'px';
    right.style.height = '100%';
    right.style.backgroundColor = 'blue';
    right.style.position = 'absolute';
    right.style.top = '0px';
    right.style.right = - (size/2) + 'px';
    right.style.cursor = 'e-resize';

    right.addEventListener('mousedown',resizeXPositive())

    element.appendChild(right);


    const corner1 = document.createElement('div');
    corner1.style.width = size + 'px';
    corner1.style.height = size + 'px';
    corner1.style.backgroundColor = 'blue';
    corner1.style.position = 'absolute';
    corner1.style.top = - (size/2) + 'px';
    corner1.style.left = - (size/2) + 'px';
    corner1.style.cursor = 'nw-resize';

    corner1.addEventListener('mousedown',resizeXNegative())
    corner1.addEventListener('mousedown',resizeYNegative())
    
    element.appendChild(corner1);

    const corner2 = document.createElement('div');
    corner2.style.width = size + 'px';
    corner2.style.height = size + 'px';
    corner2.style.backgroundColor = 'blue';
    corner2.style.position = 'absolute';
    corner2.style.top = - (size/2) + 'px';
    corner2.style.right = - (size/2) + 'px';
    corner2.style.cursor = 'ne-resize';

    corner2.addEventListener('mousedown',resizeXPositive())
    corner2.addEventListener('mousedown',resizeYNegative())

    element.appendChild(corner2);

    const corner3 = document.createElement('div');
    corner3.style.width = size + 'px';
    corner3.style.height = size + 'px';
    corner3.style.backgroundColor = 'blue';
    corner3.style.position = 'absolute';
    corner3.style.bottom = - (size/2) + 'px';
    corner3.style.left = - (size/2) + 'px';
    corner3.style.cursor = 'sw-resize';

    corner3.addEventListener('mousedown',resizeXNegative())
    corner3.addEventListener('mousedown',resizeYPositive())

    element.appendChild(corner3);

    const corner4 = document.createElement('div');
    corner4.style.width = size + 'px';
    corner4.style.height = size + 'px';
    corner4.style.backgroundColor = 'blue';
    corner4.style.position = 'absolute';
    corner4.style.bottom = - (size/2) + 'px';
    corner4.style.right = - (size/2) + 'px';
    corner4.style.cursor = 'se-resize';

    corner4.addEventListener('mousedown',resizeXPositive())
    corner4.addEventListener('mousedown',resizeYPositive())

    element.appendChild(corner4);
    
    function get_int_style(key)
    {
        return parseInt(window.getComputedStyle(element).getPropertyValue(key));
    }

    function resizeXPositive()
    {
        let offsetX
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientX} = e;
            offsetX = clientX - element.offsetLeft - get_int_style('width');
            document.addEventListener('mouseup', closeDragElement)
            document.addEventListener('mousemove', elementDrag)
          }
        
          function elementDrag(e) {
                const {clientX} = e;
                let x = clientX - element.offsetLeft - offsetX
                if(x < minW) x = minW;
                element.style.width =  x + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }

    function resizeYPositive()
    {
        let offsetY
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientY} = e;
            offsetY = clientY - element.offsetTop - get_int_style('height');
    
            document.addEventListener('mouseup',closeDragElement)
            document.addEventListener('mousemove',elementDrag)
          }
        
          function elementDrag(e) {
                const {clientY} = e;
                let y =  clientY - element.offsetTop - offsetY;
                if(y < minH) y = minH;
                element.style.height = y + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }

    function resizeXNegative()
    {
        let offsetX
        let startX
        let startW
        let maxX
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientX} = e;
            startX = get_int_style('left')
            startW = get_int_style('width')
            offsetX = clientX - startX;
            maxX = startX + startW - minW
    
            document.addEventListener('mouseup',closeDragElement)
            document.addEventListener('mousemove',elementDrag)
          }
        
          function elementDrag(e) {
                const {clientX} = e;
                let x = clientX - offsetX
                let w = startW + startX - x
                if(w < minW) w = minW;
                if(x > maxX) x = maxX;
                element.style.left = x + 'px';
                element.style.width = w + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }

    function resizeYNegative()
    {
        let offsetY
        let startY
        let startH
        let maxY
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientY} = e;
            startY = get_int_style('top')
            startH = get_int_style('height')
            offsetY = clientY - startY;
            maxY = startY + startH - minH 
    
            document.addEventListener('mouseup',closeDragElement,false)
            document.addEventListener('mousemove',elementDrag,false)
          }
        
          function elementDrag(e) {
                const {clientY} = e;
                let y =  clientY - offsetY
                let h = startH + startY - y
                if(h < minH) h = minH;
                if(y > maxY) y = maxY;
                element.style.top = y + 'px';
                element.style.height = h + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }
}


function appendElement(elementType){
    let element = createElement(elementType);
    element.className = element.className + " class-"+classCounter
    element.id = "identification-"+(classCounter++)
    element.style.position = "relative"
    canvas.appendChild(element);
    /** to make the element draggable **/
    element.addEventListener("mousedown",()=>{
       element.classList.add("dragging")
       element.addEventListener("mousemove",onDrag,false)
       makeResizable(element,10,10)
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




function createElement(elementType){
 let element;
 if(elementType === "Text"){
     element = document.createElement("text")
     element.innerText = "Normal Text"
 }

 if(elementType === "Button"){
     element = document.createElement("button")
     element.innerText = "Click Me"
 }

 if(elementType === "Link"){
     element = document.createElement("a")
     element.href = "#"
     element.innerText = "Click me to open."
 }

 if(elementType === "Image"){
     element = document.createElement("div")
     element.className = "imageContainer"
     let img = document.createElement('img')
     img.src = "https://picsum.photos/200/301";
     img.className = "customImage"
     element.appendChild(img)
 }

 if(elementType === "Video"){
     element = document.createElement("video")
    // 👇️ Local file
    // video.src = 'video.mp4';

    // 👇️ Remote file
    element.src =
    'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';

    element.poster =
    'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217';

    element.autoplay = false;
    element.controls = true;
    element.muted = false;
    element.height = 240; // 👈️ in px
    element.width = 320; // 👈️ in px
}

return element;
}
