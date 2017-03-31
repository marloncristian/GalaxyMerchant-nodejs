//classe base para token
var method = Token.prototype;

/**
 * @param expression 
 */
function Token(expression) {
    this._expression = expression;
}

/**
 * retorna a expressao original
 */
method.getExpression = function() {
    return this._expression;
};

//exporta o objeto token
module.exports = Token;