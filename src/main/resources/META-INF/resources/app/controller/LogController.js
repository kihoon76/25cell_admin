Ext.define('Hotplace.controller.LogController', {
	extend: 'Hotplace.controller.BaseController',
	views: ['panel.LogListGridPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-log-list' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'loggrid'
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