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
			tbar: ['<span style="color:#ff0000;font-weight:bold;">★ 각 행을 더블클릭 (엑셀파일 다운로드) ★</span>'],
			
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
					showExcel(rec);
				}
			}
		});
		
		function showExcel(rec) {
			Ext.Msg.confirm('엑셀출력', '선택하신 발행내역 결과를 엑셀로 출력하시겠습니까?', function(button) {
				if(button == 'yes') {
					var url = '/coupon/excel';
					var params = {
						key: rec.data.key
					}
					
					var form = Ext.create('Ext.form.Panel', {
						standardSubmit: true,
						url: url,
						params: params
					});
					
					 form.submit({
				        target: '_blank', // Avoids leaving the page. 
				        params: params
				    });
					  // Clean-up the form after 100 milliseconds.
				    // Once the submit is called, the browser does not care anymore with the form object.
				    Ext.defer(function(){
				        form.close();
				    }, 100);
				}
			});
		}
		
		this.callParent(arguments);
	}
});