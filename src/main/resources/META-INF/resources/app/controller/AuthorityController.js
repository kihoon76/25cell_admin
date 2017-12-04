Ext.define('Hotplace.controller.AuthorityController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.AuthorityFormPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-authority-list' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'authoritypanel'
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