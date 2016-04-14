var domain = (window.location.href.indexOf("qld-uat.ssq.qld.gov.au") > -1 ? 'staging.data.qld.gov.au' : 'data.qld.gov.au');

$('body').addClass(domain == 'data.qld.gov.au' ? 'prod' : 'test env-uat');


if (domain != 'data.qld.gov.au') {
    $('#ictb-intro').prepend('<p style="color:#f00; font-size: 1.5em"><strong>DATA FOR TEST USE ONLY</strong></p>');
}

function SortByExpenditure(x, y) {
    return y.totalprojects - x.totalprojects;
}

displayStatusDashboard = function (seriesData) {
    var minDisplay = 1,
        xAxisTitle = "Total number of projects",
        yLabels = [],
        yLabelsFull = [],
        yLabelsTotalProjects = [],
        redVals = [],
        amberVals = [],
        greenVals = []
        ;
    $.each(seriesData, function (item, value) {
        redVals.push(parseFloat(value.red));
        amberVals.push(parseFloat(value.amber));
        greenVals.push(parseFloat(value.green));
        yLabels.push(value.Agency);
        yLabelsFull.push(value.AgencyName);
        yLabelsTotalProjects.push(value.totalprojects);
    });

    $('#containerProjectStatus').highcharts({
        chart: {
            type: 'bar',
            backgroundColor: '#fff',
            marginLeft: 120
        },
        credits: {
            enabled: false
        },
        title: {
            text: (($('#ictdb.small')[0]) ? 'Status of projects' : ''),
            style: {
                fontSize: '16px',
                font: 'Trebuchet MS, Verdana, sans-serif',
                fontWeight: 'bold'
            }
        },
        tooltip: {
            enabled: false
        },
        xAxis: {
            categories: yLabels,
            lineColor: 'rgba(0,0,0,0.2)',
            gridLineWidth: 1,
            tickLength: 150,
            tickColor: 'rgba(0,0,0,0.2)',
            gridLineColor: 'rgba(0,0,0,0.2)',
            labels: {
                style: {
                    color: '#525151',
                    fontSize: (($('#ictdb.small')[0]) ? '14px' : '12px'),
                    font: 'Trebuchet MS, Verdana, sans-serif',
                    fontWeight: 'bold'

                },
                formatter: function () {
                    return '<a href="projects?Agency=' + this.value + '"><abbr title="' + yLabelsFull[jQuery.inArray(this.value, yLabels)] + '">' + this.value + '</abbr></a>' + ( yLabelsTotalProjects[jQuery.inArray(this.value, yLabels)] > 0 ? ' (' + yLabelsTotalProjects[jQuery.inArray(this.value, yLabels)] + ')' : '')
                },
                useHTML: true,
                cursor: 'pointer'
            }
        },
        yAxis: {
            gridLineWidth: 0.5,
            gridLineColor: '#eee',
            minPointLength: 20,
            tickLength: 5,
            tickColor: '#eee',
            tickWidth: 1,
            minTickInterval: 5,
            allowDecimals: false,
            labels: {
                style: {
                    color: '#525151',
                    fontSize: '10px',
                    font: 'Trebuchet MS, Verdana, sans-serif',
                    fontWeight: 'bold'
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
                    fontSize: '14px',
                    font: 'Trebuchet MS, Verdana, sans-serif'
                },
                formatter: function () {  // if a label has less than 1 value - do not output label onto graph
                    var valStack;
                    if (this.total === 0) {
                        valStack = 'Nil projects';
                    } else {
                        valStack = '';
                    }
                    return valStack;
                }
            },
            title: {
                text: 'Projects by department',
                align: 'left',
                style: {
                    fontWeight: 'bold',
                    color: 'black'
                }
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                borderWidth: 2,
                dataLabels: {
                    style: {
                        color: '#525151',
                        fontSize: '12px',
                        font: 'Trebuchet MS, Verdana, sans-serif',
                        fontWeight: 'bold'
                    },
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    formatter: function () {  // if a label has less than 1 value - do not output label onto graph
                        var val = this.y;
                        if (val < minDisplay || val === 'NaN') {
                            val = '';
                        }
                        if (this.point.stackTotal === '0') {
                            val = 'Nil projects';
                        }
                        return val;
                    }
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            var gar = '';
                            if (this.series.name === 'Green') {
                                gar = '&ProjectStatusG=G'
                            }
                            if (this.series.name === 'Amber') {
                                gar = '&ProjectStatusA=A'
                            }
                            if (this.series.name === 'Red') {
                                gar = '&ProjectStatusR=R'
                            }
                            location.href = 'projects?Agency=' + yLabels[this.x] + gar;
                        }
                    }
                } // end point
            }
        },
        series: [{
            name: 'Red',
            data: redVals,
            color: 'red',
            pointWidth: (($('#ictdb.small')[0]) ? 26 : 16)
        }, {
            name: 'Amber',
            data: amberVals,
            color: 'rgba(255,165,0,1)',
            pointWidth: (($('#ictdb.small')[0]) ? 26 : 16)
        }, {
            name: 'Green',
            data: greenVals,
            color: 'rgba(120,186,0,1)',
            pointWidth: (($('#ictdb.small')[0]) ? 26 : 16)
        }]
    });
    $('.highcharts-container').filter(function (index) {
        return $(this).text() === "0";
    }).text('Nil projects');
};
displayExpendituresDashboard = function (seriesData) {

    var minDisplay = 2,
        xAxisTitle = "Total number of projects",
        yLabels = [],
        yLabelsFull = [],
        actualCostVals = [],
        revisedExpenditureVals = [],
        maxRevisedExpenditureVals = 0
        ;
    $.each(seriesData, function (item, value) {
        yLabels.push(value.Agency);
        yLabelsFull.push(value.AgencyName);
        actualCostVals.push(parseFloat(value.totalactualcost));
        revisedExpenditureVals.push(parseFloat(value.totalrevisedexpenditure));
    });

    // set max width of bar graph for expenditure - different value for small devides and med/large due to text size
    (($('#ictdb.small')[0]) ? maxRevisedExpenditureVals = Math.max.apply(Math, revisedExpenditureVals) * 2 : maxRevisedExpenditureVals = Math.max.apply(Math, revisedExpenditureVals) * 1.2);

    $('#containerProjectExpenditure').highcharts({
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        title: {
            text: (($('#ictdb.small')[0]) ? 'Expenditure of projects' : ''),
            style: {
                fontSize: (($('#ictdb.small')[0]) ? '16px' : '12px'),
                font: 'Trebuchet MS, Verdana, sans-serif',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: yLabels,
            lineColor: 'rgba(0,0,0,0.2)',
            gridLineWidth: 1,
            tickLength: 100,
            tickColor: 'rgba(0,0,0,0.2)',
            gridLineColor: 'rgba(0,0,0,0.2)',
            labels: {
                enabled: (($('#ictdb.small')[0]) ? true : false),
                style: {
                    color: '#525151',
                    fontSize: (($('#ictdb.small')[0]) ? '14px' : '12px'),
                    font: 'Trebuchet MS, Verdana, sans-serif',
                    fontWeight: 'bold'
                },
                formatter: function () {
                    return '<a href="projects?Agency=' + this.value + '"><abbr title="' + yLabelsFull[jQuery.inArray(this.value, yLabels)] + '">' + this.value + '</abbr></a>'
                },
                useHTML: true,
                cursor: 'pointer'
            }
        },
        yAxis: {
            min: 0,
            max: maxRevisedExpenditureVals,
            title: {
                text: 'Expenditure by department',
                align: 'left',
                style: {
                    fontWeight: 'bold',
                    color: 'black'
                }
            },
            gridLineWidth: 0.5,
            gridLineColor: '#eee',
            minTickInterval: 25000000,
            labels: {
                style: {
                    color: '#525151',
                    fontSize: '10px',
                    font: 'Trebuchet MS, Verdana, sans-serif',
                    fontWeight: 'bold'
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            column: {
                grouping: true,
                shadow: false,
                borderWidth: 0
            },
            series: {
                dataLabels: {
                    enabled: true,
                    color: 'black',
                    style: {
                        fontSize: (($('#ictdb.small')[0]) ? '14px' : '11px'),
                        font: 'Trebuchet MS, Verdana, sans-serif',
                    },
                    formatter: function () {
                        var out = '<span class="col-chart-label">',
                            series = this.point.series.chart.series,
                            p1 = series[0].yData[this.point.x],
                            p2 = series[1].yData[this.point.x];
                        p1 = '$' + Math.round((p1 / 1000000) * 10) / 10 + 'M';
                        p2 = '$' + Math.round((p2 / 1000000) * 10) / 10 + 'M';
                        if (p1 === '$0M' && p2 === '$0M' && !($('#ictdb.small')[0])) {
                            return '';
                        } else {
                            out += p2 + ' / ' + p1;
                            out += '</span>'
                            return out;
                        }
                    },
                    useHTML: true
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            location.href = 'projects/?Agency=' + yLabels[this.x] + '&offset=0&direction=desc&sort=Revised+total+estimated+expenditure';
                        }
                    }
                } // end point
            }
        },
        series: [{
            name: 'Budget',
            color: 'rgba(140,140,140,0.8)',
            borderColor: 'rgba(40,40,40,0.4)',
            data: revisedExpenditureVals,
            pointPadding: 0,
            pointPlacement: .2,
            pointWidth: (($('#ictdb.small')[0]) ? '20' : '14'),
            dataLabels: {
                enabled: true
            }
        }, {
            name: 'Spent',
            color: 'rgba(0,126,177,1)',
            borderColor: 'rgba(0,106,157,1)',
            data: actualCostVals,
            pointPadding: 0,
            pointPlacement: -.10,
            pointWidth: (($('#ictdb.small')[0]) ? '14' : '10'),
            dataLabels: {
                enabled: false
            }
        }]
    });
}

displayProjectDashboards = function (jsonData) {
    if (jsonData.result.records.length > 0) {
        var seriesData = jsonData.result.records;
        seriesData.sort(SortByExpenditure);
        displayStatusDashboard(seriesData);
        displayExpendituresDashboard(seriesData);
    }
};
var table = 'ictdashboards_tables()';

getProjectListByDepartment = function () {
    // load json data
    var sql = 'SELECT DISTINCT da.\"Agency\", da.\"Agency name\" as \"AgencyName\", ' +
            '    	 		(select (CASE WHEN COUNT(*)>0 THEN COUNT(*) ELSE NULL END) from ' + table + ' d where da.\"Agency\" = d.\"Agency\") AS Total,' +
            '    	 		(select (CASE WHEN COUNT(*)>0 THEN COUNT(*) ELSE NULL END) from ' + table + ' d where \"Overall status\" = \'R\' and da.\"Agency\" = d.\"Agency\") AS RED,' +
            '    	 		(select (CASE WHEN COUNT(*)>0 THEN COUNT(*) ELSE NULL END) from ' + table + ' d where \"Overall status\" = \'A\' and da.\"Agency\" = d.\"Agency\") AS AMBER,' +
            '    	 		(select (CASE WHEN COUNT(*)>0 THEN COUNT(*) ELSE NULL END) from ' + table + ' d where \"Overall status\" = \'G\' and da.\"Agency\" = d.\"Agency\") AS GREEN,' +
            '    	 		(select SUM(\"Actual cost to date\") from ' + table + ' d where da.\"Agency\" = d.\"Agency\") AS TotalActualCost, ' +
            '    	 		(select SUM(\"Revised total estimated expenditure\") from ' + table + ' d where da.\"Agency\" = d.\"Agency\") AS TotalRevisedExpenditure, ' +
            '    	 		(select COUNT(*) from ' + table + ' d where da.\"Initiative name\"!=\'\' and da.\"Agency\" = d.\"Agency\") AS TotalProjects' +
            '    	 	FROM ' + table + ' da ' +
            '		ORDER BY da.\"Agency\"';
    qg.data.get(domain, sql, displayProjectDashboards);
};

getProjectListByDepartment();

//build chart using options above
$('#containerProjectStatus').highcharts({
    chart: {
        type: 'bar',
        backgroundColor: '#fff',
        marginLeft: 120
    },
    credits: {
        enabled: false
    },
    title: {
        text: (($('#ictdb.small')[0]) ? 'Status of projects' : ''),
        style: {
            fontSize: '16px',
            font: 'Trebuchet MS, Verdana, sans-serif',
            fontWeight: 'bold'
        }
    },
    tooltip: {
        enabled: false
    },
    xAxis: {
        categories: yLabels,
        lineColor: 'rgba(0,0,0,0.2)',
        gridLineWidth: 1,
        tickLength: 150,
        tickColor: 'rgba(0,0,0,0.2)',
        gridLineColor: 'rgba(0,0,0,0.2)',
        labels: {
            style: {
                color: '#525151',
                fontSize: (($('#ictdb.small')[0]) ? '14px' : '12px'),
                font: 'Trebuchet MS, Verdana, sans-serif',
                fontWeight: 'bold'

            },
            formatter: function () {
                return '<a href="projects?Agency=' + this.value + '"><abbr title="' + yLabelsFull[jQuery.inArray(this.value, yLabels)] + '">' + this.value + '</abbr></a>' + ( yLabelsTotalProjects[jQuery.inArray(this.value, yLabels)] > 0 ? ' (' + yLabelsTotalProjects[jQuery.inArray(this.value, yLabels)] + ')' : '')
            },
            useHTML: true,
            cursor: 'pointer'
        }
    },
    yAxis: {
        gridLineWidth: 0.5,
        gridLineColor: '#eee',
        minPointLength: 20,
        tickLength: 5,
        tickColor: '#eee',
        tickWidth: 1,
        minTickInterval: 5,
        allowDecimals: false,
        labels: {
            style: {
                color: '#525151',
                fontSize: '10px',
                font: 'Trebuchet MS, Verdana, sans-serif',
                fontWeight: 'bold'
            }
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
                fontSize: '14px',
                font: 'Trebuchet MS, Verdana, sans-serif'
            },
            formatter: function () {  // if a label has less than 1 value - do not output label onto graph
                var valStack;
                if (this.total === 0) {
                    valStack = 'Nil projects';
                } else {
                    valStack = '';
                }
                return valStack;
            }
        },
        title: {
            text: 'Projects by department',
            align: 'left',
            style: {
                fontWeight: 'bold',
                color: 'black'
            }
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            borderWidth: 2,
            dataLabels: {
                style: {
                    color: '#525151',
                    fontSize: '12px',
                    font: 'Trebuchet MS, Verdana, sans-serif',
                    fontWeight: 'bold'
                },
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                formatter: function () {  // if a label has less than 1 value - do not output label onto graph
                    var val = this.y;
                    if (val < minDisplay || val === 'NaN') {
                        val = '';
                    }
                    if (this.point.stackTotal === '0') {
                        val = 'Nil projects';
                    }
                    return val;
                }
            },
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        var gar = '';
                        if (this.series.name === 'Green') {
                            gar = '&ProjectStatusG=G'
                        }
                        if (this.series.name === 'Amber') {
                            gar = '&ProjectStatusA=A'
                        }
                        if (this.series.name === 'Red') {
                            gar = '&ProjectStatusR=R'
                        }
                        location.href = 'projects?Agency=' + yLabels[this.x] + gar;
                    }
                }
            } // end point
        }
    },
    series: [{
        name: 'Red',
        data: redVals,
        color: 'red',
        pointWidth: (($('#ictdb.small')[0]) ? 26 : 16)
    }, {
        name: 'Amber',
        data: amberVals,
        color: 'rgba(255,165,0,1)',
        pointWidth: (($('#ictdb.small')[0]) ? 26 : 16)
    }, {
        name: 'Green',
        data: greenVals,
        color: 'rgba(120,186,0,1)',
        pointWidth: (($('#ictdb.small')[0]) ? 26 : 16)
    }]
});