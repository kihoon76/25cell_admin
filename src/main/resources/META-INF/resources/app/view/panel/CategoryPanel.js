Ext.define('Hotplace.view.panel.CategoryPanel', {
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
						 text: '설정관리', expand: true, iconCls : 'tree-expand'
						,children : [{
							text: '설정리스트', leaf : true, cate : 'configure', id : 'cate-configure-list'
						},{
							text: '시스템업데이트', leaf : true, cate : 'configure', id : 'cate-configure-system-update'
						}]
					 },{
						 text: '권한관리', expand: true, iconCls : 'tree-expand'
						,children : [{
							text: '권한리스트', leaf : true, cate : 'authority', id : 'cate-authority-list'
						},{
							text: '관리자권한', leaf : true, cate : 'authority', id : 'cate-authority-admin'
						}]
					 },{
						 text : '공지사항관리', expand : true, iconCls : 'tree-expand'
						,children : [{
							text : '공지글 등록', leaf : true, cate : 'notice', id : 'cate-notice-reg'
						},{
							text : '공지 리스트', leaf : true, cate : 'notice', id : 'cate-notice-list'
						}]
					 },{
						 text : '회원관리', expand : true, iconCls : 'tree-expand'
						,children : [{
							text : '회원리스트', leaf : true, cate : 'user', id : 'cate-user-list'
						},{
							text : '회원정보', leaf : true, cate : 'user', id : 'cate-user-info'
						}, {
							text : '회원통계', leaf : true, cate : 'user', id: 'cate-user-statistic'
						}]
					 }, {
						 text: '로그관리', expand: true, iconCls : 'tree-expand'
						,children : [{
							text: '로그리스트', leaf : true, cate : 'log', id : 'cate-log-list'
						},{
							text: '로그통계', leaf : true, cate : 'log', id : 'cate-log-statistic'
						}]
					 }, {
						 text: '약관관리', leaf : true, cate : 'yaggwan', id : 'cate-yaggwan' 
					 }, {
						 text: '문의사항관리', leaf : true, cate : 'qna', id : 'cate-qna' 
					 }, {
						 text: '쿠폰관리', expand: true, iconCls : 'tree-expand'
						,children : [{
							text: '쿠폰발행내역', leaf : true, cate : 'coupon', id : 'cate-coupon-history'
						},{
							text: '쿠폰발행 및 쿠폰정보', leaf : true, cate : 'coupon', id : 'cate-coupon-info'
						}]
					 }, {
						 text: '결제관리', expand: true, iconCls : 'tree-expand'
						,children : [{
							text: '결제처리', leaf : true, cate : 'payment', id : 'cate-payment'
						},{
							text: '환불처리', leaf : true, cate : 'payment', id : 'cate-refund'
						}]
					 }, {
						 text: 'DB모니터링', leaf : true, cate : 'monitoring', id : 'cate-monitor-db' 
					 },{
						 text: '네이버지도', leaf : true, cate : 'map', id : 'cate-naver-map' 
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