function calcRes(arr){
    
    function def(){
        return {
            fot: 0,
            bot: 0,
            ff: 0,
            t: 0
        };
    };
    
    var e = new def();
    
    for(var i = 0; i < arr.length; i++){
        switch(arr[i].val){
            case 'FOT':
                e.fot++;
                break;
            case 'BOT':
                e.bot++;
                break;
            case 'FF':
                e.ff++;
                break;
            default:
                continue;
        }
        
        e.t++;
    }
    
    return e;
};