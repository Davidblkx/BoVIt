(function(){
    
    var app = angular.module('Origin', []);
    
    app.controller('OriginController', ['$scope', '$sce', function($scope, $sce) {
        $scope.num = "";
        $scope.getLink = function(num) {
            return $sce.trustAsResourceUrl("http://portal-domf.telecom.pt/dop/stc3/equipamentos/mainP.asp?txtNa=" + num);
        };
    }]);
    
})();