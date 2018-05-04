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
		
		//store.baseParams = {ip:'', id: '', regDate: null}
		
		var searchComboStore = Ext.create('Ext.data.Store', {
			 fields   : ['name', 'value']
		});
		
		var searchComboArr = [], searchType = '', searchValue = '';
		
		var searchWin = Ext.create('Ext.window.Window',{
			iconCls: 'icon-window',
			width: 300,
			height: 150,
			modal: true,
			draggable: false,
			resizable: false,
			closeAction: 'hide',
			items: [{
				xtype: 'form',
				id: 'logSearchForm',
				bodyPadding: 5,
				height: 300,
				defaults: {
	                width: 250,
	                height: 22,
	                labelWidth: 70
	            },
	            defaultType: 'textfield',
	            items: [{
	            	fieldLabel: '아이피',
					name: 'txtLogSearchIp',
					id: 'txtLogSearchIp'
	            }, {
	            	fieldLabel: '아이디',
					name: 'txtLogSearchId',
					id: 'txtLogSearchId'
	            }, {
	            	xtype: 'datefield',
	            	fieldLabel: '접속시간',
	            	height: 22,
	            	editable: false,
	            	name: 'dateLogSearch',
					id: 'dateLogSearch',
			    	format: 'Y-m-d',
	            }]
			}],
			buttons: [{
				xtype: 'button',
				iconCls: 'icon-search',
				text: '검색',
				listeners: {
					click: function() {
						var ip = Ext.getCmp('txtLogSearchIp');
						var id = Ext.getCmp('txtLogSearchId');
						var date = Ext.getCmp('dateLogSearch');
						
						if(Ext.String.trim(ip.getValue()) == '' 
						   && Ext.String.trim(id.getValue()) == ''
						   && date.getValue() == null) return;
						
						store.getProxy().setExtraParam('ip', Ext.String.trim(ip.getValue()));
						store.getProxy().setExtraParam('id', Ext.String.trim(id.getValue()));
						store.getProxy().setExtraParam('regDate', (date.getRawValue()) ? date.getRawValue().substring(0,10) : null);
						store.loadPage(1, {
							params: {
								limit: Ext.getCmp('log-paging-combo').getValue()
							}
						});
					}
				}
			}, {
				xtype: 'button',
				iconCls: 'icon-close',
				text: '닫기',
				listeners: {
					click: function() {
						searchWin.hide();
					}
				}
			}]
		});
		
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
			}, {
				text: '브라우저정보',
				dataIndex: 'userAgent',
				flex: 0
			}, {
				text: '모바일여부',
				dataIndex: 'isMobile',
				flex: 0
			}],
			tbar: [{
				xtype: 'button',
				iconCls: 'icon-search',
				text: '검색',
				listeners: {
					click: function(btn, e) {
						searchWin.showAt(btn.getPosition());
					}
				}
			}, {
				xtype: 'button',
				iconCls: 'icon-refresh',
				text: '전체보기',
				listeners: {
					click: function() {
						store.getProxy().setExtraParam('ip', null);
						store.getProxy().setExtraParam('id', null);
						store.getProxy().setExtraParam('regDate', null);
						store.loadPage(1, {
							params: {
								limit: Ext.getCmp('log-paging-combo').getValue()
							}
						});
					}
				}
			}],
			
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: store,
				displayInfo: true,
				displayMsg: '로그 리스트 {0} - {1} of {2}',
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
							store.loadPage(1, {
								 params: {
									 limit: nV
								 }
							});
						}
					}
				})]
			}],
			listeners: {
				afterrender: function(grid, eOpts) {
					
				}
			}
		});
		
		this.callParent(arguments);
	}
});