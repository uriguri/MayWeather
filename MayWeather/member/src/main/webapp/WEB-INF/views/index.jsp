<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<title>+WEATHER WEAR+</title>

<!-- 부트스트랩 & 제이쿼리 -->
<%@ include file="/WEB-INF/views/include/basicset.jsp"%>

<!-- 회원가입, 로그인, 모달, 마이페이지 CSS -->
<link rel="styleSheet" href="<c:url value="/css/member/login-register.css"/>"/>
<link rel="styleSheet" href="<c:url value="/css/member/bootstrap.css"/>"/>
<link rel="styleSheet" href="<c:url value="/css/default.css"/>">
<link rel="styleSheet" href="<c:url value="/css/member/mypage.css"/>"/>

<!-- 회원가입, 로그인, 모달, 마이페이지 JS -->
<script src="<c:url value="/js/member/login-register.js"/>" type="text/javascript"></script>
<script src="<c:url value="/js/member/bootstrap.js"/>" type="text/javascript"></script>

<!-- 카카오로그인  -->
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

<!-- alert 창 변경 sweetalert -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<!-- OOTD JS파일 -->
<script src="<c:url value="/js/ootd.js"/>"></script>
<script src="<c:url value="/js/croppers.js"/>"></script>

</head>

<style>
.swal2-header, .swal2-header>div, .swal2-header>span, .swal2-header>h2{
	background-color: white;
}

.swal2-header>div>span{
	background-color: white;
}


.swal2-content, .swal2-content>div{
	background-color: white;
}

.swal2-actions, .swal2-actions>div{
	background-color: white;
}

.swal2-icon, .swal2-success, .swal2-icon-show{
	background-color: white;
}

</style>

<body class="bg_color">

<!-- 상단 고정바 -->
<%@ include file="/WEB-INF/views/include/header.jsp"%>
	
