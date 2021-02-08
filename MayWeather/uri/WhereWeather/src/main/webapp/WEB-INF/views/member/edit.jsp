<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:if test="${result eq 1}">
	<script>
		alert("회원 정보가 수정되었습니다.")
		location.href = '<c:url value="/member/mypage"/>';
	</script>
</c:if>


<c:if test="${result ne 1}">
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
       <h2 class="memTitle">회원 정보 수정 오류</h2>
		<hr>
		
      <div class="memContent">
      
	    <h1>수정 할 회원의 정보가 존재하지 않거나, 이미 수정이 완료 되었습니다. <br> 확인 후 다시 시도해주세요. </h1>  
	      
      </div> 
       
	</div>
	
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>


	

</body>
</html>
</c:if>