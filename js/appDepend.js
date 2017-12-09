(function(){
    
    var app = angular.module('Comutador',[]);
    
    app.controller('ComController', ['$scope', '$http', function($scope, $http) {
        $http.get('/BoVIt/db/comutador.json').success(function(data) {
            $scope.coms = data;
        });

        $scope.search = "";

        $scope.getQuery = function(obj) {
            var q = " ";

            q += obj.code;
            q += obj.name.toLowerCase();
            q += obj.tek.toLowerCase();
            q += obj.ent.toLowerCase();
            if(obj.obs)
                q += obj.obs.toLowerCase();

            return q;
        };
    }]);
    
})();
(function(){
    
    var app = angular.module('Dashboard', ['ObjectivosDir']);
    
    app.controller('DashboardController', ['$scope', '$http', function($scope, $http){
        
        
    }]);
    
})();

(function() {

    var app = angular.module('Function', ['Reenc', 'Ident', 'Voice', 'BarrS12', 'BarrEwsd']);

    app.controller('FunctionController', ['$scope', function($scope) {

        $scope.dn = '';
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
(function(){
    
    var app = angular.module('Horario', ['Calendar', 'UserSelect']);
    
    app.controller('HorarioController', ['$scope', '$http', function($scope, $http){
        
        $scope.edit = true;
        $scope.user = 'XKESP32';
        
        var now = moment();
        
        $scope.day = now.date() + 1;
        $scope.month = now.month() + 1;
        $scope.year = now.year();
        
        $scope.callModal = function(type, title){
            $('.modal-title').text(title);
            $('#modal-horario').modal();
        };
        
    }]);
    
})();

(function() {

    var app = angular.module('Isp', []);

    app.controller('IspController', ['$scope', '$http', function($scope, $http) {
        $http.get('/BoVIt/db/isp.json').success(function(data) {
            $scope.isps = data;
        });
    }]);

})();
(function() {

    var app = angular.module('Mobility', ['SelectCom', 'MobCom']);

    app.controller('MobilityController', ['$scope', '$http', function($scope, $http) {

        $http.get('/BoVIt/db/comutador.json').success(function(data) {
            $scope.coms = data;
        });

        $scope.dn = "";
        $scope.extended = true;
        $scope.line = 'A01';

        $scope.orig = {
            tek: 'S12'
        };
        $scope.dest = {};

    }]);

})();
(function(){
    
    var app = angular.module('Objectivos',[]);
    
    app.controller('ObjController', ['$scope', '$http', function($scope, $http) {
        
        $scope.alert = false;
        
        $scope.date = moment().format('DD-MM-YYYY');
        
        $scope.data = {
            user: '',
            date: $scope.date,
            meo: [],
            adsl: [],
            sft: [],
            carga: 8,
        };
        
        $scope.obj = {
            user: '',
            date: $scope.date.substring(3),
            meo: '50',
            sft: '50',
            adsl: '50',
            total: '55',
            ff: '25',
            carga: '8'
        };
        
        $scope.calcTratamento = function(sft, adsl, meo, carga){
            return (sft.length + adsl.length + meo.length) / carga;
        };
        
        function calcTaxa(holder, val){
            if(holder.length == 0) return 0;
            
            var sum = 0;
            for(var i = 0; i < holder.length; i++){
                if(holder[i].val == val)
                    sum++;
            }
            return ((sum/holder.length) * 100);
        };
        function arrayTotal(holder, val){
            if(holder.length == 0) return 0;
            
            var sum = 0;
            for(var i = 0; i < holder.length; i++){
                if(holder[i].val == val)
                    sum++;
            }
            return sum;
        }
        
        $scope.compFot = function(holder, value){
            if(holder.length == 0) return false;
            
            var total = $scope.calcFot(holder);
            var res = total >= parseInt(value); 
            return res;
        };
        
        $scope.compFecho = function(total, val){
            return total >= val;
        }
        
        $scope.compFf = function(total, val){
            return total <= val;
        }
        
        $scope.calcFot = function(holder){
            
            var res = parseInt(calcTaxa(holder, 'FOT'));
            return res.toPrecision(3);
        };
        
        $scope.calcFecho = function(sft, adsl, meo){
            var total = sft.length + adsl.length + meo.length;
            if(total == 0) return 0;
            
            var fot = arrayTotal(sft, 'FOT') + arrayTotal(adsl, 'FOT') + arrayTotal(meo, 'FOT');
            var res = ((fot/total) * 100);
            
            return res.toPrecision(3);
        };
        
        $scope.calcFf = function(sft, adsl, meo){
            var total = sft.length + adsl.length + meo.length;
            if(total == 0) return 0;
            
            var fot = arrayTotal(sft, 'FF') + arrayTotal(adsl, 'FF') + arrayTotal(meo, 'FF');
            var res = ((fot/total) * 100);
            
            return res.toPrecision(3);
        };
        
        dpd.people.me(function(me, err){
            $scope.data.user = me;
        });
        
        $scope.add = function(itm, val){
            $scope.data[itm].push({val: val});
            $scope.$apply();
        };
        
        $scope.remove = function(itm){
            $scope.data[itm].pop();
            $scope.$apply();
        };
        
        $('.rem-item').click(function(){
            var itm = $(this).data('type');
            $scope.remove(itm);
        });
        $('.add-item').click(function(){
            var itm = $(this).data('type');
            var val = $(this).data('val');
            $scope.add(itm, val);
        });
        
        $('#input-date').datepicker({
            format: "dd-mm-yyyy",
            language: "pt"
        });
        
        function getDefault(){
            return {
                user: $scope.user.username,
                date: $scope.date,
                meo: [],
                adsl: [],
                sft: [],
                carga: 8,
            };
        };
        
        $scope.load = function(){
            WAIT(true);
            dpd.people.me(function(ME, err){
                if(err){
                    console.log(err);
                    WAIT(false);
                    dhtmlx.message({type: "error", text:"Erro ao carregar informações"});
                    return;
                }
                
                $scope.date = $('#input-date').val();
                
                var d = $scope.date.substring(3);
                dpd.objectivos.get({
                    user: ME.username,
                    date: d,
                }, function(res, err){
                    
                    if(err || res.length == 0){
                        $scope.alert = true;
                        console.log(err);
                        WAIT(false);
                        dhtmlx.message({type: "error", text:"Erro ao carregar informações"});
                        return;
                    }
                    
                    $scope.alert = false;
                    $scope.obj = res[0];
                    
                    dpd.objday.get({
                        user: ME.username,
                        date: $scope.date
                    }, function(r, err){
                        
                        if(err || r.length == 0){
                            $scope.data = getDefault();
                            dpd.objday.post($scope.data);
                            WAIT(false);
                            dhtmlx.message("Criado com sucesso");
                            return;
                        }
                        
                        $scope.data = r[0];
                        $scope.$apply();
                        WAIT(false);
                        dhtmlx.message("Actualizado");
                    });
                    
                });
            });
        };
        
        $scope.save = function(){
            var str = angular.toJson($scope.data);
            var data = JSON.parse(str);
            
            dpd.objday.post(data, function(res, err){
                if(err){
                    console.log(err);
                    dhtmlx.message({type: "error", text:"Erro ao guardar alterações"});
                    return;
                }
                dhtmlx.message("Alterações guardadas");
            });
        };
        
        $scope.load();
        
    }]);
    
})();
(function(){
    
    var app = angular.module('Origin', []);
    
    app.controller('OriginController', ['$scope', '$sce', function($scope, $sce) {
        $scope.num = "";
        $scope.getLink = function(num) {
            return $sce.trustAsResourceUrl("http://portal-domf.telecom.pt/dop/stc3/equipamentos/mainP.asp?txtNa=" + num);
        };
    }]);
    
})();
(function() {
    
    var app = angular.module('People', []);
    
    app.controller('PeopleController', ['$scope', '$http', function($scope, $http) {
        
        $http.get('/BoVIt/db/people.json').success(function(data) {
            $scope.users = data;
        });

        $scope.saveUser = function(id, user, mail, isActive, role, func, name) {

            dpd.people.put(id, {
                "name": name,
                "email": mail,
                "active": isActive,
                "function": func,
                "role": role
            }, function(result, err) {
                if (err) {
                    dhtmlx.message("Erro ao actualizar user");
                    console.log(err);
                    return;
                }

                dhtmlx.message("Utilizador '" + result.username + "' actualizado com sucesso");
            });
        };
        
        $scope.deleteUser = function(id) {
            dpd.people.del(id, function(count, err) {
                if (err) {
                    dhtmlx.message("Erro ao eliminar user");
                    console.log(err);
                    return;
                }

                location.reload();

                dhtmlx.message("Utilizador eliminado com sucesso");
            });
        };
    }]);
    
    //New user directive
    app.directive("newUser", ['$http', function($http) {

        return {
            restrict: 'E',
            templateUrl: 'directives/newUser.directive.html',
            controller: function() {
                this.user = "";
                this.pass = "";
                this.email = "";
                this.func = "fot";
                this.name = "";

                this.addUser = function(user, func, pass, name) {
                    
                    if (user == "" || user.length < 4) {
                        dhtmlx.message({
                            type: "error",
                            text: "O username é invalido"
                        });
                        return;
                    }
                    if (pass == "" || pass.length < 4) {
                        dhtmlx.message({
                            type: "error",
                            text: "A password é invalida"
                        });
                        return;
                    }
                    
                    user = user.toUpperCase();

                    dpd.people.post({
                        username: user,
                        password: pass,
                        name: name,
                        function: func,
                        email: "",
                        role: func == 'fot' ? 50 : 65,
                        active: true,
                        
                    }, function(user, err) {
                        if (err) return dhtmlx.message(err);
                        location.reload();
                    });
                };
            },
            controllerAs: "newUser"
        }

    }]);

    //Change user password directive
    app.directive("changePass", ['$http', function($http) {

        return {
            restrict: 'E',
            templateUrl: 'directives/changePass.directive.html',
            controller: function() {

                this.setPass = function(pass1, pass2) {

                    if (pass1 == undefined || pass2 == undefined) {
                        dhtmlx.message("Preencha todos os campos");
                        return;
                    }

                    if (pass1.length < 6) {
                        dhtmlx.message("Pass inválida, demasiado pequena");
                        return;
                    }

                    if (pass1 !== pass2) {
                        dhtmlx.message("As passwords não coicidem!");
                        return;
                    }

                    dpd.people.me(function(user, err) {

                        if (err) {
                            dhtmlx.message("Erro ao verificar autenticação");
                            return;
                        }

                        dpd.people.put(user.id, {
                            "password": pass1
                        }, function(res, err) {

                            if (err) {
                                dhtmlx.message("Erro ao actualizar password");
                                return;
                            }

                            dhtmlx.message("A password foi actualizada");
                            location.reload();
                        });

                    });
                };
            },
            controllerAs: "pwd"
        }

    }]);
    
})();
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
(function(){
    
    var app = angular.module('SelectCom', ['ngSanitize', 'ui.select']);
    
    app.directive("comSelect", ['$http', '$q', function($http, $q) {

        

        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/comselect.directive.html",
            scope: {
                com: '=',
                full: '='
            },
            controller: function($scope) {
                
                $scope.getName = function(c){
                    return c.ent + ($scope.full ? ' - [' + c.name + ']' : '');
                };
                
                $http.get('/BoVIt/db/comutador.json').success(function(data) {
                    $scope.coms = data;
                    $scope.com = data[0];
                });
                
                $scope.refresh = function(c){
                    console.log(c);
                };
            },
            controllerAs: "com"
        };
    }]);
    
})();
(function(){
    
    var app = angular.module('Menu', []);
    
    app.directive("topMenu", ['$http', '$q', function($http, $q) {

        var directiveData,
            dataPromise;

        function loadData() {
            if (dataPromise) {
                return dataPromise;
            }

            var deferred = $q.defer();
            dataPromise = deferred.promise;
            dataPromise.resolve({
                "email": "geral@bovit.ml",
                "role": 65,
                "active": true,
                "username": "botvit",
                "function": "geral"
            })
            return dataPromise;
        };

        return {
            restrict: 'E',
            templateUrl: "directives/menu.directive.html",
            scope: false,
            controller: function() {

                this.logout = function() {
                    dpd.people.logout(function() {
                        window.location = "/";
                    });
                };

            },
            controllerAs: "nav",
            link: function(scope) {
                scope.user = {
                    "email": "geral@bovit.ml",
                    "role": 65,
                    "active": true,
                    "username": "botvit",
                    "function": "geral"
                }
            }
        };
    }]);
    
})();
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
(function(){
    
    var app = angular.module('ObjectivosDir', ['ngSanitize', 'ui.select']);
    
    app.directive("objectivos", ['$http', '$q', function($http, $q) {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/objectivos.directive.html",
            scope: {
                user: '='
            },
            controller: function($scope) {
                var day = moment();
                $scope.year = day.format('YYYY');
                $scope.month = day.format('MM');
                $scope.res = {};
                $scope.monthList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
                $scope.years = [];
                
                for(var i = 2016; i < 2090; i++){
                    $scope.years.push(i + '');
                }
                
                $scope.getDefault = function(){
                    return {
                        user: $scope.user.username,
                        date: $scope.month + '-' + $scope.year,
                        meo: '50',
                        sft: '50',
                        adsl: '50',
                        total: '55',
                        ff: '25',
                        carga: '3'
                    }
                };
                
                $scope.data = $scope.getDefault();
                
                $scope.load = function(){
                    
                    var obj = {
                            user: $scope.user.username,
                            date: $scope.month + '-' + $scope.year,
                        }
                   WAIT(true);
                   dpd.objectivos.get(obj, function(res, error){
                       
                       if(res == undefined || res.length == 0){
                           $scope.data = $scope.getDefault();
                           dpd.objectivos.post($scope.data, function(res){
                               dhtmlx.message("Criado objectivos");
                           });
                           $scope.$apply();
                           WAIT(false);
                           return;
                       }
                       
                       $scope.data = res[0];
                       
                       var query = {
                           user: obj.user,
                           $or: []
                       };
                       
                       var m = moment('01-' + obj.date, 'DD-MM-YYYY');
                       while($scope.month == m.format('MM')){
                           query.$or.push({date: m.format('DD-MM-YYYY')});
                           m.add(1, 'd');
                       }
                       
                       dpd.objday.get(query, function(res, err){
                           if(err){
                               dhtmlx.message({type: "error", text:"Erro ao carregar resultados"});
                           }
                           
                           $scope.res = new ObjResults(res);
                           $scope.$apply();
                           WAIT(false);
                           dhtmlx.message("Actualizado");
                       })
                   });
                    
                };
                
                $scope.save = function(params) {
                    WAIT(true);
                    
                    dpd.objectivos.post($scope.data, function(obj, error){
                        if(error) {
                            console.log(error);
                            dhtmlx.message({type: "error", text:"Erro ao guardar alterações"});
                        }
                        WAIT(false);
                        dhtmlx.message("Alterações guardadas");
                    })
                    
                };
                
                $scope.load();
                
            },
            controllerAs: "com"
        };
    }]);
    
})();
(function(){
    
    var app = angular.module('UserSelect', ['ngSanitize', 'ui.select']);
    
    app.directive("userSelect", ['$http', '$q', function($http, $q) {

        

        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/userselect.directive.html",
            scope: {
                user: '='
            },
            controller: function($scope) {
                
                $scope.users = [];
                
                dpd.people.get({function: 'user'}, function (res, error) {
                    $scope.users = res;
                    $scope.user = res[0];
                    $scope.$apply();
                });
                
            },
            controllerAs: "com"
        };
    }]);
    
})();
(function() {

    var app = angular.module('Calendar', []);

    app.directive("weekCalendar", ['$http', '$q', function($http, $q) {

        function reload(user, view) {
            if(user.username)
                user = user.username;
            
            $('#weekCalendar').fullCalendar('removeEvents');
            //Get start of week day
            var mom = $('#weekCalendar').fullCalendar('getView').start;

            var store = new DateStore(user);
            store.getWeek(function(results) {
                var weeks = new DayCollection(results);
                
                var m = moment(mom.format('DD-MM-YYYY'), 'DD-MM-YYYY');
                m.day(0); //set weekday to sunday
                
                
                dpd.day.get({
                    userId: user,
                    $or: [{
                        day: m.format('DD-MM-YYYY')
                    }, {
                        day: m.add(1, 'd').format('DD-MM-YYYY')
                    }, {
                        day: m.add(1, 'd').format('DD-MM-YYYY')
                    }, {
                        day: m.add(1, 'd').format('DD-MM-YYYY')
                    }, {
                        day: m.add(1, 'd').format('DD-MM-YYYY')
                    }, {
                        day: m.add(1, 'd').format('DD-MM-YYYY')
                    }, {
                        day: m.add(1, 'd').format('DD-MM-YYYY')
                    }]
                }, function(res) {

                    var weekDays = new DayCollection(res);
                    var m = moment(mom.format('DD-MM-YYYY'), 'DD-MM-YYYY');
                    m.day(0);

                    dpd.moment.get({
                        userId: user,
                        $or: [{
                            day: m.format('DD-MM-YYYY')
                        }, {
                            day: m.add(1, 'd').format('DD-MM-YYYY')
                        }, {
                            day: m.add(1, 'd').format('DD-MM-YYYY')
                        }, {
                            day: m.add(1, 'd').format('DD-MM-YYYY')
                        }, {
                            day: m.add(1, 'd').format('DD-MM-YYYY')
                        }, {
                            day: m.add(1, 'd').format('DD-MM-YYYY')
                        }, {
                            day: m.add(1, 'd').format('DD-MM-YYYY')
                        }]
                    }, function(res) {

                        var moments = new DayCollection(res);
                        var events = [];
                        
                        for(var i = 0; i < 7; i++){
                            var m = moment(mom.format('DD-MM-YYYY'), 'DD-MM-YYYY');
                            var date = m.add(i, 'd').format('DD-MM-YYYY');
                            var d = weekDays.getDay(date) ? weekDays.getDay(date) : weeks.getDay(i);
                            
                            if(d){
                                var day = new Day(date, d, moments.getDays(date));
                                var ev = day.buildEvents();
                                for(var j = 0; j < ev.length; j++)
                                    events.push(ev[j]);
                            }
                            
                        }
                        
                       
                        $('#weekCalendar').fullCalendar( 'addEventSource', events );
                    });

                });
            });
        };

        return {
            restrict: 'E',
            replace: true,
            templateUrl: "directives/weekcalendar.directive.html",
            scope: {
                edit: '=',
                userId: '=',
                day: '=',
                month: '=',
                year: '='
            },
            controller: function() {

            },
            controllerAs: "nav",
            link: function(scope, element) {
                var height = .70 * $(document).height();
                var timeNow = moment().format('HH:mm:ss');
                var dateNow = moment().format('YYYY-MM-DD');

                element.fullCalendar({
                    firstDay: 0,
                    columnFormat: 'D - dddd',
                    titleFormat: 'DD MMMM YYYY',
                    timeFormat: 'H:mm',
                    lang: 'pt',
                    header: {
                        left: '',
                        center: 'title',
                        right: 'prev,next'
                    },
                    defaultView: 'agendaWeek',
                    editable: false,
                    now: dateNow,
                    allDaySlot: false,
                    slotDuration: '00:15:00',
                    slotLabelFormat: 'HH:mm',
                    minTime: '08:30:00',
                    maxTime: '22:29:00',
                    contentHeight: height,
                    //scrollTime: timeNow,
                    viewRender: function(view, element) {
                        reload(scope.userId, view);
                    },
                    

                });
            }
        };
    }]);

})();
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
(function(){
    
    var app = angular.module('Indicadores',['Results']);
    
    app.controller('IndicadoresController', ['$scope', '$http', function($scope, $http) {
        
        $scope.date = moment().format('DD-MM-YYYY');
        $scope.objectivos = new BuildObj('unknown');
        $scope.data = new BuildObjDay('unknown');
        $scope.init = false;
        $scope.control = 1;
        
        $scope.res = {
            sft: new calcRes($scope.data.sft),
            adsl: new calcRes($scope.data.adsl),
            meo: new calcRes($scope.data.meo),
            total: new ObjResults([$scope.data])
        }
        
        $scope.load = function(username){
            
            WAIT(true);
            $scope.init = false;
            
            var qObjectivos = {
                user: username,
                date: $scope.date.substring(3)
            }; //query de objectivos
            
            dpd.objectivos.get(qObjectivos, function(lista, err){
                if(err || lista.length == 0){
                    dhtmlx.message({type: "error", text:"Erro ao carregar objectivos, valores por defeito carregados"});
                    $scope.objectivos = new BuildObj(username);
                }
                else{
                    $scope.objectivos = lista[0];
                }
                
                var qDay = {
                    user: username,
                    date: $scope.date
                }
                
                dpd.objday.get(qDay, function(lista, err){
                    WAIT(false);
                    
                    if(err || lista.length == 0){
                        dhtmlx.message({type: "error", text:"Sem indicadores, valores por defeito carregados"});
                        $scope.data = new BuildObjDay(username);
                        $scope.save();
                    } else{
                        dhtmlx.message("Indicadores carregados com sucesso");
                        $scope.data = lista[0];
                    }
                    $scope.$apply();
                    $scope.init = true;
                });
            });
        };
        
        $scope.save = function(){
            $scope.init = false;
            var str = angular.toJson($scope.data);
            var data = JSON.parse(str);
            
            dpd.objday.post(data, function(res, err){
                
                if(err){
                    console.log(err);
                    dhtmlx.message({type: "error", text:"Erro ao guardar alterações"});
                    return;
                }
                dhtmlx.message("Alterações guardadas");
                $scope.init = true;
            });
            
        };
        
        $('#input-date').datepicker({
            format: "dd-mm-yyyy",
            language: "pt"
        });
        
        $scope.$watch('control', function(newVal, oldval){
            $scope.res.sft = new calcRes($scope.data.sft);
            $scope.res.adsl = new calcRes($scope.data.adsl);
            $scope.res.meo = new calcRes($scope.data.meo);
            $scope.res.total = new ObjResults([$scope.data]);
            if($scope.init) $scope.save();
        });
        
        $scope.$watchCollection('data.carga', function(newVal, oldVal){
            if($scope.init) $scope.save();
        });
        
        $scope.$watch('date', function(a, b) {
            if($scope.init) $scope.load($scope.user.username);
        })
        
        dpd.people.me(function(ME, err){
            if(err){
                dhtmlx.message({type: "error", text:"Erro ao carregar detalhes pessoais"});
                return;
            }
            
            $scope.user = ME;
            $scope.load(ME.username);
        })
        
    }]);
    
    app.controller('ObjectivosController', ['$scope', '$http', function($scope, $http) {
        
        $scope.mList = [{v:'01', n:'Janeiro'}, {v:'02', n:'Fevereiro'}, {v:'03', n:'Março'}, 
                        {v:'04', n:'Abril'}, {v:'05', n:'Maio'}, {v:'06', n:'Junho'}, {v:'07', n:'Julho'}, 
                        {v:'08', n:'Agost'}, {v:'09', n:'Setembro'}, {v:'10', n:'Outubro'}, 
                        {v:'11', n:'Novembro'}, {v:'12', n:'Dezembro'}];
                        
        $scope.yList = [];
        for(var i = 2016; i < 2030; i++) $scope.yList.push(i + '');
                        
        $scope.month = $scope.mList[parseInt(moment().format('MM')) - 1];
        $scope.year = moment().format('YYYY');
        $scope.ready = false;
        
        $scope.data = new BuildObj('Unknown');
        $scope.results = [new BuildObjDay('Unknown')];
        $scope.results[0].sft.push({val:'FOT'});
        $scope.res = new ObjResults($scope.results);
        
        $scope.load = function(username){
            
            WAIT(true);
            $scope.ready = false;
            
            var query = {
                user: username,
                date: $scope.month.v +'-'+$scope.year
            }
            
            dpd.objectivos.get(query, function(lista, err){
                if(err || lista.length == 0){
                    dhtmlx.message({type: "error", text:"Erro ao carregar objectivos, valores por defeito carregados"});
                    $scope.data = new BuildObj(username);
                }
                else{
                    $scope.data = lista[0];
                    dhtmlx.message("Objectivos carregados com sucesso");
                }
                var now = moment('01-'+query.date, 'DD-MM-YYYY');
                query = {
                    user: username,
                    $or: []
                }
                
                while(now.format('MM') == $scope.month.v){
                    query.$or.push({date: now.format('DD-MM-YYYY')});
                    now.add(1, 'd');
                }
                
                
                dpd.objday.get(query, function(lista, err){
                    
                    if(err){
                        dhtmlx.message({type: "error", text:"Erro ao carregar indicadores, valores por defeito carregados"});
                        $scope.results = [new BuildObjDay('Unknown')];
                    }
                    else{
                        $scope.results = lista;
                        $scope.res = new ObjResults($scope.results);
                        dhtmlx.message("Indicadores carregados com sucesso");
                    }
                    
                    $scope.$apply();
                    WAIT(false);
                    $scope.ready = true;
                    
                });
            });
        };
        
        $scope.save = function(){
            if(!$scope.ready) return;
            
            $scope.ready = false;
            dpd.objectivos.post($scope.data, function(d, err){
                if(err){
                    console.log(err);
                    dhtmlx.message({type: "error", text:"Erro ao guardar alterações"});
                    return;
                }
                dhtmlx.message("Alterações guardadas");
                $scope.ready = true;
            });
        };
        
        dpd.people.me(function(ME, err){
            if(err){
                dhtmlx.message({type: "error", text:"Erro ao carregar detalhes pessoais"});
                return;
            }
            
            $scope.user = ME;
            $scope.load(ME.username);
        })
        
        $scope.$watch('month', function(a,b){
            if($scope.ready)
                $scope.load($scope.user.username);
        });
        
        $scope.$watch('year', function(a,b){
            if($scope.ready)
                $scope.load($scope.user.username);
        });
        
    }]);
    
})();