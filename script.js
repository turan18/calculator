let counter = 0;
let test = 0;
function allEvents(){
    Array.from(document.querySelectorAll('.num')).forEach(button=>{
        button.addEventListener('click',function(){
            let value = document.createTextNode(String.fromCharCode(button.getAttribute("data-key")));
            if(String.fromCharCode(button.getAttribute("data-key"))==="."){            
                counter++;
            }
            if(test>0){
                document.querySelector('.sign').textContent = ''; document.querySelector('.display-ans').textContent = '';  
            }
            if(!(String.fromCharCode(button.getAttribute("data-key"))==="." && counter>1)){
                document.querySelector('.display-ans').appendChild(value);
            }
          
            test = 0;
        });
    });
    
    Array.from(document.querySelectorAll('.operator')).forEach(operation=>{
        operation.addEventListener('click',()=>{
            if(operation.getAttribute('id')=='sign'){
                let sign = (document.querySelector('.sign').textContent).replace(/\s/g, "");
                sign==='' ? document.querySelector('.sign').textContent = '-' : document.querySelector('.sign').textContent = ''
                
            }
            if(operation.getAttribute('id')=='divide'){
                display('÷')
                // display(String.fromCharCode(operation.getAttribute("data-key")));
    
            }
            if(operation.getAttribute('id')=='mult'){
                display('×')
                // display(String.fromCharCode(operation.getAttribute("data-key")));
               
            }
            if(operation.getAttribute('id')=='subtract'){
                display(String.fromCharCode(operation.getAttribute("data-key")));
    
            }
            if(operation.getAttribute('id')=='add'){
                display(String.fromCharCode(operation.getAttribute("data-key")));
    
            }
        })
    })
    
    
    Array.from(document.querySelectorAll('.misc')).forEach(element=>{
        element.addEventListener('click',()=>{
            if(element.getAttribute('id')==='del'){
                singledel();
            }
            if(element.getAttribute('id')==='clear'){
                clearall();
            }
            if(element.getAttribute('id')==='equal'){
                let finalequation = final();
                calculate(finalequation);
    
            }
    
        })
    })
}



function final(){
    let val = document.createTextNode((document.querySelector('.answer').textContent).replace(/\s/g, ""));
    let display = document.querySelector('.equation');
    display.appendChild(val);
    return (document.querySelector('.equation').textContent).replace(/\s/g, "");
}

function calculate(eq){
    console.log(eq)
}


function singledel(){
    let number = document.querySelector('.display-ans')
    try {
        number.removeChild(number.lastChild);    
    } catch (error) {
        //
    }
    
}

function clearall(){
    let number = document.querySelector('.display-ans')
    let sign = document.querySelector('.sign');
    let preview = document.querySelector('.equation');
    number.innerHTML = '';
    sign.textContent = '';
    preview.textContent='';
}

function display(op){
    let preview = document.querySelector('.equation');
    let number = (document.querySelector('.answer').textContent).replace(/\s/g, "");
    if(number.indexOf('.') + 1 === number.length){
        number = number.replace('.','')
    }
    if(number.charAt(0) === '.' && number.length>1){
        number = '0' + number;
    }
    if(number.charAt(0)==='0' && number.charAt(1)!=='.'){
        number = number.slice(1,number.legnth)
    }
    if(number.charAt(0) === '0' && number.charAt(1) === '0'){
        number = '';
    }
    let numtodisplay = document.createTextNode(' ' + number + ' ');
    let operatortodisplay = document.createTextNode(op + ' ');
    test++;//added to ensure that the number entered stays until another number after the operator is pressed
    
    if(number!=='' && number!=='-' && test<=1){
        preview.appendChild(numtodisplay);preview.appendChild(operatortodisplay)
    }
    if(test>1){
        preview.removeChild(preview.lastChild);preview.appendChild(operatortodisplay);
    }
    counter=0; 
}

