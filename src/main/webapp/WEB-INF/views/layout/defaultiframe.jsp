<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="req" value="${pageContext.request}" />
<c:set var="url">${req.requestURL}</c:set>
<c:set var="uri" value="${req.requestURI}" />
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <title><sitemesh:write property="title" /></title>
    <link rel="icon" href="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}/resources/img/favicon.png" type="image/png" />
    
    <!-- Bootstrap -->
    <link rel="stylesheet" href="/resources/bootstrap/3.3.7-1/css/bootstrap.min.css" />
    <!-- wait me -->
    <link rel="stylesheet" href="/resources/os/waitMe/css/waitMe.min.css" />
    <link rel="stylesheet" href="/resources/css/iframe.css" />
	<sitemesh:write property="head" />
</head>

<body data-url="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}/">
<sitemesh:write property="body" />
<script type="text/javascript" src="/resources/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/bootstrap/3.3.7-1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/resources/os/waitMe/js/waitMe.min.js"></script>
<script type="text/javascript" src="/resources/js/if/common.js"></script>
<sitemesh:write property="page.script" />
</body>
</html>