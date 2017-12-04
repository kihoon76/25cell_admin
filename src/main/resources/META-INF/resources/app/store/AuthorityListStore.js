Ext.define('Hotplace.store.AuthorityListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/authority/list'
	       ,actionMethods : 'POST'
	       ,reader : {
	           type : 'json'
	          ,root : 'datas'
	       }
	  },
	  fields : ['authNum', 'authName', 'description'],
	  autoLoad : true
});