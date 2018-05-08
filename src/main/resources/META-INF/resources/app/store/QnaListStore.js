Ext.define('Hotplace.store.QnaListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/qna/list'
	       ,actionMethods : 'POST'
	       ,reader : {
	           type : 'json'
	          ,root : 'datas'
	          ,totalProperty : 'total'
	       }
	  },
	  fields : ['seq', 'phone', 'question', 'processYN', 'processor', 'reqTime'],
	  autoLoad : true,
	  pageSize : Hotplace.util.Constants.gridPageSize
});