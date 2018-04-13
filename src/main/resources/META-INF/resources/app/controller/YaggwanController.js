Ext.define('Hotplace.controller.YaggwanController', {
	extend: 'Hotplace.controller.BaseController',
	views: ['panel.YaggwanFormPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		
		var recObj = record.raw;
		
		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-yaggwan' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'yaggwanpanel'
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