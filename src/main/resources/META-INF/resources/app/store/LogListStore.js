Ext.define('Hotplace.store.LogListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/log/list'
	       ,actionMethods : 'POST'
	       ,reader : {
	           type : 'json'
	          ,root : 'datas'
	          ,totalProperty : 'total'
	       }
	  },
	  fields : ['ip', 'accountId', 'referer', 'url', 'parameter', 'accessTime'],
	  autoLoad : true,
	  
	  pageSize : Hotplace.util.Constants.gridPageSize
});