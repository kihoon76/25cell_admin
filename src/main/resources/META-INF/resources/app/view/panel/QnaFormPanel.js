Ext.define('Hotplace.view.panel.QnaFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'qnapanel',
	requires : ['Hotplace.util.Constants', 'Ext.ux.form.ItemSelector'],
	id: 'qnaform',
	initComponent: function() {
		var selectedRecord = null;
		   
		var store = Ext.create('Hotplace.store.QnaListStore'),
		constants = Hotplace.util.Constants,
		searchComboArr = [], 
		searchType = '', 
		searchValue = '',
		authUrl = 'authority/define';
		
		var searchComboStore = Ext.create('Ext.data.Store', {
			 fields   : ['name', 'value']
		});
//		
//		var gradeComboStore = Ext.create('Ext.data.Store', {
//			fields : ['name', 'value'],
//			proxy : {
//				type: 'ajax',
//				url: 'authority/define',
//				reader: {
//					type: 'json',
//					successProperty: 'success',
//					root: 'datas'
//				}
//			}
//		});
		
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
					Ext.Ajax.request({
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
					});
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
				id: 'qna-grid',
				store: store,
	            height: 800,
	            title:'문의사항목록',
	            columns: [{
                    id       :'seq',
                    text   	 : '일련번호',
                    width    : 60,
                    sortable : true,
                    dataIndex: 'seq'
                },{
                    text   : '연락처',
                    width    : 120,
                    sortable : true,
                    dataIndex: 'phone'
                },{
                    text   : '처리여부',
                    width    : 40,
                    sortable : true,
                    dataIndex: 'processYN'
                },{
                    text   : '문의사항',
                    flex    : 1,
                    sortable : true,
                    dataIndex: 'question'
                }],
                tbar: ['->',
    			       '검색항목 : ',
    			       Ext.create('Ext.form.field.ComboBox', {
    			    	   queryMode: 'local',
    			    	   id:'qna-searchtype-combo',
    			    	   displayField: 'name',
    			    	   valueField: 'value',
    			    	   editable: false,
    			    	   store:searchComboStore,
    			    	   listeners: {
    			    		   change: function(combo, nV, oV) {
    			    			   if(nV == 'all') {
    			    				   Ext.getCmp('qna-search-text').setValue('');
    			    				   store.load();      
    			    			   }
    			    		   }
    			    	   }
    			       }),{
    					   xtype: 'textfield',
    					   id: 'qna-search-text',
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
	    					id: 'qna-paging-combo',
	    					displayField: 'name',
	    					valueField: 'value',
	    					editable: false,
	    					width: 100,
	    					value: constants.gridPageSize,
	    					store: Ext.create('Hotplace.store.PagingSize'),
	    					listeners: {
	    						change: function(cb, nV, oV) {
	    							store.pageSize = nV;
	    							Ext.getCmp('qna-grid').getStore()
	    							    .loadPage(1, {
	    								    params: { limit: nV}
	    							    });
	    						}
	    					}
	    				})]
    				}],
	    			listeners: {
	    				afterrender: function(grid, eOpts) {
	    					/*var columns = Ext.getCmp('user-auth-grid').columns;
	    					var len = columns.length;
	    					
	    					searchComboArr.push({name: '전체', value: 'all'});
	    					for(var i=0; i<len; i++) {
	    						searchComboArr.push({
	    							name: columns[i].text,
	    							value:columns[i].dataIndex
	    						});
	    					}
	    					
	    					searchComboStore.loadData(searchComboArr);
	    					Ext.getCmp('user-auth-searchtype-combo').select('all');*/
	    				},
	    				itemclick: function(view, record) {
	    					selectedRecord = record;
	    					var data = record.data;
	    					var phone = Ext.getCmp('qna-phone');
	    					phone.setValue(data.phone);
	    					
	    					var question = Ext.getCmp('qna-question');
	    					question.setValue(data.question);
	    					
	    					var reqTime = Ext.getCmp('qna-reqTime');
	    					reqTime.setValue(data.reqTime);
	    					
	    					var myprocess = Ext.getCmp('qna-process-combo');
	    					myprocess.setDisabled(false);
	    				}
	    			}
				}, {
					columnWidth: 0.6,
		            margin: '0 0 0 10',
		            xtype: 'fieldset',
		            title:'문의사항정보',
		            height: 800,
		            defaults: {
		                width: 240,
		                labelWidth: 90
		            },
		            defaultType: 'textfield',
		            items: [{
		            	xtype: 'combobox',
		            	id: 'qna-process-combo',
		            	fieldLabel: '문의처리',
		            	editable: false,
		            	disabled: true,
		            	store: Ext.create('Ext.data.Store', {
		        			fields : ['name', 'value'],
		        			data: [{name: 'open', value:'open'}, {name: 'close', value:'close'}]
		        		}),
		        		queryMode: 'local',
		        		displayField: 'name',
		        		valueField: 'value',
		        		listeners: {
		        			change: function(c, nV, oV) {
		        				
		        				var seq = selectedRecord.data.seq;
		        				
		        				Ext.Ajax.request({
		        					url: Hotplace.util.Constants.context + '/qna/process?type=' + nV + '&seq=' + seq,
		        					method:'GET',
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
		        				});
		        			}
		        		}
		            },{
		                fieldLabel: '연락처',
		                anchor: '100%',
		                name: 'phone',
		                id: 'qna-phone',
		                disabled: true,
		                readOnly: true
		            },{
		                fieldLabel: '문의사항',
		                xtype: 'textarea',
		                anchor: '100%',
		                grow: true,
		                height:500,
		                name: 'question',
		                id: 'qna-question',
		                readOnly: true,
		                disabled: true
		            },{
		                fieldLabel: '처리내용',
		                xtype: 'textarea',
		                anchor: '100%',
		                grow: true,
		                name: 'processContent',
		                id: 'qna-processContent',
		                readOnly: true,
		                disabled: true
		            },{
		                fieldLabel: '요청일자',
		                anchor: '100%',
		                name: 'reqTime',
		                id: 'qna-reqTime',
		                disabled: true,
		                readOnly: true
		            },{
		            	width: 100,
		               	height: 100,
		            	y: 0,
			           	x: 95,
		            	xtype: 'button',
		            	id: 'btn-qna-process',
		            	text:'상담처리',
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
		            }]
				}]
			});
		
			this.callParent(arguments);
	}
});