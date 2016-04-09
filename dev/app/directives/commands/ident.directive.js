(function() {

    var app = angular.module('Ident', []);

    app.directive('ident', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'directives/ident.directive.html',
            scope: {
                tek: '=',
                cmd: '=',
                rcmd: '=',
                cw: '=',
                clip: '=',
                clir: '=',
                conf3: '=',
                ccbs: '=',
                hm: '=',
                carrier: '=',
                clirReq: '=',
                carrierValue: '=',
            },
            controller: function($scope) {
                
                var setS12 = function(cw, clip, clir, conf3, ccbs, hm, carrier, carrierValue){
                    
                    var cmd = '';
                    var rcmd = '';
                    
                    if(cw){
                        cmd += ',cw=set&set&notspec&notspec&set';
                        rcmd += ',cw=reset&reset&notspec&notspec&reset';
                    }
                    
                    if(clip){
                        cmd += ',clip=set';
                        rcmd += ',clip=reset';
                    }
                    
                    if(clir){
                        cmd += ',clir=set';
                        rcmd += ',clir=reset';
                    }
                    
                    if(conf3){
                        cmd += ',tps=set&conf3';
                        rcmd += ',tps=reset';
                    }
                    
                    if(ccbs){
                        cmd += ',ccbs=set';
                        rcmd += ',ccbs=reset';
                    }
                    
                    if(hm){
                        cmd += ',hm=set';
                        rcmd += ',hm=reset';
                    }
                    
                    if(carrier){
                        if(carrierValue && carrierValue.length > 0) cmd += ",carrier=set&k'" + carrierValue + 
                            "&k'" + carrierValue + "&set&k'" + carrierValue + "&k'" + carrierValue;
                        rcmd += ",carrier=reset&k'f&k'f&reset";
                    }
                    
                    
                    $scope.cmd = cmd;
                    $scope.rcmd = rcmd;
                    
                };
                
                var setEwsd = function(cw, clip, clir, clirReq, conf3, ccbs, hm, carrier, carrierValue){
                    
                    var cmd = '';
                    var rcmd = '';
                    
                    if(cw || clip || clir || clirReq || conf3 || ccbs){
                        
                        cmd += ',cos=';
                        rcmd += ',ccos=';
                        
                        var cos = '';
                        
                        if(cw){
                            cos = 'ACTCW&CWACT&CWCURNOT';
                        }
                        
                        if(clip){
                            if(cos.length > 0){
                                cos += '&';
                            }
                            
                            cos += 'CLIP&FSK&CLIPCW';
                        }
                        
                        if(clir){
                            if(cos.length > 0) cos += '&';
                            cos += 'CLIR';
                        }
                        
                        if(clirReq){
                            if(cos.length > 0) cos += '&';
                            cos += 'CLIRREQ';
                        }
                        
                        if(conf3){
                            if(cos.length > 0) cos += '&';
                            cos += 'CONF3';
                        }
                        
                        if(ccbs){
                            if(cos.length > 0) cos += '&';
                            cos += 'CCBS';
                        }
                        
                        cmd += cos;
                        rcmd += cos;
                    }
                    
                    if(hm){
                        cmd += ',lnatt=SMET';
                        rcmd += ',clnatt=SMET';
                    }
                    
                    if(carrier){
                        if(carrierValue && carrierValue.length > 0) cmd += ",cosdat=CAC1-"+ carrierValue + "&CAC2-" + carrierValue;
                        rcmd += ',ccosdat=CAC1&CAC2'; 
                    }
                    
                    $scope.cmd = cmd;
                    $scope.rcmd = rcmd;
                    
                };
                
                this.genCmd = function(cw, clip, clir, clirReq, conf3, ccbs, hm, carrier, carrierValue){
                    
                    if($scope.tek == ''){
                        $scope.cmd = '';
                        $scope.rcmd = '';
                        return;
                    }
                    
                    if($scope.tek == 'S12'){
                        setS12(cw, clip, clir, conf3, ccbs, hm, carrier, carrierValue);
                        return;
                    }
                    
                    if($scope.tek == 'EWSD'){
                        setEwsd(cw, clip, clir, clirReq, conf3, ccbs, hm, carrier, carrierValue);
                        return;
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