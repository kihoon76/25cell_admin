Ext.define('Hotplace.view.panel.QnaFormPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'qnapanel',
	requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn', 'Ext.ux.form.ItemSelector'],
	id: 'qnaform',
	initComponent: function() {
		var selectedRecord = null;
		   
		try {
			var store = Ext.create('Hotplace.store.QnaListStore');
		}
		catch(e) {
			console.log(e);
			//세션만료 및 중복로그인시  js파일을 가져오지 못해서 오류발생함
			commFn.loadJsError();
		}
		
		var constants = Hotplace.util.Constants,
			commonFn = Hotplace.util.CommonFn,
			searchComboArr = [], 
			searchType = '', 
			searchValue = '',
			authUrl = 'authority/define';
		
		var searchComboStore = Ext.create('Ext.data.Store', {
			 fields   : ['name', 'value'],
			 //data: [{name: '전체', value: 'all'}, {name: '연락처', value:'phone'},{name: '처리여부', value:'processYN'}]
		});
		
		var searchComboStoreProcessYN = Ext.create('Ext.data.Store', {
			 fields   : ['name', 'value'],
			 data: [{name: 'Y', value:'Y'},{name: 'N', value:'N'}]
		});
		
		function search() {
			searchType = Ext.getCmp('qna-searchtype-combo').getValue();
			
			if(searchType == 'phone') {
				searchValue = Ext.getCmp('qna-search-text').getValue();
			}
			else if(searchType == 'processYN') {
				searchValue = Ext.getCmp('qna-search-combo').getValue() ;
			}
			else if(searchType == 'reqTime' || searchType == 'processTime') {
				searchValue = Ext.getCmp('qna-search-date').getRawValue() ;
			}
			
			  
			if(searchType != 'all' && !searchValue) {
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
		
		
		function close(isClearValue, itemClickedState) {
			var phone = Ext.getCmp('qna-phone');
			phone.setDisabled(true);
			
			var question = Ext.getCmp('qna-question');
			question.setDisabled(true);
			
			var reqTime = Ext.getCmp('qna-reqTime');
			reqTime.setDisabled(true);
			
			var myprocess = Ext.getCmp('qna-process-combo');
			myprocess.clearValue();
			if(itemClickedState) {
				myprocess.setDisabled(false);
			}
			else {
				myprocess.setDisabled(true);
			}
			
			var processContent = Ext.getCmp('qna-processContent');
			processContent.setValue('');
			processContent.setDisabled(true);
			
			var processBtn = Ext.getCmp('btn-qna-process');
			processBtn.setDisabled(true);
			
			if(isClearValue) {
				phone.setValue('');
				question.setValue('');
				reqTime.setValue('');
			}
		}
		
		function open() {
			var phone = Ext.getCmp('qna-phone');
			phone.setDisabled(false);
			
			var question = Ext.getCmp('qna-question');
			question.setDisabled(false);
			
			var reqTime = Ext.getCmp('qna-reqTime');
			reqTime.setDisabled(false);
			
			var myprocess = Ext.getCmp('qna-process-combo');
			myprocess.setDisabled(false);
			
			var processContent = Ext.getCmp('qna-processContent');
			processContent.setDisabled(false);
			
			var processBtn = Ext.getCmp('btn-qna-process');
			processBtn.setDisabled(false);
		}
		
		Ext.apply(this,{
			frame: true,
			bodyPadding: 5,
			width: '100%',
			layout: 'column',
			items: [{
				columnWidth: 0.40,
				xtype: 'gridpanel',
				id: 'qna-grid',
				store: store,
	            height: 900,
	            title:'문의사항목록',
	            columns: [{
                    id       :'seq',
                    text   	 : '일련번호',
                    width    : 60,
                    sortable : true,
                    dataIndex: 'seq',
                    _search: false
                },{
                    text   : '연락처',
                    width    : 120,
                    sortable : true,
                    dataIndex: 'phone'
                },{
                    text   : '처리여부',
                    width    : 40,
                    sortable : true,
                    dataIndex: 'processYN'
                },{
                    text   : '요청일자',
                    width    : 40,
                    sortable : true,
                    dataIndex: 'reqTime',
                    hidden: true
                },{
                    text   : '처리일자',
                    width    : 40,
                    sortable : true,
                    dataIndex: 'processTime',
                    hidden: true
                },{
                    text   : '문의사항',
                    flex    : 1,
                    sortable : true,
                    dataIndex: 'question',
                    _search: false
                }],
                tbar: ['->',
    			       '검색항목 : ',
    			      {
                		   xtype: 'combo',
    			    	   queryMode: 'local',
    			    	   id:'qna-searchtype-combo',
    			    	   displayField: 'name',
    			    	   valueField: 'value',
    			    	   editable: false,
    			    	   store:searchComboStore,
    			    	   listeners: {
    			    		   change: function(combo, nV, oV) {
    			    			   if(nV == 'phone') {
    			    				   Ext.getCmp('qna-search-text').show();
    			    				   Ext.getCmp('qna-search-combo').hide();
    			    				   Ext.getCmp('qna-search-date').hide();
    			    			   }
    			    			   else if(nV == 'processYN') {
    			    				   Ext.getCmp('qna-search-text').hide();
    			    				   Ext.getCmp('qna-search-date').hide();
    			    				   Ext.getCmp('qna-search-combo').show(); 
    			    			   }
    			    			   else if(nV == 'reqTime' || nV == 'processTime') {
    			    				   Ext.getCmp('qna-search-date').show();
    			    				   Ext.getCmp('qna-search-text').hide();
    			    				   Ext.getCmp('qna-search-combo').hide();
    			    			   }
    			    			   else if(nV == 'all') {
    			    				   Ext.getCmp('qna-search-text').show();
    			    				   Ext.getCmp('qna-search-combo').hide();
    			    				   Ext.getCmp('qna-search-date').hide();
    			    				   search();
    			    			   }
    			    		   }
    			    	   }
    			       },{
    					   xtype: 'textfield',
    					   id: 'qna-search-text',
    					   enableKeyEvents: true,
    					   listeners: {
    						   keydown: function(t, e) {
    							   //전체를 선택한 경우 동작 안함
    							   if(e.keyCode == 13) {
    								   search();
    							   }
    						   }
    					   }
    				   }, {
    					  xtype: 'combobox',
    					  id: 'qna-search-combo',
    					  displayField: 'name',
    					  valueField: 'value',
    					  queryMode: 'local',
    					  editable:false,
    					  store:searchComboStoreProcessYN,
    					  hidden: true
    				   }, {
    						xtype: 'datefield',
    						id: 'qna-search-date',
    						format: 'Y-m-d',
    						editable:false,
    						hidden: true
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
				//}],
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
	    					id: 'qna-paging-combo',
	    					displayField: 'name',
	    					valueField: 'value',
	    					editable: false,
	    					width: 100,
	    					value: constants.gridPageSize,
	    					store: Ext.create('Hotplace.store.PagingSize'),
	    					listeners: {
	    						change: function(cb, nV, oV) {
	    							store.pageSize = nV;
	    							Ext.getCmp('qna-grid').getStore()
	    							    .loadPage(1, {
	    								    params: { limit: nV}
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
	    					var columns = Ext.getCmp('qna-grid').columns;
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
	    				itemclick: function(view, record) {
	    					var phone = Ext.getCmp('qna-phone');
	    					var question = Ext.getCmp('qna-question');
	    					var reqTime = Ext.getCmp('qna-reqTime');
	    					var myprocess = Ext.getCmp('qna-process-combo');
	    					var processTime = Ext.getCmp('qna-processTime');
	    					var processor = Ext.getCmp('qna-processor');
	    					var processContent = Ext.getCmp('qna-processContent');
	    					
	    					if(record.data.processYN == 'Y') {
	    						Ext.Msg.alert('알림', '이미 처리된 상담입니다.', function() {
	    							selectedRecord = null;
	    							close(true);
	    							var data = record.data;
			    					
			    					phone.setValue(data.phone);
			    					question.setValue(data.question);
			    					reqTime.setValue(data.reqTime);
			    					
	    							if(data.processTime != undefined) {
	    								processTime.setValue(data.processTime);
	    							}
	    							
	    							if(data.processor != undefined) {
	    								processor.setValue(data.processor + '(' + data.processorName + ')');
	    							}
	    							
	    							processContent.setValue(data.processContent);
	    						});
	    					}
	    					else {
	    						selectedRecord = record;
		    					var data = record.data;
		    					
		    					phone.setValue(data.phone);
		    					question.setValue(data.question);
		    					reqTime.setValue(data.reqTime);
		    					myprocess.clearValue();
		    					myprocess.setDisabled(false);
		    					processTime.setValue('');
		    					processor.setValue('');
		    					processContent.setValue('');
	    					}
	    				}
	    			}
				}, {
					columnWidth: 0.6,
		            margin: '0 0 0 10',
		            xtype: 'fieldset',
		            title:'문의사항정보',
		            height: 900,
		            defaults: {
		                width: 240,
		                labelWidth: 90
		            },
		            defaultType: 'textfield',
		            items: [{
		            	xtype: 'combobox',
		            	id: 'qna-process-combo',
		            	fieldLabel: '문의처리',
		            	editable: false,
		            	disabled: true,
		            	store: Ext.create('Ext.data.Store', {
		        			fields : ['name', 'value'],
		        			data: [{name: 'open', value:'open'}, {name: 'close', value:'close'}]
		        		}),
		        		queryMode: 'local',
		        		displayField: 'name',
		        		valueField: 'value',
		        		listeners: {
		        			change: function(c, nV, oV) {
		        				
		        				var seq = selectedRecord.data.seq;
		        				if(nV == null) return;
		        				
		        				//var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"loading.."});
		        				//myMask.show();
		        				
		        				commonFn.ajax({
		        					url: '/qna/process?type=' + nV + '&seq=' + seq,
		        					loadmask: {},
		        					success: function(jo) {
		        						var errCode = jo.errCode;
		    							var fn;
		    							
		    							if(jo.success) {
		    								if(nV == 'open') {
		    									Ext.Msg.alert('', '일련번호(' + seq + '번) 상담건이 할당되었습니다.', function() {
		    										open();
		    									});
		    								}
		    								else {
		    									Ext.Msg.alert('', '일련번호(' + seq + '번) 상담건이 할당해제 되었습니다.', function() {
		    										close(false, true);
		    									});
		    								}
		    								
		    							}
		    							else {
		    								//이미처리 완료됨
		    								if(errCode == '600' || errCode == '601') {
		    									fn = function() {
		    										close();
		    										store.load();
		    									}
		    								}
		    								else if(errCode == '603') {
		    									fn = function() {
		    										var myprocess = Ext.getCmp('qna-process-combo');
		    										myprocess.clearValue();
		    									}
		    								}
		    								
		    								Ext.Msg.alert('에러', jo.errMsg, fn);
		    							}
		        					}
		        				});
		        			}
		        		}
		            },{
		                fieldLabel: '연락처',
		                anchor: '100%',
		                name: 'phone',
		                id: 'qna-phone',
		                disabled: true,
		                readOnly: true
		            },{
		                fieldLabel: '문의사항',
		                xtype: 'textarea',
		                anchor: '100%',
		                grow: true,
		                height:500,
		                name: 'question',
		                id: 'qna-question',
		                readOnly: true,
		                disabled: true
		            },{
		                fieldLabel: '처리내용',
		                xtype: 'textarea',
		                anchor: '100%',
		                grow: true,
		                name: 'processContent',
		                id: 'qna-processContent',
		                disabled: true
		            },{
		                fieldLabel: '요청일자',
		                anchor: '100%',
		                name: 'reqTime',
		                id: 'qna-reqTime',
		                disabled: true,
		                readOnly: true
		            },{
		                fieldLabel: '처리일자',
		                anchor: '100%',
		                name: 'processTime',
		                id: 'qna-processTime',
		                disabled: true,
		                readOnly: true
		            },{
		                fieldLabel: '처리자',
		                anchor: '100%',
		                name: 'processor',
		                id: 'qna-processor',
		                disabled: true,
		                readOnly: true
		            },{
		            	width: 100,
		               	height: 100,
		            	y: 0,
			           	x: 95,
		            	xtype: 'button',
		            	id: 'btn-qna-process',
		            	text:'상담처리',
		            	disabled: true,
		            	listeners: {
		            		click: function() {
		            			if(!selectedRecord) {
		            				Ext.Msg.alert('알림', '회원을 선택하세요');
		            				return;
		            			}
		            			
		            			console.log(selectedRecord)
		            			
		            			var processContentEl = Ext.getCmp('qna-processContent'),
		            				processContent = Ext.String.trim(processContentEl.getValue());
		            			
		            			if(processContent == '') {
		            				Ext.Msg.alert('알림', '처리내용을 입력해 주세요');
		            				return;
		            			}
		            			
		            			commonFn.ajax({
		        					url: '/qna/process/resolve',
		        					loadmask: {},
		        					method: 'POST',
		        					headers: { 'Content-Type': 'application/json' }, 
		            				jsonData: {
		            					seq: selectedRecord.data.seq,
		            					processContent: processContent
		            				},
		        					success: function(jo) {
		        						var errCode = jo.errCode;
		    							
		    							if(jo.success) {
		    								Ext.Msg.alert('', '일련번호(' + selectedRecord.data.seq + '번) 상담건이 처리되었습니다.', function() {
		    									close();
		    									store.load();
	    									});
		    							}
		    							else {
		    								Ext.Msg.alert('오류', jo.errMsg);
		    							}
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