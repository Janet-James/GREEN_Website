 // Based on https://gist.github.com/blixt/f17b47c62508be59987b
 var _seed = 42;
 Math.random = function() {
   _seed = _seed * 16807 % 2147483647;
   return (_seed - 1) / 2147483646;
 };

 var colors = [
   '#008FFB',
   '#00E396',
   '#FEB019',
   '#FF4560',
   '#775DD0',
   '#546E7A',
   '#26a69a',
   '#D10CE8'
 ]


 var options = {
   series: [{
   data: [18, 77, 42, 22, 62, 55, 13]
 }],
   chart: {
   height: 350,
   type: 'bar',
   events: {
     click: function(chart, w, e) {
       // console.log(chart, w, e)
     }
   }
 },
 colors: colors,
 plotOptions: {
   bar: {
     columnWidth: '45%',
     distributed: true,
   }
 },
 dataLabels: {
   enabled: false
 },
 legend: {
   show: false
 },
 xaxis: {
   categories: [
     1,
     2,
     3,
     4,
     5,
     6,
     7 
   ],
   labels: {
     style: {
       colors: colors,
       fontSize: '12px'
     }
   }
 }
 };

 var chart = new ApexCharts(document.querySelector("#historyChart"), options);
 chart.render();