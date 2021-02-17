<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>



<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<title>+WEATHER WEAR+</title>

<link rel="styleSheet" href="<c:url value="/css/default.css"/>">

<%@ include file="/WEB-INF/views/include/basicset.jsp"%>

<!-- 회원가입 로그인 모달 CSS, JS -->
<link href="<c:url value="/css/member/login-register.css"/>" rel="stylesheet" />
<link href=" <c:url value="/css/member/bootstrap.css"/>" rel="stylesheet" />
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">

<script src="<c:url value="/js/member/login-register.js"/>" type="text/javascript"></script>
<script src="<c:url value="/js/member/bootstrap.js"/>" type="text/javascript"></script>

</head>

<style>
body {
	padding-top: 90px;
}

.mypage-header {
	background-color: white;
	border: 7px solid #f5f5f5;
	border-radius: 15px;
	color: white;
}

.mypage-header>div {
	background-color: white;
}

.mem-mail-state {
	margin: 20px;
}

.mypage-body-1 {
	background-color: white;
	border: 7px solid #f5f5f5;
	border-radius: 15px;
	padding: 10px
}

.mypage-body-1>div {
	background-color: white;
}

.mypage-body-2 {
	background-color: white;
	border: 7px solid #f5f5f5;
	border-radius: 15px;
	padding: 10px
}

.mypage-body-2>div {
	background-color: white;
}

.mypage-body-3 {
	background-color: white;
	border: 7px solid #f5f5f5;
	border-radius: 15px;
	padding: 10px
}

.mypage-body-3>div {
	background-color: white;
}

.mypage-title {
	text-align: center;
	border: 1px solid gray;
	border-radius: 5px;
	width: 95%;
	margin: 0 auto;
	margin-bottom: 10px;
	margin-top: 20px;
}

.modal-dialog {
	width: 350px;
}

.modal-content {
	background-color: white;
}

.modal-body-mypage>div,h1 {
	background-color: white;
}

.basic-photo{
	width: 150px;
}

input[type="radio"]{
	margin-left: 35px;
}

.nologin-msg{
	text-align: center;
	margin-top: 10px;
	background-color: white;
	display: block;
}

.mem-info-photo {
	width: 60px;
	height: 60px;
	border-radius: 30px;
	margin: 10px 0px 0px 10px;
}

.mem-info-name{
	margin: 10px 0px 10px 5px;
	background-color: white;
}
.mem-info-loc{
	margin: 5px 0px 5px 75px;
	background-color: white;
}

#login-href{
	color: #30b0e7;
}

.mem-now-photo{
	display: block;
	margin: 0px auto;
	background-color: white;
}

td.photo-td {
   background-color: white;
}

th.photo-th {
	background-color: white;
}

.default-change-photo {
	background-color: white;
}

.btn{
	padding: 3px 8px;
}

</style>


