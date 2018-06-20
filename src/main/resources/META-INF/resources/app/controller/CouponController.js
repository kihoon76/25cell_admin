Ext.define('Hotplace.controller.CouponController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.CouponFormPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-coupon' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'couponpanel'
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