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
				<div class="form-group">
    				<label for="noticeTitle">공지글 제목</label>
    				<input type="text" class="form-control" id="noticeTitle">
  				</div>
			</td>
		</tr>
		<tr>
			<td>
				<textarea id="noticeEditor" style="max-width: 100%;">
				</textarea>
			</td>
		</tr>
		<tr>
			<td>
				<button class="btn btn-success" id="btnNoticeReg">등록</button>
			</td>
		</tr>
	</table>

	<content tag="script">
	<script type="text/javascript" src="/resources/os/ckeditor/ckeditor.js"></script> 
	<script type="text/javascript" src="/resources/js/if/notice.js"></script>
	</content>
</body>