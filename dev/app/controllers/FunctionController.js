(function() {

    var app = angular.module('Function', ['Reenc', 'Ident', 'Voice', 'BarrS12', 'BarrEwsd']);

    app.controller('FunctionController', ['$scope', function($scope) {

        $scope.dn = '244401300';
        $scope.tek = 'EWSD';
        $scope.line = 'A01';

        $scope.viewReenc = true;
        $scope.viewBarra = true;
        $scope.viewVoice = true;
        $scope.viewOther = true;

        $scope.reenc = {
            tdn: '',
            free: false,
            cfb: false,
            cfu: false,
            cfnr: false,
            cmd: '',
            rcmd: ''
        };

        $scope.barrs12 = {
            cmd: '',
            rcmd: '',
            ocbp: false,
            ocbpValue: '',
            ocbuc: false,
            ocbucPin: '',
            icbp: false,
            acb: false,
            acbValue: 'badppart'
        }

        $scope.barrewsd = {
            cmd: '',
            rcmd: '',
            reqspori: false,
            reqspter: false,
            prog: false,
            progPin: '',
            optrcl: false,
            optrclValue: '',
            accsusp: false,
            accspori: false,
            admin: false
        }

        $scope.voice = {
            cmd: '',
            rcmd: '',
            all: "0",
            busy: false,
            nr: false
        }

        $scope.other = {
            cmd: '',
            rcmd: '',
            cw: false,
            clip: false,
            clir: false,
            conf3: false,
            ccbs: false,
            hm: false,
            carrier: false,
            carrierValue: '',
            clirReq: false,
        };

        $scope.genCmd = function(dn, tek, line, reenc, other, voice, barrs12, barrewsd) {

            if (dn == '' || tek == '' || line == '')
                return '';

            var res = '';

            if (tek == 'S12') {
                if (line == 'A05')
                    res = "5370:dn=k'" + dn;
                else
                    res = "5290:dn=k'" + dn;
            }

            if (tek == 'EWSD') {
                if (line == 'A05')
                    res = "MODPBX:dn=" + dn + ',SERV=ALLGRP';
                else if (line == 'A13')
                    res = "MODSUB:dn=" + dn + ',SERV=VOICEGRP&NONVCGRP';
                else
                    res = "MODSUB:dn=" + dn;
            }

            if ($scope.viewReenc)
                res += reenc;

            if ($scope.viewOther)
                res += other;

            if ($scope.viewVoice)
                res += voice;

            if ($scope.viewBarra && $scope.tek == 'S12')
                res += barrs12;

            if ($scope.viewBarra && $scope.tek == 'EWSD')
                res += barrewsd;

            return res;

        };

        $scope.copyValue = 'data';
        $scope.copyReady = false;

        $scope.copy = function(value) {

            $scope.copyValue = value;
            $scope.copyReady = true;

            setTimeout(function() {
                document.querySelector('#txt').select();
                try {
                    if (document.execCommand('copy')) {} else {
                        console.log('Copy to clipboard not completed');
                    }
                } catch (err) {
                    console.log('Error at copy to clipboard:', err);
                }
                
                $scope.copyValue = '';
                $scope.copyReady = false;
                $scope.$apply();
            }, 50);
        };
        
        $scope.getAct = function(){
            return document.querySelector('#cmd-act').value;
        }
        
        $scope.getDeAct = function(){
            return document.querySelector('#cmd-deact').value;
        }
        
    }]);

})();