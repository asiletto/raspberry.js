function buildDailyChart(containerDiv, gap, valueLabel, chartTitle, xAxisFormat, tooltipSuffix, yAxisFormat, tooltipFormat, values, chartColor){
	var chart;
	var options = {
				
				chart: {
					renderTo: containerDiv,
					animation: false,
					zoomType: 'x'
				},
				
				title: {
					text: chartTitle
				},
			
				xAxis: {
					title: {
						text: "Hour of day"
					}
				},
				
				yAxis: {
					title: {
						text: valueLabel
					},
					labels: {
						format: xAxisFormat
					}
				},
				
				xAxis: {
					allowDecimals: false,
					labels: {
						format: yAxisFormat
					}
				},
				
				tooltip: {
					crosshairs: true,
					shared: true,
					valueDecimals: 1,
					headerFormat: tooltipFormat,
					valueSuffix: tooltipSuffix
				},
				
				plotOptions: {
					series: {
						cursor: 'ns-resize',
						point: {
							events: {
								
								drag: function(e) {
									// Returning false stops the drag and drops. Example:
									/*
									if (e.newY > 300) {
										this.y = 300;
										return false;
									}
									*/
									$('#drag').html(
										'Dragging <b>' + this.series.name + '</b>, <b>' +
										this.category + '</b> to <b>' + 
										Highcharts.numberFormat(e.newY, 2) + '</b>'
									);
								},
								drop: function() {
									$('#drop').html(
										'In <b>' + this.series.name + '</b>, <b>' +
										this.category + '</b> was set to <b>' + 
										Highcharts.numberFormat(this.y, 2) + '</b>'
									);
									
									chart.series[1].data[this.x-1].update([this.y+gap, this.y-gap]); 
								}
							}
						},
						stickyTracking: false
					},
					column: {
						stacking: 'normal'
					}
				},
			
				series: [{
					name: valueLabel,
					data: values,
					draggableY: true,
					zIndex: 1,
					color: chartColor,
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor: chartColor
					}
				}],
				
				exporting: {
					sourceWidth: 800,
					sourceHeight: 300,
				}
			
			};
			
			var rangeSerie = {
					name: 'Range',
					data: [],
					type: 'arearange',
					lineWidth: 0,
					linkedTo: ':previous',
					color: chartColor,
					fillOpacity: 0.3,
					zIndex: 0
				};
			//initial range
			for(var i=0;i<values.length;i++){
				var item = values[i];
				//alert(item[0]);
				rangeSerie.data.push([item[0], item[1]+gap, item[1]-gap]);
			}
			options.series.push(rangeSerie);
			 
			chart = new Highcharts.Chart(options);
			
			return chart;
}