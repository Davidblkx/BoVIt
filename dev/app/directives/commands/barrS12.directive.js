(function() {

    var app = angular.module('BarrS12', []);

    app.directive('barrS12', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'directives/barrS12.directive.html',
            scope: {
                tek: '=',
                cmd: '=',
                rcmd: '=',
                ocbp: '=',
                ocbpValue: '=',
                ocbuc: '=',
                ocbucPin: '=',
                icbp: '=',
                acb: '=',
                acbValue: '='
            },
            controller: function($scope) {
                
                this.setCmd = function(tek, ocbp, ocbpValue, ocbuc, ocbucPin, acb, acbValue, icbp){
                    if(!tek || tek != 'S12'){
                        return;
                    }
                    
                    var cmd = '';
                    var rcmd = '';
                    
                    if(ocbp){
                        rcmd += ',ocbp=reset';
                        if(ocbpValue && ocbpValue.length > 0) cmd += ',ocbp=set&' + ocbpValue;
                    }
                    
                    if(ocbuc){
                        rcmd += ',ocbuc=reset,PIN=reset';
                        if(ocbucPin && ocbucPin.length > 0) cmd += ",ocbuc=set&full,pin=set&notspec&k'" + ocbucPin;
                    }
                    
                    if(acb){
                        rcmd += ',acb=reset';
                        if(acbValue && acbValue.length > 0) cmd += ',acb=set&' + acbValue;
                    }
                    
                    if(icbp){
                        rcmd += ',icbp=reset';
                        cmd += ',icbp=set&total'
                    }
                    
                    $scope.cmd = cmd;
                    $scope.rcmd = rcmd;
                }
                
            },
            controllerAs: 'c'
        };
    });

})();