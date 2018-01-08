Ext.define('Hotplace.store.ConfigureListStore', {
	 extend : 'Ext.data.Store',
	 requires : ['Hotplace.util.Constants'],
	 proxy : {
	        type : 'ajax'
	       ,url : Hotplace.util.Constants.context + '/configure/list'
	       ,actionMethods : 'POST'
	       ,reader : {
	           type : 'json'
	          ,root : 'datas'
	       }
	  },
	  fields : ['confNum', 'confContent', 'confValue', 'confBigo', 'confDate'],
	  autoLoad : true
});