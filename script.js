
let buttons = Array.from(document.querySelectorAll('.num'));
const validKeys = [];
buttons.forEach(button=>{
    validKeys.push(button.getAttribute("data-key"));    
})

let counter = 0;
document.addEventListener('keydown',function(e){
    
    if(e.key==="."){
        counter++;
    }
    if(validKeys.includes(e.keyCode.toString())){
        let value = document.createTextNode(e.key);
        if(e.key==="." && counter>1){
            //
        }
        else{
            document.querySelector('.display-ans').appendChild(value);
        }
        
    }
})
buttons.forEach(button=>{
    button.addEventListener('click',function(){
        let value = document.createTextNode(String.fromCharCode(button.getAttribute("data-key")));
        if(String.fromCharCode(button.getAttribute("data-key"))==="."){
            
            counter++;
        
        }
        if(String.fromCharCode(button.getAttribute("data-key")) && counter>1){
            //
        }
        else{
            document.querySelector('.display-ans').appendChild(value);
        }
        
        
    });
});