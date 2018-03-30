Ext.define('Hotplace.store.UserListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/user/list'
	       ,actionMethods : 'POST'
	       ,reader : {
	           type : 'json'
	          ,root : 'datas'
	          ,totalProperty : 'total'
	       }
	  },
	  fields : ['accountId', 'userName', 'phone', 'email', 'regDate', 'grade'],
	  autoLoad : true,
	  pageSize : Hotplace.util.Constants.gridPageSize
});