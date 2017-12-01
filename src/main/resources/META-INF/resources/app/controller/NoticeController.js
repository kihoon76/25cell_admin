Ext.define('Hotplace.controller.NoticeController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.NoticeListGridPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-notice-list' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'noticegrid'
					});
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