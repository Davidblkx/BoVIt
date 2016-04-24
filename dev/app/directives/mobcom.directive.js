(function(){
    
    var app = angular.module('MobCom', ['Field']);
    
    app.directive("mobS12Orig", ['$http', '$q', function($http, $q) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/mobs12orig.directive.html",
            scope: {
                num: '<',
                line: '<'
            },
            controller: function($scope) {
                
                $scope.removeDn = function(dn, line){
                    
                    if(line == 'A05'){
                        return "5369:dn=k'" + dn;
                    }
                    
                    if(line == 'A13'){
                        return "5292:dn=k'" + dn + ',scope=allmsn';
                    }
                    
                    if(line == 'A01'){
                        return "5292:dn=k'" + dn;
                    }
                    
                    return "ERRO";
                    
                }
                
                $scope.setAlert = function(dn){
                    return "5468:annm=move,areacode=k'" + dn.substring(0, 2) + ",dn=k'" + dn.substring(2);
                }
                
                $scope.showAlert = function(dn){
                    return "5476:areacode=k'" + dn.substring(0, 2) + ",dn=k'" + dn.substring(2);
                }
                
            },
            controllerAs: "com"
        };
    }]);
    
    app.directive("mobEwsdOrig", ['$http', '$q', function($http, $q) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/mobewsdorig.directive.html",
            scope: {
                num: '<',
                line: '<',
                com: '<',
            },
            controller: function($scope) {
                
                $scope.removeCpt = function(dn){
                    return "cancpt:code=" + dn + ",incept=unobde0,orig1=1";
                }
                
                $scope.removeDn = function(dn, ln){
                    if(ln == 'A05')
                        return "canpbx:dn=" + dn;
                    
                    return "cansub:dn=" + dn;
                }
                
                $scope.setAlert = function(dn, cod) {
                    return "moddn:dn=" + dn + ",incept=porteddn-D020" + cod + dn;
                }
                
            },
            controllerAs: "com"
        };
    }]);
    
    app.directive("mobS12Dest", ['$http', '$q', function($http, $q) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/mobs12dest.directive.html",
            scope: {
                num: '<',
                line: '<',
                com: '<'
            },
            controller: function($scope) {
                
                $scope.lan = '';
                $scope.na = '';
                $scope.msn1 = '';
                $scope.msn2 = '';
                $scope.nddi = '10';
                
                $scope.createDn = function(num, na, lan, line, msn1, msn2){
                    if(line == 'A01')
                        return "5289:DN=k'"+ num + ",LAN=" + lan +",na=h'" + na;
                        
                    if(line == 'A13'){
                        
                        var msn = '';
                        
                        if(msn1)
                            msn += "&k'" + msn1;
                        if(msn2)
                            msn += "&k'" + msn2;
                        
                        return "5289:DN=k'"+ num + msn + ",msn=set,subtype=dsubs,LAN=" + lan +",na=h'" + na;
                    }
                    
                    if(line == 'A05'){
                        while(num.length < 9)
                            num += '0';
                        
                        return "5368:acctype=dbabw,lan=" + lan + ",na=h'" + na + ",refdn=k'" + num;
                    }
                };
                
                $scope.crDdis = function(num, nddi, line){
                    if(line == 'A05'){
                        while(num.length < 9)
                            num += '0';
                        
                        var last = num.substring(0, (10 - nddi.length ) ) + (+nddi - 1);
                        
                        return "5368:ddidnrng=k'" + num +"&&k'" + last + ",dn=k'" + num +",protocol=dss1,subtyp=ddipabx;";
                    }
                };
                
            },
            controllerAs: "com"
        };
    }]);
    
    app.directive("mobEwsdDest", ['$http', '$q', function($http, $q) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/mobewsddest.directive.html",
            scope: {
                num: '<',
                line: '<',
                com: '<',
            },
            controller: function($scope) {
                
                $scope.eqn = '';
                $scope.orig1 = '1';
                $scope.orig2 = '1';
                $scope.origCpt = '256';
                $scope.msn1 = '';
                $scope.msn2 = '';
                $scope.ssdi = '9';
                $scope.nddi = '10';
                
                $scope.crDn = function(dn, line, nddi){
                    
                    if(line == 'A05'){
                        var max = 10 - nddi.length;
                        while(dn.length > max)
                            dn = dn.substring(0, dn.length-1);
                    }
                    
                    return "crdn:dn=" + dn + ",lac=20;";
                    
                };
                
                $scope.crCpt = function(dn, line, orig, nddi){
                    
                    if(line == 'A05'){
                        var max = 10 - nddi.length;
                        while(dn.length > max)
                            dn = dn.substring(0, dn.length-1);
                    }
                    
                    return "crcpt:code=" + dn + ",tratyp=cptdn,lac=20,orig1=" + orig;
                };
                
                $scope.crSub = function(dn, line, eqn, orig1, orig2, nddi, ssdi){
                    
                    if(line == 'A01')
                        return "crsub:dn=" + dn + ",cat=ms,eqn="+ eqn + ",orig1=" + orig1 + ",orig2=" + orig2 + ",chrg=deb,ncf=2";
                        
                    if(line == 'A13'){
                        return "crsub:dn=" + dn + ",eqn="+ eqn + ",cat=iba,serv=nonvcgrp&voicegrp," + 
                               "lnatt=msn,cos=stiprot&fctprot,orig1=" + orig1 + ",orig2=" + orig2 + ",chrg=deb,optrcl=4;";
                    }
                    
                    if(line == 'A05'){
                        
                        var max = 10 - nddi.length;
                        while(dn.length > max)
                            dn = dn.substring(0, dn.length-1);
                        
                        var ddn = dn;
                        while(ddn.length < 9)
                            ddn += '0'; 
                        
                        return "crpbx:dn=" + dn + ",opmode=ibw,serv=allgrp,optrcl=4,opn=" + ddn + 
                                ",chrg=deb,hunt=nonseq,dino=1,ssdi=" + ssdi + ",cos=ddi,eos=sign";
                    }
                };
                
                $scope.crMsn = function(msn, eqn, orig1, orig2) {
                    return "crsub:dn=" + msn + ",eqn=" + eqn + ",cat=iba,serv=nonvcgrp&voicegrp,lnatt=msn,"+ 
                           "cos=stiprot&fctprot,orig1=" + orig1 + ",orig2=" + orig2 + ",chrg=deb,optrcl=4";
                };
                
                $scope.crLn = function(dn, eqn, orig1, orig2, nddi, index){
                    
                    var max = 10 - nddi.length;
                    while(dn.length > max)
                        dn = dn.substring(0, dn.length-1);
                    
                    return "crpbxln:dn=" + dn + ",opmode=ibw,lno=" + index + ",eqn=" + eqn + ",cat=iba," + 
                            "lnatt=lay1hold&lay2hold&pttopt,orig1=" + orig1 + ",orig2=" + orig2;
                };
            },
            controllerAs: "com"
        };
    }]);
    
})();