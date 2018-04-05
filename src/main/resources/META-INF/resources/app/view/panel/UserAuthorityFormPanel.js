Ext.define('Hotplace.view.panel.UserAuthorityFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'userauthpanel',
	requires : ['Hotplace.util.Constants', 'Ext.ux.form.ItemSelector'],
	id: 'userauthorityform',
	initComponent: function() {
		var selectedRecord = null;
		   
		var store = Ext.create('Hotplace.store.UserListStore'),
		constants = Hotplace.util.Constants,
		searchComboArr = [], 
		searchType = '', 
		searchValue = '',
		authUrl = 'authority/define';
		
		var searchComboStore = Ext.create('Ext.data.Store', {
			 fields   : ['name', 'value']
		});
		
		var gradeComboStore = Ext.create('Ext.data.Store', {
			fields : ['name', 'value'],
			proxy : {
				type: 'ajax',
				url: 'authority/define',
				reader: {
					type: 'json',
					successProperty: 'success',
					root: 'datas'
				}
			}
		});
		
		function search() {
			searchType = Ext.getCmp('user-auth-searchtype-combo').getValue();
			searchValue = Ext.getCmp('user-auth-search-text').getValue() ;
			  
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
				columnWidth: 0.40,
				xtype: 'gridpanel',
				id: 'user-auth-grid',
				store: store,
	            height: 800,
	            title:'회원목록',
	            columns: [{
                    id       :'accountId',
                    text   	 : '아이디',
                    width    : 200,
                    sortable : true,
                    dataIndex: 'accountId'
                },{
                    text   : '이름',
                    flex    : 1,
                    sortable : true,
                    dataIndex: 'userName'
                }],
                tbar: ['->',
    			       '검색항목 : ',
    			       Ext.create('Ext.form.field.ComboBox', {
    			    	   queryMode: 'local',
    			    	   id:'user-auth-searchtype-combo',
    			    	   displayField: 'name',
    			    	   valueField: 'value',
    			    	   editable: false,
    			    	   store:searchComboStore,
    			    	   listeners: {
    			    		   change: function(combo, nV, oV) {
    			    			   if(nV == 'all') {
    			    				   Ext.getCmp('user-auth-search-text').setValue('');
    			    				   store.load();      
    			    			   }
    			    		   }
    			    	   }
    			       }),{
    					   xtype: 'textfield',
    					   id: 'user-auth-search-text',
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
    					   xtype: 'button',
    					   iconCls: 'icon-search',
    					   listeners: {
    						   click: function(btn, e) {
    							   search();
    						   }
    					   }
    				   }
    				],
				//}],
    				dockedItems: [{
	    				xtype: 'pagingtoolbar',
	    				store: store,
	    				displayInfo: true,
	    				displayMsg: '회원 리스트 {0} - {1} of {2}',
	    				dock: 'bottom',
	    				doRefresh: function() {
	    					store.load();
	    				},
	    				items: ['-', {
	    					text: '목록수 : '
	    				}, Ext.create('Ext.form.field.ComboBox', {
	    					queryMode: 'local',
	    					id: 'user-auth-paging-combo',
	    					displayField: 'name',
	    					valueField: 'value',
	    					editable: false,
	    					width: 100,
	    					value: constants.gridPageSize,
	    					store: Ext.create('Hotplace.store.PagingSize'),
	    					listeners: {
	    						change: function(cb, nV, oV) {
	    							store.pageSize = nV;
	    							Ext.getCmp('user-auth-grid').getStore()
	    							    .loadPage(1, {
	    								    params: { limit: nV}
	    							    });
	    						}
	    					}
	    				})]
    				}],
	    			listeners: {
	    				afterrender: function(grid, eOpts) {
	    					var columns = Ext.getCmp('user-auth-grid').columns;
	    					var len = columns.length;
	    					
	    					searchComboArr.push({name: '전체', value: 'all'});
	    					for(var i=0; i<len; i++) {
	    						searchComboArr.push({
	    							name: columns[i].text,
	    							value:columns[i].dataIndex
	    						});
	    					}
	    					
	    					searchComboStore.loadData(searchComboArr);
	    					Ext.getCmp('user-auth-searchtype-combo').select('all');
	    				},
	    				itemclick: function(view, record) {
	    					selectedRecord = record;
	    					var data = record.data;
	    					Ext.getCmp('user-auth-userName').setValue(data.userName);
	    					Ext.getCmp('user-auth-accountId').setValue(data.accountId);
	    					
	    					var chkAdm = Ext.getCmp('user-auth-admin-check');
	    					//관리자여부
	    					if(data.admin) {
	    						chkAdm.setValue(true);
	    					}
	    					else {
	    						chkAdm.setValue(false);
	    					}
	    					
	    					var combo = Ext.getCmp('user-auth-grade-combo');
	    					combo.getStore().load();
	    					
	    					if(data.gradeNum) {
	    						combo.setValue(data.gradeNum);
	    					}
	    					else {
	    						combo.setValue('-1');
	    					}
	    					
	    					chkAdm.setDisabled(false);
	    					combo.setDisabled(false);
	    				}
	    			}
				}, {
					columnWidth: 0.6,
		            margin: '0 0 0 10',
		            xtype: 'fieldset',
		            title:'회원등급정보',
		            height: 800,
		            defaults: {
		                width: 240,
		                labelWidth: 90
		            },
		            defaultType: 'textfield',
		            items: [{
		                fieldLabel: '회원명',
		                name: 'userName',
		                id: 'user-auth-userName',
		                readOnly: true
		            },{
		                fieldLabel: '회원아이디',
		                anchor: '100%',
		                name: 'accountId',
		                id: 'user-auth-accountId',
		                readOnly: true,
		            },{
		            	xtype: 'combobox',
		            	id: 'user-auth-grade-combo',
		            	fieldLabel: '회원등급',
		            	editable: false,
		            	disabled: true,
		            	store: Ext.create('Ext.data.Store', {
		        			fields : ['name', 'value'],
		        			proxy : {
		        				type: 'ajax',
		        				url: 'authority/define?no=Y',
		        				reader: {
		        					type: 'json',
		        					successProperty: 'success',
		        					root: 'datas'
		        				}
		        			},
		        			listeners: {
		        				load: function(store, records, success) {
		        					if(success) {
		        						console.log(store);
		        					}
		        				}
		        			}
		        		}),
		        		displayField: 'name',
		        		valueField: 'value'
		            },{
		            	xtype: 'checkbox',
		            	fieldLabel: '관리자권한',
		            	id: 'user-auth-admin-check',
		            	disabled: true
		            },{
		            	anchor: '100%',
		            	xtype: 'button',
		            	text:'설정변경',
		            	listeners: {
		            		click: function() {
		            			if(!selectedRecord) {
		            				Ext.Msg.alert('알림', '회원을 선택하세요');
		            				return;
		            			}
		            			
		            			Ext.Ajax.request({
		            				url: Hotplace.util.Constants.context + '/user/auth/modify',
		            				method:'POST',
		            				headers: { 'Content-Type': 'application/json' }, 
		            				jsonData: {
		            					accountId: selectedRecord.data.accountId,
		            					gradeNum: Ext.getCmp('user-auth-grade-combo').getValue(),
		            					admin: Ext.getCmp('user-auth-admin-check').checked ? 'Y' : 'N'
		            				},
		            				timeout:60000,
		            				success: function(response) {
		            					
		            					var jo = Ext.decode(response.responseText);
		            					
		            					Ext.getCmp('user-auth-grid').getStore().reload();
		            					if(jo.success) {
		            						if(!jo.errMsg) {
		            							Ext.Msg.alert('', '설정이 수정되었습니다.');
		            						}
		            						else {
		            							Ext.Msg.alert('', '설정이 수정되었으나 hotplace25가 touch되지 않았습니다');
		            						}
		            					}
		            					else {
		            						Ext.Msg.alert('에러', jo.errMsg);
		            					}
		            					
		            				},
		            				failure: function(response) {
		            					console.log(response)
		            					Ext.Msg.alert('', '오류가 발생했습니다.');
		            				}
		            			});
		            		}
		            	}
		            }]
				}]
			});
		
			this.callParent(arguments);
	}
});