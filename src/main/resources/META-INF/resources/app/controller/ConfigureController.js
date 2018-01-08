Ext.define('Hotplace.controller.ConfigureController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.ConfigureFormPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-configure-list' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'configurepanel'
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