Ext.define('Hotplace.view.panel.LogChartPanel', {
	extend: 'Ext.tab.Panel',
	xtype: 'logchartpanel',
	initComponent: function() {
		var currentYear = Ext.getBody().getAttribute('data-year');
		var currentMonth = Ext.getBody().getAttribute('data-month');
		var currentDate = Ext.getBody().getAttribute('data-date');
		
		function makeComboYear() {
			var s = currentYear - 10;
			var data = [];
			for(var i=currentYear; i>=s; i--) {
				data.push({
					name: i + '년',
					value: i
				});
			}
			
			return data;
		}
		
		var accessTimeStore = Ext.create('Ext.data.Store', {
			fields : ['hour', 'cnt'],
			proxy : {
				type: 'ajax',
				url: 'statistic/accessTime?year=' + currentYear + '&month=' + currentMonth + '&day=' + currentDate,
				reader: {
					type: 'json',
					successProperty: 'success',
					root: 'datas'
				}
			},
			autoLoad: true,
			listeners: {
				
			}
		});
		
		var accessTimeChart = Ext.create('Ext.chart.Chart', {
            id: 'accessTimeChart',
            xtype: 'chart',
			width: 800,
            height: 500,
            //margin: '100 0 0 100',
            animate: true,
            shadow: true,
            store: accessTimeStore,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['cnt'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: '접속수',
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['hour'],
                title: '접속시간'
            }],
            series: [{
                type: 'line',
                axis: 'left',
                gutter: 80,
                xField: 'hour',
                yField: ['cnt'],
                tips: {
                	trackMouse: true,
                    width: 300,
                    height: 30,
                    layout: 'fit',
                    items: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [/*pieChart, grid*/]
                    },
                    renderer: function(klass, item) {
                    	console.log(klass)
                    	this.setTitle(klass.data.hour + '시 : 접속수 (' + klass.data.cnt + ')');
                    }
                }
            }]
        });
		
		var contentStore = Ext.create('Ext.data.Store', {
			fields : ['time', 'heatmap', 'mulgeon', 'sujiboonseog'],
			proxy : {
				type: 'ajax',
				url: 'statistic/content?year=' + currentYear + '&month=' + currentMonth,
				reader: {
					type: 'json',
					successProperty: 'success',
					root: 'datas'
				}
			},
			autoLoad: true,
			listeners: {
				
			}
		});
		
		
		var contentChartFieldPrefix = currentYear + '년 ' + currentMonth + '월 ';
		
		var contentChart = Ext.create('Ext.chart.Chart', {
            id: 'contentChart',
            xtype: 'chart',
			width: 800,
            height: 500,
            //margin: '100 0 0 100',
            animate: true,
            shadow: true,
            store: contentStore,
            legend: {position: 'right'},
            axes: [{
            	type: 'Numeric',
            	position: 'bottom',
            	fields: ['heatmap', 'mulgeon', 'sujiboonseog'],
            	title: false,
            	grid: true
            }, {
            	type: 'Category',
            	position: 'left',
            	fields: ['time'],
            	title: false,
            	label: {
            		renderer: function(v) {
            			console.log(v)
            			return contentChartFieldPrefix + ((v < 10) ? '0' + v : v) + '일';
            		}
            	}
            }],
            series: [{
            	type: 'bar',
            	axis: 'bottom',
            	gutter: 80,
            	xField: 'time',
            	yField: ['heatmap', 'mulgeon', 'sujiboonseog'],
            	stacked: true,
            	tips: {
            		trackMouse: true,
                    width: 100,
                    height: 28,
                    renderer: function(storeItem, item) {
                    	console.log(item);
                    	
                    	var cate = item.yField;
                    	switch(cate) {
                    	case 'heatmap' :
                    		cate = '히트맵보기';
                    		break;
                    	case 'mulgeon' :
                    		cate = '물건보기';
                    		break;
                    	case 'sujiboonseog':
                    		cate = '수지분석';
                    		break;
                    	}
                    	
                        this.setTitle(cate + '(' + item.value[1] + ')');
                    }
            	},

            	title:['히트맵보기', '물건보기', '수지분석']
            }]
        });
		
		Ext.apply(this, {
			items: [{
				title: '시간별 접속통계',
				xtype: 'panel',
				tbar: ['접속일: ', {
					xtype: 'datefield',
					format: 'Y-m-d',
					width: 100,
					editable: false,
					listeners: {
						afterrender: function(df, eOpt) {
							var dt = new Date(currentYear.toString() + '-' + currentMonth.toString() + '-' + currentDate.toString());
							df.setValue(dt);
						},
						select: function(field, value, eOpts) {
							var selectDate = field.getRawValue();
							accessTimeStore.load({
								url: 'statistic/accessTime?year=' + selectDate.substring(0,4) + '&month=' + selectDate.substring(5,7) + '&day=' + selectDate.substring(8)
							});
						}
					}
				}],
				items: accessTimeChart//userGradechart
			}, {
				title: '컨텐츠별 접속통계',
				xtype: 'panel',
				tbar: ['접속일: ', {
					xtype: 'datefield',
					format: 'Y-m-d',
					width: 100,
					editable: false,
					listeners: {
						afterrender: function(df, eOpt) {
							var dt = new Date(currentYear.toString() + '-' + currentMonth.toString() + '-' + currentDate.toString());
							df.setValue(dt);
						},
						select: function(field, value, eOpts) {
							var selectDate = field.getRawValue();
							var year = selectDate.substring(0,4);
							var month = selectDate.substring(5,7);
							
							contentChartFieldPrefix = year + '년 ' + month + '월 ';
							contentStore.load({
								url: 'statistic/content?year=' + year + '&month=' + month
							});
						}
					}
				}],
				items: contentChart
			}]
		});
		
		this.callParent(arguments);
	}
});