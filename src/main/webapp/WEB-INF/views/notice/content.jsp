<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="req" value="${pageContext.request}" />
<c:set var="url">${req.requestURL}</c:set>
<c:set var="uri" value="${req.requestURI}" />
<head>
	<title></title>
</head>
<body>
	<table class="table">
		<tr>
			<td>
				<button id="btnModify" class="btn">수정</button>
				<button class="btn">삭제</button>
			</td>
		</tr>
		<tr>
			<td>
				<textarea id="noticeEditor" style="max-width: 100%;"  data-num="<c:out value='${notice.num}' />">
				<c:out value="${notice.content}" />
				</textarea>
			</td>
		</tr>
	</table>

	<content tag="script">
	<script type="text/javascript" src="/resources/os/ckeditor/ckeditor.js"></script> 
	<script type="text/javascript" src="/resources/js/if/noticeContent.js"></script>
	</content>
</body>