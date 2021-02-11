class Token{
    constructor(type,value,precedence){
        this.type = type;
        this.value = value;
        this.precedence = precedence;
    }
}

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

function parser(tokens){ // Return reverse polish notation of expression. Computes left most as calculator, for now, does not account for special precedence IE parenthses
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