Ext.define('Hotplace.controller.MonitorController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.DbChartPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-monitor-db' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'dbchartpanel'
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