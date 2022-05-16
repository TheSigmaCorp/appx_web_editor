export default function openProperties(element){
    element.addEventListener("contextmenu",function(e){
       console.log("Right Clicked !")
       e.preventDefault();
    },false)
}