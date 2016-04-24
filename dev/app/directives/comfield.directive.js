(function() {

    var app = angular.module('Field', []);

    app.directive("comField", ['$http', '$q', function($http, $q) {



        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/comfield.directive.html",
            scope: {
                value: '<',
                showPortal: '<'
            },
            controller: function($scope) {
                
                $scope.copyReady = false;
                $scope.copyValue = '';
                
                $scope.copy = function(value) {
                    
                    var elem = document.createElement('input');
                    elem.setAttribute("type", 'text');
                    elem.setAttribute("value", value);
                    elem.setAttribute("id", "copyTXT");
                    
                    document.getElementsByTagName('body')[0].appendChild(elem);
                    document.querySelector('#copyTXT').select();
                    document.execCommand('copy')
                    document.getElementsByTagName('body')[0].removeChild(elem);
                    
                };
                
                $scope.getShort = function(value){
                    value = value.substring(4);
                    var ind = value.search(/([0-9])/)
                    
                    if(ind != -1){
                        value = value.substring(ind);
                    }
                    
                    return value;
                };
                
                $scope.get = function(val){
                    if(val[val.length-1] != ';')
                        val+=';';
                    
                    return val;
                };
            },
            controllerAs: "com"
        };
    }]);

})();