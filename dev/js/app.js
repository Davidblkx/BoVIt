(function() {

    var app = angular.module('bovit', ['ngRoute', 'People', 'Origin', 'Comutador', 'Isp', 'Function', 'Menu', 'Mobility', 'Horario']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/orig',
                templateUrl: 'controllers/home.controller.html',
                controller: 'HomeController'
            })

        .when('/users', {
            templateUrl: 'controllers/people.controller.html',
            controller: 'PeopleController'
        })

        .when('/orig', {
            templateUrl: 'controllers/origin.controller.html',
            controller: 'OriginController'
        })

        .when('/com', {
            templateUrl: 'controllers/com.controller.html',
            controller: 'ComController'
        })
        
        .when('/isp',{
            templateUrl: 'controllers/isp.controller.html',
            controller: 'IspController'
        })
        
        .when('/func', {
            templateUrl: 'controllers/functions.controller.html',
            controller: 'FunctionController'
        })
        
        .when('/mob', {
            templateUrl: 'controllers/mobility.controller.html',
            controller: 'MobilityController'
        }) 
        
        .when('/horario', {
            templateUrl: 'controllers/horario.controller.html',
            controller: 'HorarioController'
        });
    });

    app.controller('HomeController', ['$scope', '$http', function($scope, $http) {
        $scope.message = "This is a test";
    }]);

})();