(function(){
    
    var app = angular.module('Comutador',[]);
    
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
    
})();