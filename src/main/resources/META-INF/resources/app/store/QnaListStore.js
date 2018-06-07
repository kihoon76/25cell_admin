Ext.define('Hotplace.store.QnaListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/qna/list'
	       ,actionMethods : 'POST'
	       ,reader : {
	           type : 'json'
	          ,root : 'datas'
	          ,totalProperty : 'total'
	       },
	       listeners: {
	    	   exception: function(proxy, response, operation, eOpts) {
	    		   Hotplace.util.CommonFn.redirectStoreAjax(response);
	    	   }
	       }
	  },
	  fields : ['seq', 'phone', 'question', 'processYN', 'processor', 'reqTime', 'processor', 'processTime', 'processContent'],
	  autoLoad : true,
	  pageSize : Hotplace.util.Constants.gridPageSize
});