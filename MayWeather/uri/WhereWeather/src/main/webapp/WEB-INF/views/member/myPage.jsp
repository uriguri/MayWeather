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
       <h2 class="memTitle">마이페이지</h2>
		<hr>
		
      <div class="memContent">
	   <img width="30" height="30" alt="profilePhoto" src="<c:url value="/fileupload/member/${loginInfo.memPhoto}"/>">
	   ${loginInfo}<br> 
      </div> 
       
	</div>
	
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>




</body>
</html>