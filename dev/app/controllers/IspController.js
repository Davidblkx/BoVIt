(function() {

    var app = angular.module('Isp', []);

    app.controller('IspController', ['$scope', '$http', function($scope, $http) {
        $http.get('isp').success(function(data) {
            $scope.isps = data;
        });
    }]);

})();