function ObjResults(arrayResults){
    
    function count(arr, val) {
        var count = 0;
        for(var i = 0; i < arr.length; i++){
            if(arr[i].val == val)
                count++;
        }
        
        return count;
    }
    
    var def = function(){return {fot:0, bot:0, ff:0};};
    
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