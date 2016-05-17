function DateStore(userId) {
    
    var user = userId;
    
    this.getWorkDay = function(weekDay, callback){
        dpd.day.get({userId: user, day: weekDay}, callback);
    };
    
    this.getWeek = function(callback){
        dpd.day.get({userId: user, $or: [{
            day: '0'
        },{
            day: '1'
        },{
            day: '2'
        },{
            day: '3'
        },{
            day: '4'
        },{
            day: '5'
        },{
            day: '6'
        }]}, callback);
    };
    
    this.searchDay = function(array, date){
        for(var i = 0; i < array.length; i++){
            if(array[i].day == date)
                return array[i];
        }
        
        return {
            begin: '09:00',
            end: '18:00',
            haslunch: true,
            lunchBegin: '13:00',
            lunchEnd: '14:00',
            userId: '',
            day: date,
            isAvaible: false,
            type: '',
            title: ''
        }
    };
}