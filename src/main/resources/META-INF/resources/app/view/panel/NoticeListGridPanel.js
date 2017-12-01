Ext.define('Hotplace.view.panel.NoticeListGridPanel', {
	extend: 'Ext.grid.Panel',
	requires : ['Hotplace.util.Constants', 
	            'Hotplace.view.iframe.NoticeIframe'],
	xtype: 'noticegrid',
	id: 'noticeListGrid',
	initComponent: function() {
		var store = Ext.create('Hotplace.store.NoticeListStore'),
			constants = Hotplace.util.Constants,
			controller = _hotplaceApp.getController('NoticeController'),
			categoryPanel = Ext.getCmp('app-category'),
			contentPanel = Ext.getCmp('app-contents'),
			that = this;
		
		Ext.apply(this, {
			store: store,
			columns: [{
				text: '글번호',
				dataIndex: 'num',
				flex: 0
			}, {
				text: '제목',
				dataIndex: 'title',
				flex: 1
			}, {
				text: '작성일자',
				dataIndex: 'writeDate',
				flex: 0
			}],
			tbar: ['->',
			       '검색항목 : ',
			       {
				
			}],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: store,
				displayInfo: true,
				displayMsg: '공지사항 리스트 {0} - {1} of {2}',
				dock: 'bottom',
				doRefresh: function() {
					Ext.getCmp('noticeListGrid').getStore().load();
				},
				items: ['-', {
					text: '목록수 : '
				}, Ext.create('Ext.form.field.ComboBox', {
					queryMode: 'local',
					id: 'notice-paging-combo',
					displayField: 'name',
					valueField: 'value',
					editable: false,
					width: 100,
					value: constants.gridPageSize,
					store: Ext.create('Hotplace.store.PagingSize'),
					listeners: {
						change: function(cb, nV, oV) {
							store.pageSize = nV;
							Ext.getCmp('noticeListGrid')
							   .getStore()
							   .loadPage(1, {
								   params: { limit: nV}
							   });
						}
					}
				})]
			}],
			listeners: {
				itemdblclick: function(grd, rec) {
					var writeNum = rec.raw.num,
						id = 'notice-grid-' + writeNum,
						title = '공지글(' + writeNum + ')';
					console.log(rec)
					//console.dir(controller.addContentTabPanel);
					
					if(categoryPanel.isAttachedCategory(id)) {
						contentPanel.setActiveTab(id + '-panel');
					}
					else {
						controller.addContentTabPanel(id, title, /*{ xtype: 'noticeiframe' }*/ Ext.create('Hotplace.view.iframe.NoticeIframe', {writeNum: writeNum}));
					}
				}
			}
		});
		
		this.callParent(arguments);
	}
});