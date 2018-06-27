Ext.define('Hotplace.store.UserListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/user/list'
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
	  fields : ['accountId', 'userName', 'phone', 'email', 'regDate', 'grade', 'gradeNum', 'gradeExpire', 'admin', 'out', 'qaAdmin'],
	  autoLoad : true,
	  pageSize : Hotplace.util.Constants.gridPageSize
});