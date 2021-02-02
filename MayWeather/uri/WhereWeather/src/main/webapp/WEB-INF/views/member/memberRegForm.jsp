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
		<h2 class="memTitle">회원가입</h2>
		<hr>
		<div class="memContent">
			<form id="regForm" method="post">
				<table>
					<tr>
						<th><label for="memId">아이디(Email)</label></th>
						<td><input type="email" id="memId" name="memId"> 
						</td>
					</tr>
					<tr>
						<th><label for="memPw">비밀번호</label></th>
						<td><input type="password" id="memPw" name="memPw"></td>
					</tr>
					<tr>
						<th><label for="memPwChk">비밀번호 확인</label></th>
						<td><input type="password" id="memPwChk" name="memPwChk"></td>
					</tr>
					<tr>
						<th><label for="memName">닉네임</label></th>
						<td><input type="text" id="memName" name="memName">
						</td>
					</tr>
					<tr>
						<th><label for="memGender">성별</label></th>
						<td><select name="memGender">
							<option value="">성별</option>
							<option value="M">남성</option>
							<option value="F">여성</option>
							<option value="X">선택하지 않음</option>
							</select>
						</td>
					</tr>
					<tr>
						<th></th>
						<td><input type="submit" value="회원가입"></td>
					</tr>
				</table>

			</form>
		</div>
	</div>

	<%@ include file="/WEB-INF/views/include/footer.jsp"%>

</body>
</html>