
/*global LOAD_LIVERELOAD dpd dhtmlx*/
if(LOAD_LIVERELOAD){
    
    //WRITE LIVERELOAD SCRIPT
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
        ':35729/livereload.js"></' + 'script>');
}

(function(){
    var loc = window.location.pathname;

    if(loc === "/login.html"){
        var query = {"username":"admin"};

        dpd.people.me(function(result, error){
            if(result != ""){
                window.location = "/";
            }
        });

        dpd.people.get(query, function (result) {
            console.log(result);
            if(result.length === 0){
                var us = {
                    username: "admin",
                    password: "qwerty",
                    role: 100,
                    active: true,
                    email: "davidblkx@outlook.com"
                };

                dpd.people.post(us, function(user, err) {
                    if(err) return dhtmlx.alert(err);
                    console.log("admin user created", user);
                });
            }
        });
    }
    else{
        dpd.people.me(function(result, error){
            if(result == ""){
                window.location = "/login.html";
            }
        })
    }
})();