


let counter = 0;
Array.from(document.querySelectorAll('.num')).forEach(button=>{
    button.addEventListener('click',function(){
        let value = document.createTextNode(String.fromCharCode(button.getAttribute("data-key")));
        if(String.fromCharCode(button.getAttribute("data-key"))==="."){            
            counter++;
        }
        if(!(String.fromCharCode(button.getAttribute("data-key"))==="." && counter>1)){
            document.querySelector('.display-ans').appendChild(value);
        }
    });
});

Array.from(document.querySelectorAll('.operator')).forEach(operation=>{
    operation.addEventListener('click',()=>{
        if(operation.getAttribute('id')=='sign'){
            let sign = (document.querySelector('.sign').textContent).replace(/\s/g, "");
            if(sign===''){
                document.querySelector('.sign').textContent = '-'
            }
            else{
                document.querySelector('.sign').textContent = ''
            }
        }
        if(operation.getAttribute('id')=='divide'){
            display(String.fromCharCode(operation.getAttribute("data-key")));

        }
        if(operation.getAttribute('id')=='mult'){
            display(String.fromCharCode(operation.getAttribute("data-key")));
           
        }
        if(operation.getAttribute('id')=='subtract'){
            display(String.fromCharCode(operation.getAttribute("data-key")));

        }
        if(operation.getAttribute('id')=='add'){
            display(String.fromCharCode(operation.getAttribute("data-key")));

        }
    })
})
function display(op){
    let number = (document.querySelector('.answer').textContent).replace(/\s/g, "");
    if(number.indexOf('.') + 1 === number.length){
        number = number.replace('.','')
    }
    let dispreview = document.createTextNode(number + op);
    document.querySelector('.sign').textContent = ''; document.querySelector('.display-ans').textContent = '';  
    if(number!==''){
        document.querySelector('.equation').appendChild(dispreview);
    }
    counter=0; 
}

