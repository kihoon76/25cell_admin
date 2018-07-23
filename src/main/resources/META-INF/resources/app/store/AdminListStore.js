Ext.define('Hotplace.store.AdminListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants', 'Hotplace.util.CommonFn'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/user/adminlist'
	       ,actionMethods : 'POST'
	       ,reader : {
	           type : 'json'
	          ,root : 'datas'
	          ,successProperty: 'success'
	          //,totalProperty : 'total'
	       },
	       listeners: {
	    	   exception: function(proxy, response, operation, eOpts) {
	    		   var rText = null;
	    		   if((rText = response.responseText)) {
	    			   Ext.Msg.alert('', rText);
	    		   }
	    	   }
	       }
	  },
	  fields : ['accountId', 'userName', 'isAdmin', 'isQaAdmin']
	  //autoLoad : true,
});