Ext.define('Hotplace.store.YaggwanListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/yaggwan/list'
	       ,actionMethods : 'POST'
	       ,reader : {
	           type : 'json'
	          ,root : 'datas'
	          ,totalProperty : 'total'
	       }
	  },
	  fields : ['key', 'content', 'categoryCode', 'categoryName', 'writeDate', 'required', 'soonseo'],
	  autoLoad : true,
	  pageSize : Hotplace.util.Constants.gridPageSize
});