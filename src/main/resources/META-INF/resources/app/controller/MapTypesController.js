Ext.define('Hotplace.controller.MapTypesController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.NMapPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	}
	,onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;

		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-heatmap' :
					break;
				case 'cate-dotmap' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype : 'nmappanel',
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
