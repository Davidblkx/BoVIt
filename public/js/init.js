LOAD_LIVERELOAD = false;
/*global LOAD_LIVERELOAD dpd dhtmlx*/
if(LOAD_LIVERELOAD){
    
    //WRITE LIVERELOAD SCRIPT
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
        ':35729/livereload.js"></' + 'script>');
}

function COPY_TXT(selector) {
    document.querySelector(selector).select();
    try{
        if(document.execCommand('copy')){
            console.log('Copy to clipboard completed');
        }else{
            console.log('Copy to clipboard not completed');
        }
    }
    catch (err){
        console.log('Error at copy to clipboard:', err);
    }
}

function WAIT(state){
    if(state) $("#divWait").show();
    else $("#divWait").hide();
}