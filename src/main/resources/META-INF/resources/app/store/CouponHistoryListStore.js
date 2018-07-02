Ext.define('Hotplace.store.CouponHistoryListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/coupon/historylist'
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
	  fields : ['key', 'pubDate', 'pubTarget', 'pubTargetName', 'pubId', 'pubName', 'pubCount'],
	  autoLoad : true,
	  
	  pageSize : Hotplace.util.Constants.gridPageSize
});