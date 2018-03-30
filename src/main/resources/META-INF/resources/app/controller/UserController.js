Ext.define('Hotplace.controller.UserController', {
	extend: 'Hotplace.controller.BaseController',
	views: ['panel.UserListGridPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-user-list' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'usergrid'
					});
					break;
				case 'cate-user-grade' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'usergrid'
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