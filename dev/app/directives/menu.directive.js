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
            if (directiveData) {
                //if we already have data, return that.
                deferred.resolve(directiveData);
            } else {
                $http.get('/people/me')
                    .success(function(data) {
                        directiveData = data;
                        deferred.resolve(directiveData);
                    })
                    .error(function() {
                        deferred.reject('Failed to load data');
                    });
            }
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
                loadData().then(function(data) {
                    scope.user = data;
                });
            }
        };
    }]);
    
})();