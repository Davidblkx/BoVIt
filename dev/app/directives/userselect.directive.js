(function(){
    
    var app = angular.module('UserSelect', ['ngSanitize', 'ui.select']);
    
    app.directive("userSelect", ['$http', '$q', function($http, $q) {

        

        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/userselect.directive.html",
            scope: {
                user: '='
            },
            controller: function($scope) {
                
                $scope.users = [];
                
                dpd.people.get({function: 'user'}, function (res, error) {
                    $scope.users = res;
                    $scope.user = res[0];
                    $scope.$apply();
                });
                
            },
            controllerAs: "com"
        };
    }]);
    
})();