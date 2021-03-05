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

<style>
#btnLocc{
	display: none;
}

.memContents{
	margin-top: 300px;
	padding:  30px;
	background-color: lightskyblue;
	border-radius: 30px;
	text-align: center;
}

.memTitle{
	color: white;
	font-weight: bold;
}

.emailChktext{
	margin-bottom: 30px;
	color: lemonchiffon;
}

.emailEndMain{
	font-size: medium;
    font-weight: bold;
}

</style>

<body bgcolor="#f5f5f5">

	<%@ include file="/WEB-INF/views/include/header.jsp"%>

	<div class="memContents">
		<h2 class="memTitle">메일인증</h2>
			<hr>
			<div class="memContent">
	     <c:if test="${result == 0}">
			<h1 class="emailChktext">잘못된 인증 요청입니다. 다시 시도해주세요.</h1>
			</c:if>
				
			<c:if test="${result == 1}">
			<h1 class="emailChktext"">인증되었습니다.</h1>
			</c:if>
				
			<c:if test="${result == 2}">
			<h1 class="emailChktext">이미 인증된 이메일 입니다.</h1>
			</c:if>
		</div>
		
		<a class="emailEndMain" href="https://weatherwearmember.tk/member/">메인으로 돌아가기</a>
	</div>
	
	<div><img src="https://weatherwearmember.tk/member/fileupload/member/welcome.png" style="width: 100%"></div>
	
	

</body>
</html>