//global
var qg = qg || {};

// glue
qg.glue = qg.glue || {};

qg.glue.loader = {
    init : function (callback) {
        if($("#charts").length > 0)  this.loadCharts(callback);
        else this.commonLibs(callback);
    },
    commonLibs : function (callback) {
        console.log("common lib loaded");
        $.getScript("http://asifamin.github.io/glue-module-loader/htdocs/assets/js/common.js" , callback);
    },
    loadCharts : function (callback) {
        console.log("charts lib loaded");
        $.getScript("http://asifamin.github.io/glue-module-loader/htdocs/assets/js/charts.js" , callback);
    }
};




    
