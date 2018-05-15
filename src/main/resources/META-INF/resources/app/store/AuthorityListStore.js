Ext.define('Hotplace.store.AuthorityListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/authority/list'
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
	  fields : ['authNum', 'authName', 'authNameKor', 'description'],
	  autoLoad : true
});