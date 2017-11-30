<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="req" value="${pageContext.request}" />
<c:set var="url">${req.requestURL}</c:set>
<c:set var="uri" value="${req.requestURI}" />
<head>
	<title>25cell 관리자</title>
	<link rel="stylesheet" href="/resources/css/signin.css" />
</head>
<body>
	<section class="container">
		<section class="login-form">
			<form method="post" action="/login" role="login">
				<img src="assets/images/logo.png" class="img-responsive" alt="" />
				<input type="text" name="id" placeholder="아이디" required class="form-control input-lg" />
				<input type="password" name="password" placeholder="비밀번호" required class="form-control input-lg" />
				<button type="submit" class="btn btn-lg btn-primary btn-block">로그인</button>
				<div>
					<a href="#">Create account</a> or <a href="#">reset password</a>
				</div>
			</form>
			<div class="form-links">
				<a href="#">www.website.com</a>
			</div>
		</section>
	</section>

	<content tag="script">
	
	
	</content>
</body>