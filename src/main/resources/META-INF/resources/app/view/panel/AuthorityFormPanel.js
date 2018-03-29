Ext.define('Hotplace.view.panel.AuthorityFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'authoritypanel',
	id: 'authorityform',
	initComponent: function() {
		var that = this;
		var selectedRecord = null;
		   
		function authFormat(val){
			if(val){
				return '<span style="color:red;">' + val.substring(0,5) + '</span>' + val.substring(5);
			}
			
			return '';
		}
		           
		Ext.apply(this,{
			frame: true,
			bodyPadding: 5,
			width: '100%',
			layout: 'column',
			
			items: [{
				columnWidth: 0.60,
				xtype: 'gridpanel',
				store: Ext.create('Hotplace.store.AuthorityListStore'),
	            height: 400,
	            title:'권한목록',
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
		            height: 400,
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
		            	anchor: '100%',
		            	xtype: 'button',
		            	text:'설정변경',
		            	listeners: {
		            		click: function() {
		            			var data = selectedRecord.data;
		            			
		            			Ext.Ajax.request({
		            				url: Hotplace.util.Constants.context + '/authority/modify',
		            				method:'POST',
		            				headers: { 'Content-Type': 'application/json' }, 
		            				jsonData: {
		            					authNum: Ext.getCmp('idAuthNum').getValue(),
		            					authName: Ext.getCmp('idAuthName').getValue(),
		            					description: Ext.getCmp('idAuthDescription').getValue()
		            				},
		            				timeout:60000,
		            				success: function(response) {
		            					
		            					var jo = Ext.decode(response.responseText);
		            					
		            					that.child('gridpanel').getStore().reload();
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