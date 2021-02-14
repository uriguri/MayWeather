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
	     
      </div> 
       
	</div>
	
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>



</body>
</html>