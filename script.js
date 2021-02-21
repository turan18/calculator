
let allNumbers = Array.from(document.querySelectorAll('.num'));
let allOperators = Array.from(document.querySelectorAll('.operator'));
let miscalenousButtons = Array.from(document.querySelectorAll('.misc'));

let entireExpression = document.querySelector('.answer');//the entire expression

let sign = document.querySelector('.sign');//sign of the number
let displayAnswer = document.querySelector('.display-ans');//just the number without the sign

let previewExpression = document.querySelector('.equation');


let counter = 0;//make sure user cant enter more than one decimal
let equalPressed = 0; //make sure user cant enter equal more than once
let test = 0;//make sure entered number stays in the top bar after operator button is pressed

function allEvents(){
    allNumbers.forEach(button=>{ //Add a listner to each number
        button.addEventListener('click',function(){
            let value = document.createTextNode(String.fromCharCode(button.getAttribute("data-key")));
            if(String.fromCharCode(button.getAttribute("data-key"))==="."){            
                counter++;
            }
            if(test>0){
                sign.textContent = ''; displayAnswer.textContent = '';  
            }
            if(!(String.fromCharCode(button.getAttribute("data-key"))==="." && counter>1)){
                displayAnswer.appendChild(value);
            }
            equalPressed = 0; // reset equal everytime a number is pressed so user can press equal
            test = 0;
        });
    });
    
    allOperators.forEach(operation=>{ //ADD a listener for each operation
        operation.addEventListener('click',()=>{
            
            if(operation.getAttribute('id')=='sign'){
                let signNoSpace = (sign.textContent).replace(/\s/g, "");
                signNoSpace ==='' ? sign.textContent = '-' : sign.textContent = ''
                
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
    
    
    miscalenousButtons.forEach(element=>{
        element.addEventListener('click',()=>{
            if(element.getAttribute('id')==='del'){
                singledel();
            }
            if(element.getAttribute('id')==='clear'){
                clearall();
            }
            if(element.getAttribute('id')==='equal'){
                equalPressed++;
                if(equalPressed <= 1){
                    let finalequation = final();
                    calculate(finalequation);
                }   
            }
        })
    })
}



function final(){ // Push the last value entered into the preview area and return the final expression
    let val = document.createTextNode((entireExpression.textContent).replace(/\s/g, ""));
    previewExpression.appendChild(val);
    return previewExpression.textContent;
}

function calculate(eq){
    let expression = eq.split(' ');
    let answer = document.createTextNode(compute(rpnParser(tokenizer(expression))));
    displayAnswer.innerHTML = '';sign.textContent = '';
    displayAnswer.appendChild(answer);
}

function singledel(){
    displayAnswer.removeChild(displayAnswer.lastChild);    
}

function clearall(){
    displayAnswer.innerHTML = '';
    sign.textContent = '';
    previewExpression.textContent='';
}

function display(op){
    
    let number = (entireExpression.textContent).replace(/\s/g, "");

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
    let numtodisplay = document.createTextNode(number + ' ');
    let operatortodisplay = document.createTextNode(op + ' ');
    test++;//added to ensure that the number entered stays until another number after the operator is pressed
    
    if(number!=='' && number!=='-' && test<=1 && equalPressed === 0){
        previewExpression.appendChild(numtodisplay);previewExpression.appendChild(operatortodisplay)
    }
    else if(equalPressed >= 1){ 
        previewExpression.innerHTML = '';
        previewExpression.appendChild(numtodisplay);previewExpression.appendChild(operatortodisplay)

    }
    if(test>1){ 
        previewExpression.removeChild(previewExpression.lastChild);previewExpression.appendChild(operatortodisplay);
    }
    counter=0; 
}

