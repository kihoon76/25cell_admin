Ext.define('Hotplace.view.panel.UserAuthorityFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'userauthpanel',
	requires : ['Hotplace.util.Constants', 'Ext.ux.form.ItemSelector', 'Hotplace.util.CommonFn'],
	id: 'userauthorityform',
	initComponent: function() {
		var selectedRecord = null;
		   
		var store = Ext.create('Hotplace.store.UserListStore'),
		constants = Hotplace.util.Constants,
		commFn = Hotplace.util.CommonFn,
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
				},
				listeners: {
					exception: function(proxy, response, operation, eOpts) {
						Hotplace.util.CommonFn.redirectStoreAjax(response);
		    	   	}
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
		
		function outUser() {
			var delUserId = selectedRecord.data.accountId;
			
			Ext.Msg.confirm('회원탈퇴', '회원계정 (' + delUserId + ') 탈퇴시키시겠습니까?', function(btn) {
				
				if(btn == 'yes') {
					commFn.ajax({
						url: Hotplace.util.Constants.context + '/user/auth/out',
						method:'POST',
						headers: { 'Content-Type': 'application/json' }, 
						jsonData: {
							accountId: delUserId
						},
						timeout:60000,
						success: function(response) {
							
							var jo = Ext.decode(response.responseText);
							
							Ext.getCmp('user-auth-grid').getStore().reload();
							if(jo.success) {
								Ext.Msg.alert('', '회원계정(' + delUserId + ')이 탈퇴 처리되었습니다.');
							}
							else {
								Ext.Msg.alert('에러', jo.errMsg);
							}
							
						},
					});
					
					
					/*Ext.Ajax.request({
						url: Hotplace.util.Constants.context + '/user/auth/out',
						method:'POST',
						headers: { 'Content-Type': 'application/json' }, 
						jsonData: {
							accountId: delUserId
						},
						timeout:60000,
						success: function(response) {
							
							var jo = Ext.decode(response.responseText);
							
							Ext.getCmp('user-auth-grid').getStore().reload();
							if(jo.success) {
								Ext.Msg.alert('', '회원계정(' + delUserId + ')이 탈퇴 처리되었습니다.');
							}
							else {
								Ext.Msg.alert('에러', jo.errMsg);
							}
							
						},
						failure: function(response) {
							Ext.Msg.alert('', '오류가 발생했습니다.');
						}
					});*/
				}
				else {
					
				}
			})
			
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
                    flex    : 1,
                    sortable : true,
                    dataIndex: 'accountId'
                },{
                    text   : '이름',
                    width    : 200,
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
	    					var userName = Ext.getCmp('user-auth-userName');
	    					userName.setValue(data.userName);
	    					
	    					var accountId = Ext.getCmp('user-auth-accountId');
	    					accountId.setValue(data.accountId);
	    					
	    					var phone = Ext.getCmp('user-auth-phone');
	    					phone.setValue(data.phone);
	    					
	    					var email = Ext.getCmp('user-auth-email');
	    					email.setValue(data.email);
	    					
	    					var regDate = Ext.getCmp('user-auth-regDate'); 
	    					regDate.setValue(data.regDate);
	    					
	    					var chkAdm = Ext.getCmp('user-auth-admin-check');
	    					var outChk = Ext.getCmp('user-auth-out-check');
	    					var btnModify = Ext.getCmp('btn-modify-auth');
	    					var btnDelete = Ext.getCmp('btn-delete-auth');
	    					
	    					//관리자여부
	    					if(data.admin) {
	    						chkAdm.setValue(true);
	    					}
	    					else {
	    						chkAdm.setValue(false);
	    					}
	    					
	    					if(data.out == 'Y') {
	    						outChk.setValue(true);
	    					}
	    					else {
	    						outChk.setValue(false);
	    					}
	    					
	    					var combo = Ext.getCmp('user-auth-grade-combo');
	    					combo.getStore().load();
	    					
	    					if(data.gradeNum) {
	    						combo.setValue(data.gradeNum);
	    					}
	    					else {
	    						combo.setValue('-1');
	    					}
	    					
	    					
	    					if(data.out == 'Y') {
	    						userName.setDisabled(true);
	    						accountId.setDisabled(true);
	    						phone.setDisabled(true);
	    						email.setDisabled(true);
	    						regDate.setDisabled(true);
	    						chkAdm.setDisabled(true);
		    					combo.setDisabled(true);
		    					btnModify.setDisabled(true);
		    					btnDelete.setDisabled(true);
	    					}
	    					else {
	    						userName.setDisabled(false);
	    						accountId.setDisabled(false);
	    						phone.setDisabled(false);
	    						email.setDisabled(false);
	    						regDate.setDisabled(false);
	    						
	    						chkAdm.setDisabled(false);
		    					combo.setDisabled(false);
		    					userName.setReadOnly(false);
		    					phone.setReadOnly(false);
		    					email.setReadOnly(false);
		    					
		    					btnModify.setDisabled(false);
		    					btnDelete.setDisabled(false);
	    					}
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
		                fieldLabel: '회원연락처',
		                anchor: '100%',
		                name: 'phone',
		                id: 'user-auth-phone',
		                readOnly: true,
		            },{
		                fieldLabel: '회원이메일',
		                anchor: '100%',
		                name: 'email',
		                id: 'user-auth-email',
		                readOnly: true,
		            },{
		                fieldLabel: '회원가입일자',
		                anchor: '100%',
		                name: 'regDate',
		                id: 'user-auth-regDate',
		                readOnly: true,
		            },{
		            	xtype: 'checkbox',
		            	fieldLabel: '탈퇴여부',
		            	id: 'user-auth-out-check',
		            	disabled: true
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
		            	width: 100,
		               	height: 100,
		            	y: 0,
			           	x: 95,
		            	xtype: 'button',
		            	id: 'btn-modify-auth',
		            	text:'설정변경',
		            	disabled: true,
		            	listeners: {
		            		click: function() {
		            			if(!selectedRecord) {
		            				Ext.Msg.alert('알림', '회원을 선택하세요');
		            				return;
		            			}
		            			
		            			var accountId = selectedRecord.data.accountId,
		            				userName = Ext.String.trim(Ext.getCmp('user-auth-userName').getValue()),
		            				phone = Ext.String.trim(Ext.getCmp('user-auth-phone').getValue()),
		            				email = Ext.String.trim(Ext.getCmp('user-auth-email').getValue());
		            			
		            			if(userName == '' || phone == '' || email == '') {
		            				Ext.Msg.alert('알림', '회원이름, 연락처, 이메일을 선택하세요');
		            				return;
		            			}
		            			
		            			Ext.Ajax.request({
		            				url: Hotplace.util.Constants.context + '/user/auth/modify',
		            				method:'POST',
		            				headers: { 'Content-Type': 'application/json' }, 
		            				jsonData: {
		            					accountId: selectedRecord.data.accountId,
		            					userName: userName,
		            					phone: phone,
		            					email:email,
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
		            }, {
		            	width: 100,
		               	height: 100,
		            	y: 0,
			           	x: 105,
		            	xtype: 'button',
		            	id: 'btn-delete-auth',
		            	text:'회원탈퇴',
		            	disabled: true,
		            	listeners: {
		            		click: function() {
		            			outUser();
		            		}
		            	}
		            }]
				}]
			});
		
			this.callParent(arguments);
	}
});