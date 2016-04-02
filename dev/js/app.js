(function() {

    var app = angular.module('gambleStats', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/orig',
                templateUrl: 'templates/template-home.html',
                controller: 'HomeController'
            })

        .when('/users', {
            templateUrl: 'templates/template-users.html',
            controller: 'PeopleController'
        })

        .when('/orig', {
            templateUrl: 'templates/template-orig.html',
            controller: 'OrigController'
        })

        .when('/com', {
            templateUrl: 'templates/template-com.html',
            controller: 'ComController'
        })
        
        .when('/isp',{
            templateUrl: 'templates/template-isp.html',
            controller: 'IspController'
        });
    });

    //user controller
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

    app.controller('HomeController', ['$scope', '$http', function($scope, $http) {
        $scope.message = "This is a test";
    }]);

    app.controller('OrigController', ['$scope', '$sce', function($scope, $sce) {
        $scope.num = "";
        $scope.getLink = function(num) {
            return $sce.trustAsResourceUrl("http://portal-domf.telecom.pt/dop/stc3/equipamentos/mainP.asp?txtNa=" + num);
        };
    }]);

    app.controller('ComController', ['$scope', '$http', function($scope, $http) {
        $http.get('comutador').success(function(data) {
            $scope.coms = data;
        });

        $scope.search = "";

        $scope.getQuery = function(obj) {
            var q = " ";

            q += obj.code;
            q += obj.name.toLowerCase();
            q += obj.tek.toLowerCase();
            q += obj.ent.toLowerCase();
            if(obj.obs)
                q += obj.obs.toLowerCase();

            return q;
        };
    }]);
    
    app.controller('IspController', ['$scope', '$http', function($scope, $http){
        $http.get('isp').success(function(data) {
            $scope.isps = data;
        });
    }]);


    //Topbar MENU
    app.directive("topMenu", ['$http', '$q', function($http, $q) {

        var directiveData,
            dataPromise;

        function loadData() {
            if (dataPromise) {
                return dataPromise;
            }

            var deferred = $q.defer();
            dataPromise = deferred.promise;
            if (directiveData) {
                //if we already have data, return that.
                deferred.resolve(directiveData);
            } else {
                $http.get('/people/me')
                    .success(function(data) {
                        directiveData = data;
                        deferred.resolve(directiveData);
                    })
                    .error(function() {
                        deferred.reject('Failed to load data');
                    });
            }
            return dataPromise;
        };

        return {
            restrict: 'E',
            templateUrl: "directives/top-menu.html",
            scope: false,
            controller: function() {

                this.logout = function() {
                    dpd.people.logout(function() {
                        window.location = "/";
                    });
                };

            },
            controllerAs: "nav",
            link: function(scope) {
                loadData().then(function(data) {
                    scope.user = data;
                });
            }
        };
    }]);

    //New user directive
    app.directive("newUser", ['$http', function($http) {

        return {
            restrict: 'E',
            templateUrl: 'directives/new-user.html',
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
            templateUrl: 'directives/new-pass.html',
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