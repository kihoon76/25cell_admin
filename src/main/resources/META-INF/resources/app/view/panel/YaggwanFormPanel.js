Ext.define('Hotplace.view.panel.YaggwanFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'yaggwanpanel',
	requires : ['Hotplace.util.Constants'],
	initComponent: function() {
		var that = this;
		var selectedRecord = null;
		var soonseoComboArr = [];
		
		var soonseoComboStore = Ext.create('Ext.data.Store', {
			 fields   : ['name', 'value']
		});
		
		var ds = Ext.create('Hotplace.store.YaggwanListStore', {
			listeners: {
				load: function(t, r, successful) {
					var len = t.getTotalCount();
					
					soonseoComboArr = [];
					for(var i=1; i<=len; i++) {
						soonseoComboArr.push({
							name: i,
							value:i
						});
					}
					
					soonseoComboStore.loadData(soonseoComboArr);
					
					
					var grid = Ext.getCmp('yaggwan-grid');
					selectedRecord = grid.getView().getSelectionModel().getSelection()[0]
					if(selectedRecord) {
						grid.getSelectionModel().select(0);
					}
				}
			}
		});
		
		var yaggwanWin = Ext.create('Ext.window.Window',{
			iconCls: 'icon-window',
			title: '약관등록',
			width: 600,
			height: 450,
			modal: true,
			resizable: false,
			closeAction: 'hide',
			items: [{
				xtype: 'form',
				id: 'yaggwanRegForm',
				bodyPadding: 15,
				//height: 200,
				defaults: {
	                //width: 250,
	                anchor: '100%',
	                height: 22,
	                labelWidth: 70
	            },
	            defaultType: 'textfield',
	            items: [{
	            	fieldLabel: '카테고리명',
					id: 'txtCategoryName'
	            }, {
	            	fieldLabel: '내용',
					xtype: 'textareafield',
					grow: true,
					height: 300,
					id: 'txtCategoryContent'

	            }, {
	                xtype: 'radiogroup',
	                fieldLabel: '필수여부',
	                id: 'rdoRequired',
	                //width: 150,
	                columns: 2,
	                defaults: {
	                    name: 'winrequired' //Each radio has the same name so the browser will make sure only one is checked at once
	                },
	                items: [{
	                    inputValue: 'Y',
	                    checked: true,
	                    boxLabel: '예'
	                }, {
	                    inputValue: 'N',
	                    boxLabel: '아니오'
	                }]
	            }]
			}],
			buttons: [{
				xtype: 'button',
				iconCls: 'reg',
				text: '등록',
				listeners: {
					click: function() {
						regYaggwan();
					}
				}
			}, {
				xtype: 'button',
				iconCls: 'icon-close',
				text: '닫기',
				listeners: {
					click: function() {
						yaggwanWin.hide();
					}
				}
			}]
		});
		
		function regYaggwan() {
			var categoryName = Ext.String.trim(Ext.getCmp('txtCategoryName').getValue()),
			content = Ext.String.trim(Ext.getCmp('txtCategoryContent').getValue()),
			required = Ext.getCmp('rdoRequired').getValue().winrequired;
			
			if(categoryName == '' || content == '') return;
			
			Ext.Ajax.request({
				url: Hotplace.util.Constants.context + '/yaggwan/regist',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					categoryName: categoryName,
					content: content,
					required: required
				},
				timeout:60000,
				success: function(response) {
					
					var jo = Ext.decode(response.responseText);
					
					//that.child('gridpanel').getStore().reload();
					if(jo.success) {
						Ext.Msg.alert('', '등록되었습니다.');
						ds.load();
						
						Ext.getCmp('txtCategoryName').setValue('');
						Ext.getCmp('txtCategoryContent').setValue('');
						Ext.getCmp('rdoRequired').setValue({winrequired: 'Y'});
						
						yaggwanWin.hide();
						
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
		
		
		function modifyYaggwan() {
			if(selectedRecord == null) return;
			var data = selectedRecord.data;
			var key = data.key;
			var originSoonseo = data.soonseo;
			
			Ext.Ajax.request({
				url: Hotplace.util.Constants.context + '/yaggwan/modify',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					key: key,
					content: Ext.getCmp('yaggwan-content-textarea').getValue(),
					categoryName: Ext.getCmp('yaggwan-categoryName-text').getValue(),
					soonseo: Ext.getCmp('yaggwan-soonseo-combo').getValue(),
					required: Ext.getCmp('yaggwan-required-radio').getValue().required,
					originSoonseo: originSoonseo
				},
				timeout:60000,
				success: function(response) {
					
					var jo = Ext.decode(response.responseText);
					
					//that.child('gridpanel').getStore().reload();
					if(jo.success) {
						Ext.Msg.alert('', '설정이 수정되었습니다.');
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
			});
		}
		
		function deleteYaggwan() {
			if(selectedRecord == null) return;
			var data = selectedRecord.data;
			var key = data.key;
			
			Ext.Ajax.request({
				url: Hotplace.util.Constants.context + '/yaggwan/delete',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					key: key
				},
				timeout:60000,
				success: function(response) {
					
					var jo = Ext.decode(response.responseText);
					
					that.child('gridpanel').getStore().reload();
					if(jo.success) {
						Ext.Msg.alert('', '약관이 삭제되었습니다.');
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
			});
		}
		
		Ext.apply(this, {
			frame: true,
		    bodyPadding: 5,
		    width: 750,
		    layout: 'column',    // Specifies that the items will now be arranged in columns
		    fieldDefaults: {
	            labelAlign: 'left',
	            msgTarget: 'side'
	        },
	        
	        items: [{
	            columnWidth: 0.40,
	            id: 'yaggwan-grid',
	            xtype: 'gridpanel',
	            store: ds,
	            height: 800,
	            title: '약관리스트',
	            tbar: [{
	            	xtype: 'button',
	            	iconCls: 'icon-add',
	            	text: '약관등록',
	            	listeners: {
	            		click: function() {
	            			yaggwanWin.show();
	            		}
	            	}
	            }, {
	            	xtype: 'button',
	            	iconCls: 'icon-refresh',
	            	text: '새로고침',
	            	listeners: {
	            		click: function() {
	            			Ext.getCmp('yaggwan-grid').getStore().load();
	            		}
	            	}
	            }],
	            columns: [{
	            	text: '카테고리명',
	            	width: 200,
	                flex: 0,
	                sortable : true,
	                dataIndex: 'categoryName'
	            }, {
	            	text: '순서',
	            	width: 50,
	                flex: 0,
	                sortable : true,
	                dataIndex: 'soonseo'
	            }, {
	                text: '내용',
	                flex: 1,
	                sortable: true,
	                dataIndex: 'content'
	            }],

	            listeners: {
	            	afterlayout: function(t) {
	            		try{
	            			//soonseoComboStore.loadData(soonseoComboArr);
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
	            columnWidth: 0.6,
	            margin: '0 0 0 10',
	            xtype: 'fieldset',
	            height: 800,
	            title:'약관상세',
	            defaults: {
	                width: 400,
	                labelWidth: 90
	            },
	            defaultType: 'textfield',
	            items: [{
	                fieldLabel: '카테고리명',
	                name: 'categoryName',
	                id: 'yaggwan-categoryName-text'
	            },{
	                fieldLabel: '내용',
	                xtype: 'textarea',
	                id: 'yaggwan-content-textarea',
	                anchor: '100%',
	                height: 400,
	                name: 'content'
	            }, {
	            	xtype: 'combo',
	            	fieldLabel: '순서',
	            	id: 'yaggwan-soonseo-combo',
	            	width: 150,
	            	name: 'soonseo',
	            	store: soonseoComboStore,
	            	queryMode: 'local',
	            	displayField: 'name',
	            	valueField: 'value',
	            	editable: false
	            }, {
	                xtype: 'radiogroup',
	                fieldLabel: '필수여부',
	                id: 'yaggwan-required-radio',
	                width: 250,
	                columns: 2,
	                defaults: {
	                    name: 'required' //Each radio has the same name so the browser will make sure only one is checked at once
	                },
	                items: [{
	                    inputValue: 'Y',
	                    boxLabel: '예'
	                }, {
	                    inputValue: 'N',
	                    boxLabel: '아니오'
	                }]
	            }, {
	               	width: 100,
	               	height: 100,
	               	fieldLabel: '',
		           	xtype: 'button',
		           	iconCls: 'icon-modi',
		           	text:'약관변경',
		           	y: 0,
		           	x: 95,
		           	textAlign: 'left',
		           	listeners: {
		           		click: function() {
		           			Ext.Msg.confirm(
								'수정',
								'약관을 변경하시겠습니까?',
								function(button) {
									if(button == 'yes') {
										modifyYaggwan();
									}
								}
		           			);
		           		}
		           	}
	            }, {
	               	width: 100,
	               	height: 100,
	               	fieldLabel: '',
		           	xtype: 'button',
		           	iconCls: 'icon-del',
		        	y: 0,
		           	x: 100,
		           	text:'약관삭제',
		           	textAlign: 'left',
		           	listeners: {
		           		click: function() {
		           			Ext.Msg.confirm(
								'삭제',
								'약관을 삭제하시겠습니까?',
								function(button) {
									if(button == 'yes') {
										deleteYaggwan();
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