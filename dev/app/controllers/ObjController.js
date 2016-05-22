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