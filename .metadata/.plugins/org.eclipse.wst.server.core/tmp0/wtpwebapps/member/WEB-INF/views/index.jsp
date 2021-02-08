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
	.memContents {
	margin-top: 200px;
	}
</style>


<body bgcolor="#f5f5f5">

	<%@ include file="/WEB-INF/views/include/header.jsp"%>

	<div class="memContents">
       여기는 콘텐츠 영역입니다 각 페이지 별로 자유롭게 사용하세요~! 
      <div class="memContent">
	       <div>
	       	<a href="<c:url value="/member/reg"/>">회원가입</a>
	       </div>
	       
	       <div>
	       	<a href="<c:url value="/member/login"/>">로그인</a>
	       </div>
	       
	       <div>
	       	<a href="<c:url value="/member/logout"/>">로그아웃</a>
	       </div>
	       
	       <div>
	       	<a href="<c:url value="/member/mypage"/>">마이페이지</a>
	       </div>
	       
	       <div>
	       	<a href="<c:url value="/member/list"/>">(관리자) 회원 확인 페이지</a>
	       </div>
      </div> 
       
	</div>
	
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>



<!-- 로그아웃 후 처리 -->
<script>
	<c:if test="${param.type eq 'delete'}">
	
		<c:if test="${param.result eq 'ok'}">
		alert('로그아웃되었습니다.');	
		</c:if>
		
		<c:if test="${param.result ne 'ok'}">
		alert('처리과정에서 오류가 발생했습니다.');
		</c:if>
	
	</c:if>
		
</script>


</body>
</html>