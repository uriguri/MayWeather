<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">

<title>+WEATHER WEAR+</title>

<link rel="styleSheet" href="<c:url value="/css/default.css"/>">

<%@ include file="/WEB-INF/views/include/basicset.jsp"%>

</head>

<body bgcolor="#f5f5f5">

	<%@ include file="/WEB-INF/views/include/header.jsp"%>

	<div class="memContents">
		<h2 class="memTitle">로그인</h2>
			<hr>
			<div class="memContent">
			
	    	<c:if test="${msg ne null}">
	    	${msg}
	    	</c:if>
	    	
	    	<c:if test="${msg eq null}">
	    	로그인 되었습니다. <br>
	    	${loginInfo} <br>
	    	<img alt="회원사진" src="<c:url value="/fileupload/member/${loginInfo.memPhoto}"/>">
	    	</c:if>
	    	
			</div>
	</div>
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>

</body>
</html>