Ext.define('Hotplace.controller.ConfigureController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.ConfigureFormPanel', 'panel.UpdateFormPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf && recObj.cate == 'configure') {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-configure-list' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'configurepanel'
					});
					break;
				case 'cate-configure-system-update' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'updatepanel'
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