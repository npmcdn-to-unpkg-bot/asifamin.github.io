console.log('%c loader module loaded ', 'background: #222; color: #bada55');
//global
var qg = qg || {};

// glue
qg.glue = qg.glue || {};

qg.glue.loader = {
    init : function (callback) {
        this.checkJquery();
        if($(".qg-glue-charts").length > 0)  this.loadCharts(callback);
        else this.commonLibs(callback);
    },
    commonLibs : function (callback) {
        console.log('%c loader could not find any specific classes so just the common libraries has been loaded ', 'background: #222; color: #bada55');
        $.getScript("http://asifamin.github.io/glue-module-loader/htdocs/assets/js/common.js" , callback);
    },
    loadCharts : function (callback) {
        console.log('%c charts libraries has been loaded', 'background: #222; color: #bada55');
        $.getScript("http://asifamin.github.io/glue-module-loader/htdocs/assets/js/charts.js" , callback);
    },
    checkJquery : function () {
        var jQueryScriptOutputted = false;
        //if the jQuery object isn't available
        if (typeof(jQuery) == 'undefined') {

            if (! jQueryScriptOutputted) {
                //only output the script once..
                jQueryScriptOutputted = true;

                //output the script (load it from google api)
                document.write("<scr" + "ipt type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'></scr" + 'ipt>')
            }

        } else {
            console.log("jquery is already there");
        }
    }
};




    
