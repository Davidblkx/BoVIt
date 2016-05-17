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