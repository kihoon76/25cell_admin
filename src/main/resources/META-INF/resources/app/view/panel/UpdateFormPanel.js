Ext.define('Hotplace.view.panel.UpdateFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'updatepanel',
	requires : ['Hotplace.util.Constants' ,'Hotplace.util.CommonFn'],
	id: 'updateform',
	initComponent: function() {
		var that = this;
		var selectedRecord = null;
		var updateWin = null;
		var commFn = Hotplace.util.CommonFn;
		
		try {
			var store = Ext.create('Hotplace.store.UpdateListStore');
		}
		catch(e) {
			console.log(e);
			//세션만료 및 중복로그인시  js파일을 가져오지 못해서 오류발생함
			commFn.loadJsError();
		}
		
		function showUpdateWin() {
			updateWin = Ext.create('Ext.window.Window',{
				iconCls: 'icon-window',
				title: '업데이트 등록',
				width: 600,
				height: 570,
				modal: true,
				resizable: false,
				closeAction: 'destroy',
				items: [{
					xtype: 'form',
					id: 'sysUpdateForm',
					bodyPadding: 15,
					defaults: {
		                anchor: '100%',
		                height: 22,
		                labelWidth: 90
		            },
		            defaultType: 'textfield',
		            items: [{
		            	fieldLabel: '버전',
						id: 'txtSysVersion',
						allowBlank: false
		            },{
		            	fieldLabel: '업데이트 내용',
		            	xtype: 'textareafield',
		            	height: 200,
						id: 'txtUpdateContent',
						allowBlank: false
		            },{
		            	fieldLabel: '비고',
		            	xtype: 'textareafield',
		            	height: 100,
						id: 'txtUpdateBigo'
		            },{
		            	fieldLabel: '적용일자',
		            	xtype: 'datefield',
						id: 'dtUpdateApplyDate',
						format: 'Y-m-d',
						editable: false
		            },{
		            	xtype: 'radiogroup',
		            	fieldLabel: '템플릿',
		            	height: 120,
		            	items: [{
		            		boxLabel: '<img src="' + commFn.getFullUrl('resources/images/popup/1.png') + '" style="width: 100px; height: 100px;" />',
		            		boxLabelAlign: 'before',
		            		name: 'template',
		            		checked: true,
		            		id: 'rdoUpTemplate1'
		            		
		            	},{
		            		boxLabel: '<img src="' + commFn.getFullUrl('resources/images/popup/2.png') + '" style="width: 100px; height: 100px;" />',
		            		boxLabelAlign: 'before',
		            		name: 'template',
		            		id: 'rdoUpTemplate2'
		            	}],
		            }]
				}],
				buttons: [{
					xtype: 'button',
					iconCls: 'reg',
					text: '등록',
					listeners: {
						click: function() {
							regUpdate();
						}
					}
				}, {
					xtype: 'button',
					iconCls: 'icon-close',
					text: '닫기',
					listeners: {
						click: function() {
							updateWin.close();
						}
					}
				}]
			}).show();
		};
		
		function regUpdate() {
			var versionEl = Ext.getCmp('txtSysVersion');
			var contentEl = Ext.getCmp('txtUpdateContent');
			var applyDateEl = Ext.getCmp('dtUpdateApplyDate');
			var templateEl = Ext.getCmp('rdoUpTemplate1');
			var bigoEl = Ext.getCmp('txtUpdateBigo');
			
			var version = Ext.String.trim(versionEl.getValue());
			var content = contentEl.getValue();
			var applyDate = applyDateEl.getRawValue();
			var tempNum = templateEl.getValue() ? '1' : '2';
			
			if(versionEl.validate() && contentEl.validate()) {
				commFn.ajax({
					url: '/configure/regUpdate',
					method:'POST',
					headers: { 'Content-Type': 'application/json' }, 
					jsonData: {
						version: version,
						content: content,
						tempNum: tempNum,
						applyDate: applyDate,
						bigo: bigoEl.getValue()
					},
					timeout:60000,
					success: function(jo) {
						
						if(jo.success) {
							Ext.Msg.alert('', '업데이트 정보가 등록 되었습니다', function() {
								store.load();
								updateWin.close();
							});
						}
						else {
							Ext.Msg.alert('에러', jo.errMsg);
						}
					}
				});
			}
		}
		
		function modUpdate() {
			if(selectedRecord) {
				var idx = selectedRecord.data.idx;
				var versionEl = Ext.getCmp('up-version');
				var contentEl = Ext.getCmp('up-content');
				var applyDateEl = Ext.getCmp('up-applyDate');
				var templateEl = Ext.getCmp('rdoUpModTemplate1');
				var bigoEl = Ext.getCmp('up-bigo');
				
				var version = Ext.String.trim(versionEl.getValue());
				var content = contentEl.getValue();
				var applyDate = applyDateEl.getRawValue();
				var tempNum = templateEl.getValue() ? '1' : '2';
				
				if(versionEl.validate() && contentEl.validate()) {
					commFn.ajax({
						url: '/configure/modUpdate',
						method:'POST',
						headers: { 'Content-Type': 'application/json' }, 
						jsonData: {
							idx: idx,
							version: version,
							content: content,
							tempNum: tempNum,
							applyDate: applyDate,
							bigo: bigoEl.getValue()
						},
						timeout:60000,
						success: function(jo) {
							if(jo.success) {
								Ext.Msg.alert('', '수정 되었습니다', function() {
									store.load();
								});
							}
							else {
								Ext.Msg.alert('에러', jo.errMsg);
							}
						}
					});
				}
			}
		}
		
		function delUpdate() {
			if(selectedRecord) {
				var data = selectedRecord.data;
				var idx = data.idx;
				var version = data.version;
				
				Ext.Msg.confirm('', '버전(' + version + ')을 삭제하시겠습니까?', function(button) {
					if(button == 'yes') {
						commFn.ajax({
							url: '/configure/delUpdate',
							method:'POST',
							headers: { 'Content-Type': 'application/json' }, 
							jsonData: {
								idx: idx
							},
							timeout:60000,
							success: function(jo) {
								if(jo.success) {
									Ext.Msg.alert('', '삭제 되었습니다', function() {
										selectedRecord = null;
										
										Ext.getCmp('up-version').setValue('');
										Ext.getCmp('up-content').setValue('');
										Ext.getCmp('up-applyDate').setRawValue('');
										Ext.getCmp('rdoUpModTemplate1').setValue(true);
										Ext.getCmp('rdoUpModTemplate2').setValue(false);
										Ext.getCmp('up-bigo').setValue('');
										
										store.load();
									});
								}
								else {
									Ext.Msg.alert('에러', jo.errMsg);
								}
							}
						});
					}
				});
			}
			
		}
		
		Ext.apply(this,{
			frame: true,
			bodyPadding: 5,
			width: '100%',
			layout: 'column',
			
			items: [{
				columnWidth: 0.60,
				xtype: 'gridpanel',
				store: store,
	            height: 450,
	            title:'업데이트목록',
	            columns: [{
                    text   : '버전',
                    width    : 80,
                    sortable : true,
                    dataIndex: 'version'
                },{
                    text   : '업데이트 내용',
                    width    : 150,
                    sortable : true,
                    dataIndex: 'content'
                },{
                    text   : '적용일자',
                    width    : 250,
                    dataIndex: 'applyDate'
                },{
                    text   : '비고',
                    flex    : 1,
                    dataIndex: 'bigo'
                },{
                    text   : '템플릿',
                    width    : 150,
                    dataIndex: 'tempNum'
                }],
                tbar: [{
	            	xtype: 'button',
	            	iconCls: 'icon-add',
	            	text: '업데이트 등록',
	            	listeners: {
	            		click: function() {
	            			showUpdateWin();
	            		}
	            	}
	            }],
	            listeners: {
	            	afterlayout: function(t) {
//	            		try{
//	            			if(!selectedRecord){
//	            				t.getSelectionModel().select(0);
//	            			}
//	            		}
//	            		catch(e) {}
	            		
	            	},
	                selectionchange: function(model, records) {
	                    if (records[0]) {
	                    	selectedRecord = records[0];
	                        this.up('form').getForm().loadRecord(selectedRecord);
	                        
	                        if(selectedRecord.data.tempNum == '1') {
	                        	Ext.getCmp('rdoUpModTemplate1').setValue(true);
	                        	Ext.getCmp('rdoUpModTemplate2').setValue(false);
	                        }
	                        else {
	                        	Ext.getCmp('rdoUpModTemplate1').setValue(false);
	                        	Ext.getCmp('rdoUpModTemplate2').setValue(true);
	                        }
	                    }
	                }
	
	            }
			}, {
				 columnWidth: 0.4,
		            margin: '0 0 0 10',
		            xtype: 'fieldset',
		            title:'업데이트 상세보기',
		            height: 450,
		            defaults: {
		                width: 240,
		                labelWidth: 90
		            },
		            defaultType: 'textfield',
		            items: [{
		                fieldLabel: '버전',
		                name: 'version',
		                //disabled: true,
		                id: 'up-version',
		                allowBlank: false
		            },{
		                fieldLabel: '업데이트 내용',
		                anchor: '100%',
		                xtype: 'textareafield',
		                name: 'content',
		                id: 'up-content',
		                allowBlank: false
		            },{
		                fieldLabel: '적용일자',
		                anchor: '100%',
		                xtype: 'datefield',
		                format: 'Y-m-d',
		                name: 'applyDate',
		                id: 'up-applyDate',
		                editable: false
		            },{
		                fieldLabel: '비고',
		                anchor: '100%',
		                xtype: 'textareafield',
		                name: 'bigo',
		                id: 'up-bigo'
		            },{
		            	xtype: 'radiogroup',
		            	fieldLabel: '템플릿',
		            	height: 120,
		            	items: [{
		            		boxLabel: '<img src="' + commFn.getFullUrl('resources/images/popup/1.png') + '" style="width: 100px; height: 100px;" />',
		            		boxLabelAlign: 'before',
		            		name: 'templateMod',
		            		checked: true,
		            		id: 'rdoUpModTemplate1',
		            		padding: '0 50 0 0',
		            		
		            	},{
		            		boxLabel: '<img src="' + commFn.getFullUrl('resources/images/popup/2.png') + '" style="width: 100px; height: 100px;" />',
		            		boxLabelAlign: 'before',
		            		name: 'templateMod',
		            		id: 'rdoUpModTemplate2'
		            	}],
		            },{
		            	anchor: '100%',
		            	xtype: 'button',
		            	text:'업데이트 변경',
		            	listeners: {
		            		click: function() {
		            			modUpdate();
		            		}
		            	}
		            },{
		            	anchor: '100%',
		            	xtype: 'button',
		            	margin: '10 0 0 0',
		            	text:'업데이트 삭제',
		            	listeners: {
		            		click: function() {
		            			delUpdate();
		            		}
		            	}
		            }]
			}]
		});

		
		this.callParent(arguments);
		
	}
});