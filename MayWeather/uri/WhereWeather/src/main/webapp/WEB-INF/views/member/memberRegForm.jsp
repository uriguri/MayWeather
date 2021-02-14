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
 #content {
 margin-top: 300px;
 }
</style>


<body bgcolor="#f5f5f5">

	<%@ include file="/WEB-INF/views/include/header.jsp"%>

	<script type="text/javascript">
	$(document).ready(function(){
	
		var regHtml = '<form id="regForm" method="post">'
			+' <table>'
			+	'<tr>'
			+		'<th><label for="memberId">아이디(Email)</label></th>'
			+		'<td><input type="email" id="memberId" name="memberId">' 
			+		'</td>'
			+	'</tr>'
			+	'<tr>'
			+		'<th><label for="memberPw">비밀번호</label></th>'
			+		'<td><input type="password" id="memberPw" name="memberPw"></td>'
			+	'</tr>'
			+	'<tr>'
			+		'<th><label for="memberPwChk">비밀번호 확인</label></th>'
			+		'<td><input type="password" id="memberPwChk" name="memberPwChk"></td>'
			+	'</tr>'
			+	'<tr>'
			+		'<th><label for="memberName">닉네임</label></th>'
			+		'<td><input type="text" id="memberName" name="memberName">'
			+		'</td>'
			+	'</tr>'
			+	'<tr>'
			+		'<th><label for="memberGender">성별</label></th>'
			+		'<td><select name="memberGender">'
			+			'<option value="">성별</option>'
			+			'<option value="M">남성</option>'
			+			'<option value="F">여성</option>'
			+			'<option value="N">선택하지 않음</option>'
			+			'</select>'
			+		'</td>'
			+	'</tr>'
			+	'<tr>'
			+		'<th></th>'
			+		'<td><input type="submit" value="회원가입"></td>'
			+	'</tr>'
			+ '</table>'	
			+'</form>';
			
			
			var editHtml = '<form id="regForm" method="post">'
				+' <table>'
				+	'<tr>'
				+		'<th><label for="memberId">아이디(Email)</label></th>'
				+		'<td><input type="email" id="memberId" name="memberId">' 
				+		'</td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th><label for="memberPw">비밀번호</label></th>'
				+		'<td><input type="password" id="memberPw" name="memberPw"></td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th><label for="memberPwChk">비밀번호 확인</label></th>'
				+		'<td><input type="password" id="memberPwChk" name="memberPwChk"></td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th><label for="memberName">닉네임</label></th>'
				+		'<td><input type="text" id="memberName" name="memberName">'
				+		'</td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th><label for="memberGender">성별</label></th>'
				+		'<td><select name="memberGender">'
				+			'<option value="">성별</option>'
				+			'<option value="M">남성</option>'
				+			'<option value="F">여성</option>'
				+			'<option value="N">선택하지 않음</option>'
				+			'</select>'
				+		'</td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th></th>'
				+		'<td><input type="submit" value="회원가입" id="reg-submit"></td>'
				+	'</tr>'
				+ '</table>'	
				+'</form>';
		
		
		$('#hideform1').one('click',function(){
			
			$.ajax({
				type: 'GET',
				success: function(){
					$('#hideform1').html(regHtml);	
				}	
			});
		});
		
		
		$('#regForm').submit(function(){
			 e.preventDefault();
			
			
			var regform = {
					memId: $('#memberId').val(),
					memPw: $('#memberPw').val(),
					memName: $('#memberName').val(),
					memGender: $('#memberGender option:selected').val()
			};
			
			 /* $(this).attr("action"), */
			 
			$.ajax({
				type: 'POST',
				url: 'member',
				dataType : 'json',
				contentType : 'application/json',
				data: JSON.stringify(regform),
				success: function(msg){
					
					if(msg == 'Y'){
						alert('회원가입이 완료되었습니다.');
					
					} else {
						alert('오류가 발생했습니다 다시시도하세요 ㅗ');
					}
				}
				
			});
			
			
			
		
		});
		
		
		
			
		$('#editForm').click(function(){
			
			$.ajax({
				type: 'GET',
				url: '/members',
				success: function(){
					$('#editForm').html(editHtml);
				}
				
			});
		});
	
	
	});
	</script>

<div id="content">
	<div id="hideform1">
	회원 가입을 할라며면 눌러봐 씨발련아
	</div>
	
	<div id="editForm">
	회원 정보 수정ㅇ을 할라면 눌러 씨발련ㄷ아
	</div>
	
	<div id="content">
	콘텐츠영역
	</div>
</div>

	<!-- 
	<div class="memContents">
		<h2 class="memTitle">회원가입</h2>
		<hr>
		<div class="memContent">
			<form id="regForm" method="post">
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
						<th><label for="memberPwChk">비밀번호 확인</label></th>
						<td><input type="password" id="memberPwChk" name="memberPwChk"></td>
					</tr>
					<tr>
						<th><label for="memberName">닉네임</label></th>
						<td><input type="text" id="memberName" name="memberName">
						</td>
					</tr>
					<tr>
						<th><label for="memberGender">성별</label></th>
						<td><select name="memberGender">
							<option value="">성별</option>
							<option value="M">남성</option>
							<option value="F">여성</option>
							<option value="N">선택하지 않음</option>
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
	</div> -->

	<%@ include file="/WEB-INF/views/include/footer.jsp"%>

</body>
</html>