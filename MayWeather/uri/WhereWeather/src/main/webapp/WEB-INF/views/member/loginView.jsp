<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- 로그인 체크가 없을경우 안내 -->

<c:if test="${not loginCheck}">

<script>
	alert("아이디 또는 비밀번호가 틀립니다. 다시 로그인해주세요.");
	history.go(-1);
</script>

</c:if>

<!-- 로그인 체크 있을 경우 로그인 진행  -->

<c:if test="${loginCheck}">

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
			
			<!-- msg = 메일 인증하지 않은 회원 분기 -->
			
	    	<c:if test="${msg ne null}">
	    	${msg}
	    	</c:if>
	    	
	    	<c:if test="${msg eq null}">
	    	로그인 되었습니다. <br>
	    	${loginInfo} <br>
	    	<img width="30" height="30" alt="회원사진" src="<c:url value="/fileupload/member/${loginInfo.memPhoto}"/>">
	    	</c:if>
	    	
			</div>
	</div>
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>

</body>
</html>
</c:if>