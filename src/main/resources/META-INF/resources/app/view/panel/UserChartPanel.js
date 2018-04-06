Ext.define('Hotplace.view.panel.UserChartPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'userchartpanel',
	initComponent: function() {
		
		Ext.define('chartModel', {
			extend: 'Ext.data.Model',
			fields: ['gradeNum', 'gradeName', 'cnt']
		})
		
		var donut = false;
		
		var chartStore = Ext.create('Ext.data.Store', {
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
		})
		
		var chart = Ext.create('Ext.chart.Chart', {
			xtype: 'chart',
			id: 'userChart',
			width: 600,
            height: 250,
			animate: true,
			store: chartStore,
			shadow: true,
			legend: {
				position: 'right'
			},
			insertPadding: 60,
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
						chartStore.each(function(rec) {
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
		
		Ext.apply(this, {
			tbar: [{
				text: '도넛',
				enableToggle: true,
				pressed: false,
				toggleHandler: function(btn, pressed) {
					 var chart = Ext.getCmp('userChart');
		             chart.series.first().donut = pressed ? 35 : false;
		             chart.refresh();
				}
			}],
			items: chart
		});
		
		this.callParent(arguments);
	}
});