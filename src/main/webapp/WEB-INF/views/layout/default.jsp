<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<c:set var="req" value="${pageContext.request}" />
<c:set var="url">${req.requestURL}</c:set>
<c:set var="uri" value="${req.requestURI}" />
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title><sitemesh:write property="title" /></title>
	<link rel="icon" href="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}/resources/images/favicon.png" type="image/png" />
	<link rel="stylesheet" href="/resources/core/ver/4.1.1-rc2/css/ext-all-gray.css"/>
	<link rel="stylesheet" href="/resources/css/default.css"/>
	<link rel="stylesheet" href="/resources/css/icon.css"/>
	<!-- <link rel="stylesheet" href="/resources/ux/css/CheckHeader.css"/> -->
    
	<sitemesh:write property="head" />
</head>
<sec:authorize access="hasRole('ROLE_ADMIN')">
<body data-url="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}" 
	  data-user="<c:out value='${accountId}' />" 
	  data-year="<c:out value='${currentYear}' />"
	  data-month="<c:out value='${currentMonth}' />"
	  data-date="<c:out value='${currentDate}' />"
	  data-cate-panel="Hotplace.view.panel.CategoryPanel">
</sec:authorize>
<sec:authorize access="hasRole('ROLE_QA_ADMIN')">
<body data-url="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}" 
	  data-user="<c:out value='${accountId}' />" 
	  data-year="<c:out value='${currentYear}' />"
	  data-month="<c:out value='${currentMonth}' />"
	  data-date="<c:out value='${currentDate}' />"
	  data-cate-panel="Hotplace.view.panel.CategoryPanelQa">
</sec:authorize>
	<sitemesh:write property="body" /> 
	<script src="/resources/core/ver/4.1.1-rc2/js/ext-all.js"></script>
	
	<!-- socketJs -->
	<script src="/resources/js/sockjs.min.js"></script>
	
	<!-- locale -->
	<script src="/resources/core/locale/ext-lang-ko.js"></script>
	<!-- naver map -->
	<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=SgnlyXnzstmDsYDhele7&submodules=panorama,geocoder"></script>
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
			
		});
	</script>
	
	<!-- App Files -->
	<sec:authorize access="hasRole('ROLE_ADMIN')">
	<script src="/resources/app.js" charset="utf-8"></script>
	</sec:authorize>
	<sec:authorize access="hasRole('ROLE_QA_ADMIN')">
	<script src="/resources/app_qa.js" charset="utf-8"></script>
	</sec:authorize>
</body>
</html>