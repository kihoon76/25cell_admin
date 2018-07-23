Ext.define('Hotplace.view.window.PaymentManualWindow', {
	extend: 'Ext.window.Window',
	xtype: 'paymentmanualwin',
	requires : ['Hotplace.util.CommonFn'],
	initComponent: function() {
		var selectedRecord = null;
		var store = Ext.create('Hotplace.store.AdminListStore');
		var commFn = Hotplace.util.CommonFn;
		var that = this;
		var tbar = {
			xtype: 'toolbar',
	        layout: 'hbox',
	        items: [{
	        	id: 'payment-manual-id-text',
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
					
					var idEl = Ext.getCmp('fm-payment-account-id');
					var btn = Ext.getCmp('btn-payment-manual');
					
					formPanel.setDisabled(false);
					btn.setDisabled(false);
					idEl.setValue(data.accountId);
	        	}
	        }
		});
		
		var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
		
		var formPanel = Ext.create('Ext.form.Panel', {
	        region     : 'center',
	        title      : '결제정보설정',
	        id		   : 'fm-payment',
	        bodyStyle  : 'padding: 10px;',
	        margins    : '0 0 0 3',
	        disabled: true,
	        fieldDefaults: {
	            msgTarget: 'side',
	            labelWidth: 75
	        },
	        defaultType: 'textfield',
	        items      : [{
	            fieldLabel: '결제계정',
	            afterLabelTextTpl: required,
	            id: 'fm-payment-account-id',
	            allowBlank: false,
	            readOnly: true
	        },{
	            fieldLabel: '결제금액',
	            id: 'fm-payment-price',
	            xtype: 'numberfield',
	            afterLabelTextTpl: required,
	            allowBlank: false,
	            minValue:0,
	            value:0
	        }, {
	            fieldLabel: '결제일자',
	            id: 'fm-payment-date',
	            xtype: 'datefield',
	            format: 'Y-m-d',
	            afterLabelTextTpl: required,
	            allowBlank: false,
	            editable: false
	        },{
	            fieldLabel: '입금자명',
	            id: 'fm-payment-depositor',
	            afterLabelTextTpl: required,
	            allowBlank: false
	        },{
	            fieldLabel: '서비스선택',
	            id: 'fm-payment-type',
	            xtype: 'combobox',
	            editable: false,
	            store:  Ext.create('Ext.data.Store', {
            		fields:['name', 'value'],
            		data: [
            		  {name: '전체이용회원', value: 'ALL'},
            		  {name: '개별이용회원', value: 'EACH'}
            		]
            	}),
        		displayField: 'name',
        		valueField: 'value',
        		value: 'ALL',
        		listeners: {
        			change: function(c, nV) {
        				if(nV == 'EACH') {
        					Ext.getCmp('fm-payment-tooja').setVisible(true);
        					Ext.getCmp('fm-payment-gg').setVisible(true);
        					Ext.getCmp('fm-payment-mulgeon').setVisible(true);
        					Ext.getCmp('fm-payment-heatmap').setVisible(true);
        					Ext.getCmp('fm-payment-all-rg').setVisible(false);
        				}
        				else {
        					Ext.getCmp('fm-payment-tooja').setVisible(false);
        					Ext.getCmp('fm-payment-gg').setVisible(false);
        					Ext.getCmp('fm-payment-mulgeon').setVisible(false);
        					Ext.getCmp('fm-payment-heatmap').setVisible(false);
        					Ext.getCmp('fm-payment-all-rg').setVisible(true);
        				}
        			}
        		}
	        }, {
	        	xtype: 'radiogroup',
	        	fieldLabel: '결제기간',
	        	id: 'fm-payment-all-rg',
	        	columns: 2,
	        	vertical: true,
	        	items:[{
	        		boxLabel: '연간결제',
	        		name: 'rg',
	        		id: 'fm-payment-all-year',
	        		_value: 'YEAR',
	        		checked: true
	        	}, {
	        		boxLabel: '월간결제',
	        		name: 'rg',
	        		id: 'fm-payment-all-month',
	        		_value: 'MONTH'
	        	}]
	        }, {
	        	xtype: 'checkbox',
	        	id: 'fm-payment-tooja',
	        	boxLabel: '투자유망검색',
	        	fieldLabel: '개별서비스',
	        	hidden: true,
	        	_value: 'ROLE_TOOJA'
	        }, {
	        	xtype: 'checkbox',
	        	id: 'fm-payment-gg',
	        	boxLabel: '경공매검색',
	        	fieldLabel: '개별서비스',
	        	hidden: true,
	        	_value: 'ROLE_GYEONGGONG'
	        }, {
	        	xtype: 'checkbox',
	        	id: 'fm-payment-mulgeon',
	        	boxLabel: '물건보기',
	        	fieldLabel: '개별서비스',
	        	hidden: true,
	        	_value: 'ROLE_MULGEON'
	        }, {
	        	xtype: 'checkbox',
	        	id: 'fm-payment-heatmap',
	        	boxLabel: '히트맵보기',
	        	fieldLabel: '개별서비스',
	        	hidden: true,
	        	_value: 'ROLE_HEATMAP'
	        }],
	        bbar:[{
	        	xtype: 'button',
	        	text: '설정',
	        	width: 200,
	        	disabled: true,
	        	id: 'btn-payment-manual',
	        	listeners: {
	        		click: function() {
	        			mockPayment();

	        		}
	        	}
	        	
	        }]
	    });
		
		function mockPayment() {
			
			var param = {};
			var serviceSubType = [];
			var serviceType = Ext.getCmp('fm-payment-type').getValue();
			var accountId = Ext.getCmp('fm-payment-account-id');
			var price = Ext.getCmp('fm-payment-price');
			var paymentDate = Ext.getCmp('fm-payment-date');
			var depositor = Ext.getCmp('fm-payment-depositor');
			
			
			if(accountId.validate()) {
				param.accountId = Ext.String.trim(accountId.getValue());
			}
			else {
				return;
			}
			
			if(price.validate()) {
				param.sum = price.getValue();
			}
			else {
				return;
			}
			
			if(paymentDate.validate()) {
				param.paymentDate = paymentDate.getRawValue();
			}
			else {
				return;
			}
			
			if(depositor.validate()) {
				param.depositor = Ext.String.trim(depositor.getValue());
			}
			else {
				return;
			}
			
			param.serviceType = serviceType;
			
			if(serviceType == 'ALL') {
				var c1 = Ext.getCmp('fm-payment-all-year');
				var c2 = Ext.getCmp('fm-payment-all-month');
				if(c1.getValue()) {
					serviceSubType.push(c1._value);
				}
				else {
					serviceSubType.push(c2._value);
				}
			}
			else {
				var s1 = Ext.getCmp('fm-payment-tooja');
				var s2 = Ext.getCmp('fm-payment-gg');
				var s3 = Ext.getCmp('fm-payment-mulgeon');
				var s4 = Ext.getCmp('fm-payment-heatmap');
				
				if(s1.getValue()) {
					serviceSubType.push(s1._value);
				}
				
				if(s2.getValue()) {
					serviceSubType.push(s2._value);
				}
				
				if(s3.getValue()) {
					serviceSubType.push(s3._value);
				}
				
				if(s4.getValue()) {
					serviceSubType.push(s4._value);
				}
				
				if(serviceSubType.length == 0) {
					Ext.Msg.alert('', '서비스를 하나이상 선택하세요.');
					return;
				}
				
			}
			
			param.serviceSubTypes = serviceSubType.join(',');
			
			console.log(param)
			
			commFn.ajax({
				url: '/payment/mockdo',
				method:'POST',
				headers: { 'Content-Type': 'application/json' }, 
				jsonData: param,
				timeout:60000,
				success: function(jo) {
					if(jo.success) {
						Ext.Msg.alert('', '설정이 수정되었습니다.', function() {
							Ext.getCmp('paymentListGrid').getStore().loadPage(1);
							that.close();
						});
					}
					else {
						Ext.Msg.alert('에러', jo.errMsg);
					}
				},
			});
		}
		
		function search() {
			var el = Ext.getCmp('payment-manual-id-text');
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