/**
 * @param param valor alfanumerico representando valores romanos
 */
module.exports.romanToNumeral = function(param){
    var result = 0;

    //tabela de probalidades
    var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    for (var i = 0; i < decimal.length; i++) {
        while (param.indexOf(roman[i]) === 0) {
            result += decimal[i];
            param = param.replace(roman[i], "");
        }
    };
    
    return result;
};