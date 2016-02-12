var dependencyManager = (function(){
    var loadChartdepen =  function(){
      if($("#charts").length > 0){
        console.log('chart is present');
        //head.load("style.css", function(){});
        head.load(["http://asifamin.github.io/glue-module-lib/assets/js/lib.js", "https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.2.3/highcharts.js"], function() {
            console.log('highchart lib loaded');
            });
        }
    }

  return {
    loadChartdepen : loadChartdepen()
  }


})();


//# sourceMappingURL=loader.js.map
