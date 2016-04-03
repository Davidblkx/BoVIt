(function() {

    var app = angular.module('codigos', []);

    app.directive('reencaminhamento', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'directives/cod/template-reencaminhamento.html',
            controller: function() {

                this.line = 'A01';
                this.tek = 'S12';
                this.type = 'CFU';
                this.dn = '';
                this.tdn = '';
                this.free = false;

                var cmdActS12 = function(dn, tdn, type, line) {

                    var cod = line === 'A05' ? '5370' : '5290';

                    var frwd = ',cfu';
                    if (type === 'CFB')
                        frwd = ',cfb';
                    if (type === 'CFNR')
                        frwd = ',cfnr';

                    return cod + ":dn=k'" + dn + frwd + "=set&set&k'" + tdn;
                };
                var cmdDeactS12 = function(dn, type, line) {

                    var cod = line === 'A05' ? '5370' : '5290';

                    var frwd = ',cfu';
                    if (type === 'CFB')
                        frwd = ',cfb';
                    if (type === 'CFNR')
                        frwd = ',cfnr';

                    return cod + ":dn=k'" + dn + frwd + "=reset";
                };
                var cmdActFuncS12 = function(dn, type, line) {

                    var cod = line === 'A05' ? '5370' : '5290';

                    var frwd = ',cfu';
                    if (type === 'CFB')
                        frwd = ',cfb';
                    if (type === 'CFNR')
                        frwd = ',cfnr';

                    return cod + ":dn=k'" + dn + frwd + "=set";
                };

                var cmdActEwsd = function(dn, tdn, type, line) {
                    var cod = line === 'A05' ? 'MODPBX:DN=' : 'MODSUB:DN=';

                    var fwrd = ',DIV=ACTDIVI-';
                    if (type === 'CFB')
                        fwrd = ',DIV=ACTDIVBY-';
                    if (type === 'CFNR')
                        fwrd = ',DIV=ACTDIVDA-';

                    var serv = '';
                    if (line === 'A05')
                        serv = ',SERV=ALLGRP';
                    if (line === 'A13')
                        serv = ',SERV=VOICEGRP&NONVCGRP';

                    return cod + dn + fwrd + tdn + serv;
                };
                var cmdDeactEwsd = function(dn, type, line) {
                    var cod = line === 'A05' ? 'MODPBX:DN=' : 'MODSUB:DN=';

                    var fwrd = ',CDIV=ACTDIVI';
                    if (type === 'CFB')
                        fwrd = ',CDIV=ACTDIVBY';
                    if (type === 'CFNR')
                        fwrd = ',CDIV=ACTDIVDA';

                    var serv = '';
                    if (line === 'A05')
                        serv = ',SERV=ALLGRP';
                    if (line === 'A13')
                        serv = ',SERV=VOICEGRP&NONVCGRP';

                    return cod + dn + fwrd + serv;
                };
                var cmdActFuncEwsd = function(dn, type, line) {
                    var cod = line === 'A05' ? 'MODPBX:DN=' : 'MODSUB:DN=';

                    var fwrd = ',DIV=DIVI&DIVIMOD';
                    if (type === 'CFB')
                        fwrd = ',DIV=DIVBY&DIVBYMOD';
                    if (type === 'CFNR')
                        fwrd = ',DIV=DIVDA&DIVDAMOD';

                    var serv = '';
                    if (line === 'A05')
                        serv = ',SERV=ALLGRP';
                    if (line === 'A13')
                        serv = ',SERV=VOICEGRP&NONVCGRP';

                    return cod + dn + fwrd + serv;
                };

                this.cmdAct = function(dn, tdn, tek, type, free, line) {
                    if (free)
                        tdn = "10AA" + tdn;

                    switch (tek) {
                        case 'S12':
                            return cmdActS12(dn, tdn, type, line);
                        case 'EWSD':
                            return cmdActEwsd(dn, tdn, type, line);
                        default:
                            return 'Tecnologia Inválida';
                    }
                };
                this.cmdDeact = function(dn, tek, type, line) {
                    switch (tek) {
                        case 'S12':
                            return cmdDeactS12(dn, type, line);
                        case 'EWSD':
                            return cmdDeactEwsd(dn, type, line);
                        default:
                            return 'Tecnologia Inválida';
                    }
                }
                this.cmdActFunc = function(dn, tek, type, line) {
                    switch (tek) {
                        case 'S12':
                            return cmdActFuncS12(dn, type, line);
                        case 'EWSD':
                            return cmdActFuncEwsd(dn, type, line);
                        default:
                            return 'Tecnologia Inválida';
                    }
                }
                
                this.copy = function(selector){
                    COPY_TXT(selector);
                }
            },
            controllerAs: 'cmd'
        };
    });

})();