Ext.define('Hotplace.controller.PaymentController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.PaymentFormPanel'],
	onLaunch : function() {
		this.callParent(arguments);
	},
	onItemClick : function(tree, record, item, idx, e) {
		var recObj = record.raw;
		
		if(recObj.leaf) {
			if(!this.categoryPanel.isAttachedCategory(recObj.id)) {
				switch(recObj.id) {
				case 'cate-payment' :
					this.addContentTabPanel(recObj.id, recObj.text, {
						xtype: 'paymentpanel'
					});
					break;
				case 'cate-refund' :
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