Ext.define('Hotplace.view.panel.CouponFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'couponpanel',
	id: 'couponform',
	initComponent: function() {
		var that = this;
		   
		var constants = Hotplace.util.Constants,
			commFn = Hotplace.util.CommonFn,
			selectedRecord = null,
			searchComboArr = [], 
			searchType = '', 
			searchValue = '';
		
		try {
			var store = Ext.create('Hotplace.store.CouponListStore', {
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
			
			var jehuStore = Ext.create('Ext.data.Store', {
				proxy : {
			        type : 'ajax'
			       ,url : Hotplace.util.Constants.context + '/coupon/jehulist'
			       ,actionMethods : 'POST'
			       ,reader : {
			           type : 'json'
			          ,root : 'datas'
			          ,successProperty: 'success'
			       },
			       listeners: {
			    	   exception: function(proxy, response, operation, eOpts) {
			    		   Hotplace.util.CommonFn.redirectStoreAjax(response);
			    	   }
			       }
			  },
			  fields : ['name', 'value']
			});
			
			var searchJehuStore = Ext.create('Ext.data.Store', {
				proxy : {
			        type : 'ajax'
			       ,url : Hotplace.util.Constants.context + '/coupon/jehulist'
			       ,actionMethods : 'POST'
			       ,reader : {
			           type : 'json'
			          ,root : 'datas'
			          ,successProperty: 'success'
			       },
			       listeners: {
			    	   exception: function(proxy, response, operation, eOpts) {
			    		   Hotplace.util.CommonFn.redirectStoreAjax(response);
			    	   }
			       }
			  },
			  fields : ['name', 'value']
			});
		}
		catch(e) {
			console.log(e);
			//세션만료 및 중복로그인시  js파일을 가져오지 못해서 오류발생함
			commFn.loadJsError();
		}
		
		var searchComboStore = Ext.create('Ext.data.Store', {
			 fields   : ['name', 'value']
		});
		
		var discountUnitComboStore = Ext.create('Ext.data.Store', {
			 fields   : ['name', 'value'],
			 data: [{name: '%', value: '1'}, {name: '₩', value:'2'}]
		});
		
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
		
		function regJehu(jehuName) {
			commFn.ajax({
				url: '/coupon/regJehu',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					jehuName: jehuName
				},
				timeout:60000,
				success: function(jo) {
					
					if(jo.success) {
						Ext.Msg.alert('', '업체가 등록 되었습니다.', function() {
							regJehuWin.close();
						});
						
					}
					else {
						Ext.Msg.alert('에러', jo.errMsg);
					}
				}
			});
		}
		
		function publishCoupon(param) {
			commFn.ajax({
				url: '/coupon/publishCoupon',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: param,
				timeout:60000,
				success: function(jo) {
					
					if(jo.success) {
						Ext.Msg.alert('', '쿠폰이 발행되었습니다.', function() {
							publishCouponWin.close();
							store.load();
						});
					}
					else {
						Ext.Msg.alert('에러', jo.errMsg);
					}
				}
			});
		}
		
		var publishCouponWin = Ext.create('Ext.window.Window',{
			iconCls: 'icon-window',
			title: '쿠폰발행',
			width: 400,
			height: 200,
			modal: true,
			resizable: false,
			closeAction: 'hide',
			items: [{
				xtype: 'form',
				id: 'publishCouponForm',
				bodyPadding: 15,
				defaults: {
	                anchor: '100%',
	                height: 22,
	                labelWidth: 80
	            },
	            defaultType: 'textfield',
	            items: [{
	            	fieldLabel: '제휴업체',
	            	id: 'jehu-combo',
	            	xtype: 'combobox',
	            	displayField: 'name',
	            	valueField: 'value',
	            	queryMode: 'remote',
	            	editable: false,
	            	store: jehuStore
	            }, {
	            	xtype: 'numberfield',
	            	id: 'coupon-count-text',
	            	value: 1,
	                maxValue: 100,
	                minValue: 1,
	                step: 1,
	            	fieldLabel: '발행쿠폰갯수'
	            }, {
	            	xtype: 'numberfield',
	            	id: 'coupon-discount-text',
	            	step: 1,
	                minValue: 1,
	            	fieldLabel: '할인값'
	            }, {
	            	fieldLabel: '할인단위',
	            	id: 'coupon-discount-combo',
	            	xtype: 'combobox',
	            	displayField: 'name',
	            	valueField: 'value',
	            	queryMode: 'local',
	            	editable: false,
	            	store: discountUnitComboStore
	            }]
			}],
			buttons: [{
				xtype: 'button',
				iconCls: 'reg',
				text: '발행',
				listeners: {
					click: function() {
						var jehuName = Ext.getCmp('jehu-combo').getValue();
						var couponCountEl = Ext.getCmp('coupon-count-text');
						var discountValueEl = Ext.getCmp('coupon-discount-text');
						var discountUnit = Ext.getCmp('coupon-discount-combo').getValue();
						
						var couponCount = couponCountEl.getValue();
						var discountValue = discountValueEl.getValue();
						//couponCount = Ext.util.Format.trim(couponCount)
						
						console.log(jehuName + '/' + couponCount);
						
						if(!jehuName) {
							Ext.Msg.alert('', '업체를 선택해 주세요');
							return;
						}
						
						if(!couponCount || !couponCountEl.validate()) {
							Ext.Msg.alert('', '발행쿠폰수를 설정해 주세요');
							return;
						}
						
						if(!discountValue || !discountValueEl.validate()) {
							Ext.Msg.alert('', '할인값을 설정해 주세요');
							return;
						}
						
						if(!discountUnit) {
							Ext.Msg.alert('', '할인단위를 선택해 주세요');
							return;
						}
						
						publishCoupon({
							jehuNum: jehuName + '',
							count: couponCount + '',
							discountValue: discountValue + '',
							discountUnit: discountUnit
						});
					}
				}
			}, {
				xtype: 'button',
				iconCls: 'icon-close',
				text: '닫기',
				listeners: {
					click: function() {
						publishCouponWin.close();
					}
				}
			}],
			listeners: {
				beforeshow: function() {
					discountUnitComboStore.reload();
				}
			}
		});
		
		var regJehuWin = Ext.create('Ext.window.Window',{
			iconCls: 'icon-window',
			title: '제휴업체등록',
			width: 400,
			height: 120,
			modal: true,
			resizable: false,
			closeAction: 'hide',
			items: [{
				xtype: 'form',
				id: 'regJehuForm',
				bodyPadding: 15,
				defaults: {
	                anchor: '100%',
	                height: 22,
	                labelWidth: 70
	            },
	            defaultType: 'textfield',
	            items: [{
	            	fieldLabel: '제휴업체명',
					id: 'txtJehuName'
	            }]
			}],
			buttons: [{
				xtype: 'button',
				iconCls: 'reg',
				text: '등록',
				listeners: {
					click: function() {
						var jehuName = Ext.getCmp('txtJehuName').getValue();
						jehuName = Ext.util.Format.trim(jehuName)
						
						
						if(jehuName == '') {
							Ext.Msg.alert('', '업체명을 입력해 주세요');
						}
						else {
							regJehu(jehuName);
						}
					}
				}
			}, {
				xtype: 'button',
				iconCls: 'icon-close',
				text: '닫기',
				listeners: {
					click: function() {
						regJehuWin.close();
					}
				}
			}]
		});

		Ext.apply(this,{
			frame: true,
			bodyPadding: 5,
			width: '100%',
			layout: 'column',
			
			items: [{
				columnWidth: 0.60,
				xtype: 'gridpanel',
				id: 'coupon-grid',
				store: store,
	            height: 800,
	            title:'발행쿠폰목록',
	            columns: [{
                    id       :'couponNum',
                    text   	 : '쿠폰번호',
                    flex    : 1,
                    sortable : true,
                    dataIndex: 'couponNum'
                },{
                    text   : '발행대상',
                    width    : 200,
                    sortable : true,
                    dataIndex: 'couponTargetName'
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