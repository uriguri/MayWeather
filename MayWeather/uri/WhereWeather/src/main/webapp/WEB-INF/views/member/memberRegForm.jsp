<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">

<title>+WEATHER WEAR+</title>

<!-- 홈페이지 전체 CSS -->
<link rel="styleSheet" href="<c:url value="/css/default.css"/>">

<!-- 회원가입&로그인 용 CSS -->
<link rel="styleSheet" href="<c:url value="/css/uri/memreglogin.css"/>">

<!-- 제이쿼리 ver.1.12.4 / 부트스트랩 css, js, theme ver.3.3.2   -->
<%@ include file="/WEB-INF/views/include/basicset.jsp"%>

<!-- 회원가입유효성검사용 jquery-validate -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.13.1/jquery.validate.min.js"></script>

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />


</head>

<!-- 로고 & header 하늘색 영역 -->
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<body bgcolor="#f5f5f5">

	
<!-- REGISTRATION FORM -->
<div class="text-center" style="padding:50px 0">
	<div class="logo">회원가입</div>
	<!-- Main Form -->
	<div class="login-form-1">
		<form id="register-form" class="text-left">
			<div class="login-form-main-message"></div>
			<div class="main-login-form">
				<div class="login-group">
					<div class="form-group">
						<label for="reg_username" class="sr-only">Email address</label>
						<input type="text" class="form-control" id="reg_username" name="reg_username" placeholder="username">
					</div>
					<div class="form-group">
						<label for="reg_password" class="sr-only">Password</label>
						<input type="password" class="form-control" id="reg_password" name="reg_password" placeholder="password">
					</div>
					<div class="form-group">
						<label for="reg_password_confirm" class="sr-only">Password Confirm</label>
						<input type="password" class="form-control" id="reg_password_confirm" name="reg_password_confirm" placeholder="confirm password">
					</div>
					
					<div class="form-group">
						<label for="reg_email" class="sr-only">Email</label>
						<input type="text" class="form-control" id="reg_email" name="reg_email" placeholder="email">
					</div>
				
					<div class="form-group login-group-checkbox">
						<input type="radio" class="" name="reg_gender" id="male" placeholder="username">
						<label for="male">male</label>
						
						<input type="radio" class="" name="reg_gender" id="female" placeholder="username">
						<label for="female">female</label>
					</div>
					
					<div class="form-group login-group-checkbox">
						<input type="checkbox" class="" id="reg_agree" name="reg_agree">
						<label for="reg_agree">i agree with <a href="#">terms</a></label>
					</div>
				</div>
				<button type="submit" class="login-button"><i class="fa fa-chevron-right"></i></button>
			</div>
			<div class="etc-login-form">
				<p>already have an account? <a href="#">login here</a></p>
			</div>
		</form>
	</div>
	<!-- end:Main Form -->
</div>

	

	<!-- 메뉴영역 푸터 -->
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>

</body>

<!-- 회원 가입용 js -->

<script type="text/javascript" src="<c:url value="/js/uri/memreglogin.js"/>"> </script>
<script type="text/javascript" src="<c:url value="/js/uri/messages_ko.js"/>"> </script>

</html>