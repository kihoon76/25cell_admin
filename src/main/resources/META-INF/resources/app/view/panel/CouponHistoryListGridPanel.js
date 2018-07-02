Ext.define('Hotplace.view.panel.CouponHistoryListGridPanel', {
	extend: 'Ext.grid.Panel',
	requires : ['Hotplace.util.Constants' ,'Hotplace.util.CommonFn'],
	xtype: 'couponhisgrid',
	id: 'couponHisListGrid',
	initComponent: function() {
		var	constants = Hotplace.util.Constants,
			commFn = Hotplace.util.CommonFn,
			categoryPanel = Ext.getCmp('app-category'),
			contentPanel = Ext.getCmp('app-contents'),
			that = this;
		
		try {
			var store = Ext.create('Hotplace.store.CouponHistoryListStore');
		}
		catch(e) {
			console.log(e);
			//세션만료 및 중복로그인시  js파일을 가져오지 못해서 오류발생함
			commFn.loadJsError();
		}
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
				text: '내역번호',
				dataIndex: 'key',
				flex: 0
			}, {
				text: '발행일자',
				dataIndex: 'pubDate',
				flex: 0
			}, {
				text: '발행대상',
				dataIndex: 'pubTarget',
				flex: 0
			}, {
				text: '발행대상명',
				dataIndex: 'pubTargetName',
				flex: 0
			}, {
				text: '발행인아이디',
				dataIndex: 'pubId',
				flex: 1
			}, {
				text: '발행인명',
				dataIndex: 'pubName',
				flex: 0
			}, {
				text: '발행수',
				dataIndex: 'pubCount',
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
				displayMsg: '쿠폰발행 리스트 {0} - {1} of {2}',
				dock: 'bottom',
				doRefresh: function() {
					Ext.getCmp('couponHisListGrid').getStore().load();
				},
				items: ['-', {
					text: '목록수 : '
				}, Ext.create('Ext.form.field.ComboBox', {
					queryMode: 'local',
					id: 'coupon-history-paging-combo',
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
					
				},
				itemdblclick: function(grid, rec, item) {
					showDetailWin(rec);
				}
			}
		});
		
		function showDetailWin(rec) {
			var datas = rec.getData();
			var b = getBrowserKind(datas.isMobile, datas.userAgent);
			
			var win = Ext.create('Ext.window.Window',{
				iconCls: 'icon-window',
				width: 800,
				height: 800,
				modal: true,
				draggable: true,
				resizable: true,
				closeAction: 'close',
				items: [{
					xtype: 'form',
					bodyPadding: 5,
					height: 700,
					defaults: {
		                width: 250,
		                height: 22,
		                labelWidth: 80,
		                anchor: '100%',
		                readOnly: true
		            },
		            defaultType: 'textfield',
		            items: [{
		            	fieldLabel: '아이피',
						value: datas.ip
		            }, {
		            	fieldLabel: '아이디',
		            	value: datas.accountId,
		            	focusOnToFront: false,
		            	listeners: {
		            		focus: function(text) {
		            			console.log('focus');
		            		}
		            	}
		            }, {
		            	fieldLabel: '유입경로',
		            	value: datas.referer
		            }, {
		            	fieldLabel: '요청리소스',
		            	value: datas.url
		            }, {
		            	xtype: 'textareafield',
		            	height: 300,
		            	grow: true,
		            	fieldLabel: '파라미터',
		            	value: datas.parameter
		            }, {
		            	fieldLabel: '접속시간',
		            	value: datas.accessTime
		            }, {
		            	fieldLabel: '브라우저정보',
		            	value: datas.userAgent
		            }, {
		            	fieldLabel: '모바일여부',
		            	value: datas.isMobile
		            }, {
		            	xtype: 'radiogroup',
		            	fieldLabel: '브라우저종류',
	            		items: [{
	            			xtype: 'radio',
	            			boxLabel: 'IE(edge)',
	            			readOnly: true,
	            			checked: b.msedge
	            		}, {
	            			xtype: 'radio',
	            			boxLabel: 'IE(11)',
	            			readOnly: true,
	            			checked: b.msie && b.msie_ver == '11'
	            		}, {
	            			xtype: 'radio',
	            			boxLabel: 'IE(10)',
	            			readOnly: true,
	            			checked: b.msie && b.msie_ver == '10'
	            		}, {
	            			xtype: 'radio',
	            			boxLabel: 'IE(9)',
	            			readOnly: true,
	            			checked: b.msie && b.msie_ver == '10'
	            		}, {
	            			xtype: 'radio',
	            			boxLabel: '크롬',
	            			readOnly: true,
	            			checked: b.chrome
	            		}, {
	            			xtype: 'radio',
	            			boxLabel: '파이어폭스',
	            			readOnly: true,
	            			checked: b.firefox
	            		}, {
	            			xtype: 'radio',
	            			boxLabel: '사파리',
	            			readOnly: true,
	            			checked: b.safari
	            		}, {
	            			xtype: 'radio',
	            			boxLabel: '오페라',
	            			readOnly: true,
	            			checked: b.opera
	            		}]
		            }]
				}],
				buttons: [{
					xtype: 'button',
					text: '닫기',
					listeners: {
						click: function() {
							win.close();
						}
					}
				}]
				
			});
			
			win.show();
		}
		
		this.callParent(arguments);
	}
});