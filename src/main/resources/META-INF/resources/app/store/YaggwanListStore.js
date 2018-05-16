Ext.define('Hotplace.store.YaggwanListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/yaggwan/list'
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
	  fields : ['key', 'content', 'categoryName', 'writeDate', 'required', 'soonseo'],
	  autoLoad : true,
	  pageSize : Hotplace.util.Constants.gridPageSize
});