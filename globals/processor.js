
//tokens
var ConstantToken = require("./Tokens/constantToken.js");
var MetalToken = require("./Tokens/metalToken.js");
var NumericToken = require("./Tokens/numericToken.js");
var RomanToken = require("./Tokens/romanToken.js");
var SymbolToken = require("./Tokens/symbolToken.js");
var UnknownToken = require("./Tokens/unknownToken.js");

var calculator = require("./calculator.js");

/**
 * Decompila uma determinada expressao
 * @param expression expressao a ser decompilada
 */
module.exports.process = function(context, decompiled){

    //registra um metodo processador sintatico ultra "simplificado" usando regex 
    //para cada possibilidade de input
    var functionRedirect = [
       { regex : "^({symboltoken})(is)({romantoken})$", delegate : processSimpleSymbolDefinition },
       { regex : "^({symboltoken})+({metaltoken})(is)({numerictoken})(credits)$", delegate : processSimpleCreditDefinition },
       { regex : "^(how)(much)(is)({symboltoken})+\\?$", delegate : processSimpleSymbolsRequest },
       { regex : "^(how)(many)(credits)(is)({symboltoken})+({metaltoken})\\?$", delegate : processSimpleCreditRequest }
    ];

    //gera uma string de reprensentacao 
    var regexRepresentation = generateRepresentation(decompiled);

    //retorna o primeiro metodo capaz de processar a string
    var redirect = functionRedirect.find(function(element){
        if (regexRepresentation.match(element.regex)){
            return true;
        }
    });

    //se nao houver nenhum delegate para este regex levanta exception
    if (!redirect) throw "I have no idea what you are talking about";
    
    //executa o metodo concreto de cada probabilidade aceitavel
    return redirect.delegate.call(context, decompiled);
};

/**
 * Gera uma representacao alfanumerica do conjunto de instrucoes
 * @param decompiled 
 */
var generateRepresentation = function(decompiled){
    var result = "";
    decompiled.forEach(function(element) {
        if (element instanceof ConstantToken)
            result += element.getExpression();
        else 
            result += "{" + element.constructor.name + "}";
    }, this);
    return result.toLowerCase();
};

/**
 * Executa o processamento de atribuicao de valores ao simbolo
 */
var processSimpleSymbolDefinition = function (decompiled) {
    this.romanEquivalence[decompiled[0].getExpression()] = decompiled[2].getExpression();
};

/**
 * Executa o processamento de atribuicao de valores ao credito
 */
var processSimpleCreditDefinition = function (decompiled) {
    var factor1 = "";
    var factor2 = "";
    var product = 0;
    for (var i = 0; i < decompiled.length; i++){
        //acumula os simbolos
        if (decompiled[i] instanceof SymbolToken){
            if (!this.romanEquivalence[decompiled[i].getExpression()])
                throw "I dont have enough information about " + decompiled[i].getExpression();
            factor1 += this.romanEquivalence[decompiled[i].getExpression()];
        }
        //armazena o metal
        else if (decompiled[i] instanceof MetalToken)
            factor2 = decompiled[i].getExpression();
        //armazena o valor numerico
        else if (decompiled[i] instanceof NumericToken)
            product += decompiled[i].getValue();
    }
    this.metalValue[factor2] = product / calculator.romanToNumeral(factor1);
};

/**
 * Retorna a resposta a requisicao de processamento de simbolos simples
 */
var processSimpleSymbolsRequest = function (decompiled) {
    var factor = "";
    var responseElements = [];
    for (var i = 0; i < decompiled.length; i++){
        //acumula os simbolos
        if (decompiled[i] instanceof SymbolToken){
            if (!this.romanEquivalence[decompiled[i].getExpression()])
                throw "I dont have enough information about " + decompiled[i].getExpression();
            factor += this.romanEquivalence[decompiled[i].getExpression()];
            responseElements.push(decompiled[i].getExpression());
        }
    };
    var result = calculator.romanToNumeral(factor);

    responseElements.push("is");
    responseElements.push(result);
    return responseElements.join(" ");
};

/**
 * Retorna a resposta a requisicao de processamentode creditos
 */
var processSimpleCreditRequest = function (decompiled) {
    var factor1 = "";
    var factor2 = "";
    var responseElements = [];
    for (var i = 0; i < decompiled.length; i++){
        //acumula os simbolos
        if (decompiled[i] instanceof SymbolToken){
            if (!this.romanEquivalence[decompiled[i].getExpression()])
                throw "I dont have enough information about " + decompiled[i].getExpression();
            factor1 += this.romanEquivalence[decompiled[i].getExpression()];
            responseElements.push(decompiled[i].getExpression());
        }
        //armazena o metal
        else if (decompiled[i] instanceof MetalToken){
            factor2 = decompiled[i].getExpression();
            responseElements.push(decompiled[i].getExpression());
        }
    };
    
    if (!this.metalValue[factor2])
        throw "I dont have enough information about " + factor2;
        
    var result = calculator.romanToNumeral(factor1) * this.metalValue[factor2];

    responseElements.push("is");
    responseElements.push(result);
    responseElements.push("Credits");
    return responseElements.join(" ");
};