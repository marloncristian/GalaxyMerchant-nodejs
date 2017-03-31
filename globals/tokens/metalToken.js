var _super = require("./_baseToken.js").prototype;
var method = MetalToken.prototype = Object.create( _super );

method.constructor = MetalToken;

function MetalToken() {
    _super.constructor.apply( this, arguments );
}

module.exports = MetalToken;