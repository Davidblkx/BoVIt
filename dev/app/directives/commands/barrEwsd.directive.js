(function() {

    var app = angular.module('BarrEwsd', []);

    app.directive('barrEwsd', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'directives/barrEwsd.directive.html',
            scope: {
                tek: '=',
                dn: '=',
                cmd: '=',
                rcmd: '=',
                reqspori: '=',
                reqspter: '=',
                prog: '=',
                progPin: '=',
                optrcl: '=',
                optrclValue: '=',
                accsusp: '=',
                accspori: '=',
                admin: '='

            },
            controller: function($scope) {

                this.setCmd = function(dn, tek, reqspori, reqspter, prog, progPin, optrcl, optrclValue, accsusp, accspori, admin) {
                    if (!tek || tek != 'EWSD') {
                        return;
                    }

                    if (!dn || dn.length == 0) {
                        return;
                    }
                    
                    var cmd = '';
                    var rcmd = '';
                    
                    if(reqspori || reqspter || prog){
                        
                        var trarstr = '';
                        
                        if(reqspori) trarstr += 'reqspori';
                        if(reqspter){
                            if(trarstr.length > 0) trarstr += '&';
                            trarstr += 'reqspter';
                        }
                        if(prog){
                            if(trarstr.length > 0) trarstr += '&';
                            trarstr += 'traclmod&traclact';
                        }
                        
                        cmd += (',trarstr=' + trarstr);
                        rcmd += (',ctrarstr=' + trarstr); 
                    }
                    
                    if(accspori || accsusp || admin){
                        
                        var blk = '';
                        
                        if(accspori) blk += 'accspori';
                        if(accsusp){
                            if(blk.length > 0) blk += '&';
                            blk += 'accsusp';
                        }
                        if(admin){
                            if(blk.length > 0) blk += '&';
                            blk += 'admin';
                        }
                        
                        cmd += (',blk=' + blk);
                        rcmd += (',cblk=' + blk);
                    }
                    
                    if(optrcl){
                        rcmd += ',ccl=optrcl';
                        if(optrclValue && optrclValue.length > 0)
                            cmd += ',optrcl=' + optrclValue;
                    }
                    
                    $scope.cmd = cmd;
                    $scope.rcmd = rcmd;
                }
            },
            controllerAs: 'c'
        };
    });

})();