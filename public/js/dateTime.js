function ObjResults(arrayResults){
    
    function count(arr, val) {
        var count = 0;
        for(var i = 0; i < arr.length; i++){
            if(arr[i].val == val)
                count++;
        }
        
        return count;
    }
    
    var def = function(){
        return {
            fot:0, 
            bot:0, 
            ff:0,
            total: function(){
                return this.fot + this.bot + this.ff;
            }
        };
    };
    
    var obj = {
        
        source: arrayResults,
        sft: new def(),
        meo: new def(),
        adsl: new def(),
        
        fot: 0,
        bot: 0,
        ff: 0,
        
        h: 0,
        t: 0,
    };
    
    for(var i = 0; i < arrayResults.length; i++){
        obj.sft.fot = obj.sft.fot + count(arrayResults[i].sft, 'FOT');
        obj.sft.bot += count(arrayResults[i].sft, 'BOT');
        obj.sft.ff += count(arrayResults[i].sft, 'FF');
        
        obj.meo.fot += count(arrayResults[i].meo, 'FOT');
        obj.meo.bot += count(arrayResults[i].meo, 'BOT');
        obj.meo.ff += count(arrayResults[i].meo, 'FF');
        
        obj.adsl.fot += count(arrayResults[i].adsl, 'FOT');
        obj.adsl.bot += count(arrayResults[i].adsl, 'BOT');
        obj.adsl.ff += count(arrayResults[i].adsl, 'FF');
        
        obj.h += parseInt(arrayResults[i].carga);
    }
    
    obj.fot = obj.sft.fot + obj.meo.fot + obj.adsl.fot;
    obj.bot = obj.sft.bot + obj.meo.bot + obj.adsl.bot;
    obj.ff = obj.sft.ff + obj.meo.ff + obj.adsl.ff;
    
    obj.t = obj.fot + obj.bot + obj.ff;
    
    obj.calc = function(target, val){
        return ((target[val] / (target.fot + target.bot + target.ff)) * 100).toPrecision(3);
    };
    
    return obj;
}
//date - date in format DD-MM-YYYY
//a day object from database
//a list of moments from database
function Day(date, day, moments){
    
    var obj = {
        title: day.type,
        user: day.userId,
        date: moment(date, "DD-MM-YYYY"),
        isAvaible: day.isAvaible,
        hasLunch: day.hasLunch,
        start: moment(date, "DD-MM-YYYY"),
        end: moment(date, "DD-MM-YYYY"),
        sLunch: moment(date, "DD-MM-YYYY"),
        eLunch: moment(date, "DD-MM-YYYY"),
        states: []
    };
    
    for(var i = 0; i < moments.length; i++){
        var o = moments[i];
        
        if(o)
            obj.states.push(new State(day, o.begin, o.end, o.isAvaible, o.title));
    }
    
    var s = day.begin.split(':');
    var e = day.end.split(':');
    
    obj.start.hour(s[0]).minutes(s[1]);
    obj.end.hour(e[0]).minutes(e[1]);
    
    if(day.hasLunch){
        s = day.lunchBegin.split(':');
        e = day.lunchEnd.split(':');
        
        obj.sLunch.hour(s[0]).minutes(s[1]);
        obj.eLunch.hour(e[0]).minutes(e[1]);
    }else{
        obj.sLunch = obj.end;
        obj.eLunch = obj.start;
    }
    
    obj.checkState = function(time){
        
        if(!this.isAvaible) return false;
        
        var m = moment(date, 'DD-MM-YYYY');
        m.hour(time.split(':')[0]).minutes(time.split(':')[1]);
        
        for(var i = 0; i < this.states.length; i++){
            if(m >= this.states[i].getStart() && m <= this.states[i].getEnd())
                return this.states[i].isAvaible;
        }
        
        if(m >= this.start && m < this.end && (!this.hasLunch || m < this.sLunch || m >= this.eLunch) )
            return true;
        
        return false;
    };
    
    obj.buildEvents = function(){
        
        var events = [];
        
        if(this.hasLunch){
                        
            events = [{
                title: this.title,
                allDay: false,
                start: this.start.format(),
                end: this.sLunch.format(),
                editable: false
            }, {
                title: this.title,
                allDay: false,
                start: this.eLunch.format(),
                end: this.end.format(),
                editable: false
            }];
        }
        else{
            events = [{
                title: this.title,
                allDay: false,
                start: this.start.format(),
                end: this.end.format(),
                editable: false
            }];
        }
        
        for(var i = 0; i < this.states.length; i++){
            var m = this.states[i];
            events.push({
                title: m.isAvaible ? 'Horas +' : 'Horas -',
                allDay: false,
                start: m.getStart().format(),
                end: m.getEnd().format(),
                editable: false
            });
        }
        
        return events;
    };
    
    return obj;
}

function State(date, start, end, isAvaible, name) {
    return {
        date: date,
        start: start,
        end: end,
        name: name,
        isAvaible: isAvaible,
        getStart: function(){
            var s = this.start.split(':');
            return moment(date, 'DD-MM-YYYY').hour(s[0]).minutes(s[1]);
        },
        getEnd: function(){
            var s = this.end.split(':');
            return moment(date, 'DD-MM-YYYY').hour(s[0]).minutes(s[1]);
        }
    }
}
function DayCollection(days){
    
    return {
        collection : days,
        getDay: function(day){
            
            for(var i = 0; i < this.collection.length; i++){
                if(this.collection[i].day == day)
                    return this.collection[i]; 
            }
            
            return undefined;
        },
        getDays: function(day){
            var list = [];
            for(var i = 0; i < this.collection.length; i++){
                if(this.collection[i].day == day)
                    list.push(this.collection[i]); 
            }
            
            return list;
        }
    }
    
}
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