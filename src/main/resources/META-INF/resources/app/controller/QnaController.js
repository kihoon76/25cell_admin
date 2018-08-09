Ext.define('Hotplace.controller.QnaController', {
	extend: 'Hotplace.controller.BaseController',
	views: ['panel.QnaFormPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		
		var recObj = record.raw;
		
		if(recObj.leaf && recObj.cate == 'qna') {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-qna' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'qnapanel'
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