<div class="memContents">

    <div class="memContent">

        <div class="content" id="memberMain">

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
                                        <a id="custom-login-btn" href="javascript:kakaoLogin()"> <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="200"/></a>
                                        </div>

                                        <!-- 소셜, 일반로그인 경계선 -->
                                        <div class="division">
                                            <div class="line l"></div>
                                            <span>or</span>
                                            <div class="line r"></div>
                                        </div>

                                        <div class="error"></div>

                                        <!--  로그인 폼 (메일, 비밀번호) -->
                                        <div class="form loginBox">
                                            <form method="post" action="" accept-charset="UTF-8">
                                                <input id="memId" class="form-control" type="text" placeholder="Email (ID로 사용됩니다.)" name="memId">
                                                <div id="idLoginMsg"></div>
                                                <input id="memPw" class="form-control" type="password" placeholder="Password" name="memPw">
                                                <div id="pwLoginMsg"></div>
                                                <input class="btn btn-default btn-login" type="button" value="Login" name="loginButton" id="loginButton">
                                            </form>
                                        </div>

                                    </div>
                                </div>


                                <div class="box">

                                    <!-- 회원가입 폼 -->
                                    <div class="registerBox" style="display: none;">
                                        <div class="form">
                                            <form method="post" html="{:multipart=>true}" data-remote="true" action="" accept-charset="UTF-8">

                                                <!-- 아이디 입력 및 체크 -->
                                                <input id="memIdReg" class="form-control" type="text" placeholder="Email" name="memIdReg">
                                                <input id="idChk" class="id-chk" type="checkbox">
                                                <div id="idChkMsg"></div>

                                                <!-- 비밀번호 입력 및 체크 -->
                                                <input id="memPwReg" class="form-control" type="password" placeholder="비밀번호(4자 이상 12자 이하)" name="memPwReg">
                                                <input id="pwChk" class="pw-chk" type="checkbox">
                                                <div id="pwChkMsg"></div>
												
												<!-- 메일전송 대기시간 로딩이미지 출력 -->
												<img id="regLoading" src="<c:url value="/fileupload/member/ajaxloading.gif"/>">	
												
                                                <input id="memPwRegChk" class="form-control" type="password" placeholder="비밀번호 확인" name="memPwRegChk">
                                                <input id="pwChkChk" class="pw-chk-chk" type="checkbox">
                                                <div id="pwChkChkMsg"></div>

                                                <!-- 닉네임 입력 및 체크 -->
                                                <input id="nickName" class="form-control" type="text" placeholder="이름(닉네임)" name="nickName">
                                                <input id="nameChk" class="name-chk" type="checkbox">
                                                <div id="nameChkMsg"></div>

                                                <select id="genderSelect" class="form-control-select" name="memGender">
                                                    <option value="" disabled="disabled">성별</option>
                                                    <option value="F">여성</option>
                                                    <option value="M">남성</option>
                                                    <option value="N">선택하지 않음</option>
                                                </select>
                                                <input class="btn btn-default btn-register" type="button" value="가입 하기" name="commit" id="commit">
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <!-- 회원가입 모달 하단 -->
                            <div class="modal-footer">
                                <div class="forgot login-footer">
                                    <span>계정이 없으신가요? <a id="reg-href" href="javascript: showRegisterForm();">회원가입 하러가기</a>
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
            <div class="modal fade" id="mypageModal" tabindex="-1" role="dialog" aria-labelledby="mypageModalLabel" aria-hidden="true">
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
                        <a style="float: right; margin: 5px 5px 0px 0px;" class="btn big-login" data-toggle="modal" href="javascript:void(0)" onclick="openLoginModal();">로그인</a>

                        <!-- 회원 가입버튼 -->
                        <a style="float: right; margin: 5px 5px 0px 0px;" class="btn big-register" data-toggle="modal" href="javascript:void(0)" onclick="openRegisterModal();">회원 가입</a>
                    </span>
                
					<div class="mypage-header-content">
                                       
                    <hr class="mypage-hr">

                    <div class="mem-info" id="memInfo">
                    	<div class="mem-info-photo-div" style="background-color: white; float: left;">
							<img class="mem-info-photo" id="memInfoPhoto" src="http://localhost:8080/fileupload/member/nologin.png">
						</div>
						<div class="mem-info-name" id="memInfoName">마이페이지 입니다. </div>
						<div class="mem-info-loc" id="memInfoLoc">먼저 로그인 해주세요.</div>	                       
                    </div>
                    


                    <!-- 회원 메일 인증 여부 확인 메세지  미 인증시에 출력 함-->
                    <div style="display:none" class="mem-mail-state" id="memMailState">${msg}</div>

					</div>
					
					<div class="mypage-title-div" style="background-color: white;">
						<div class="mypage-title">마이 페이지</div>
					</div>

				
			<div id="mypageMarket" class="mypage-market">
					 <div class="mypage-market-div">
					 	<div class="mypage-market-icon-div">
					 		<img class="mypage-market-icon" src="http://localhost:8080/fileupload/member/saleicon.png">
					 	</div>
					 	<div class="mypage-market-icon-div">
							 <img class="mypage-market-icon" src="http://localhost:8080/fileupload/member/buyicon.png">
					 	</div>
					 	<div class="mypage-market-icon-div">
							 <img class="mypage-market-icon" src="http://localhost:8080/fileupload/member/hearticon.png">
					 	</div>
					 </div>
					 
					 <div class="mypage-market-div2">
					 	<div class="mypage-market-text-div">
					 		<div class="mypage-market-text">판매내역</div>
						</div>					 		
					 	<div class="mypage-market-text-div">
					 		<div class="mypage-market-text">구매내역</div>
						</div>				
						<div class="mypage-market-text-div">
					 		<div class="mypage-market-text">관심목록</div>
						</div>	
					 </div>
				</div>	 
				
            </div>
                
			<div class="mypage-body-div">
                <div class="mypage-body-1">

                    <div class="mem-change" data-toggle="modal" data-target="#mypageModal" data-whatever="내 정보 변경">내 정보 변경</div>
				
                    <hr class="mypage-hr">

                    <div class="mem-locchange" data-toggle="modal" data-target="#mypageModal" data-whatever="내 위치 변경">내 위치 변경</div>

                    <hr class="mypage-hr">

                    <div class="mem-photochange" data-toggle="modal" data-target="#mypageModal" data-whatever="프로필 사진 변경">프로필 사진 변경</div>


                </div>

                <div class="mypage-body-2">

                    <div class="mem-like" data-toggle="modal" data-target="#mypageModal" data-whatever="좋아요 한 게시물">좋아요 한 게시물</div>
					
                    <hr class="mypage-hr">

					 <div class="mem-notice">내 방명록(정은님꺼 연결)</div>

                </div>

                <div class="mypage-body-3">

                    <div class="mem-delete" data-toggle="modal" data-target="#mypageModal" data-whatever="회원 탈퇴">회원 탈퇴</div>

                </div>
               </div>
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

	<!-- 마이페이지 스크립트 -->
	<script src="<c:url value="/js/member/mypage.js"/>" type="text/javascript"></script>

	<script>
	
	
	
	// 프로필 사진 변경 업로드
	$('.mem-photochange').click(function() {
		
		var memberPhotoHtml = "";
		memberPhotoHtml += '<div class="mem-photo-upload-div" id="memPhotoUploadDiv">';
		memberPhotoHtml += '<h3 style="background-color: white; margin: 10px;">프로필 사진 등록 & 변경 </h3>';
		memberPhotoHtml += '<div class="basic-photo" id="basicPhoto">';
		memberPhotoHtml += '<table class="basic-photo-table" id="basicPhotoTable">';
		memberPhotoHtml += '<tr class="photo-tr">';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://localhost:8080/fileupload/member/1.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://localhost:8080/fileupload/member/2.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://localhost:8080/fileupload/member/3.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://localhost:8080/fileupload/member/4.png"></th>';
		memberPhotoHtml += '</tr>';
		memberPhotoHtml += '<tr class="photo-tr">';
		memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="1.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="2.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="3.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="4.png"></th>';
		memberPhotoHtml += '</tr>';
		memberPhotoHtml += '<tr class="photo-tr">';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://localhost:8080/fileupload/member/5.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://localhost:8080/fileupload/member/6.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://localhost:8080/fileupload/member/7.png"></th>';
		memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://localhost:8080/fileupload/member/8.png"></th>';
		memberPhotoHtml += '</tr>';
		memberPhotoHtml += '<tr class="photo-tr">';
		memberPhotoHtml += '<td class="photo-td"><input type="radio" name="defaultPhoto" value="5.png"></td>';
		memberPhotoHtml += '<td class="photo-td"><input type="radio" name="defaultPhoto" value="6.png"></td>';
		memberPhotoHtml += '<td class="photo-td"><input type="radio" name="defaultPhoto" value="7.png"></td>';
		memberPhotoHtml += '<td class="photo-td"><input type="radio" name="defaultPhoto" value="8.png"></td>';
		memberPhotoHtml += '</tr>';
		memberPhotoHtml += '</table>';
		memberPhotoHtml += '</div>';
		memberPhotoHtml += '<input style="margin: 10px 0px 0px 90px;" id=uploadBtnBasic class="btn btn-info" type="button" value="선택하여 내사진 변경!"><br>';
		memberPhotoHtml += '<hr class="mypage-hr">';
		memberPhotoHtml += '<img class="mem-now-photo" width="50" height="50" src="http://localhost:8080/fileupload/member/'+memPhoto+'">';
		memberPhotoHtml += '<div style="margin: 3px 0px 3px 115px; background-color: white;">현재 프로필 사진</div>'
		
		//(사진)업로드 폼
		memberPhotoHtml += '<form style="background-color: white;" id="uploadForm" method="post" enctype="multipart/form-data">';
		memberPhotoHtml += '<input style="background-color: white; margin: 10px 0px 5px 25px;" type="hidden" id="uploadPhotoName" name="uploadPhotoName" value="'+memIdx+'.png">';
		memberPhotoHtml += '<input style="background-color: white; margin: 10px 0px 10px 80px; width: 240px;" type="file" id="uploadPhoto" name="uploadPhoto" class="mem-upload-photo" value="사진 업로드">';
		memberPhotoHtml += '</form>';
		memberPhotoHtml += '<input style="margin-left: 100px;" id=uploadBtn class="btn btn-info" type="button" value="업로드 파일로 변경!"><br>'; 
		memberPhotoHtml += '        파일 이름은 영문 또는 숫자로 입력해주세요.<br>        용량은 *2MB까지 업로드가 가능합니다.';
		memberPhotoHtml += '</div>';

		$('.modal-body-mypage').html(memberPhotoHtml);
		$('.nologin-msg').css('display', 'none');

		// 업로드 버튼 누르면
		$(document).on('click', '#uploadBtn', function(e){
			e.preventDefault();
			
			var uploadPhotoName = $("#uploadPhotoName").val();
			
			file_ajax_submit(uploadPhotoName);
			
		});
		
		// 업로드시 실행될 function
		function file_ajax_submit(uploadPhotoName){
			
			var form = $('#uploadForm')[0];
			
			var data = new FormData(form);
			
			
			$('#uploadBtn').prop('disabled', true);
			
			$.ajax({
				type: 'POST',
				url: '/members/upload/photo/'+memIdx,
				enctype: 'multipart/form-data',
				data: data,
				async: false,
				processData: false,
				contentType: false,
				cache: false,
				success: function(data) {
					console.log("success:", data);	
					$('#uploadBtn').prop('disabled', false);
					
					setTimeout(function(){
						successChange();
					}, 2000);
				},
				error: function(e) {
					console.log("error:", e);
					$('#uploadBtn').prop('disabled', false);
				}
				
			});
		}
	 
           
		$('#uploadBtnBasic').click(function() {
		
			var radioCheck = $('input:radio[name=defaultPhoto]').is(':checked');
			var radioVal = $('input:radio[name=defaultPhoto]:checked').val();
			var uploadPhoto = '';
			
			uploadPhoto = radioVal;
	
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
						new swal("사진 변경 성공!", "안목이 뛰어나시네요!", "success");
						closeMypageModal();

					} else {
						new swal("오류 발생!", "다시 시도해주세요!", "error");
						closeMypageModal();
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

	<script>
	
	// 작업 성공시 myinfo 영역을 갱신해줄 코드
	
	function successChange(){
		
		var memInfoLogin = '<img class="mem-info-photo" id="memInfoPhoto" src="http://localhost:8080/fileupload/member/'+memPhoto+'">';
		memInfoLogin += '<span class="mem-info-name" id="memInfoName">'+memName+' 님 환영합니다!</span>';
		memInfoLogin += '<span class="mem-info-loc" id="memInfoLoc">카카오 로그인 중입니다.</span>';
		
		$('#memInfo').html(memInfoLogin);	
	}
	
	
	</script>

	
	<!-- 푸터 -->
	<%@ include file="/WEB-INF/views/include/footer.jsp"%>
</body>
</html>