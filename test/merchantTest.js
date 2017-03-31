// load Unit.js module
var test = require('unit.js');
var merchant = require("../globals/merchant.js");

describe('Galaxy Merchant', function(){

    //testa os metodos de atribuicao de contexto
    it('defining the context...', function(){
        //definindo o contexto de algarismos romanos
       (function() {
           merchant.translate("glob is I");
       }).should.not.throw();
       (function() {
            merchant.translate("prok is V");
       }).should.not.throw();
       (function() {
            merchant.translate("pish is X");
       }).should.not.throw();
       (function() {
            merchant.translate("tegj is L");
       }).should.not.throw();

       //definindo o contexto de creditos
       (function() {
            merchant.translate("glob glob Silver is 34 Credits");
       }).should.not.throw();
       (function() {
            merchant.translate("glob prok Gold is 57800 Credits");
       }).should.not.throw();
       (function() {
            merchant.translate("pish pish Iron is 3910 Credits");
       }).should.not.throw();
    });

    //testa os metodos de questionamento
    it("how much is pish tegj glob glob ?", function() {
        var result = merchant.translate("how much is pish tegj glob glob ?");
        test.string(result).is("pish tegj glob glob is 42");
    });
    it("how many Credits is glob prok Silver ?", function() {
        var result = merchant.translate("how many Credits is glob prok Silver ?");
        test.string(result).is("glob prok Silver is 68 Credits");
    });
    it("how many Credits is glob prok Gold ?", function() {
        var result = merchant.translate("how many Credits is glob prok Gold ?");
        test.string(result).is("glob prok Gold is 57800 Credits");
    });
    it("how many Credits is glob prok Iron ?", function() {
        var result = merchant.translate("how many Credits is glob prok Iron ?");
        test.string(result).is("glob prok Iron is 782 Credits");
    });
    it("how much wood could a woodchuck chuck if a woodchuck could chuck wood ?", function() {
       (function() {
            merchant.translate("how much wood could a woodchuck chuck if a woodchuck could chuck wood ?");
        }).should.throw();
    });
});