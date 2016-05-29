(function(){
    
    var app = angular.module('Results', ['ngSanitize', 'ui.select']);
    
    app.directive("resultCell", ['$http', '$q', function($http, $q) {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/result-cell.directive.html",
            scope: {
                title: '<',
                total: '<',
                val: '<',
                obj: '<',
                small: '<',
                abs: '<'
            },
            controller: function($scope) {
                
                if($scope.small == undefined)
                    $scope.small = false;
                    
                if($scope.abs == undefined)
                    $scope.abs = false;
                
                $scope.showFull = false;
                
                $scope.calcPerc = function(item, iTotal){
                    if(iTotal  == 0) return 0;
                    var res = item/iTotal;
                    if($scope.abs) return res.toPrecision(2);
                    return (res * 100).toPrecision(4);
                };
                
                $scope.calcObj = function(item, iTotal, obj){
                    var mod = 0;
                    
                    if($scope.validate(item, iTotal, obj)){
                        
                        while (mod < 5000) {
                            mod++
                            
                            var total = $scope.abs ? iTotal : iTotal + mod;
                            var val = $scope.small ? mod : 0;
                            
                            if(!$scope.validate(item + val, total, obj))
                                return Math.abs(mod-1);
                        }
                    }
                    
                    while(mod < 5000){
                        
                        var total = $scope.abs ? iTotal : iTotal + Math.abs(mod);
                        
                        if($scope.validate(item + mod, total, obj))
                            return Math.abs(mod);
                        
                        if($scope.small) mod--;
                        else mod++;
                    }
                };
                
                $scope.validate = function(item, iTotal, obj){
                    
                    var perc = parseFloat($scope.calcPerc(item, iTotal));
                    iTotal = parseFloat(iTotal);
                    var t = 100.0;
                    
                    if($scope.small)
                        return perc < obj;
                        
                    var status = perc >= obj;
                    return status;
                };
            },
            controllerAs: "com"
        };
    }]);
    
    app.directive("solCollect", ['$http', '$q', function($http, $q) {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/sol-collect.directive.html",
            scope: {
                title: '<',
                source: '=',
                control: '='
            },
            controller: function($scope) {
                if(!$scope.control) $scope.control = 1;
                
                $scope.push = function(item){
                    $scope.source.push({val:item});
                }
                
                $scope.pop = function(){
                    $scope.source.pop();
                }
                
                $scope.calcNextVal = function(val){
                    switch (val) {
                        case 'FOT':
                            return 'BOT';
                            
                        case 'BOT':
                            return 'FF';
                                                
                        default:
                            return 'FOT';
                    }
                }
                
                
                $scope.$watch('source', function(newVal, oldval){
                    $scope.control++;
                }, true);
            },
            controllerAs: "com"
        };
    }]);
    
})();