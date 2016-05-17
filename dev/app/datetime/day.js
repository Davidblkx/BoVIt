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