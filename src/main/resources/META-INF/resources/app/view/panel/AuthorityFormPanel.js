Ext.define('Hotplace.view.panel.AuthorityFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'authoritypanel',
	id: 'authorityform',
	initComponent: function() {
		var that = this;
		var selectedRecord = null;
		var commFn = Hotplace.util.CommonFn;
		
		try {
			var ds = Ext.create('Hotplace.store.AuthorityListStore', {
				listeners: {
					load: function(t, r, successful) {
						if(successful) {
							var grid = Ext.getCmp('authority-grid');
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
		

		
		function authFormat(val){
			if(val){
				return '<span style="color:red;">' + val.substring(0,5) + '</span>' + val.substring(5);
			}
			
			return '';
		}
		   
		function modifyAuthority() {
			var data = selectedRecord.data;
			
			commFn.ajax({
				url: '/authority/modify',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					authNum: Ext.getCmp('idAuthNum').getValue(),
					authName: Ext.getCmp('idAuthName').getValue(),
					description: Ext.getCmp('idAuthDescription').getValue()
				},
				timeout:60000,
				success: function(jo) {
					
					that.child('gridpanel').getStore().reload();
					if(jo.success) {
						if(!jo.errMsg) {
							Ext.Msg.alert('', '권한설정이 수정되었습니다.');
						}
					}
					else {
						Ext.Msg.alert('에러', jo.errMsg);
					}
					
				}
			});
		}
		
		function regAuthority() {
			
			var authName = Ext.String.trim(Ext.getCmp('txtAuthName').getValue());
			var authNameKor = Ext.String.trim(Ext.getCmp('txtAuthNameKor').getValue());
			var description = Ext.String.trim(Ext.getCmp('txtAuthContent').getValue());
			
			if(authName == '' || authName == 'ROLE_' || description == '' || authNameKor == '') return;
			
			commFn.ajax({
				url: '/authority/regist',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					authName: authName.toUpperCase(),
					authNameKor: authNameKor,
					description: description
				},
				timeout:60000,
				success: function(jo) {
					
					if(jo.success) {
						Ext.Msg.alert('', authName + ' 권한이 등록 되었습니다.');
						ds.load();
						
						Ext.getCmp('txtAuthName').setValue('ROLE_');
						Ext.getCmp('txtAuthNameKor').setValue('');
						Ext.getCmp('txtAuthContent').setValue('');
						authorityWin.hide();
					}
					else {
						Ext.Msg.alert('에러', jo.errMsg);
					}
					
				}
			});
			
			
			/*Ext.Ajax.request({
				url: Hotplace.util.Constants.context + '/authority/regist',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					authName: authName.toUpperCase(),
					authNameKor: authNameKor,
					description: description
				},
				timeout:60000,
				success: function(response) {
					
					var jo = Ext.decode(response.responseText);

					if(jo.success) {
						Ext.Msg.alert('', authName + ' 권한이 등록 되었습니다.');
						ds.load();
						
						Ext.getCmp('txtAuthName').setValue('ROLE_');
						Ext.getCmp('txtAuthNameKor').setValue('');
						Ext.getCmp('txtAuthContent').setValue('');
						authorityWin.hide();
					}
					else {
						Ext.Msg.alert('에러', jo.errMsg);
					}
					
				},
				failure: function(response) {
					console.log(response)
					Ext.Msg.alert('', '오류가 발생했습니다.');
				}
			});*/
		}
		
		function deleteAuthority() {
			/*var authName = selectedRecord.data.authName;
			Ext.Ajax.request({
				url: Hotplace.util.Constants.context + '/authority/delete',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					authNum: selectedRecord.data.authNum
				},
				timeout:60000,
				success: function(response) {
					
					var jo = Ext.decode(response.responseText);
					
					that.child('gridpanel').getStore().reload();
					if(jo.success) {
						Ext.Msg.alert('', authName.toUpperCase() + ' 권한이 삭제 되었습니다.');
						ds.load();
					}
					else {
						Ext.Msg.alert('에러', jo.errMsg);
					}
				},
				failure: function(response) {
					console.log(response)
					Ext.Msg.alert('', '오류가 발생했습니다.');
				}
			});*/
		}
		
		var authorityWin = Ext.create('Ext.window.Window',{
			iconCls: 'icon-window',
			title: '권한등록',
			width: 600,
			height: 450,
			modal: true,
			resizable: false,
			closeAction: 'hide',
			items: [{
				xtype: 'form',
				id: 'authorityRegForm',
				bodyPadding: 15,
				defaults: {
	                anchor: '100%',
	                height: 22,
	                labelWidth: 70
	            },
	            defaultType: 'textfield',
	            items: [{
	            	fieldLabel: '권한이름',
					id: 'txtAuthName',
					enableKeyEvents: true,
					value: 'ROLE_',
					listeners: {
	                	keyup: function(txt, e, eOpts) {
	                		var v = txt.getValue();
	                		
	                		if(!v.startsWith('ROLE_')) {
	                			txt.setValue('ROLE_');
	                		}
	                		
	                		//space key
	                		if(e.keyCode == 32) {
	                			txt.setValue(Ext.util.Format.trim(v));
	                		}
	                	}
	                }
	            }, {
	            	fieldLabel: '권한한글명',
					id: 'txtAuthNameKor'
	            }, {
	            	fieldLabel: '내용',
					xtype: 'textareafield',
					grow: true,
					height: 300,
					id: 'txtAuthContent'
	            }]
			}],
			buttons: [{
				xtype: 'button',
				iconCls: 'reg',
				text: '등록',
				listeners: {
					click: function() {
						regAuthority();
					}
				}
			}, {
				xtype: 'button',
				iconCls: 'icon-close',
				text: '닫기',
				listeners: {
					click: function() {
						authorityWin.hide();
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
				id: 'authority-grid',
				store: ds,
	            height: 500,
	            title:'권한목록',
	            tbar: [{
	            	xtype: 'button',
	            	iconCls: 'icon-add',
	            	text: '권한등록',
	            	listeners: {
	            		click: function() {
	            			authorityWin.show();
	            		}
	            	}
	            }],
	            columns: [{
                    id       :'authNum',
                    text   : '권한번호',
                    width    : 55,
                    sortable : true,
                    dataIndex: 'authNum'
                },{
                    text   : '권한이름',
                    flex    : 1,
                    sortable : true,
                    renderer : authFormat,
                    dataIndex: 'authName'
                },{
                    text   : '권한설명',
                    width    : 75,
                    sortable : true,
                    dataIndex: 'description'
                }],

	            listeners: {
	            	afterlayout: function(t) {
	            		try{
	            			if(!selectedRecord){
	            				t.getSelectionModel().select(0);
	            			}
	            		}
	            		catch(e) {}
	            		
	            	},
	                selectionchange: function(model, records) {
	                	if (records[0]) {
	                    	selectedRecord = records[0];
	                        this.up('form').getForm().loadRecord(selectedRecord);
	                    }
	                }
	            }
			}, {
				 columnWidth: 0.4,
		            margin: '0 0 0 10',
		            xtype: 'fieldset',
		            title:'권한 상세보기',
		            height: 500,
		            defaults: {
		                width: 240,
		                labelWidth: 90
		            },
		            defaultType: 'textfield',
		            items: [{
		                fieldLabel: '권한번호',
		                name: 'authNum',
		                id: 'idAuthNum',
		                disabled: true
		            },{
		                fieldLabel: '권한이름',
		                anchor: '100%',
		                name: 'authName',
		                id: 'idAuthName',
		                enableKeyEvents: true,
		                listeners: {
		                	keyup: function(txt, e, eOpts) {
		                		var v = txt.getValue();
		                		
		                		if(!v.startsWith('ROLE_')) {
		                			txt.setValue('ROLE_');
		                		}
		                		
		                		//space key
		                		if(e.keyCode == 32) {
		                			txt.setValue(Ext.util.Format.trim(v));
		                		}
		                		
		                	}
		                }
		            },{
		                fieldLabel: '설명',
		                name: 'description',
		                xtype: 'textareafield',
		                anchor: '100%',
		                id: 'idAuthDescription',
		                height: 260,
		                grow: true
		            },{
		            	width: 100,
		               	height: 100,
		            	y: 0,
			           	x: 95,
		            	xtype: 'button',
		            	iconCls: 'icon-modi',
		            	textAlign: 'left',
		            	text:'권한설정변경',
		            	listeners: {
		            		click: function() {
		            			Ext.Msg.confirm(
									'수정',
									'권한설정을 변경하시겠습니까?',
									function(button) {
										if(button == 'yes') {
											modifyAuthority();
										}
									}
			           			);
		            		}
		            	}
		            },{
		            	width: 100,
		               	height: 100,
		            	y: 0,
			           	x: 105,
			           	iconCls: 'icon-del',
		            	xtype: 'button',
		            	text:'권한삭제',
		            	textAlign: 'left',
		            	listeners: {
		            		click: function() {
		            			Ext.Msg.confirm(
									'삭제',
									Ext.getCmp('idAuthName').getValue() + ' 권한을 삭제하시겠습니까?',
									function(button) {
										if(button == 'yes') {
											deleteAuthority();
										}
									}
			           			);
		            		}
		            	}
		            }]
			}]
		});
		
		this.callParent(arguments);
	}
});