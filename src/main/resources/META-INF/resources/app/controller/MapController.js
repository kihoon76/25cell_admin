Ext.define('Hotplace.controller.MapController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.NMapPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	}
	,onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf && recObj.cate == 'map') {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-naver-map' :
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
