(function(){
    
    var app = angular.module('SelectCom', ['ngSanitize', 'ui.select']);
    
    app.directive("comSelect", ['$http', '$q', function($http, $q) {

        

        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/comselect.directive.html",
            scope: {
                com: '=',
                full: '='
            },
            controller: function($scope) {
                
                $scope.getName = function(c){
                    return c.ent + ($scope.full ? ' - [' + c.name + ']' : '');
                };
                
                $http.get('comutador').success(function(data) {
                    $scope.coms = data;
                    $scope.com = data[0];
                });
                
                $scope.refresh = function(c){
                    console.log(c);
                };
            },
            controllerAs: "com"
        };
    }]);
    
})();