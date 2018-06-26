Ext.define('Hotplace.view.panel.PaymentListGridPanel', {
	extend: 'Ext.grid.Panel',
	requires : ['Hotplace.util.Constants' ,'Hotplace.util.CommonFn'],
	xtype: 'paymentgrid',
	id: 'paymentListGrid',
	initComponent: function() {
		var	constants = Hotplace.util.Constants,
			commFn = Hotplace.util.CommonFn,
			categoryPanel = Ext.getCmp('app-category'),
			contentPanel = Ext.getCmp('app-contents'),
			that = this;
		
		try {
			var store = Ext.create('Hotplace.store.PaymentListStore');
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
				text: '결제번호',
				dataIndex: 'key',
				flex: 0
			}, {
				text: '사용자계정',
				dataIndex: 'accountId',
				flex: 0
			}, {
				text: '결제금액',
				dataIndex: 'sum',
				flex: 0
			}, {
				text: '쿠폰사용여부',
				dataIndex: 'useCoupon',
				flex: 0
			}, {
				text: '쿠폰번호',
				dataIndex: 'couponNum',
				flex: 1
			}, {
				text: '결제신청일',
				dataIndex: 'applyDate',
				flex: 0
			}, {
				text: '결제일자',
				dataIndex: 'paymentDate',
				flex: 0
			}, {
				text: '결제확인일자',
				dataIndex: 'paymentConfirmDate',
				flex: 0
			}, {
				text: '결제내용',
				dataIndex: 'applyComment',
				flex: 0
			}, {
				text: '입금자명',
				dataIndex: 'applyComment',
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
					Ext.getCmp('paymentListGrid').getStore().load();
				},
				items: ['-', {
					text: '목록수 : '
				}, Ext.create('Ext.form.field.ComboBox', {
					queryMode: 'local',
					id: 'payment-paging-combo',
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
		
		function confirmPayment() {
			
		}
		
		function showDetailWin(rec) {
			var datas = rec.getData();
			
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
		            	fieldLabel: '결제번호',
						value: datas.key
		            }, {
		            	fieldLabel: '사용자계정',
		            	value: datas.accountId
		            }, {
		            	fieldLabel: '결제금액',
		            	value: datas.sum
		            }, {
		            	fieldLabel: '쿠폰사용여부',
		            	value: datas.useCoupon
		            }, {
		            	fieldLabel: '쿠폰번호',
		            	value: datas.couponNum
		            }, {
		            	fieldLabel: '결제신청일',
		            	value: datas.applyDate
		            }, {
		            	fieldLabel: '결제일자',
		            	value: datas.paymentDate
		            }, {
		            	fieldLabel: '결제확인일자',
		            	value: datas.paymentConfirmDate
		            }, {
		            	fieldLabel: '결제내용',
		            	value: datas.applyComment
		            }]
				}],
				buttons: [{
					xtype: 'button',
					text: '결제확인',
					listeners: {
						click: function() {
							Ext.Msg.confirm('', '결제확인을 하시겠습니까?', function(button) {
								if(button == 'yes') {
									
								}
								else {
									
								}
							});
						}
					}
				},{
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