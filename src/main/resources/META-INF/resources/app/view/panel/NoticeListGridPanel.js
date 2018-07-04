Ext.define('Hotplace.view.panel.NoticeListGridPanel', {
	extend: 'Ext.grid.Panel',
	requires : ['Hotplace.util.Constants', 
	            'Hotplace.view.iframe.BaseIframe'],
	xtype: 'noticegrid',
	id: 'noticeListGrid',
	initComponent: function() {
		var store = Ext.create('Hotplace.store.NoticeListStore'),
			constants = Hotplace.util.Constants,
			controller = _hotplaceApp.getController('NoticeController'),
			categoryPanel = Ext.getCmp('app-category'),
			contentPanel = Ext.getCmp('app-contents'),
			searchComboArr = [], 
			searchType = '', 
			searchValue = '',
			that = this;
		
		var searchComboStore = Ext.create('Ext.data.Store', {
			 fields   : ['name', 'value']
		});
		
		function search() {
			searchType = Ext.getCmp('notice-searchtype-combo').getValue();
			
			if(searchType == 'writeDate') {
				searchValue = Ext.getCmp('notice-search-regDate').getRawValue();
			}
			else {
				searchValue = Ext.getCmp('notice-search-text').getValue();
			}
			
			  
			if(!searchValue) {
				Ext.Msg.alert('알림', '값을 입력하세요');
				return;
			}
			
			store.loadPage(1, {
			    params: {searchType: searchType, searchValue: searchValue}
		    });
		}
		
		Ext.apply(this, {
			store: store,
			columns: [{
				text: '글번호',
				dataIndex: 'num',
				flex: 0,
				_search: false
			}, {
				text: '제목',
				dataIndex: 'title',
				flex: 1
			}, {
				text: '작성일자',
				dataIndex: 'writeDate',
				flex: 0
			}],
			tbar: ['->',
			       '검색항목 : ',
			       Ext.create('Ext.form.field.ComboBox', {
			    	   queryMode: 'local',
			    	   id:'notice-searchtype-combo',
			    	   displayField: 'name',
			    	   valueField: 'value',
			    	   editable: false,
			    	   store:searchComboStore,
			    	   listeners: {
			    		   change: function(combo, nV, oV) {
			    			   var txt = Ext.getCmp('notice-search-text');
			    			   var date = Ext.getCmp('notice-search-regDate');
			    			   
			    			   txt.setValue('');
		    				   date.setRawValue('');
		    				   
			    			   if(nV == 'all') {
			    				   txt.setVisible(true);
			    				   date.setVisible(false);
			    				   
			    				   searchType = '', 
			    				   searchValue = '';
			    				   store.loadPage(1, {
									    params: { searchType: searchType, searchValue: searchValue}
								   });          
			    			   }
			    			   else if(nV == 'title') {
			    				   txt.setVisible(true);
			    				   date.setVisible(false); 
			    			   }
			    			   else {
			    				   txt.setVisible(false);
			    				   date.setVisible(true);  
			    			   }
			    		   }
			    	   }
			       }),{
					   xtype: 'textfield',
					   id: 'notice-search-text',
					   enableKeyEvents: true,
					   listeners: {
						   keydown: function(t, e) {
							   //전체를 선택한 경우 동작 안함
							   if(e.keyCode == 13) {
								   search();
							   }
						   }
					   }
				  },{
					  xtype: 'datefield',
					  id: 'notice-search-regDate',
					  editable: false,
					  format: 'Y-m-d',
					  hidden: true,
				 },{
					 xtype: 'button',
					 iconCls: 'icon-search',
					 text: '검색',
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
				displayMsg: '공지사항 리스트 {0} - {1} of {2}',
				dock: 'bottom',
				doRefresh: function() {
					Ext.getCmp('noticeListGrid').getStore().load();
				},
				items: ['-', {
					text: '목록수 : '
				}, Ext.create('Ext.form.field.ComboBox', {
					queryMode: 'local',
					id: 'notice-paging-combo',
					displayField: 'name',
					valueField: 'value',
					editable: false,
					width: 100,
					value: constants.gridPageSize,
					store: Ext.create('Hotplace.store.PagingSize'),
					listeners: {
						change: function(cb, nV, oV) {
							store.pageSize = nV;
							Ext.getCmp('noticeListGrid')
							   .getStore()
							   .loadPage(1, {
								   params: { limit: nV, searchType: searchType, searchValue: searchValue}
							   });
						}
					}
				})],
				listeners: {
    				beforechange: function() {
    					store.getProxy().setExtraParam('searchType', searchType);
						store.getProxy().setExtraParam('searchValue', searchValue);
	    			}
    			}
			}],
			listeners: {
				afterrender: function(grid, eOpts) {
					var columns = that.columns;
					var len = columns.length;
					
					searchComboArr.push({name: '전체', value: 'all'});
					for(var i=0; i<len; i++) {
						if(columns[i]._search === false) {
    						continue;
    					}
						
						searchComboArr.push({
							name: columns[i].text,
							value:columns[i].dataIndex
						});
					}
					
					searchComboStore.loadData(searchComboArr);
				},
				itemdblclick: function(grd, rec) {
					var writeNum = rec.raw.num,
						id = 'notice-grid-' + writeNum,
						title = '공지글(' + writeNum + ')';
					console.log(rec)
					//console.dir(controller.addContentTabPanel);
					
					if(categoryPanel.isAttachedCategory(id)) {
						contentPanel.setActiveTab(id + '-panel');
					}
					else {
						controller.addContentTabPanel(id, title, /*{ xtype: 'noticeiframe' }*/ Ext.create('Hotplace.view.iframe.BaseIframe', { url : 'notice/if/content/' + writeNum }));
					}
				}
			}
		});
		
		this.callParent(arguments);
	}
});