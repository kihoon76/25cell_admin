Ext.define('Hotplace.view.panel.LogListGridPanel', {
	extend: 'Ext.grid.Panel',
	requires : ['Hotplace.util.Constants'],
	xtype: 'loggrid',
	id: 'logListGrid',
	initComponent: function() {
		var store = Ext.create('Hotplace.store.LogListStore'),
			constants = Hotplace.util.Constants,
			//controller = _hotplaceApp.getController('NoticeController'),
			categoryPanel = Ext.getCmp('app-category'),
			contentPanel = Ext.getCmp('app-contents'),
			that = this;
		
		Ext.apply(this, {
			store: store,
			columns: [{
				text: '아이피',
				dataIndex: 'ip',
				flex: 0
			}, {
				text: '아이디',
				dataIndex: 'accountId',
				flex: 0
			}, {
				text: '유입경로',
				dataIndex: 'referer',
				flex: 0
			}, {
				text: '요청리소스',
				dataIndex: 'url',
				flex: 0
			}, {
				text: '파라미터',
				dataIndex: 'parameter',
				flex: 1
			}, {
				text: '접속시간',
				dataIndex: 'accessTime',
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
					Ext.getCmp('logListGrid').getStore().load();
				},
				items: ['-', {
					text: '목록수 : '
				}, Ext.create('Ext.form.field.ComboBox', {
					queryMode: 'local',
					id: 'log-paging-combo',
					displayField: 'name',
					valueField: 'value',
					editable: false,
					width: 100,
					value: constants.gridPageSize,
					store: Ext.create('Hotplace.store.PagingSize'),
					listeners: {
						change: function(cb, nV, oV) {
							store.pageSize = nV;
							Ext.getCmp('logListGrid')
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
					
				}
			}
		});
		
		this.callParent(arguments);
	}
});