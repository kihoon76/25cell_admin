<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="req" value="${pageContext.request}" />
<c:set var="url">${req.requestURL}</c:set>
<c:set var="uri" value="${req.requestURI}" />
<head>
	<title>Hotplace25 관리자</title>
	<link rel="stylesheet" href="/resources/core/ver/4.1.1-rc2/css/ext-all-gray.css"/>
</head>
<body>
	<script src="/resources/core/ver/4.1.1-rc2/js/ext-all.js"></script>
	
	<!-- locale -->
	<script src="/resources/core/locale/ext-lang-ko.js"></script>
	
	<script>
		Ext.onReady(function() {
			Ext.getDoc().on('keydown', function(e, t) {
				if(e.getKey() == e.BACKSPACE) {
					if(t.hasAttribute('readonly')) {
						return false;
					}
				}
				else if(t.nodeName == 'BODY' || t.nodeName == 'DIV') return false;
			});
			
			
			var loginWin = Ext.create('Ext.window.Window', {
				title: 'Hotplace25 관리자',
				width: 500,
				height: 500,
				draggable: false,
				closable: false,
				resizable: false,
				//layout: 'fit',
				items:[{
					xtype: 'image',
					anchor: '100%',
					height: 300,
					src: '/resources/images/site.png'
				}, {
					xtype: 'panel',
					bodyPadding: 30,
					height: 250,
					defaults: {
		                width: 400,
		                labelWidth: 50
		            },
		            defaultType: 'textfield',
					items: [{
						fieldLabel: '아이디',
						height: 30
					},{
						fieldLabel: '비번',
						height: 30
					}]
				
				}],
				buttons: [{
					text: '로그인'
				}]
				//renderTo: 'body'
			}).show();
			
			Ext.EventManager.onWindowResize(function(w, h) {
				var xPos = (w/2) - (loginWin.getWidth()/2);
				var yPos = (h/2) - (loginWin.getHeight()/2);
				loginWin.setPosition(xPos, yPos);
			});
		});
	</script>
</body>