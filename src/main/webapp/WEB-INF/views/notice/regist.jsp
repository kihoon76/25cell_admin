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
				<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#attention">
				※ 공지글 등록시 주의사항
				</button>
			</td>
		</tr>
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

	<!-- Modal -->
	<div class="modal fade" id="attention" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  		<div class="modal-dialog modal-lg" role="document">
    		<div class="modal-content">
      			<div class="modal-header">
        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          				<span aria-hidden="true">&times;</span>
        			</button>
      			</div>
      			<div class="modal-body">
        			<img src="../../resources/images/attention.png" />
        			<div style="padding-top: 10px; color: red; font-weight: bolder; font-size: 1.5em;">
        				링크는 복사해서 붙이지 마시고 위의 그림처럼 에디터의 링크 기능을 이용하세요.
        			</div>
      			</div>
      			<div class="modal-footer">
        			<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      			</div>
    		</div>
  		</div>
	</div>

	<content tag="script">
	<script type="text/javascript" src="/resources/os/ckeditor/ckeditor.js"></script> 
	<script type="text/javascript" src="/resources/js/if/notice.js"></script>
	</content>
</body>