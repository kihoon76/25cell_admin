Ext.define('Hotplace.controller.LogController', {
	extend: 'Hotplace.controller.BaseController',
	views: ['panel.LogListGridPanel', 'panel.LogChartPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf && recObj.cate == 'log') {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-log-list' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'loggrid'
					});
					break;
				case 'cate-log-statistic' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'logchartpanel'
					});
					break;
				default :
					break;
				}
			}
			else {
				this.contentPanel.setActiveTab(recObj.id + '-panel');
			}
		}
	}
});