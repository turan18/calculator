class Token{
    constructor(type,value,precedence){
        this.type = type;
        this.value = value;
        this.precedence = precedence;
    }
}
// class Node{
//     constructor(value){
//         this.value = value;
//         this.leftChild = null;
//         this.rightChild = null;
//     }
// }
// class astTree{
    
//     constructor(){
//         this.root = null;
//     }
//     insert(val){
//         let bfsQueue = [];
//         let node = new Node(val);
//         if(this.root === null){
//             this.root = node;
//             return this;
//         }
//        ;
//         let root = this.root;
//         bfsQueue.push(root);

//         while(bfsQueue.length > 0){
//             let current = bfsQueue.shift()
            
//             if(current.leftChild === null){
//                 current.leftChild = node;
//             }
//             else if(current.rightChild === null){
//                 current.rightChild = node;
//             }
            
//             else if(current.leftChild !== null || current.rightChild !== null){
//                 if(isNaN(current.leftChild.value)){             /// IF the current is an operator start searching left, assuming that the right ends because it is a literal(number)
//                     bfsQueue.push(current.leftChild)
//                 }
//                 else{
//                     bfsQueue.push(current.rightChild)
//                 }
//             }
//         }
//         return this;

//     }    
// }

function tokenizer(expression){ // returns an array of Tokens each with a type(operator or operand), value, and precendence
    let tokens = [];
    for (let i = 0; i < expression.length; i++) {
        let token = expression[i];
        if(!isNaN(token)){
            tokens.push(new Token('literal',token,null))
        }   
        else if(token==='+'){
            tokens.push(new Token('operator','+',1))
        }
        else if(token==='-'){
            tokens.push(new Token('operator','-',1))
        }
        else if(token==='×'){
            tokens.push(new Token('operator','*',2))
        }
        else if(token==='÷'){
            tokens.push(new Token('operator','/',2))
        }
    };
    return tokens;
}

function rpnParser(tokens){ // Return reverse polish notation of expression. Computes left most as calculator, for now, does not account for special precedence IE parenthses
    let outputQueue = [];
    let operatorStack = [];
    for(let i = 0; i < tokens.length; i++){
        let token = tokens[i];

        if(token.type === 'literal'){
            outputQueue.push(token.value);
        }
        else if(token.type === 'operator'){
            if(operatorStack.length > 0 && (operatorStack[operatorStack.length -1].precedence > token.precedence ||  operatorStack[operatorStack.length -1].precedence == token.precedence)){
                
                outputQueue.push(operatorStack[operatorStack.length - 1].value)
                operatorStack.pop()
                operatorStack.push(token)
            }
            else{
                operatorStack.push(token);
            }
        }
        if(i == tokens.length - 1){
            for(let j = operatorStack.length -1; j>=0; j--){
                outputQueue.push(operatorStack[j].value)
            }
        }
    }
   return outputQueue;
}

function compute(rpn){
    console.log(rpn)
    let value;
    for(let i=0;i<rpn.length;i++){
        
        let current = rpn[i];
        console.log('This is i: ' + i)
        console.log('This is the current: ' + current)
        console.log('________________________')
        
        if(current === '*'){
            value = parseFloat(rpn[i-2]) * parseFloat(rpn[i-1]);
            rpn.splice(i-2,3,value)
            i=-1;
        }
        else if(current === '/'){
            value = parseFloat(rpn[i-2]) / parseFloat(rpn[i-1]);
            rpn.splice(i-2,3,value)
            i=-1;
        }
        else if(current === '-'){
            value = parseFloat(rpn[i-2]) - parseFloat(rpn[i-1]);
            rpn.splice(i-2,3,value)
            i=-1;
        }
        else if(current === '+'){
            value = parseFloat(rpn[i-2]) + parseFloat(rpn[i-1]);
            rpn.splice(i-2,3,value)
            i=-1;
        }
            
    }
    let answer = rpn.pop();
    if(answer % 1 === 0){
        return answer
    }


    return answer.toFixed(5);
}

