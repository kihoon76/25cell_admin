Ext.define('Hotplace.store.CouponListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/coupon/list'
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
	  fields : ['couponNum', 'couponTarget', 'couponTargetName', 'publishDate', 'used', 'discountValue', 'discountUnit'],
	  autoLoad : true,
	  pageSize : Hotplace.util.Constants.gridPageSize
});