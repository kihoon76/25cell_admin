Ext.define('Hotplace.view.panel.ConfigureFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'configurepanel',
	requires : ['Hotplace.util.Constants'],
	id: 'configureform',
	initComponent: function() {
		var that = this;
		var selectedRecord = null;
		
		function authFormat(val){
			if(val){
				return '<span style="color:red;">' + val.substring(0,5) + '</span>' + val.substring(5);
			}
			
			return '';
		}
		
		function modify() {
			
		}
		           
		Ext.apply(this,{
			frame: true,
			bodyPadding: 5,
			width: '100%',
			layout: 'column',
			
			items: [{
				columnWidth: 0.60,
				xtype: 'gridpanel',
				store: Ext.create('Hotplace.store.ConfigureListStore'),
	            height: 400,
	            title:'설정목록',
	            columns: [{
                    id       :'confNum',
                    text   : '설정번호',
                    width    : 55,
                    sortable : true,
                    dataIndex: 'confNum'
                },{
                    text   : '설정내용',
                    width    : 150,
                    sortable : true,
                    dataIndex: 'confContent'
                },{
                    text   : '설정값',
                    width    : 250,
                    dataIndex: 'confValue'
                },{
                    text   : '비고',
                    flex    : 1,
                    dataIndex: 'confBigo'
                },{
                    text   : '설정일자',
                    width    : 150,
                    dataIndex: 'confDate'
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
		            title:'설정 상세보기',
		            height: 400,
		            defaults: {
		                width: 240,
		                labelWidth: 90
		            },
		            defaultType: 'textfield',
		            items: [{
		                fieldLabel: '설정번호',
		                name: 'confNum',
		                disabled: true,
		                id: 'idConfNum'
		            },{
		                fieldLabel: '설정내용',
		                anchor: '100%',
		                name: 'confContent',
		                id: 'idConfContent'
		            },{
		                fieldLabel: '설정값',
		                anchor: '100%',
		                name: 'confValue',
		                id: 'idConfValue'
		            },{
		                fieldLabel: '비고',
		                name: 'confBigo',
		                xtype: 'textareafield',
		                anchor: '100%',
		                id: 'idConfBigo',
		                grow: true,
		                height:190
		            },{
		                fieldLabel: '설정일자',
		                anchor: '100%',
		                name: 'confDate',
		                disabled: true
		            },{
		            	anchor: '100%',
		            	xtype: 'button',
		            	text:'설정변경',
		            	listeners: {
		            		click: function() {
		            			var data = selectedRecord.data;
		            			
		            			Ext.Ajax.request({
		            				url: Hotplace.util.Constants.context + '/configure/modify',
		            				method:'POST',
		            				params: {
		            					confNum: Ext.getCmp('idConfNum').getValue(),
		            					confContent: Ext.getCmp('idConfContent').getValue(),
		            					confValue: Ext.getCmp('idConfValue').getValue(),
		            					confBigo: Ext.getCmp('idConfBigo').getValue()
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