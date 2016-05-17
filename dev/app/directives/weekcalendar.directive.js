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
                    scrollTime: timeNow,
                    viewRender: function(view, element) {
                        reload(scope.userId, view);
                    },
                    

                });
            }
        };
    }]);

})();