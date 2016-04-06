(function() {
    
    var app = angular.module('People', []);
    
    app.controller('PeopleController', ['$scope', '$http', function($scope, $http) {
        
        $http.get('people').success(function(data) {
            $scope.users = data;
        });

        $scope.saveUser = function(id, user, mail, isActive, role) {

            if (mail.length < 4) {
                dhtmlx.message("Erro: email inválido");
                return;
            }

            dpd.people.put(id, {
                "email": mail,
                "active": isActive,
                "role": role
            }, function(result, err) {
                if (err) {
                    dhtmlx.message("Erro ao actualizar user");
                    console.log(err);
                    return;
                }

                dhtmlx.message("Utilizador '" + result.username + "' actualizado com sucesso");
            });
        };
        
        $scope.deleteUser = function(id) {
            dpd.people.del(id, function(count, err) {
                if (err) {
                    dhtmlx.message("Erro ao eleminar user");
                    console.log(err);
                    return;
                }

                location.reload();

                dhtmlx.message("Utilizador eliminado com sucesso");
            });
        };
    }]);
    
    //New user directive
    app.directive("newUser", ['$http', function($http) {

        return {
            restrict: 'E',
            templateUrl: 'directives/newUser.directive.html',
            controller: function() {
                this.user = "";
                this.pass = "";
                this.email = "";

                this.addUser = function(user, mail, pass) {
                    console.log(user);
                    console.log(pass);
                    console.log(mail);
                    if (user == "" || user.length < 4) {
                        dhtmlx.message({
                            type: "error",
                            text: "O username é invalido"
                        });
                        return;
                    }
                    if (pass == "" || pass.length < 4) {
                        dhtmlx.message({
                            type: "error",
                            text: "A password é invalida"
                        });
                        return;
                    }
                    if (mail == "" || mail.length < 4) {
                        dhtmlx.message({
                            type: "error",
                            text: "O email é invalido"
                        });
                        return;
                    }

                    dpd.people.post({
                        username: user,
                        password: pass,
                        email: mail,
                        role: 50,
                        active: true
                    }, function(user, err) {
                        if (err) return dhtmlx.message(err);
                        location.reload();
                    });
                };
            },
            controllerAs: "newUser"
        }

    }]);

    //Change user password directive
    app.directive("changePass", ['$http', function($http) {

        return {
            restrict: 'E',
            templateUrl: 'directives/changePass.directive.html',
            controller: function() {

                this.setPass = function(pass1, pass2) {

                    if (pass1 == undefined || pass2 == undefined) {
                        dhtmlx.message("Preencha todos os campos");
                        return;
                    }

                    if (pass1.length < 6) {
                        dhtmlx.message("Pass inválida, demasiado pequena");
                        return;
                    }

                    if (pass1 !== pass2) {
                        dhtmlx.message("As passwords não coicidem!");
                        return;
                    }

                    dpd.people.me(function(user, err) {

                        if (err) {
                            dhtmlx.message("Erro ao verificar autenticação");
                            return;
                        }

                        dpd.people.put(user.id, {
                            "password": pass1
                        }, function(res, err) {

                            if (err) {
                                dhtmlx.message("Erro ao actualizar password");
                                return;
                            }

                            dhtmlx.message("A password foi actualizada");
                            location.reload();
                        });

                    });
                };
            },
            controllerAs: "pwd"
        }

    }]);
    
})();