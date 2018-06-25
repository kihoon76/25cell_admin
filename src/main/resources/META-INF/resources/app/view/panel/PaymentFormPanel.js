Ext.define('Hotplace.view.panel.PaymentFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'paymentpanel',
	id: 'paymentform',
	initComponent: function() {
		var that = this;
		   
		var constants = Hotplace.util.Constants,
			commFn = Hotplace.util.CommonFn,
			selectedRecord = null,
			searchComboArr = [], 
			searchType = '', 
			searchValue = '';
		
		try {
			var store = Ext.create('Hotplace.store.PaymentListStore', {
				listeners: {
					load: function(t, r, successful) {
						if(successful) {
							var grid = Ext.getCmp('coupon-grid');
							selectedRecord = grid.getView().getSelectionModel().getSelection()[0]
							if(selectedRecord) {
								grid.getSelectionModel().select(0);
							}
						}
					}
				}
			});
		}
		catch(e) {
			console.log(e);
			//세션만료 및 중복로그인시  js파일을 가져오지 못해서 오류발생함
			commFn.loadJsError();
		}
		
		function search() {
			searchType = Ext.getCmp('coupon-searchtype-combo').getValue();
			
			if(searchType == 'couponNum') {
				searchValue = Ext.getCmp('coupon-search-text').getValue();
			}
			else if(searchType == 'couponTargetName') {
				searchType = 'couponTarget'
				searchValue = Ext.getCmp('coupon-search-combo').getValue();
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
		

		Ext.apply(this,{
			frame: true,
			bodyPadding: 5,
			width: '100%',
			layout: 'column',
			
			items: [{
				columnWidth: 0.60,
				xtype: 'gridpanel',
				id: 'payment-grid',
				store: store,
	            height: 800,
	            title:'결제신청목록',
	            columns: [{
                    id       :'accountId',
                    text   	 : '사용자계정',
                    flex    : 1,
                    sortable : true,
                    dataIndex: 'accountId'
                },{
                    text   : '결제금액',
                    width    : 200,
                    sortable : true,
                    dataIndex: 'sum'
                },{
                    text   : '쿠폰사용여부',
                    width    : 200,
                    sortable : true,
                    dataIndex: 'useCoupon'
                },{
                    text   : '쿠폰번호',
                    width    : 200,
                    sortable : true,
                    dataIndex: 'couponNum'
                },{
                    text   : '결제신청일',
                    width    : 200,
                    sortable : true,
                    dataIndex: 'applyDate'
                },{
                    text   : '결제신청일',
                    width    : 200,
                    sortable : true,
                    dataIndex: 'applyDate'
                }],
                tbar: [{
	            	xtype: 'button',
	            	iconCls: 'icon-add',
	            	text: '제휴업체등록',
	            	listeners: {
	            		click: function() {
	            			regJehuWin.show();
	            		}
	            	}
	            }, {
	            	xtype: 'button',
	            	iconCls: 'icon-add',
	            	text: '쿠폰발행',
	            	listeners: {
	            		click: function() {
	            			publishCouponWin.show();
	            		}
	            	}
	            }, 
	            '->',
    			'검색항목 : ',
			    Ext.create('Ext.form.field.ComboBox', {
			    	queryMode: 'local',
			    	id:'coupon-searchtype-combo',
			    	displayField: 'name',
			    	valueField: 'value',
			    	editable: false,
			    	store:searchComboStore,
			    	listeners: {
			    		change: function(combo, nV, oV) {
			    			var txt = Ext.getCmp('coupon-search-text');
		    				var combo = Ext.getCmp('coupon-search-combo');
		    				
			    			if(nV == 'all') {
			    				txt.setValue('');
			    				txt.setVisible(true);
			    				combo.setVisible(false);
			    				store.load();      
			    			}
			    			else if(nV == 'couponNum') {
			    				txt.setValue('');
			    				txt.setVisible(true);
			    				combo.setVisible(false);
			    			}
			    			else if(nV == 'couponTargetName') {
			    				txt.setValue('');
			    				txt.setVisible(false);
			    				combo.setVisible(true);
			    			}
			
			    		}
			    	}
			     }), {
	            	xtype: 'textfield',
    				id: 'coupon-search-text',
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
    				xtype: 'combobox',
					id: 'coupon-search-combo',
					displayField: 'name',
					valueField: 'value',
					queryMode: 'remote',
					editable:false,
					store:searchJehuStore,
					hidden: true
    			}, {
    				xtype: 'button',
    				iconCls: 'icon-search',
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
	    			displayMsg: '쿠폰 리스트 {0} - {1} of {2}',
	    			dock: 'bottom',
	    			doRefresh: function() {
	    				store.load();
	    			},
	    			items: ['-', {
	    				text: '목록수 : '
	    			}, Ext.create('Ext.form.field.ComboBox', {
	    				queryMode: 'local',
	    				id: 'coupon-paging-combo',
	    				displayField: 'name',
	    				valueField: 'value',
	    				editable: false,
	    				width: 100,
	    				value: constants.gridPageSize,
	    				store: Ext.create('Hotplace.store.PagingSize'),
	    				listeners: {
	    					change: function(cb, nV, oV) {
	    						store.pageSize = nV;
	    						Ext.getCmp('coupon-grid').getStore()
	    						    .loadPage(1, {
	    							    params: { limit: nV}
	    						    });
	    						}
	    					}
	    				})
	    			]
    			}],
	    		listeners: {
	    			afterrender: function(grid, eOpts) {
	    				var columns = Ext.getCmp('coupon-grid').columns;
	    				var len = columns.length;
	    					
	    				searchComboArr.push({name: '전체', value: 'all'});
	    				for(var i=0; i<len; i++) {
	    					searchComboArr.push({
	    						name: columns[i].text,
	    						value:columns[i].dataIndex
	    					});
	    				}
	    					
	    				searchComboStore.loadData(searchComboArr);
	    				Ext.getCmp('coupon-searchtype-combo').select('all');
	    			},
	    			itemclick: function(view, record) {
	    				selectedRecord = record;
	    				var data = record.data;
	    				var couponNum = Ext.getCmp('coupon-num');
	    				couponNum.setValue(data.couponNum);
	    					
	    				var couponTarget = Ext.getCmp('coupon-target');
	    				couponTarget.setValue(data.couponTargetName);
	    					
	    				var couponPubDate = Ext.getCmp('coupon-publish');
	    				couponPubDate.setValue(data.publishDate);
	    				
	    				var used = Ext.getCmp('coupon-used');
	    				used.setValue(('Y' == data.used)? true: false);
	    				
	    				var discount = Ext.getCmp('coupon-discount'); 
	    				discount.setValue(data.discountValue + data.discountUnit);
	    			}
	    		}
			}, {
				columnWidth: 0.4,
		        margin: '0 0 0 10',
		        xtype: 'fieldset',
		            title:'발행쿠폰정보',
		            height: 800,
		            defaults: {
		                width: 240,
		                labelWidth: 90
		            },
		            defaultType: 'textfield',
		            items: [{
		                fieldLabel: '쿠폰번호',
		                id: 'coupon-num',
		                anchor: '100%',
		                readOnly: true
		            },{
		                fieldLabel: '쿠폰발행대상',
		                anchor: '100%',
		                id: 'coupon-target',
		                readOnly: true,
		            },{
		                fieldLabel: '쿠폰발행일자',
		                anchor: '100%',
		                id: 'coupon-publish',
		                readOnly: true,
		            },{
		                fieldLabel: '할인내용',
		                anchor: '100%',
		                id: 'coupon-discount',
		                readOnly: true,
		            },{
		                fieldLabel: '쿠폰사용여부',
		                xtype: 'checkbox',
		                anchor: '100%',
		                id: 'coupon-used',
		                readOnly: true,
		            }]
				}]
			});
		
		this.callParent(arguments);
	}
});