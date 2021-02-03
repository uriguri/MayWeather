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
		<h2 class="memTitle">메일인증</h2>
			<hr>
			<div class="memContent">
	     <c:if test="${result == 0}">
			<h1>잘못된 인증 요청입니다. 다시 시도해주세요.</h1>
			</c:if>
				
			<c:if test="${result == 1}">
			<h1>인증되었습니다.</h1>
			</c:if>
				
			<c:if test="${result == 2}">
			<h1>이미 인증된 이메일 입니다.</h1>
			</c:if>
		</div>
	</div>
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>

</body>
</html>