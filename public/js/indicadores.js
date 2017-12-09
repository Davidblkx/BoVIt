function BuildObjDay(user) {
    return {
        user: user,
        date: moment().format('DD-MM-YYYY'),
        meo: [],
        sft: [],
        adsl: [],
        carga: 0
    };
}

function BuildObj(user) {
    return {
        user: user,
        date: moment().format('MM-YYYY'),
        meo: 50,
        sft: 50,
        adsl: 50,
        total: 50,
        ff: 50,
        carga: 3
    };
}
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