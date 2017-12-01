Ext.define('Hotplace.view.iframe.NoticeIframe', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.noticeiframe',
	uses: ['Hotplace.util.CommonFn'],
	layout: 'fit',
	constructor: function() {
		this.param = arguments[0];
		this.callParent(arguments);
	},
	initComponent: function() {
		var that = this;
		Ext.apply(this, {
			items: [{
				xtype: 'box',
				autoEl: {
					tag: 'iframe',
					frameborder: 0,
					src: Hotplace.util.CommonFn.getFullUrl('notice/if/content/' + that.param.writeNum)
				}
			}]
		});
		
		this.callParent(arguments);
	}
});