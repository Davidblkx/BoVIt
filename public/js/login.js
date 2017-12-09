/*global dhtmlx dpd*/
$(document).ready(function(){
    
    var callLogin = function(){
        var user = $("#txtUser").val();
        var pass = $("#txtPass").val();
        
        if(user == "" || user.length < 4){
            dhtmlx.message({type: "error", text:"Insira um Utilizador válido"});
            return;
        }
        
        if(pass == "" || pass.length < 6){
            dhtmlx.message({type: "error", text:"Insira uma Password válida"});
            return;
        }
        
        var logObj = {"username":user, "password":pass};
        
        dpd.people.login(logObj, function(user, err){
           if(err) return dhtmlx.message({type: "error", text:"Utilizador ou pass inválidos!"});
           window.location = "/";
        });
    };
    
    $("#btnRegister").click(function(){
        dhtmlx.message("De momento novas inscrições estão suspensas");
    });
    
    $("#btnLogin").click(callLogin);
    $("#txtPass").bind('keypress', function(e){
        if(e.keyCode === 13) callLogin();
    });
    $("#txtUser").bind('keypress', function(e){
        if(e.keyCode === 13) callLogin();
    });
    
});