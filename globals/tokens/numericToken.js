var _super = require("./_baseToken.js").prototype;
var method = NumericToken.prototype = Object.create( _super );

method.constructor = NumericToken;

function NumericToken() {
    _super.constructor.apply( this, arguments );
}

/**
 * retorna a expressao original
 */
method.getValue = function() {
    return parseInt(this._expression);
};

module.exports = NumericToken;