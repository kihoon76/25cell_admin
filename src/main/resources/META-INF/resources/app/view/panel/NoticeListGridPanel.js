Ext.define('Hotplace.view.panel.NoticeListGridPanel', {
	extend: 'Ext.grid.Panel',
	requires : ['Hotplace.util.Constants'],
	xtype: 'noticegrid',
	id: 'noticeListGrid',
	initComponent: function() {
		var store = Ext.create('Hotplace.store.NoticeListStore'),
			constants = Hotplace.util.Constants,
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
				dataIndex: 'writedate',
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
				
			}
		});
		
		this.callParent(arguments);
	}
});