var _super = require("./_baseToken.js").prototype;
var method = UnknownToken.prototype = Object.create( _super );

method.constructor = UnknownToken;

function UnknownToken() {
    _super.constructor.apply( this, arguments );
}

module.exports = UnknownToken;