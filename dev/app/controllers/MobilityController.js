(function() {

    var app = angular.module('Mobility', ['SelectCom', 'MobCom']);

    app.controller('MobilityController', ['$scope', '$http', function($scope, $http) {

        $http.get('comutador').success(function(data) {
            $scope.coms = data;
        });

        $scope.dn = "";
        $scope.extended = true;
        $scope.line = 'A01';

        $scope.orig = {
            tek: 'S12'
        };
        $scope.dest = {};

    }]);

})();