<body bgcolor="#f5f5f5">

	<%@ include file="/WEB-INF/views/include/header.jsp"%>

	<div class="memContents">

		<div class="memContent">

		<!-- 회원가입 로그인 div -->
			<div class="container">
				

				<!-- 회원가입 로그인 클릭시 생성되는 모달 -->
				<div class="modal fade login" id="loginModal">
					<div class="modal-dialog login animated">

						<div class="modal-content">

							<!-- 모달 헤더 -->
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
								<h4 class="modal-title">Weather Were Login</h4>
							</div>

							<!-- 모달 바디 -->
							<div class="modal-body">
								<div class="box">
									<div class="content-modal">
										<!-- 소셜로그인 선택 -->
										<div class="social">
											<a class="circle github" href="#"> <i class="fa fa-github fa-fw"></i>
											</a> <a id="google_login" class="circle google" href="#"> <i
												class="fa fa-google-plus fa-fw"></i>
											</a> <a id="facebook_login" class="circle facebook" href="#"> <i
												class="fa fa-facebook fa-fw"></i>
											</a>
										</div>

										<div class="division">
											<div class="line l"></div>
											<span>or</span>
											<div class="line r"></div>
										</div>

										<div class="error"></div>

										<!--  로그인 폼 (메일, 비밀번호) -->
										<div class="form loginBox">
											<form method="post" action="" accept-charset="UTF-8">
												<input id="memId" class="form-control" type="text" placeholder="Email (ID로 사용됩니다.)"
													name="memId"> <input id="memPw" class="form-control" type="password"
													placeholder="Password" name="memPw"> <input class="btn btn-default btn-login"
													type="button" value="Login" name="loginButton" id="loginButton">
											</form>
										</div>

									</div>
								</div>


								<div class="box">

									<!-- 회원가입 폼 -->
									<div class="registerBox" style="display: none;">
										<div class="form">
											<form method="post" html="{:multipart=>true}" data-remote="true" action=""
												accept-charset="UTF-8">
												<input id="memIdReg" class="form-control" type="text" placeholder="Email"
													name="memIdReg"> <input id="memPwReg" class="form-control" type="password"
													placeholder="비밀번호(4자 이상 12자 이하)" name="memPwReg"> <input
													id="password_confirmation" class="form-control" type="password" placeholder="비밀번호 확인"
													name="password_confirmation"> <input id="nickName" class="form-control"
													type="text" placeholder="이름(닉네임)" name="nickName"> <select id="genderSelect"
													class="form-control-select" name="memGender">
													<option value="">성별</option>
													<option value="M">남성</option>
													<option value="F">여성</option>
													<option value="N">선택하지 않음</option>
												</select> <input class="btn btn-default btn-register" type="button" value="가입 하기" name="commit"
													id="commit">
											</form>
										</div>
									</div>
								</div>

							</div>

							<!-- 회원가입 모달 하단 -->
							<div class="modal-footer">
								<div class="forgot login-footer">
									<span>계정이 없으신가요? <a href="javascript: showRegisterForm();">회원가입 하러가기</a>
									</span>
								</div>

								<div class="forgot register-footer" style="display: none">
									<span>이미 계정을 가지고 계신가요?</span> <a id="login-href" href="javascript: showLoginForm();">로그인 하러가기</a>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>

		<!-- =======================마이페이지 메뉴 모달====================== -->
		<div class="modal fade" id="mypageModal" tabindex="-1" role="dialog"
				aria-labelledby="mypageModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">

						<!-- 모달상단 -->
						<div class="modal-header">
							

							<!-- 모달 닫기 버튼 -->
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>

							<h4 class="modal-title" id="mypageModalLabel">모달 제목 바뀌는 영역</h4>
						</div>

						<!-- 모달 바디 -->
						<div class="modal-body-mypage"></div>
						
						<div class="nologin-msg"><a id="login-href" href="javascript: hreflogin();">로그인</a>이 필요한 화면입니다. </div>
						
							
						<!-- 모달 하단 -->
						<div class="modal-footer">

							<!-- 버튼 두개 -->
							<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
							<button id="modalDoneBtn" type="button" class="btn btn-primary">확인</button>
						</div>

					</div>
				</div>
			</div>


		<!-- ================마이페이지 메뉴 리스트 ================ -->
			<div class="mypage-menu">

				<!-- 마이페이지 메뉴 목록 -->
				<div class="mypage-header">
				
					<span class="mem-reglogin-btn" id="memRegloginBtn">
					<!-- 로그인버튼 -->
						<a style="float: right; margin: 5px 5px 0px 0px;"  class="btn big-login" data-toggle="modal" href="javascript:void(0)"
							onclick="openLoginModal();">로그인</a>

						<!-- 회원 가입버튼 -->
						<a style="float: right; margin: 5px 5px 0px 0px;" class="btn big-register" data-toggle="modal" href="javascript:void(0)"
							onclick="openRegisterModal();">회원 가입</a>
					</span>	
									
					<div class="mem-info" id="memInfo">
						<div class="mem-info-name" id="memInfoName">마이페이지</div>
						<span class="mem-info-loc" id="memInfoLoc">먼저 로그인 해주세요.</span>
						
						
					</div>
					
					<!-- 회원 메일 인증 여부 확인 메세지  평소 display:none 로그인시 display:block -->
					<div style="display:none" class="mem-mail-state" id="memMailState">${msg}</div>
					
					<div class="mypage-title">마이 페이지</div>

				</div>
					
				<div class="mypage-body-1">

					<div class="mem-change" data-toggle="modal" data-target="#mypageModal" data-whatever="내 정보 변경">내
						정보 변경</div>

					<hr class="mypage-hr">

					<div class="mem-locchange" data-toggle="modal" data-target="#mypageModal"
						data-whatever="내 위치 변경">내 위치 변경</div>

					<hr class="mypage-hr">

					<div class="mem-photochange" data-toggle="modal" data-target="#mypageModal"
						data-whatever="프로필 사진 등록 변경">프로필 사진 등록 변경</div>
					
					
				</div>

				<div class="mypage-body-2">

					<div class="mem-like" data-toggle="modal" data-target="#mypageModal" data-whatever="좋아요 한 게시물">좋아요
						한 게시물</div>

					<hr class="mypage-hr">

					<div class="mem-bookmark" data-toggle="modal" data-target="#mypageModal"
						data-whatever="북마크 한 게시물">북마크 한 게시물</div>

				</div>

				<div class="mypage-body-3">

					<div class="mem-notice" data-toggle="modal" data-target="#mypageModal" data-whatever="공지사항">공지사항</div>

					<hr class="mypage-hr">

					<div class="mem-delete" data-toggle="modal" data-target="#mypageModal" data-whatever="회원 탈퇴">회원
						탈퇴</div>

				</div>
			</div>


		</div>
	</div>

	<!-- 로그인 체크가 없을경우 로그인 모달 팝업 -->

	<c:if test="${not loginCheck}">
	
	<script type="text/javascript">
	$(document).ready(function() {
		openLoginModal();
	});
	</script>
	
	</c:if>

	
	<!-- 회원가입 -->
	<script>
		
	$('#commit').click(function(e) {

		var memId = $('#memIdReg').val();
		var memPw = $('#memPwReg').val();
		var memName = $('#nickName').val();
		var memGender = $('#genderSelect option:selected').val();

		var member = {
			memId : memId,
			memPw : memPw,
			memName : memName,
			memGender : memGender
		};
			
		// REST POST
		$.ajax({
			type : 'POST',
			url : '/members',
			contentType : 'application/json',
			/* dataType: 'json', */
			data : JSON.stringify(member),
			/* async : false, */
			success : function(regDone) {
				
				console.log(regDone);
				
				if (regDone == 'Y') {
					alert('회원가입 성공');

				} else {
					alert('오류가 발생했습니다 다시 시도하세요.');
				}
			},
			//에러발생 디버깅용
			error : function(request, status, error) {
				alert("code:" + request.status + "\n" + "message:"
						+ request.responseText + "\n" + "error:"
						+ error);
			}

		});
	/* return false; */
	});
	</script>
	
	<!-- 회원 정보 수정 -->
	<script>
	
	$('.mem-change').click(function() {
		
	    var memberUpdateHtml = "";
	    memberUpdateHtml += '<div class="update-mem-content" id="updateMemContent">'
	    memberUpdateHtml += '<h1>내 정보</h1>';
	    memberUpdateHtml += '<hr class="mypage-hr">'
	    memberUpdateHtml += '<div class="update-id" id="updateId">'
	    memberUpdateHtml += '아이디 (이메일) *아이디 변경은 불가능합니다.'
	    memberUpdateHtml += '현재 아이디'+memEmailId
	    memberUpdateHtml += '</div>'
	    memberUpdateHtml += '<hr class="mypage-hr">'
	    memberUpdateHtml += '<div class="update-name" id="updateName">'
	    memberUpdateHtml += '<h2>닉네임 변경</h2>'
	    memberUpdateHtml += '현재 닉네임'+memName
	    memberUpdateHtml += '새로운 닉네임 <input id="memNewName" type="text" name="memNewName">'
	    memberUpdateHtml += '<input id="memNewNameBtn" type="button" class="memNewNameBtn" value="변경하기">'
	    memberUpdateHtml += '</div>'
	    memberUpdateHtml += '<hr class="mypage-hr">'
	    memberUpdateHtml += '<div class="update-pw" id="updatePw">'
	    memberUpdateHtml += '<h2>비밀번호 변경</h2>'
	    memberUpdateHtml += '<form method="post">'
	    memberUpdateHtml += '기존 비밀번호<input type="password" id="memOldPw" class="mem-old-pw">'
	    memberUpdateHtml += '새 비밀번호<input type="password" id="memNewPw" class="mem-new-pw">'
	    memberUpdateHtml += '새 비밀번호 확인<input type="password" id="memNewPwChk" class="mem-new-pw-chk">'
	    memberUpdateHtml += '</form>'
	    memberUpdateHtml += '</div>'
	    memberUpdateHtml += '</div>'
	    
	    $('.modal-body-mypage').html(memberUpdateHtml);
	    $('.nologin-msg').css('display', 'none');
	    
	    $('#modalDoneBtn').click(function() {
	    	
	        var updateMember = {
	            memIdx: memIdx,
	            memName: $('#memNewName').val(),
	            memPw: $('#memNewPw').val()
	        };
	        
	        $.ajax({
	            type: 'PUT',
	            url: '/members/edit/'+memIdx,
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(updateMember),
	            success: function(updateDone) {
	                console.log(updateDone);
	                if (updateDone == 1) {
	                    alert('정보 수정 성공!!!')
	                } else {
	                    alert('정보 수정 실패 다시시도해주세요.')
	                }
	            },
	            error: function(request,status,error) {
	                alert("code:"+request.status +"\n" +
	                	  "message:"+request.responseText +"\n" +
	                      "error:" +error);
	            }
	        });
	    });
	});
	</script>

	<!-- 회원 정보 삭제 -->
	<script>
	$('.mem-delete').click(function() {

	var memberDeleteHtml = "";
	memberDeleteHtml += '<div class="delete-id" id="deleteId">';
	memberDeleteHtml += '<h1>회원 탈퇴</h1>';
	memberDeleteHtml += '<div class="delete-info" id="deleteInfo">';
	memberDeleteHtml += '<img width="50" height="50" src="<c:url value="/fileupload/member/'+memPhoto+'"/>">';
	memberDeleteHtml += '<h2>'+memName+'님</h2>';
	memberDeleteHtml += '정말로 탈퇴하시겠어요?<br>탈퇴 후 동일한 아이디로 1개월간 재가입이 제한됩니다.';
	memberDeleteHtml += '</div>';
	memberDeleteHtml += '<hr class="mypage-hr">';
	memberDeleteHtml += '<form method="post">';
	memberDeleteHtml += '정말 탈퇴하시겠어요?<input type="checkbox" id="deleteChk1" class="deleteChk"><br>';
	memberDeleteHtml += '탈퇴 시 모든 정보는 사라집니다.<input type="checkbox" id="deleteChk2" class="deleteChk"><br>';
	memberDeleteHtml += '모든 내용을 이해했고 탈퇴에 동의합니다.<input type="checkbox" id="deleteChk3" class="deleteChk"><br>';
	memberDeleteHtml += '</form>';
	memberDeleteHtml += '</div>';

	$('.modal-body-mypage').html(memberDeleteHtml);
	$('.nologin-msg').css('display', 'none');

	$('#modalDoneBtn').click(function() {

		$.ajax({
			type : 'DELETE',
			url : '/members/delete/'+ memIdx,
			success : function(deleteDone) {
				
				console.log(deleteDone);
				
				if (deleteDone == 1) {
					alert('회원 탈퇴 성공!!!');

				} else {
					alert('탈퇴 실패 다시시도해주세요.');
				}
			},
			error: function(request,status,error) {
                alert("code:"+request.status +"\n" +
                	  "message:"+request.responseText +"\n" +
                      "error:" +error);
            }

		});
	});
});
	</script>

	<!-- 프로필 사진 변경 업로드 -->
	<script>
	$('.mem-photochange').click(function() {
		
		var memberPhotoHtml = "";
		memberPhotoHtml += '<div class="mem-photo-upload-div" id="memPhotoUploadDiv">';
		memberPhotoHtml += '<h3 style="background-color: white; margin: 10px;">프로필 사진 등록 & 변경 </h3>';
		memberPhotoHtml += '<div class="basic-photo" id="basicPhoto">';
		memberPhotoHtml += '<table class="basic-photo-table" id="basicPhotoTable">';
		memberPhotoHtml += '<tr class="photo-tr">';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="<c:url value="/fileupload/member/1.png"/>"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="<c:url value="/fileupload/member/2.png"/>"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="<c:url value="/fileupload/member/3.png"/>"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="<c:url value="/fileupload/member/4.png"/>"></th>';
		memberPhotoHtml += '</tr>';
		memberPhotoHtml += '<tr class="photo-tr">';
		memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="1.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="2.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="3.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="4.png"></th>';
		memberPhotoHtml += '</tr>';
		memberPhotoHtml += '<tr class="photo-tr">';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="<c:url value="/fileupload/member/5.png"/>"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="<c:url value="/fileupload/member/6.png"/>"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="<c:url value="/fileupload/member/7.png"/>"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="<c:url value="/fileupload/member/8.png"/>"></th>';
		memberPhotoHtml += '</tr>';
		memberPhotoHtml += '<tr class="photo-tr">';
		memberPhotoHtml += '<td class="photo-td"><input type="radio" name="defaultPhoto" value="5.png"></td>';
		memberPhotoHtml += '<td class="photo-td"><input type="radio" name="defaultPhoto" value="6.png"></td>';
		memberPhotoHtml += '<td class="photo-td"><input type="radio" name="defaultPhoto" value="7.png"></td>';
		memberPhotoHtml += '<td class="photo-td"><input type="radio" name="defaultPhoto" value="8.png"></td>';
		memberPhotoHtml += '</tr>';
		memberPhotoHtml += '</table>';
		memberPhotoHtml += '</div>';
		memberPhotoHtml += '<hr class="mypage-hr">';
		memberPhotoHtml += '<img class="mem-now-photo" width="50" height="50" src="<c:url value="/fileupload/member/'+memPhoto+'"/>">';
		memberPhotoHtml += '<div style="margin: 3px 0px 3px 115px; background-color: white;">현재 프로필 사진</div>'
		memberPhotoHtml += '<form style="background-color: white;" id="uploadForm" method="post" enctype="multipart/form-data">';
		memberPhotoHtml += '<input style="background-color: white; margin: 10px 0px 5px 25px;" type="file" id="uploadPhoto" name="uploadPhoto" class="mem-upload-photo" value="사진 업로드">';
		memberPhotoHtml += '</form>';
		memberPhotoHtml += '<input style="margin: 5px 0px 5px 120px;" id=uploadBtn type="button" value="업로드하기"><br>'; 
		memberPhotoHtml += '        파일 이름은 영문 또는 숫자로 입력해주세요.<br>        용량은 *2MB까지 업로드가 가능합니다.';
		memberPhotoHtml += '</div>';

		$('.modal-body-mypage').html(memberPhotoHtml);
		$('.nologin-msg').css('display', 'none');

		/* $('#uploadBtn').click(function(){
			
			var uploadFormData = new FormData($('#uploadForm')[0]);
			
	        $.ajax({
	        	
               url: '/members/photoupload',
               processData: false,
               contentType: false,
               data: uploadFormData,
               type: 'POST',
               success: function(result){
                   alert("업로드 성공!!");
               }
	       });
	        
		});
	 */
           
		$('#modalDoneBtn').click(function() {
		
			var radioCheck = $('input:radio[name=defaultPhoto]').is(':checked');
			var radioVal = $('input:radio[name=defaultPhoto]:checked').val();
			var uploadPhoto = '';
			
			/* if(radioCheck == true){
				uploadPhoto = radioVal;
			} else {
				uploadPhoto = $('#uploadPhoto').val();
			} */
			
			uploadPhoto = radioVal;
			
			console.log(radioCheck);
			console.log(radioVal);
			console.log(uploadPhoto);
			console.log(memIdx);
			console.log(memPhoto);
			
			 var uploadMember = {
	            memIdx: memIdx,
	            memPhoto: uploadPhoto
	        };
			
			$.ajax({
				type: 'PUT',
				url: '/members/edit/photo',
				contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(uploadMember),
				success : function(photoDone) {
					
					console.log(photoDone);
					
					if (photoDone == 1) {
						alert('사진 변경 성공!!!');

					} else {
						alert('변경 실패 다시시도해주세요.');
					}
				},
				error: function(request,status,error) {
	                alert("code:"+request.status +"\n" +
	                	  "message:"+request.responseText +"\n" +
	                      "error:" +error);
	            }

			});
		});
	});
	</script>
	
	<!-- 모달 타이틀 컨트롤 -->
	<script>
	$('#mypageModal').on('show.bs.modal',function(event) {
		var mypageDiv = $(event.relatedTarget) // 버튼 누를 시 요소 타겟
		var recipient = mypageDiv.data('whatever') //whatever-data 요소 추출
		
		var modal = $(this) // 열린 모달 창
		modal.find('.modal-title').text(recipient) //타이틀 recipient로 변경
		
	});
	</script>

	<!-- 로그인 & 로그인모달 -->
	<script>
	
	function closeLoginModal() {
	/* $('#loginModal').fadeOut('fast',function(){
		$('.modal-backdrop').fadeOut('fast');
	}); */
	$('#loginModal').modal("hide");
	}
	
	// 비회원 로그인시 기본값 a href 이벤트 설정
	function hreflogin() {
		$('#mypageModal').modal("hide");
		$('#loginModal').modal("show");
	}
	
	

	$('#loginButton').click(function(e) {

		e.preventDefault();
	
		var memId = $('#memId').val();
		var memPw = $('#memPw').val();
	
		var member = {
			memId : memId,
			memPw : memPw
		};
	
		$.ajax({
			type : 'POST',
			url : '/members/login',
			contentType : 'application/json; charset=utf-8',
			dataType : 'json',
			data : JSON.stringify(member),
			success : function(loginDone) {
	
				console.log(loginDone);
	
				memPhoto = loginDone.memPhoto;
				memName = loginDone.memName;
				memIdx = loginDone.memIdx;
				memEmailId = loginDone.memId;
				memLoc = loginDone.memLoc;
	
				// 로그인 실패
				if (memName == 'admin') {
					shakeModal();
				// 로그인 성공
				} else {
					var memInfoLogin = '<img class="mem-info-photo" id="memInfoPhoto" src="<c:url value="/fileupload/member/'+memPhoto+'"/>">';
						memInfoLogin += '<span class="mem-info-name" id="memInfoName">'+memName+' 님 환영합니다!</span>';
						memInfoLogin += '<span class="mem-info-loc" id="memInfoLoc">내위치 : '+memLoc+'</span>';	
						
					$("#memInfo").html(memInfoLogin);
				
					
					// 메일 인증여부 출력(미 인증시)
					$('.mem-mail-state').css('display', 'block');
					
					// 로그인 후 자동 닫기
					closeLoginModal();
				}
			},
			error : function(request, status, error) {
				alert("code:" + request.status+ "\n" +
					  "message:" + request.responseText	+ "\n" + 
					  "error:" + error);
			}
	
		});

	});
	</script>

	<%@ include file="/WEB-INF/views/include/footer.jsp"%>
</body>
</html>