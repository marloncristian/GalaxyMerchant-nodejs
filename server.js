var express = require("express");
var path = require("path");
var merchant = require("./globals/merchant.js");

var port = 9000;
var app = express();

app.listen(port, function () {

    try{
        //definindo contexto
        merchant.translate("glob is I");
        merchant.translate("prok is V");
        merchant.translate("pish is X");
        merchant.translate("tegj is L");
        merchant.translate("glob glob Silver is 34 Credits");
        merchant.translate("glob prok Gold is 57800 Credits");
        merchant.translate("pish pish Iron is 3910 Credits");

        //perguntando
        console.log(merchant.translate("how much is pish tegj glob glob ?"));
        console.log(merchant.translate("how many Credits is glob prok Silver ?"));
        console.log(merchant.translate("how many Credits is glob prok Gold ?"));
        console.log(merchant.translate("how many Credits is glob prok Iron ?"));

        //exception 
        merchant.translate("how much wood could a woodchuck chuck if a woodchuck could chuck wood ?");
    }
    catch(err){
        console.log(err);
    }

});