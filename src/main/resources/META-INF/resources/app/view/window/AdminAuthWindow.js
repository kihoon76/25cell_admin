Ext.define('Hotplace.view.window.AdminAuthWindow', {
	extend: 'Ext.window.Window',
	xtype: 'adminauthwin',
	requires : ['Hotplace.util.CommonFn'],
	initComponent: function() {
		var selectedRecord = null;
		var store = Ext.create('Hotplace.store.AdminListStore');
		var commFn = Hotplace.util.CommonFn;
		
		var tbar = {
			xtype: 'toolbar',
	        layout: 'hbox',
	        items: [{
	        	id: 'admin-id-text',
            	xtype: 'textfield',
            	fieldLabel: '아이디 검색',
            	enableKeyEvents: true,
            	width: 230,
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
	        	width: 20,
	        	listeners: {
	        		click: function(btn, e) {
					   search();
	        		}
	        	}
	        }],        
	        height       : 30,
	        layoutConfig : {
	            align : 'stretch'
	        },
	        defaults: {
                width: 240,
                labelWidth: 75
            },
            defaultType: 'textfield',
		};
		
		var grid = Ext.create('Ext.grid.Panel', {
			store: store,
			width: 400,
		    margins: '0 2 0 0',
		    region: 'west',
			height: 500,
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
	        tbar: tbar,
	        listeners: {
	        	itemclick: function(view, record) {
	        		selectedRecord = record;
					var data = record.data;
					
					formPanel.setTitle('관리자설정(' + data.accountId + ')-' + data.userName);
					var chkAdmGrp = Ext.getCmp('admin-checkgrp-radio');
					var chkAdm = Ext.getCmp('admin-check-1');
					var chkQaAdm = Ext.getCmp('qaadmin-check-1');
					var btnAdmin = Ext.getCmp('btn-admin');
					
					
					chkAdmGrp.setDisabled(false);
					chkAdm.setValue(false);
					chkQaAdm.setValue(false);
					btnAdmin.setDisabled(false);
					
					if('Y' == data.isAdmin) {
						chkAdm.setValue(true);
					}
					
					if('Y' == data.isQaAdmin) {
						chkQaAdm.setValue(true);
					}
	        	}
	        }
		});
		
		    
		var formPanel = Ext.create('Ext.form.Panel', {
	        region     : 'center',
	        title      : '관리자설정',
	        bodyStyle  : 'padding: 10px; background-color: #DFE8F6',
	        labelWidth : 60,
	        margins    : '0 0 0 3',
	        items      : [{   	
	        	xtype: 'checkboxgroup',
	        	id: 'admin-checkgrp-radio',
            	disabled: true,
            	width: 400,
        		items: [{
        			xtype: 'checkbox',
        			boxLabel: '관리자',
        			id: 'admin-check-1',
        			listeners: {
        				change: function(t) {
        					if(t === true) {
        						Ext.getCmp('admin-check-1').setValue(false);
        					}
        					else if(t.getValue()){
        						Ext.getCmp('qaadmin-check-1').fireEvent('change', true)
        					}
        				}
        			}
        		}, {
        			xtype: 'checkbox',
        			boxLabel: '문의사항처리 관리자',
        			id: 'qaadmin-check-1',
        			listeners: {
        				change: function(t, nV, oV) {
        					if(t === true) {
        						Ext.getCmp('qaadmin-check-1').setValue(false);
        					}
        					else if(t.getValue()){
        						Ext.getCmp('admin-check-1').fireEvent('change', true)
        					}
        				}
        			}
        		}]
	        }],
	        bbar:[{
	        	xtype: 'button',
	        	text: '설정',
	        	width: 200,
	        	disabled: true,
	        	id: 'btn-admin',
	        	listeners: {
	        		click: function() {
	        			setAdmin();
	        		}
	        	}
	        	
	        }]
	    });
		
		function setAdmin() {
			var data = selectedRecord.data;
			
			commFn.ajax({
				url: '/user/admin/modify',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: {
					accountId: selectedRecord.data.accountId,
					admin: (Ext.getCmp('admin-check-1').checked ? 'Y' : 'N'),
					qaAdmin: (Ext.getCmp('qaadmin-check-1').checked ? 'Y' : 'N')
				},
				timeout:60000,
				success: function(jo) {
					if(jo.success) {
						Ext.Msg.alert('', '설정이 수정되었습니다.', function() {
							var el = Ext.getCmp('admin-id-text');
							var accountId = el.getValue();
							
							if(Ext.String.trim(accountId) != '') {
								store.load({
								    params: {accountId: accountId}
							    });
							}
						});
					}
					else {
						Ext.Msg.alert('에러', jo.errMsg);
					}
				},
			});
		}
		
		function search() {
			var el = Ext.getCmp('admin-id-text');
			var accountId = el.getValue();
			
			if(Ext.String.trim(accountId) == '') {
				Ext.Msg.alert('', '아이디를 입력하세요');
				return;
			}
			
			store.load({
			    params: {accountId: accountId}
		    });
		}
		
//		Ext.apply(this, {
//			width: 800,
//			height: 500,
//			items: {
//				xtype: 'gridpanel',
//				id: 'admin-user-grid',
//				store: store,
//	            height: 500,
//	            //title:'회원목록',
//	            columns: [{
//	                id       :'accountId',
//	                text   	 : '아이디',
//	                flex    : 1,
//	                sortable : true,
//	                dataIndex: 'accountId'
//	            },{
//	                text   : '이름',
//	                width    : 200,
//	                sortable : true,
//	                dataIndex: 'userName'
//	            }],
//	            tbar: tbar
//			}
//		});
		
		Ext.apply(this, {
			width: 800,
			height: 530,
			items: {
				xtype: 'panel',
				layout: 'border',
	            height: 500,
	            //title:'회원목록',
	           items: [grid, formPanel]
			}
		});
		
		this.callParent(arguments);
	}
});