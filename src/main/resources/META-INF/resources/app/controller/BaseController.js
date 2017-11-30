Ext.define('Hotplace.controller.BaseController', {
	extend : 'Ext.app.Controller'
   //,uses   : ['Hotplace.util.Server', 'Hotplace.util.CommonFn', 'Hotplace.util.MessageKr']
   ,init   : function() {
	   this.control({
		   'categorypanel' : {
			   itemclick : this.onItemClick
   			}
   		});
   }
   ,onLaunch : function() {
	  /* var that = this;
	   this.Server = Hotplace.util.Server;
	   this.addedCategoryMap = {};
	   this.contentPanel  = Ext.getCmp('app-contents');
	   this.categoryPanel = Ext.getCmp('app-category');
	   this.resultPanel   = Ext.getCmp('app-results');

	   this.Constants = Hotplace.util.Constants;
	   this.CommonFn  = Hotplace.util.CommonFn;
	   this.MESSAGE   = Hotplace.util.MessageKr;
	   this.debug     = this.Constants.debug;*/
	   this.contentPanel  = Ext.getCmp('app-contents');
	   this.categoryPanel = Ext.getCmp('app-category');
   }
   ,addContentTabPanel : function(id, title, cont, tbar) {
	   var conf = {
			 id    : id + '-panel'
			,title : title
			,layout   : 'fit'
			,closable : true
	   };

	   if(Ext.isString(cont)) {
		   conf.items = [{
			   autoScroll : true
			  ,html : cont
		   }];
	   }
	   else {
		   conf.items = [cont];
	   }

	   if(Ext.isArray(tbar)) {
		  conf.tbar = tbar;
	   };

	   this.contentPanel.add(Ext.create('Ext.panel.Panel',conf));
	   this.contentPanel.setActiveTab(id + '-panel');
	   this.categoryPanel.addCategoryInTab(id);
   }
   ,addResultTabPanel : function(title, cont) {
	   this.resultPanel.removeAll();

	   var conf = {
			 id    : 'result-panel'
			,title : title
			,layout   : 'fit'
			,closable : false
	   };

	   if(Ext.isString(cont)) {
		   conf.items = [{
			   autoScroll : true
			  ,html : cont
		   }];
	   }
	   else {
		   conf.items = [cont];
	   }

	   this.resultPanel.add(Ext.create('Ext.panel.Panel',conf));
	   this.resultPanel.setActiveTab(0);
	   this.resultPanel.expand(true);
   }
});