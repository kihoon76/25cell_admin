Ext.define('Hotplace.view.panel.AuthorityFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'authoritypanel',
	id: 'authorityform',
	initComponent: function() {
		
		   
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
	                selectionchange: function(model, records) {
	                    if (records[0]) {
	                        this.up('form').getForm().loadRecord(records[0]);
	                    }
	                }
	            }
			}, {
				 columnWidth: 0.4,
		            margin: '0 0 0 10',
		            xtype: 'fieldset',
		            title:'권한 상세보기',
		            defaults: {
		                width: 240,
		                labelWidth: 90
		            },
		            defaultType: 'textfield',
		            items: [{
		                fieldLabel: '권한번호',
		                name: 'authNum',
		                disabled: true
		            },{
		                fieldLabel: '권한이름',
		                anchor: '100%',
		                name: 'authName'
		            },{
		                fieldLabel: '설명',
		                name: 'description',
		                xtype: 'textareafield',
		                anchor: '100%',
		                grow: true
		            }]
			}]
		});
		
		this.callParent(arguments);
	}
});