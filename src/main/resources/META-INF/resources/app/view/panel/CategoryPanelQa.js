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
						 text: '로그관리', expand: true, iconCls : 'tree-expand'
						,children : [{
							text: '로그리스트', leaf : true, cate : 'log', id : 'cate-log-list'
						},{
							text: '로그통계', leaf : true, cate : 'log', id : 'cate-log-statistic'
						}]
					 },{
						 text : '공지사항관리', expand : true, iconCls : 'tree-expand'
						,children : [{
							text : '공지글 등록', leaf : true, cate : 'notice', id : 'cate-notice-reg'
						},{
							text : '공지 리스트', leaf : true, cate : 'notice', id : 'cate-notice-list'
						}]
					},{
						 text: '약관관리', leaf : true, cate : 'yaggwan', id : 'cate-yaggwan' 
					},{
						 text: '문의사항관리', leaf : true, cate : 'qna', id : 'cate-qna' 
					}, {
						 text: '쿠폰관리', expand: true, iconCls : 'tree-expand'
						,children : [{
							text: '쿠폰발행내역', leaf : true, cate : 'log', id : 'cate-coupon-history'
						},{
							text: '쿠폰발행 및 쿠폰정보', leaf : true, cate : 'log', id : 'cate-coupon-info'
						}]
					 }, {
						 text: '결제관리', expand: true, iconCls : 'tree-expand'
						,children : [{
							text: '결제처리', leaf : true, cate : 'log', id : 'cate-payment'
						},{
							text: '결제수동처리', leaf : true, cate : 'log', id : 'cate-payment-manual'
						},{
							text: '환불처리', leaf : true, cate : 'log', id : 'cate-refund'
						}]
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