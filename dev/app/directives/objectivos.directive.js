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