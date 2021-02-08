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
			<form id="loginForm" method="post">
			
				<table>
					<tr>
						<th><label for="memberId">아이디(Email)</label></th>
						<td><input type="email" id="memberId" name="memberId"> 
						</td>
					</tr>
					
					<tr>
						<th><label for="memberPw">비밀번호</label></th>
						<td><input type="password" id="memberPw" name="memberPw"></td>
					</tr>
					
					<tr>
						<th><label for="memberChk">내 아이디 저장</label></th>
						<td><input type="checkbox" id="memberChk" name="memberChk" value="on" ${cookie.mid ne null ? 'checked' : ''}></td>
					</tr>
					
					<tr>
						<th></th>
						<td><input type="submit" value="로그인"></td>
					</tr>
			
				</table>
				

			</form>
	    	
	    	
			</div>
	</div>
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>

</body>
</html>