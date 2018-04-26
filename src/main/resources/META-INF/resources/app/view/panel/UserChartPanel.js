Ext.define('Hotplace.view.panel.UserChartPanel', {
	extend: 'Ext.tab.Panel',
	xtype: 'userchartpanel',
	initComponent: function() {
		var currentYear = Ext.getBody().getAttribute('data-year');
		
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
		
		Ext.define('chartModel', {
			extend: 'Ext.data.Model',
			fields: ['gradeNum', 'gradeName', 'cnt']
		})
		
		var donut = false;
		
		var userGradeChartStore = Ext.create('Ext.data.Store', {
			fields : ['gradeNum', 'gradeName', 'cnt'],
			proxy : {
				type: 'ajax',
				url: 'statistic/userKind',
				reader: {
					type: 'json',
					successProperty: 'success',
					root: 'datas'
				}
			},
			autoLoad: true
		});
		
		var userRegChartStore = Ext.create('Ext.data.Store', {
			fields : ['regYear', 'regMonth', 'cnt'],
			proxy : {
				type: 'ajax',
				url: 'statistic/regDate?regYear=' + currentYear,
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
		
		
		var userGradechart = Ext.create('Ext.chart.Chart', {
			xtype: 'chart',
			id: 'userGradeChart',
			width: 500,
            height: 500,
			animate: true,
			store: userGradeChartStore,
			shadow: true,
			margin: '100 0 0 100',
			legend: {
				position: 'bottom'
			},
			insertPadding: 160,
			theme: 'Base:gradients',
			series: [{
				type: 'pie',
				field: 'cnt',
				showInLegend: true,
				donut: donut,
				tips: {
					trackMouse: true,
					width: 140,
					height: 28,
					renderer: function(storeItem, item) {
						var total = 0;
						userGradeChartStore.each(function(rec) {
							total += rec.get('cnt');
						});
						
						this.setTitle(storeItem.get('gradeName') + ': ' + storeItem.get('cnt')  + '명');
					}
				},
				highlight: {
					segment: {
						margin: 20
					}
				},
				label: {
					field: 'gradeName',
					display: 'rotate',
					contrast: true,
					font: '13px Arial'
				}
	
			}]
		});
		
	    Ext.chart.theme.White = Ext.extend(Ext.chart.theme.Base, {
	        constructor: function() {
	           Ext.chart.theme.White.superclass.constructor.call(this, {
	               axis: {
	                   stroke: 'rgb(8,69,148)',
	                   'stroke-width': 1
	               },
	               axisLabel: {
	                   fill: 'rgb(8,69,148)',
	                   font: '12px Arial',
	                   'font-family': '"Arial',
	                   spacing: 2,
	                   padding: 5,
	                   renderer: function(v) { return v; }
	               },
	               axisTitle: {
	                  font: 'bold 18px Arial'
	               }
	           });
	        }
	    });
	    
		var userRegChart = Ext.create('Ext.chart.Chart', {
            id: 'userRegChart',
            xtype: 'chart',
			width: 600,
            height: 500,
            //margin: '100 0 0 100',
            animate: true,
            shadow: true,
            store: userRegChartStore,
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['cnt'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: '가입인원수(명)',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['regMonth'],
                title: '가입일자(월)'
            }],
            theme: 'White',
            background: {
              gradient: {
                id: 'backgroundGradient',
                angle: 45,
                stops: {
                  0: {
                    color: '#ffffff'
                  },
                  100: {
                    color: '#eaf1f8'
                  }
                }
              }
            },
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('regMonth') + ' : ' + storeItem.get('cnt') + ' views');
                  }
                },
                label: {
                    display: 'insideEnd',
                    field: 'cnt',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                    'text-anchor': 'middle'
                },
                xField: 'regMonth',
                yField: ['cnt']
            }]
        });
		
		Ext.apply(this, {
			items: [{
				title: '회원등급통계',
				xtype: 'panel',
				tbar: [{
					text: '도넛',
					enableToggle: true,
					pressed: false,
					toggleHandler: function(btn, pressed) {
						 var chart = Ext.getCmp('userGradeChart');
			             chart.series.first().donut = pressed ? 35 : false;
			             chart.refresh();
					}
				}],
				items: userGradechart
			}, {
				title: '회원가입통계',
				xtype: 'panel',
				tbar: [{
					xtype: 'combo',
					displayField: 'name',
					valueField: 'value',
					store: Ext.create('Ext.data.Store', {
						fields : ['name', 'value'],
						data: makeComboYear()
					}),
					editable: false,
					listeners: {
						afterrender: function(combo, eOpt) {
							combo.setValue(currentYear);
						},
						change: function(combo, nV) {
							//valueYear = nV;
							userRegChartStore.load({
								url: 'statistic/regDate?regYear=' + nV
							});
						}
					}
				}],
				items: userRegChart
			}]
		});
		
		this.callParent(arguments);
	}
});