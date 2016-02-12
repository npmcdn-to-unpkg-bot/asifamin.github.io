// globals
var qg = qg || {};

/*global qg*/
(function(qg) {
    'use strict';

    var mapper = {
        chartDep : [
            "http://asifamin.github.io/glue-module-lib/assets/js/lib.js",
            "https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.2.3/highcharts.js"
        ]
    }

    qg.initLoad = function(dm , callbackFunc){

        jQuery.getScript("https://cdnjs.cloudflare.com/ajax/libs/headjs/1.0.3/head.min.js" , function(e){
            head.load(dm, function() {
                callbackFunc()
            });
        });
    }

    qg.loadChartdepen =  function(callbackFunc){

        if($("#chart").length > 0){
            console.log('chart id found');
            qg.initLoad(mapper.chartDep , callbackFunc);
        }
        else {
            console.log('Please make sure you have included the "chart" id preferable on the body tag to load the dependencies');
        }
    }
}(qg));



