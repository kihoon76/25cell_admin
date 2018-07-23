Ext.define('Hotplace.controller.AuthorityController', {
	extend : 'Hotplace.controller.BaseController',
	views: ['panel.AuthorityFormPanel', 'window.AdminAuthWindow'],
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
				case 'cate-admin' :
					var win = Ext.create('Hotplace.view.window.AdminAuthWindow', {
						title: '관리자 권한설정',
						iconCls: 'icon-window',
						modal: true,
						draggable: true,
						resizable: false,
						closeAction: 'destroy',
					});
					win.show();
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