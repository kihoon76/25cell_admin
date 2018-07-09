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
			searchComboArr = [], 
			searchType = '', 
			searchValue = '',
			paymentUserInfo = null,
			win = null,
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
		
		function search() {
			searchType = Ext.getCmp('payment-searchtype-combo').getValue();
			
			if(searchType == 'applyDate' || searchType == 'paymentDate' || searchType == 'paymentConfirmDate') {
				searchValue = Ext.getCmp('payment-search-date').getRawValue();
			}
			else {
				searchValue = Ext.getCmp('payment-search-text').getValue();
			}
			
			  
			if(!searchValue) {
				Ext.Msg.alert('알림', '값을 입력하세요');
				return;
			}
			
			store.load({
				params: {
					searchType: searchType,
					searchValue: searchValue
				}
			});    
		}
		
		Ext.apply(this, {
			store: store,
			columns: [{
				text: '결제번호',
				dataIndex: 'key',
				flex: 0,
				_search: false
			}, {
				text: '사용자계정',
				dataIndex: 'accountId',
				flex: 0
			}, {
				text: '처리완료',
				dataIndex: 'status',
				flex: 0
			}, {
				text: '결제금액',
				dataIndex: 'sum',
				flex: 0,
				_search: false
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
				flex: 0,
				_search: false
			}, {
				text: '입금자명',
				dataIndex: 'depositor',
				flex: 0
			}],
			tbar: ['->', '검색항목 : ', Ext.create('Ext.form.field.ComboBox', {
		    	queryMode: 'local',
		    	id:'payment-searchtype-combo',
		    	displayField: 'name',
		    	valueField: 'value',
		    	editable: false,
		    	store:searchComboStore,
		    	listeners: {
		    		change: function(combo, nV, oV) {
		    			var txt = Ext.getCmp('payment-search-text');
	    				var date = Ext.getCmp('payment-search-date');
	    				
		    			if(nV == 'all') {
		    				txt.setValue('');
		    				date.setRawValue('');
		    				txt.setVisible(true);
		    				date.setVisible(false);
		    				store.load();      
		    			}
		    			else if(nV == 'applyDate' || nV == 'paymentDate' || nV == 'paymentConfirmDate') {
		    				txt.setValue('');
		    				date.setRawValue('');
		    				txt.setVisible(false);
		    				date.setVisible(true);
		    			}
		    			else {
		    				txt.setValue('');
		    				date.setRawValue('');
		    				txt.setVisible(true);
		    				date.setVisible(false);
		    			}
		
		    		}
		    	}
		     }), {
            	xtype: 'textfield',
				id: 'payment-search-text',
				enableKeyEvents: true,
				listeners: {
					keydown: function(t, e) {
						//전체를 선택한 경우 동작 안함
						if(e.keyCode == 13) {
							search();
						}
					}
				}
			}, {
				xtype: 'datefield',
				id: 'payment-search-date',
				format: 'Y-m-d',
				editable:false,
				hidden: true
			}, {
				xtype: 'button',
				iconCls: 'icon-search',
				text: '검색',
				listeners: {
					click: function(btn, e) {
						search();
					}
				}
			}],
			
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: store,
				displayInfo: true,
				displayMsg: '결제내역 리스트 {0} - {1} of {2}',
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
				})],
				listeners: {
					beforechange: function() {
    					store.getProxy().setExtraParam('searchType', searchType);
						store.getProxy().setExtraParam('searchValue', searchValue);
	    			}
				}
			}],
			listeners: {
				afterrender: function(grid, eOpts) {
    				var columns = that.columns;
    				var len = columns.length;
    					
    				console.log(columns);
    				searchComboArr.push({name: '전체', value: 'all'});
    				for(var i=0; i<len; i++) {
    					if(columns[i]._search === false) {
    						continue;
    					}
    					
    					searchComboArr.push({
    						name: columns[i].text,
    						value:columns[i].dataIndex
    					});
    				}
    					
    				searchComboStore.loadData(searchComboArr);
    				//Ext.getCmp('payment-searchtype-combo').select('all');
    			},
				itemdblclick: function(grid, rec, item) {
					showDetailWin(rec);
				}
			}
		});
		
		function confirmPayment(key) {
			//결제일자
			var paymentDate = Ext.getCmp('paymentDateWin').getRawValue();
			console.log(paymentDate);
			if(paymentDate == '') {
				Ext.Msg.alert('', '입금한 날자를 입력하세요.');
				return;
			}
			
			commFn.ajax({
				url: '/payment/confirm',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					paymentDate: paymentDate,
					key: key.toString()
				},
				timeout:60000,
				success: function(jo) {
					if(jo.success) {
						Ext.Msg.alert('', '결제완료처리 되었습니다.', function() {
							win.close();
						});
					}
					else {
						Ext.Msg.alert('', jo.errMsg);
					}
				}
			});
		}
		
		function showDetailWin(rec) {
			var datas = rec.getData();
			var key = datas.key;
			console.log(rec);
			var isY = datas.status == 'Y';
			
			win = Ext.create('Ext.window.Window',{
				iconCls: 'icon-window',
				width: 800,
				height: 500,
				modal: true,
				draggable: true,
				resizable: false,
				closeAction: 'destroy',
				items: [{
					xtype: 'form',
					bodyPadding: 5,
					height: 500,
					defaults: {
		                width: 250,
		                height: 22,
		                labelWidth: 90,
		                anchor: '100%',
		                readOnly: true
		            },
		            defaultType: 'textfield',
		            items: [{
		            	fieldLabel: '결제번호',
						value: key
		            }, {
		            	fieldLabel: '사용자계정',
		            	value: datas.accountId,
		            },{
		            	xtype: 'button',
		            	anchor: '30%',
		            	margin: '0 0 5 94',
		            	text: '사용자계정정보',
		            	listeners: {
		            		click: function(t, event) {
		            			if(paymentUserInfo != null) {
		            				Ext.Msg.alert('', '아이디: ' + datas.accountId + '<br/>이름: ' + paymentUserInfo.name + '<br/>전화번호: ' + paymentUserInfo.phone + '<br/>이메일: ' + paymentUserInfo.email);
		            				return;
		            			}
		            			
		            			commFn.ajax({
		            				url: '/payment/userinfo',
		            				params: { accountId: datas.accountId }, 
		            				timeout:60000,
		            				success: function(jo) {
		            					if(jo.success) {
		            						if(jo.datas.length > 0) {
		            							paymentUserInfo = jo.datas[0];
		            							Ext.Msg.alert('', '아이디: ' + datas.accountId + '<br/>이름: ' + paymentUserInfo.name + '<br/>전화번호: ' + paymentUserInfo.phone + '<br/>이메일: ' + paymentUserInfo.email);
		            						}
		            						else {
		            							Ext.Msg.alert('', datas.accountId + '정보가 존재하지 않습니다.');
		            						}
		            					}
		            					else {
		            						Ext.Msg.alert('', jo.errMsg);
		            					}
		            				}
		            			}); 
		            		}
		            	}
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
		            	fieldLabel: '입금자명',
		            	value: datas.depositor
		            }, {
		            	fieldLabel: '결제신청일',
		            	value: datas.applyDate
		            }, {
		            	xtype: 'datefield',
		            	//width: 200,
		            	fieldLabel: '결제일자',
		            	anchor: '30%',
		            	id: 'paymentDateWin',
		            	format: 'Y-m-d',
		            	editable: false,
		            	readOnly: isY,
		            	value: (datas.paymentDate) ? datas.paymentDate.substring(0, 10) : ''
		            }, {
		            	fieldLabel: '결제확인일자',
		            	value: datas.paymentConfirmDate
		            }, {
		            	xtype: 'textareafield',
		            	grow: true,
		            	anchor: '100%', 
		            	height: 100,
		            	fieldLabel: '결제내용',
		            	value: datas.applyComment
		            }, {
		            	fieldLabel: '결제처리상태',
		            	value: (datas.status == 'Y') ? '결제처리완료' : ''
		            }, {
		            	fieldLabel: '결제처리담당자',
		            	value: (datas.processorId) ? datas.processorName + '(' + datas.processorId + ')' : ''
		            }]
				}],
				buttons: [{
					xtype: 'button',
					text: '결제확인',
					disabled: isY,
					listeners: {
						click: function() {
							Ext.Msg.confirm('', '결제확인을 하시겠습니까?', function(button) {
								if(button == 'yes') {
									confirmPayment(key);
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
				}],
				listeners: {
					close: function() {
						paymentUserInfo = null;
					}
				}
				
			});
			
			win.show();
		}
		
		this.callParent(arguments);
	}
});