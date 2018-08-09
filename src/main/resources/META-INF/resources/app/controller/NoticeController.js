Ext.define('Hotplace.controller.NoticeController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.NoticeListGridPanel', 'Hotplace.view.iframe.BaseIframe'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf && recObj.cate == 'notice') {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-notice-list' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'noticegrid'
					});
					break;
				case 'cate-notice-reg' :
					this.addContentTabPanel(
							recObj.id,
							recObj.text,
							Ext.create('Hotplace.view.iframe.BaseIframe', { url: 'notice/if/regist' }));
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