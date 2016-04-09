(function() {

    var app = angular.module('Reenc', []);

    app.directive('reenc', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'directives/reenc.directive.html',
            scope: {
                tek: '=',
                line: '=',
                tdn : '=',
                free: '=',
                cfu: '=',
                cfb: '=',
                cfnr: '=',
                cmd: '=',
                rcmd: '='
            },
            controller: function($scope) {
                
                var getS12 = function(cfu, cfb, cfnr, tdn){
                    
                    var res = '';
                    
                    if(cfu){
                        if(tdn == '')
                            res += ",cfu=set";
                        else
                            res += (",cfu=set&set&k'" + tdn);
                    }
                    
                    if(cfb){
                        if(tdn == '')
                            res += ",cfb=set";
                        else
                            res += (",cfb=set&set&k'" + tdn);
                    }
                    
                    if(cfnr){
                        if(tdn == '')
                            res += ",cfnr=set";
                        else
                            res += (",cfnr=set&set&k'" + tdn);
                    }
                    
                    return res;
                    
                };
                var resetS12 = function(cfu, cfb, cfnr){
                    
                    var res = '';
                    
                    if(cfu){
                        res += ",cfu=reset";
                    }
                    
                    if(cfb){
                        res += ",cfb=reset";
                    }
                    
                    if(cfnr){
                        res += ",cfnr=reset";
                    }
                    
                    return res;
                    
                };
                
                var getEwsd = function(cfu, cfb, cfnr, tdn){
                    var res = '';
                    
                    if(cfu){
                        if(tdn == '')
                            res += 'DIVI&DIVIMOD';
                        else
                            res += 'ACTDIVI-' + tdn;
                    }
                    
                    if(cfb){
                        if(res.length > 0)
                            res += '&';
                        
                        if(tdn == '')
                            res += 'DIVBY&DIVBYMOD';
                        else
                            res += 'ACTDIVBY-' + tdn;
                    }
                    
                    if(cfnr){
                        if(res.length > 0)
                            res += '&';
                        
                        if(tdn == '')
                            res += 'DIVDA&DIVDAMOD';
                        else
                            res += 'ACTDIVDA-' + tdn;
                    }
                    
                    if(res.length > 0)
                        res = ',DIV=' + res;
                    
                    return res;
                };
                var resetEwsd = function(cfu,cfb,cfnr){
                    
                    var res = '';
                    
                    if(cfu){
                        res = 'ACTDIVI';
                    }
                    if(cfb){
                        if(res.length > 0) res += '&';
                        res += 'ACTDIVBY';
                    }
                    if(cfnr){
                        if(res.length > 0) res += '&';
                        res += 'ACTDIVDA';
                    }
                    
                    if(res.length > 0)
                        res = ',CDIV=' + res;
                        
                    return res;
                    
                }
                
                this.genCmd = function(cfu, cfb, cfnr, free, tdn, tek, line){
                    
                    if(tek == '' || line == '' || (!cfu && !cfb && !cfnr)){
                        $scope.cmd = '';
                        $scope.rcmd = '';
                        return '';
                    }
                    
                    if(free && tdn != '') tdn = '10AA' + tdn;
                    
                    if(tek == 'S12'){
                        $scope.cmd = getS12(cfu, cfb, cfnr, tdn);
                        $scope.rcmd = resetS12(cfu, cfb, cfnr, tdn);
                        return '';
                    }
                    
                    if(tek == 'EWSD'){
                        $scope.cmd = getEwsd(cfu,cfb,cfnr,tdn);
                        $scope.rcmd = resetEwsd(cfu,cfb,cfnr);
                        return '';
                    }
                    
                    $scope.cmd = '';
                    $scope.rcmd = '';
                    return;
                };
            },
            controllerAs: 'c'
        };
    });

})();