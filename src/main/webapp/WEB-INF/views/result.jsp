<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="hotplace.admin.domain.AjaxVO" %>
<%@ page import="java.io.PrintWriter" %>
<%
	//if("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
		AjaxVO vo = new AjaxVO();
		vo.setSuccess(true);
		//vo.setErrCode("500");
		PrintWriter o = response.getWriter();
		o.print(new Gson().toJson(vo));
		o.flush();
		o.close();
	//}

%>
