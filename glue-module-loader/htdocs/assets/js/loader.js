var glue = glue || {};
glue.loader = {
    init : function () {
        if($("#charts").length > 0)  this.loadCharts();
        else this.commonLibs();
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




    

//# sourceMappingURL=loader.js.map
