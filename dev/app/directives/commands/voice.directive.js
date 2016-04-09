(function() {

    var app = angular.module('Voice', []);

    app.directive('voiceMail', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'directives/voice.directive.html',
            scope: {
                tek: '=',
                cmd: '=',
                rcmd: '=',
                all: '=',
                busy: '=',
                nr: '=',
                set: '@'
            },
            controller: function($scope) {
                $scope.set = false;
                
                var setS12 = function(set, all) {
                    if (set) {
                        
                        switch(all){
                            case '0':
                                $scope.cmd = ',cfvm=notspec&notspec&notspec&notspec&notspec&set&set';
                                $scope.rcmd = ',cfvm=notspec&notspec&notspec&notspec&notspec&reset&reset';
                                break;
                            case '1':
                                $scope.cmd = ',cfvm=notspec&notspec&notspec&notspec&notspec&set&notspec';
                                $scope.rcmd = ',cfvm=notspec&notspec&notspec&notspec&notspec&reset&notspec';
                                break;
                            case '2':
                                $scope.cmd = ',cfvm=notspec&notspec&notspec&notspec&notspec&notspec&set';
                                $scope.rcmd = ',cfvm=notspec&notspec&notspec&notspec&notspec&notspec&reset';
                                break;
                        }
                    }
                    else{
                        $scope.cmd = '';
                        $scope.rcmd = '';
                    }
                };

                var setEwsd = function(busy, nr) {

                    if(!busy && !nr){
                        $scope.cmd = '';
                        $scope.rcmd = '';
                        return;
                    }

                    var div = ',DIV=';
                    var cdiv = ',CDIV=';

                    if (busy) {
                        div += 'ACTDIVBY-F6002020';
                        cdiv += 'ACTDIVBY';
                    }

                    if (nr) {
                        if (busy) {
                            div += '&';
                            cdiv += '&';
                        }

                        div += 'ACTDIVDA-F6002010';
                        cdiv += 'ACTDIVDA';
                    }


                    $scope.cmd = div;
                    $scope.rcmd = cdiv;
                };

                this.setCmd = function(set, all, busy, nr, tek) {

                    if (!$scope.tek || $scope.tek == '') {
                        $scope.cmd = '';
                        $scope.rcmd = '';
                        return;
                    }
                    
                    if(tek == 'S12'){
                        setS12(set, all);
                        return;
                    }
                    
                    if(tek == 'EWSD'){
                        setEwsd(busy, nr);
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