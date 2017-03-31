//tabelas
var constantsTable = require("./tables/constantTable.js");
var metalTable = require("./tables/metalTable.js");
var romanTable = require("./tables/romanTable.js");
var symbolTable = require("./tables/symbolTable.js");

//tokens
var ConstantToken = require("./Tokens/constantToken.js");
var MetalToken = require("./Tokens/metalToken.js");
var NumericToken = require("./Tokens/numericToken.js");
var RomanToken = require("./Tokens/romanToken.js");
var SymbolToken = require("./Tokens/symbolToken.js");
var UnknownToken = require("./Tokens/unknownToken.js");

/**
 * Decompila uma determinada expressao
 * @param expression expressao a ser decompilada
 */
module.exports.decompile = function(expression) {
    var unsolved_tokens = expression.trim().split(" ");

    var result = [];

    //verificacao por constantes
    unsolved_tokens.forEach(function(element) {

        //filtro de constantes
        if (constantsTable[element.toLowerCase()]){
            result.push(new ConstantToken(element));
        }
        
        //filtro de algarismos romanos
        else if (romanTable[element.toLowerCase()]) {
            result.push(new RomanToken(element));
        }
        
        //filtro de cambio
        else if (metalTable[element.toLowerCase()]) {
            result.push(new MetalToken(element));
        }
        
        //filtro de numeros
        else if (!isNaN(parseInt(element))) {
            result.push(new NumericToken(element));
        }

        //filtro de simbolos
        else if (symbolTable[element.toLowerCase()]) {
            result.push(new SymbolToken(element));
        }

        //falha em todas as regras anteriores
        else {
            result.push(new UnknownToken(element));
        }
        
    }, this);

    return result;
};
