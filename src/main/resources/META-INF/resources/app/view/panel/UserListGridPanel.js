Ext.define('Hotplace.view.panel.UserListGridPanel', {
	extend: 'Ext.grid.Panel',
	requires : ['Hotplace.util.Constants'],
	xtype: 'usergrid',
	id: 'userListGrid',
	initComponent: function() {
		var store = Ext.create('Hotplace.store.UserListStore'),
			constants = Hotplace.util.Constants,
			that = this;
		
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
				}
			}
		});
		
		var searchComboArr = [], searchType = '', searchValue = '';
		
		function search() {
			searchType = Ext.getCmp('user-searchtype-combo').getValue();
			searchValue = Ext.getCmp('user-search-text').getValue() ;
			  
			if(searchType != 'all') {
				if(searchType == 'grade') {
					searchValue = Ext.getCmp('user-searchgrade-combo').getValue();
				}
				
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
		}
		
		function clearSearchTxt(t) {
			if('all' == Ext.getCmp('user-searchtype-combo').getValue()) {
				t.setValue('');
				return true;
			}
			
			return false;
		}
		
		Ext.apply(this, {
			store: store,
			columns:[{
				text: '아이디',
				dataIndex: 'accountId',
				flex: 0
			},{
				text: '이름',
				dataIndex: 'userName',
				flex: 0
			},{
				text: '연락처',
				dataIndex: 'phone',
				flex: 0
			},{
				text: '이메일',
				dataIndex: 'email',
				flex: 1
			},{
				text: '가입일자',
				dataIndex: 'regDate',
				flex: 0
			},{
				text: '회원등급',
				dataIndex: 'grade',
				flex: 0
			}],
			tbar: ['->',
			       '검색항목 : ',
			       Ext.create('Ext.form.field.ComboBox', {
			    	   queryMode: 'local',
			    	   id:'user-searchtype-combo',
			    	   displayField: 'name',
			    	   valueField: 'value',
			    	   editable: false,
			    	   store:searchComboStore,
			    	   listeners: {
			    		   change: function(combo, nV, oV) {
			    			   if(nV == 'all') {
			    				   Ext.getCmp('user-search-text').setValue('');
			    				   store.load();      
			    			   }
			    			   else if(nV == 'grade') {
			    				  Ext.getCmp('user-search-text').hide();
			    				  Ext.getCmp('user-searchgrade-combo').show();
			    			   }
			    			   
			    			   //이전값이 grade이면
			    			   if(oV == 'grade') {
			    				   Ext.getCmp('user-search-text').show();
				    			   Ext.getCmp('user-searchgrade-combo').hide();  
			    			   }
			    		   }
			    	   }
			       }), Ext.create('Ext.form.field.ComboBox', {
			    	   queryMode: 'remote',
			    	   emptyText: '회원등급',
			    	   id:'user-searchgrade-combo',
			    	   displayField: 'name',
			    	   valueField: 'value',
			    	   editable: false,
			    	   hidden: true,
			    	   store: gradeComboStore,
			    	   listeners: {
			    		   change: function(combo, nV, oV) {
			    			  
			    		   }
			    	   }
			       }), {
					   xtype: 'textfield',
					   id: 'user-search-text',
					   enableKeyEvents: true,
					   listeners: {
						   keydown: function(t, e) {
							   console.log(e.keyCode);
							   
							   //전체를 선택한 경우 동작 안함
							   if(e.keyCode == 13) {
								   if(!clearSearchTxt(t)) {
									  search();
								   } 
							   }
						   },
						   blur: function(t) {
							   clearSearchTxt(t);
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
					id: 'user-paging-combo',
					displayField: 'name',
					valueField: 'value',
					editable: false,
					width: 100,
					value: constants.gridPageSize,
					store: Ext.create('Hotplace.store.PagingSize'),
					listeners: {
						change: function(cb, nV, oV) {
							store.pageSize = nV;
							that.getStore()
							    .loadPage(1, {
								    params: { limit: nV}
							    });
						}
					}
				})]
			}],
			listeners: {
				afterrender: function(grid, eOpts) {
					var len = that.columns.length;
					
					searchComboArr.push({name: '전체', value: 'all'});
					for(var i=0; i<len; i++) {
						searchComboArr.push({
							name: that.columns[i].text,
							value: that.columns[i].dataIndex
						});
					}
					
					searchComboStore.loadData(searchComboArr);
					Ext.getCmp('user-searchtype-combo').select('all');
				}
			}
		});
		
		
		this.callParent(arguments);
	}
});