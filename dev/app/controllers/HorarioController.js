(function(){
    
    var app = angular.module('Horario', ['Calendar', 'UserSelect']);
    
    app.controller('HorarioController', ['$scope', '$http', function($scope, $http){
        
        $scope.edit = true;
        $scope.user = 'XKESP32';
        
        var now = moment();
        
        $scope.day = now.date() + 1;
        $scope.month = now.month() + 1;
        $scope.year = now.year();
        
    }]);
    
})();
