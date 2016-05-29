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