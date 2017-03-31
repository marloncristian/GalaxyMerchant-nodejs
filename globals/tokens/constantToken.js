var _super = require("./_baseToken.js").prototype;
var method = ConstantToken.prototype = Object.create( _super );

method.constructor = ConstantToken;

function ConstantToken() {
    _super.constructor.apply( this, arguments );
}

module.exports = ConstantToken;