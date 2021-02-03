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
		<h2 class="memTitle">회원 가입</h2>
		<hr>
		<div class="memContent">
		
		${regData}
		<hr>
		
		<c:if test="${result > 0 }">
		정상적으로 가입되었습니다.
		</c:if>
		
		<c:if test="${result eq 0 }">
		가입이 정상 처리되지 않았습니다. 다시 시도해주세요.
		</c:if>
			
		</div>
	</div>
	
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>

</body>
</html>