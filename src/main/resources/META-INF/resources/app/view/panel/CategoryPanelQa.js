Ext.define('Hotplace.view.panel.CategoryPanelQa', {
	 extend      : 'Ext.tree.Panel'
    ,alias       : 'widget.categorypanel'
    //,uses        : ['Hotplace.util.Constants']
    ,title       : '카테고리'
    ,initComponent : function() {
    	var addedCategoryMap = {};
    	
    	Ext.apply(this, {
    		 store : Ext.create('Ext.data.TreeStore', {
    	    	 root : {
    	    		  expanded : true
					 ,children : [{
						 text : '공지사항관리', expand : true, iconCls : 'tree-expand'
						,children : [{
							text : '공지글 등록', leaf : true, cate : 'notice', id : 'cate-notice-reg'
						},{
							text : '공지 리스트', leaf : true, cate : 'notice', id : 'cate-notice-list'
						}]
					},{
						 text: '문의사항관리', leaf : true, cate : 'qna', id : 'cate-qna' 
					}]
    	    	 }
    	    })
    	    ,rootVisible : false
    	    ,isAttachedCategory : function(id) {
     	 	   return addedCategoryMap[id] != null;
     	    }
     	    ,addCategoryInTab : function(id) {
     	    	addedCategoryMap[id] = 'Y';
     	    }
     	    ,rmCategoryInTab : function(id) {
     	    	delete addedCategoryMap[id];
     	    }
     	    ,rmAllInTab : function() {
     	    	addedCategoryMap = {};
     	    }
    	    ,listeners : {
    	    	itemexpand : function(n, opt) {
    	    		n.set('iconCls', 'tree-expand');
    	    	}
    	       ,itemcollapse : function(n, opt) {
    	    	   console.log(n)
    	    	   n.set('iconCls', 'tree-collapse');
    	       }
    	    }
    	});

    	this.callParent(arguments);
    }
});