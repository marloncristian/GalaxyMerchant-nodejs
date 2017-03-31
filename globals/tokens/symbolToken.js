var _super = require("./_baseToken.js").prototype;
var method = SymbolToken.prototype = Object.create( _super );

method.constructor = SymbolToken;

function SymbolToken() {
    _super.constructor.apply( this, arguments );
}

module.exports = SymbolToken;