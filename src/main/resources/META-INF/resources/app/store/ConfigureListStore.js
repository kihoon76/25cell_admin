Ext.define('Hotplace.store.ConfigureListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/configure/list'
	       ,actionMethods : 'POST'
	       ,reader : {
	           type : 'json'
	          ,root : 'datas'
	       },
	       listeners: {
	    	   exception: function(proxy, response, operation, eOpts) {
	    		   Hotplace.util.CommonFn.redirectStoreAjax(response);
	    	   }
	       }
	  },
	  fields : ['confNum', 'confContent', 'confValue', 'confBigo', 'confDate'],
	  autoLoad : true
});