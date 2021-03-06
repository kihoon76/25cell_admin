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
				<button id="btnModifyNotice" class="btn btn-warning">수정</button>
				<button id="btnDeleteNotice" class="btn btn-danger" data-num="<c:out value='${notice.num}' />">삭제</button>
			</td>
		</tr>
		<tr>
			<td>
				<div class="form-group">
	    			<label>글번호</label>
	    			<span><c:out value='${notice.num}' /></span>
	    			(<span><c:out value='${notice.writeDate}' /></span>)
	  			</div>
  			</td>
		</tr>
		<tr>
			<td>
				<div class="form-group">
	    			<label for="noticeTitle">공지글 제목</label>
	    			<input type="text" class="form-control" id="noticeTitle" value="<c:out value='${notice.title}' />">
	  			</div>
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
	<script type="text/javascript" src="/resources/js/if/notice.js"></script>
	</content>
</body>