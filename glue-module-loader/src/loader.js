var glue = {
    loadCharts : function (callback) {
        if($("#charts").length > 0){
            console.log("yes");
            $.getScript("http://asifamin.github.io/glue-module-loader/htdocs/assets/js/charts.js" , callback);
        }
    }
};

    
