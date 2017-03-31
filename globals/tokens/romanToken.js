var _super = require("./_baseToken.js").prototype;
var method = RomanToken.prototype = Object.create( _super );

method.constructor = RomanToken;

function RomanToken() {
    _super.constructor.apply( this, arguments );
}

module.exports = RomanToken;