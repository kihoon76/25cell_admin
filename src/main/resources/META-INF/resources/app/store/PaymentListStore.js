Ext.define('Hotplace.store.PaymentListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/payment/list'
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
	  fields : [
	       'key',
	       'accountId',
	       'sum',
	       'useCoupon',
	       'couponNum',
	       'applyDate', 
	       'paymentDate', 
	       'paymentConfirmDate', 
	       'serviceType', 
	       'serviceSubTypes', 
	       'applyComment'
	  ],
	  autoLoad : true
});