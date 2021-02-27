//AWS 경로
var awsUrl = 'http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member';

var localUrl = '192.168.0.35:8080/member';
	
var rootUrl	= awsUrl;
	
// 모달 닫기

// 로그인 모달 닫기
function closeLoginModal() {
$('#loginModal').modal("hide");
}

// 마이페이지 전용 모달 닫기	
function closeMypageModal(){
$('#mypageModal').modal("hide");
}
	
// 로그인 <a>태그 href 이벤트 설정
function hreflogin() {
$('#mypageModal').modal("hide");
$('#loginModal').modal("show");
}

// 마이페이지 출력
function memberMain(){
	console.log('마이페이지 출력');
	
	var memberMain = '';
		memberMain +='<div class="container">';
		memberMain +='<div class="modal fade login" id="loginModal">';
		memberMain +='<div class="modal-dialog login animated">';
		memberMain +='<div class="modal-content">';
		memberMain +='<div class="modal-header">';
		memberMain +='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
		memberMain +='<h4 class="modal-title">Weather Were Login</h4>';
		memberMain +='</div>';
		memberMain +='<div class="modal-body">';
		memberMain +='<div class="box">';
		memberMain +='<div class="content-modal">';
		memberMain +='<div class="social">';
		memberMain +='<a id="custom-login-btn" href="javascript:kakaoLogin()"> <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="200"/></a>';
		memberMain +='<a id="naverIdLogin_loginButton" href="javascript:void(0);" role="button" onclick="naverLogin(); return false;"><img src="https://static.nid.naver.com/oauth/big_g.PNG" width=200 style="margin-top: 15px;"></a>';
		memberMain +='</div>';
		memberMain +='<div class="division">';
		memberMain +='<div class="line l"></div>';
		memberMain +='<span>or</span>';
		memberMain +='<div class="line r"></div>';
		memberMain +=' </div>';
		memberMain +='<div class="error"></div>';
		memberMain +='<div class="form loginBox">';
		memberMain +='<form method="post" action="" accept-charset="UTF-8">';
		memberMain +='<input id="memId" class="form-control" type="text" placeholder="Email (ID로 사용됩니다.)" name="memId">';
		memberMain +='<div id="idLoginMsg"></div>';
		memberMain +='<input id="memPw" class="form-control" type="password" placeholder="Password" name="memPw">';
		memberMain +='<div id="pwLoginMsg"></div>';
		memberMain +='<input class="btn btn-default btn-login" type="button" value="Login" onclick="memberLoginBtn();" name="loginButton" id="loginButton">';
		memberMain +='</form>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +=' </div>';
		memberMain +='<div class="box">';
		memberMain +='<div class="registerBox" style="display: none;">';
		memberMain +='<div class="form">';
		memberMain +='<form method="post" html="{:multipart=>true}" data-remote="true" action="" accept-charset="UTF-8">';
		memberMain +='<input id="memIdReg" class="form-control" type="text" placeholder="Email" name="memIdReg">';
		memberMain +='<input id="idChk" class="id-chk" type="checkbox">';
		memberMain +='<div id="idChkMsg"></div>';
		memberMain +='<input id="memPwReg" class="form-control" type="password" placeholder="비밀번호(4자 이상 12자 이하)" name="memPwReg">';
		memberMain +='<input id="pwChk" class="pw-chk" type="checkbox">';
		memberMain +='<div id="pwChkMsg"></div>';
		memberMain +='<img id="regLoading" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/ajaxloading.gif">';
		memberMain +='<input id="memPwRegChk" class="form-control" type="password" placeholder="비밀번호 확인" name="memPwRegChk">';
		memberMain +='<input id="pwChkChk" class="pw-chk-chk" type="checkbox">';
		memberMain +='<div id="pwChkChkMsg"></div>';
		memberMain +='<input id="nickName" class="form-control" type="text" placeholder="이름(닉네임)" name="nickName">';
		memberMain +='<input id="nameChk" class="name-chk" type="checkbox">';
		memberMain +='<div id="nameChkMsg"></div>';
		memberMain +='<select id="genderSelect" class="form-control-select" name="memGender">';
		memberMain +='<option value="" disabled="disabled">성별</option>';
		memberMain +='<option value="F">여성</option>';
		memberMain +='<option value="M">남성</option>';
		memberMain +='<option value="N">선택하지 않음</option>';
		memberMain +='</select>';
		memberMain +='<input class="btn btn-default btn-register" type="button" value="가입 하기" onclick="memberRegBtn();" name="commit" id="commit">';
		memberMain +='</form>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='<div class="modal-footer">';
		memberMain +='<div class="forgot login-footer">';
		memberMain +='<span>계정이 없으신가요? <a id="reg-href" href="javascript: showRegisterForm();">회원가입 하러가기</a>';
		memberMain +='</span>';
		memberMain +='</div>';
		memberMain +='<div class="forgot register-footer" style="display: none">';
		memberMain +='<span>이미 계정을 가지고 계신가요?</span> <a id="login-href" href="javascript: showLoginForm();">로그인 하러가기</a>';
		memberMain +=' </div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='<div class="modal fade" id="mypageModal" tabindex="-1" role="dialog" aria-labelledby="mypageModalLabel" aria-hidden="true">';
		memberMain +='<div class="modal-dialog">';
		memberMain +='<div class="modal-content">';
		memberMain +='<div class="modal-header">';
		memberMain +='<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
		memberMain +='<span aria-hidden="true">&times;</span>';
		memberMain +='</button>';
		memberMain +='<h4 class="modal-title" id="mypageModalLabel">Weather Were 로그인</h4>';
		memberMain +='</div>';
		memberMain +='<div class="modal-body-mypage"></div>';
		memberMain +='<div class="nologin-msg"><a id="login-href" href="javascript: hreflogin();">로그인</a>이 필요한 화면입니다. </div>';
		memberMain +='<div class="modal-footer">';
		memberMain +='<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>';
		memberMain +='<button id="modalDoneBtn" type="button" class="btn btn-primary">확인</button>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='<div class="mypage-menu">';
		memberMain +='<div class="mypage-header">';
		memberMain +='<span class="mem-reglogin-btn" id="memRegloginBtn">';
		memberMain +='<a style="float: right; margin: 8px 5px 0px 0px;" class="btn big-login" data-toggle="modal" href="javascript:void(0)" onclick="openLoginModal();">로그인</a>';
		memberMain +='<a style="float: right; margin: 8px 5px 0px 0px;" class="btn big-register" data-toggle="modal" href="javascript:void(0)" onclick="openRegisterModal();">회원 가입</a>';
		memberMain +='</span>';
		memberMain +='<div class="mypage-header-content">';
		memberMain +='<hr class="login-reg-hr">';
		memberMain +='<div class="mem-info" id="memInfo">';
		memberMain +='<div class="mem-info-photo-div" style="background-color: white; float: left;">';
		memberMain +='<img class="mem-info-photo" id="memInfoPhoto" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/nologin.png">';
		memberMain +='</div>';
		memberMain +='<div class="mem-info-name" id="memInfoName">마이페이지 입니다. </div>';
		memberMain +='<div class="mem-info-loc" id="memInfoLoc" style="margin-left: 80px;"> 먼저 <a id="login-href" href="javascript:void(0);" onclick="openLoginModal(); return false;">로그인</a> 해주세요.</div>';
		memberMain +='</div>';
		memberMain +='<div style="display:none" class="mem-mail-state" id="memMailState"></div>';
		memberMain +='</div>';
		memberMain +='<div class="mypage-title-div" style="background-color: white;">';
		memberMain +='<div class="mypage-title">마이 페이지</div>';
		memberMain +='</div>';
		memberMain +='<div id="mypageMarket" class="mypage-market">';
		memberMain +='<div class="mypage-market-div">';
		memberMain +='<div class="mypage-market-icon-div">';
		memberMain +='<img class="mypage-market-icon" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/saleicon.png">';
		memberMain +='</div>';
		memberMain +='<div class="mypage-market-icon-div">';
		memberMain +='<img class="mypage-market-icon" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/buyicon.png">';
		memberMain +='</div>';
		memberMain +='<div class="mypage-market-icon-div">';
		memberMain +='<img class="mypage-market-icon" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/hearticon.png">';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='<div class="mypage-market-div2">';
		memberMain +='<div class="mypage-market-text-div">';
		memberMain +='<div class="mypage-market-text">판매내역</div>';
		memberMain +='</div>';
		memberMain +='<div class="mypage-market-text-div">';
		memberMain +='<div class="mypage-market-text">구매내역</div>';
		memberMain +='</div>';
		memberMain +='<div class="mypage-market-text-div">';
		memberMain +='<div class="mypage-market-text">관심목록</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='<div class="mypage-body-div">';
		memberMain +='<div class="mypage-body-1">';
		memberMain +='<div class="mem-change" data-toggle="modal" data-target="#mypageModal" data-whatever="내 정보 변경">내 정보 변경</div>';
		memberMain +='<hr class="mypage-hr">';
		memberMain +='<div class="mem-locchange" data-toggle="modal" data-target="#mypageModal" data-whatever="내 위치 변경">내 위치 변경</div>';
		memberMain +='<hr class="mypage-hr">';
		memberMain +='<div class="mem-photochange" data-toggle="modal" data-target="#mypageModal" data-whatever="프로필 사진 변경">프로필 사진 변경</div>';
		memberMain +='</div>';
		memberMain +='<div class="mypage-body-2">';
		memberMain +='<div class="mem-like">좋아요 한 게시물</div>';
		memberMain +='<hr class="mypage-hr">';
		memberMain +='<div class="mem-notice">내 방명록(정은님꺼 연결)</div>';
		memberMain +='</div>';
		memberMain +='<div class="mypage-body-3">';
		memberMain +='<div class="mem-forgot">아이디/비밀번호 찾기</div>';
		memberMain +='<hr class="mypage-hr">';
		memberMain +='<div class="mem-delete" data-toggle="modal" data-target="#mypageModal" data-whatever="회원 탈퇴">회원 탈퇴</div>';
		memberMain +='</div>';
		memberMain +='</div>';
		memberMain +='</div>';

	$('.content').html(memberMain);
	
	// 로그인이 된 상태라면 
	if(memIdx != 'null' && memIdx != ''){
		var memInfoLogin = '<div class="mem-info-photo-div" style="background-color: white; float: left;">';
		memInfoLogin +='<img class="mem-info-photo" id="memInfoPhoto" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/'+memPhoto+'">';
		memInfoLogin +='</div>';	
		memInfoLogin +='<div class="mem-info-name" id="memInfoName">'+memName+' 님 환영합니다!</div>';
		memInfoLogin +='<div class="mem-info-loc" id="memInfoLoc"> <img class="mem-info-loc-icon" id="memInfoLoc" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/image/icon/location.png">내위치 : '+memLoc+'</div>';
		
		var logoutBtn = '<a id="memLogoutBtn" style="float: right; margin: 5px 5px 0px 0px;" class="btn big-register" href="javascript:void(0);" onclick="memberLogoutBtn();">로그아웃</a>' 
	
		//마이페이지 상단 변경
		$('#memInfo').html(memInfoLogin);
		
		//가입로그인 로그아웃 버튼으로 변경
		$('#memRegloginBtn').html(logoutBtn);
		
		//마켓영역 none->block
		$('#mypageMarket').css('display','block');
		
		//이메일체크 N이라면 미인증 회원 메세지 출력
		if(memEmailchk != 'null' && memEmailchk == 'N') {
				$('#memMailState').css('display','block');
				$('#memMailState').text('미 인증 회원입니다 이메일 인증을 해주세요.');
		}	
	
	} 
}

//회원가입 완료 버튼 사용시
function memberRegBtn(){
	
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

	
	if($('#idChk').is(":checked") && $('#pwChk').is(":checked") && $('#pwChkChk').is(":checked") && $('#nameChk').is(":checked")){
		
		$.ajax({
			type : 'POST',
			url : rootUrl + '/members',
			contentType : 'application/json',
			data : JSON.stringify(member),
			success : function(regDone) {
				
					console.log(regDone);
				
					if (regDone == 'Y') {
						new swal("가입을 축하합니다!", "이제 로그인 할 수 있어요!", "success");
						
						closeLoginModal();
						
					} else {
						new swal("오류 발생!", "다시 시도해주세요!", "error");
					}
				},
				
			beforeSend:function(){
				$('#regLoading').addClass('display_block');
			},
				
			complete:function(){
				$('#regLoading').removeClass('display_block');
			},
			//에러발생 디버깅용
			error : function(request, status, error) {
				alert("code:" + request.status + "\n" + "message:"
						+ request.responseText + "\n" + "error:"
						+ error);
			}
		});
	
	} else {
		new swal("이런!", "입력정보를 다시 확인해주세요!", "error");
	}
	
	
}

//회원가입 유효성 검사

//아이디 유효성
$(document).on("focusout","#memIdReg",function(){
	var re =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	var regId =  $(this).val();
	var regMsg = $('#idChkMsg');
	regMsg.addClass('display_block');
	
	var regChkBox = $('#idChk');
	
	regChkBox.prop('checked', false);
	
	if(regId.length==0 || !re.test(regId)){
		regMsg.html('이메일 형식의 아이디를 입력해주세요.');
		regMsg.addClass('font_no');
	
	} else {
		
	$.ajax({
			url : rootUrl + '/members/idcheck',
			data : {memId:regId},
			success : function(data){
				if(data=='Y'){
					regMsg.html('사용가능한 아이디 입니다.');
					regMsg.removeClass('font_no');
					regMsg.addClass('font_yes');
					regChkBox.prop('checked', true);
					
				} else {
					regMsg.html('사용불가능한 아이디 입니다.');
					regMsg.removeClass('font_yes');
					regMsg.addClass('font_no');
				}
			},
			error : function(){
				regMsg.html('사용불가능한 아이디 입니다.');
				regMsg.removeClass('font_yes');
				regMsg.addClass('font_no');
			}
			
	});//ajax end
	
	}
});

$(document).on("focusin","#memIdReg",function(){
	$(this).val('');
	var regMsg = $('#idChkMsg');
	var regChkBox = $('#idChk');
	regMsg.removeClass('font_yes');
	regMsg.removeClass('font_no');
	regMsg.removeClass('display_block');
	regChkBox.prop('checked', false);
});


//비밀번호 유효성
$(document).on("focusout","#memPwReg",function(){
	var regPw =  $(this).val();
	var regPwMsg = $('#pwChkMsg');
	regPwMsg.addClass('display_block');
	
	var regPwChkBox = $('#pwChk');
	
	regPwChkBox.prop('checked', false);
	
	if(regPw.length < 4 || regPw.length > 12 ){
		regPwMsg.html('비밀번호는 4자 이상 12자 이하로 입력해주세요.');
		regPwMsg.addClass('font_no');
	
	} else {
		regPwMsg.html('사용가능한 비밀번호 입니다.');
		regPwMsg.removeClass('font_no');
		regPwMsg.addClass('font_yes');
		regPwChkBox.prop('checked', true);
	}
	
});

$(document).on("focusin","#memPwReg",function(){
	$(this).val('');
	var regPwMsg = $('#pwChkMsg');
	var regPwChkBox = $('#pwChk');
	regPwMsg.removeClass('font_yes');
	regPwMsg.removeClass('font_no');
	regPwMsg.removeClass('display_block');
	regPwChkBox.prop('checked', false);
});


//비밀번호 확인 재입력 유효성
$(document).on("focusout","#memPwRegChk",function(){
	var regPw = $('#memPwReg').val();
	var regPwChk =  $(this).val();
	var regPwChkMsg = $('#pwChkChkMsg');
	regPwChkMsg.addClass('display_block');
	
	var regPwChkChkBox = $('#pwChkChk');
	
	regPwChkChkBox.prop('checked', false);
	
	if(regPw!=regPwChk){
		regPwChkMsg.html('비밀번호를 다시 확인해주세요.');
		regPwChkMsg.addClass('font_no');
	
	} else {
		regPwChkMsg.html('올바르게 입력하셨습니다.');
		regPwChkMsg.removeClass('font_no');
		regPwChkMsg.addClass('font_yes');
		regPwChkChkBox.prop('checked', true);
	}
	
});

$(document).on("focusin","#memPwRegChk",function(){
	$(this).val('');
	var regPwChkMsg = $('#pwChkChkMsg');
	var regPwChkChkBox = $('#pwChkChk');
	regPwChkMsg.removeClass('font_yes');
	regPwChkMsg.removeClass('font_no');
	regPwChkMsg.removeClass('display_block');
	regPwChkChkBox.prop('checked', false);
});

$(document).on("focusout","#nickName",function(){
	var regName = $('#nickName').val();
	var regNameChkMsg = $('#nameChkMsg');
	var regNameChkBox = $('#nameChk');
	
	regNameChkMsg.addClass('display_block');
	
	regNameChkBox.prop('checked', false);
	
	if(regName == 'admin'){
		regNameChkMsg.html('사용할 수 없는 닉네임 입니다.');
		regNameChkMsg.addClass('font_no');
		
	} else {
		regNameChkMsg.html('멋진 닉네임이네요!');
		regNameChkMsg.removeClass('font_no');
		regNameChkMsg.addClass('font_yes');
		regNameChkBox.prop('checked', true);	
	}
});

$(document).on("focusin","#nickName",function(){
	$(this).val('');
	var regNameChkMsg = $('#nameChkMsg');
	var regNameChkBox = $('#nameChk');
	regNameChkMsg.removeClass('font_yes');
	regNameChkMsg.removeClass('font_no');
	regNameChkMsg.removeClass('display_block');
	regNameChkBox.prop('checked', false);
});
 

//로그인 완료버튼 사용시
function memberLoginBtn(){
	
	var memId = $('#memId').val();
	var memPw = $('#memPw').val();

	var member = {
		memId : memId,
		memPw : memPw
	};

	$.ajax({
		type : 'POST',
		url : rootUrl+ '/members/login/'+originJsessionId,
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		data : JSON.stringify(member),
		success : function(loginDone) {

			console.log(loginDone);

            jsessionId = loginDone.jsessionId;
			alert(jsessionId);
			
			memIdx = loginDone.memIdx;
			memId = loginDone.memId;
			memName = loginDone.memName;
			memPhoto = loginDone.memPhoto;
			memLoc = loginDone.memLoc;
			memEmailchk = loginDone.memEmailchk;

			// 로그인 실패
			if (memName == 'admin') {
				shakeModal();
				
			// 로그인 성공
			} else {

				var memInfoLogin = '<div class="mem-info-photo-div" style="background-color: white; float: left;">';
					memInfoLogin +='<img class="mem-info-photo" id="memInfoPhoto" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/'+memPhoto+'">';
					memInfoLogin +='</div>';	
					memInfoLogin +='<div class="mem-info-name" id="memInfoName">'+memName+' 님 환영합니다!</div>';
					memInfoLogin +='<div class="mem-info-loc" id="memInfoLoc"><img class="mem-info-loc-icon" id="memInfoLoc" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/image/icon/location.png">내위치 : '+memLoc+'</div>';
					
				var logoutBtn = '<a id="memLogoutBtn" style="float: right; margin: 5px 5px 0px 0px;" class="btn big-register" href="javascript:void(0);" onclick="memberLogoutBtn();">로그아웃</a>' 
				
				$('#memInfo').html(memInfoLogin);
				$('#memRegloginBtn').html(logoutBtn);
				$('#mypageMarket').css('display','block');
				
				if(memEmailchk != '' && memEmailchk == 'N') {
					$('#memMailState').css('display','block');
					$('#memMailState').text('미 인증 회원입니다 이메일 인증을 해주세요.');
				}	
				
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
}


//로그인 유효성 검사

$(document).on("focusout","#memId",function(){
	var re =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	var loginId =  $(this).val();
	var loginMsg = $('#idLoginMsg');
	loginMsg.addClass('display_block');

	if(loginId.length==0 || !re.test(loginId)){
		loginMsg.html('이메일 형식의 아이디를 입력해주세요.');
		loginMsg.addClass('font_no');
	} else {
		loginMsg.removeClass('display_block');
	}
	
});

$(document).on("focusin","#memId",function(){
	$(this).val('');
	var loginMsg = $('#idLoginMsg');
	loginMsg.removeClass('font_yes');
	loginMsg.removeClass('font_no');
	loginMsg.removeClass('display_block');
});

// 비밀번호 유효성 
$(document).on("focusout","#memPw",function(){
	var loginPw =  $(this).val();
	var loginPwMsg = $('#pwLoginMsg');
	loginPwMsg.addClass('display_block');
	
	if(loginPw.length < 4 || loginPw.length > 12 ){
		loginPwMsg.html('비밀번호는 4자 이상 12자 이하로 입력해주세요.');
		loginPwMsg.addClass('font_no');
	} else {
		loginPwMsg.removeClass('display_block');
	}
});

$(document).on("focusin","#memPw",function(){
	$(this).val('');
	var loginPwMsg = $('#pwLoginMsg');
	loginPwMsg.removeClass('font_yes');
	loginPwMsg.removeClass('font_no');
	loginPwMsg.removeClass('display_block');
});

//카카오 로그인

//SDK 초기화
Kakao.init('4d5c5170c5e04e72b1bbee5949951a83');

//SDK 초기화 상태 확인 문제시 확인필요함
console.log(Kakao.isInitialized());

function kakaoLogin(){
	
Kakao.Auth.login({
	scope:'profile, account_email, gender',
	success: function(authObj) {
		Kakao.API.request({
			url: '/v2/user/me',
			success: function(userKakao) {
				var kakaoInfo = userKakao.kakao_account;
				var kakaoNamePhoto = userKakao.kakao_account.profile;

				kMemId = kakaoInfo.email;
				kMemName = kakaoNamePhoto.nickname;
				kMemGender ='' 
						
				if(kakaoInfo.gender == 'male'){
					kMemGender = 'M';
				} else {
					kMemGender = 'F';
				}
					
					kMember = {
						memId: kMemId,
						memName: kMemName,
						memGender: kMemGender
					};
					
					$.ajax({
						type: 'GET',
						url: rootUrl + '/members/idcheck',
						data: {memId:kMemId},
						async: false,
						success : function(idChk){
							kIdChk = idChk;
						},
						error : function(request, status, error) {
							alert("code:" + request.status + "\n" + "message:"
									+ request.responseText + "\n" + "error:"
									+ error);
						}
					});
					
					// 아이디체크 Y == 가입이 가능한 아이디(중복없음)(가입시킴)
					if(kIdChk == 'Y'){
						
						$.ajax({
							type:'POST',
							url : rootUrl + '/members/kakao',
							contentType : 'application/json',
							data : JSON.stringify(kMember),
							async: false,
							success : function(kRegDone) {
					
								if (kRegDone == 'Y') {
									new swal("사용승인 성공!", "카카오로 다시 로그인해주세요!", "success");
									closeLoginModal();
									
								} else {
									new swal("이런!","문제가 발생했나봐요 다시 시도해주세요.", "error");
									closeLoginModal();
								}
							},
							error : function(request, status, error) {
								alert("code:" + request.status + "\n" + "message:"
										+ request.responseText + "\n" + "error:"
										+ error);
							}
							
						});
						
					// 아이디체크 != Y 가입이 불가능한 아이디(중복있음 - 로그인)	
					} else {
						
						$.ajax({
							type:'POST',
							url: rootUrl + '/members/kakaologin/' + originJsessionId,
							contentType:'application/json; charset=utf-8',
							dataType:'json',
							data:JSON.stringify(kMember),
							async: false,
							success: function(kLoginDone){
								
								memName = kLoginDone.memName;
								memIdx = kLoginDone.memIdx;
								memId = kLoginDone.memId;
								memPhoto = kLoginDone.memPhoto;
								
								var memInfoLogin = '<div class="mem-info-photo-div" style="background-color: white; float: left;">';
								memInfoLogin +='<img class="mem-info-photo" id="memInfoPhoto" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/'+memPhoto+'">';
								memInfoLogin +='</div>';	
								memInfoLogin +='<div class="mem-info-name" id="memInfoName">'+memName+' 님 환영합니다!</div>';
								memInfoLogin +='<div class="mem-info-loc" id="memInfoLoc">카카오 로그인 사용 중 입니다!</div>';
								
								var logoutBtn = '<a id="memLogoutBtn" style="float: right; margin: 5px 5px 0px 0px;" class="btn big-register" href="javascript:void(0);" onclick="memberLogoutBtn();">로그아웃</a>'
									
								//상단 Info html변경
								$('#memInfo').html(memInfoLogin);
								
								//마켓 영역 보이게하기
								$('#mypageMarket').css('display','block');
								
								//로그아웃 버튼으로 체인지
								$('#memRegloginBtn').html(logoutBtn);
								
								//로그인 완료후 모달 닫기
								closeLoginModal();
							},
							 error: function(request,status,error) {
					                alert("code:"+request.status +"\n" +
					                	  "message:"+request.responseText +"\n" +
					                      "error:" +error);
					         }
							
						}); //ajax end
					} // else end
					
				}
			});
		}
	});
}

// 네이버 로그인
function naverLogin(){
	
	$.ajax({
		type: 'GET',
		url: rootUrl + '/members/naver',
		async: false,
		dataType: 'text',
		success: function(naverRes) {
			location.href=naverRes;
		},
		error: function(){
			console.log("네이버로그인실패");
		}
	});

}

//로그아웃 (동적생성 버튼 클릭 + Swal Button : True False)

function memberLogoutBtn(){
	
	Swal.fire({
		title: '정말 로그아웃 하시겠어요?',
		icon: 'info',
		showCancelButton: true,
		confirmButtonText: '네!로그아웃 할게요.',
		cancelButtonText: '아니요. 더 머무를게요.',
	}).then((result) => {
		if(result.isConfirmed) {
		
			$.ajax({
				type : 'GET',
				url : rootUrl+'/members/logout',
				dataType: 'text',
				success : function(){
				
				sessionStorage.clear();
				location.reload();
				}
			});
		}
	});	
}
		
// 회원 정보 수정
$(document).on("click",".mem-change",function(){
	
	if(memIdx != 'null' && memIdx != ''){
	
	var memberUpdateHtml = "";
    memberUpdateHtml += '<div class="update-mem-content" id="updateMemContent">'
    memberUpdateHtml += '<h3 style="background-color: white; margin: 20px 0px 0px 20px">내 정보</h3>'
    memberUpdateHtml += '<hr class="mypage-hr">'
    memberUpdateHtml += '<div style="background-color: white; margin: 20px 0px 0px 20px" class="update-id" id="updateId">'
    memberUpdateHtml += 'ID(이메일) *아이디 변경은 불가능합니다.<br>'
    memberUpdateHtml += '<div style="background-color: white; margin: 15px 0px 0px 50px; font-weight: bold;" >현재 아이디 : '+ memId +'</div>'
    memberUpdateHtml += '</div>'
    memberUpdateHtml += '<hr class="mypage-hr">'
    memberUpdateHtml += '<div style="background-color: white;" class="update-name" id="updateName">'
    memberUpdateHtml += '<h3 style="background-color: white; margin: 20px 0px 0px 20px">닉네임 변경</h3>'
    memberUpdateHtml += '<div style="background-color: white; text-align: center; font-weight: bold;">현재 닉네임 : '+ memName +'</div>'
    memberUpdateHtml += '<div style="background-color: white; text-align: center;">새로운 닉네임</div> <input style="margin: 10px 90px; background-color: white;" id="memNewName" type="text" name="memNewName">'
    /* memberUpdateHtml += '<input id="memNewNameBtn" type="button" class="memNewNameBtn" value="변경하기">' */
    memberUpdateHtml += '</div>'
    memberUpdateHtml += '<hr class="mypage-hr">'
    memberUpdateHtml += '<div class="update-pw" id="updatePw">'
    memberUpdateHtml += '<h3 style="background-color: white; margin: 20px 0px 0px 20px">비밀번호 변경</h3>'
    memberUpdateHtml += '<form style="background-color: white; margin-left: 20px;" method="post">'
    memberUpdateHtml += '기존 비밀번호<input style="background-color: white" type="password" id="memOldPw" class="mem-old-pw"><br>'
    memberUpdateHtml += '새 비밀번호<input style="margin: 10px 0px 10px 13px; background-color: white;" type="password" id="memNewPw" class="mem-new-pw"><br>'
    memberUpdateHtml += '비밀번호 확인<input style="background-color: white" type="password" id="memNewPwChk" class="mem-new-pw-chk">'
    memberUpdateHtml += '</form>'
    memberUpdateHtml += '</div>'
    memberUpdateHtml += '</div>'
    
    $('.modal-body-mypage').html(memberUpdateHtml);
    $('.nologin-msg').css('display', 'none');
    
    $(document).on("click","#modalDoneBtn",function(){
    	
        var updateMember = {
            memIdx: memIdx,
            memName: $('#memNewName').val(),
            memPw: $('#memNewPw').val()
        };
        
        	memName = $('#memNewName').val();
        	
        $.ajax({
            type: 'PUT',
            url: rootUrl + '/members/'+memIdx,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(updateMember),
            success: function(updateDone) {
                
                memName = updateDone.memName;
                
                if (updateDone != 'null' && updateDone != '') {
                    new swal("정보 수정 완료!", "멋진 닉네임이에요.", "success");
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
        }).done(function(){
        	var memInfoLogin = '<div class="mem-info-photo-div" style="background-color: white; float: left;">';
			memInfoLogin +='<img class="mem-info-photo" id="memInfoPhoto" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/'+memPhoto+'">';
			memInfoLogin +='</div>';	
			memInfoLogin +='<div class="mem-info-name" id="memInfoName">'+memName+' 님 환영합니다!</div>';
			memInfoLogin +='<div class="mem-info-loc" id="memInfoLoc"><img class="mem-info-loc-icon" id="memInfoLoc" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/image/icon/location.png">내위치 : '+memLoc+'</div>';
			
			$('#memInfo').html(memInfoLogin);	
        });
    });
    
	} else {
	
	}
	
 
});


//회원 정보 삭제 

$(document).on("click",".mem-delete",function(){

	var memberDeleteHtml = "";
	memberDeleteHtml += '<div class="delete-id" id="deleteId">';
	memberDeleteHtml += '<div class="delete-id" id="deleteId">';
	memberDeleteHtml += '<h1>회원 탈퇴</h1>';
	memberDeleteHtml += '<div style="background-color: white;" class="delete-info" id="deleteInfo">';
	memberDeleteHtml += '<img style="margin: 10px 0px 10px 140px; border-radius: 40px;" width="50" height="50" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/'+memPhoto+'">';
	memberDeleteHtml += '<h2 style="text-align: center; background-color: white;">'+memName+'님</h2>';
	memberDeleteHtml += '정말로 탈퇴하시겠어요?<br>탈퇴 후 동일한 아이디로 1개월간 재가입이 제한됩니다.';
	memberDeleteHtml += '</div>';
	memberDeleteHtml += '<hr class="mypage-hr">';
	memberDeleteHtml += '<form style="background-color: white;" method="post">';
	memberDeleteHtml += '정말 탈퇴하시겠어요?<input type="checkbox" id="deleteChk1" class="deleteChk"><br>';
	memberDeleteHtml += '탈퇴 시 모든 정보는 사라집니다.<input type="checkbox" id="deleteChk2" class="deleteChk"><br>';
	memberDeleteHtml += '모든 내용을 이해했고 탈퇴에 동의합니다.<input type="checkbox" id="deleteChk3" class="deleteChk"><br>';
	memberDeleteHtml += '</form>';
	memberDeleteHtml += '</div>';
	
	if(memIdx != 'null' && memIdx != ''){
	
	$('.modal-body-mypage').html(memberDeleteHtml);
	$('.nologin-msg').css('display', 'none');
	
	}
	
	
	$(document).on("click","#modalDoneBtn",function(){
	
		if($('#deleteChk1').is(":checked") && $('#deleteChk2').is(":checked") && $('#deleteChk3').is(":checked")){
		
			$.ajax({
				type : 'DELETE',
				url : rootUrl + '/members/'+ memIdx,
				success : function(deleteDone) {
					
					console.log(deleteDone);
					
					if (deleteDone == 1) {
						new swal("회원 탈퇴 완료", "다시 돌아오실꺼죠..? 2초뒤 메인으로 이동합니다.", "info");
						
						sessionStorage.clear();
						setTimeout("location.reload()", 2000);
						
					} else {
						new swal("오류 발생!", "다시 시도해주세요!", "error");
					}
				},
				error: function(request,status,error) {
		            alert("code:"+request.status +"\n" +
		            	  "message:"+request.responseText +"\n" +
		                  "error:" +error);
		        },
	
			});
		} else {
			new swal("모든 항목에 체크해주세요!", "모든 항목에 동의해야 탈퇴하실 수 있습니다.", "error");
		}
	
	});
});

$(document).on("click",".mem-photochange",function(){

	var memberPhotoHtml = "";
	memberPhotoHtml += '<div class="mem-photo-upload-div" id="memPhotoUploadDiv">';
	memberPhotoHtml += '<h3 style="background-color: white; margin: 10px;">프로필 사진 등록 & 변경 </h3>';
	memberPhotoHtml += '<div class="basic-photo" id="basicPhoto">';
	memberPhotoHtml += '<table class="basic-photo-table" id="basicPhotoTable">';
	memberPhotoHtml += '<tr class="photo-tr">';
	memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/1.png"></th>';
	memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/2.png"></th>';
	memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/3.png"></th>';
	memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/4.png"></th>';
	memberPhotoHtml += '</tr>';
	memberPhotoHtml += '<tr class="photo-tr">';
	memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="1.png"></th>';
	memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="2.png"></th>';
	memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="3.png"></th>';
	memberPhotoHtml += '<th class="photo-th"><input type="radio" name="defaultPhoto" value="4.png"></th>';
	memberPhotoHtml += '</tr>';
	memberPhotoHtml += '<tr class="photo-tr">';
	memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/5.png"></th>';
	memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/6.png"></th>';
	memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/7.png"></th>';
	memberPhotoHtml += '<th class="photo-th"><img class="default-change-photo" width="81" height="90" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/8.png"></th>';
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
	memberPhotoHtml += '<img class="mem-now-photo" width="50" height="50" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/'+memPhoto+'">';
	memberPhotoHtml += '<div style="margin: 3px 0px 3px 115px; background-color: white;">현재 프로필 사진</div>'
	
	//(사진)업로드 폼
	memberPhotoHtml += '<form style="background-color: white;" id="uploadForm" method="post" enctype="multipart/form-data">';
	memberPhotoHtml += '<input style="background-color: white; margin: 10px 0px 5px 25px;" type="hidden" id="uploadPhotoName" name="uploadPhotoName" value="'+memIdx+'.png">';
	memberPhotoHtml += '<input style="background-color: white; margin: 10px 0px 10px 80px; width: 240px;" type="file" id="uploadPhoto" name="uploadPhoto" class="mem-upload-photo" value="사진 업로드">';
	memberPhotoHtml += '</form>';
	memberPhotoHtml += '<input style="margin-left: 100px;" id=uploadBtn class="btn btn-info" type="button" value="업로드 파일로 변경!"><br>'; 
	memberPhotoHtml += '        파일 이름은 영문 또는 숫자로 입력해주세요.<br>        용량은 *2MB까지 업로드가 가능합니다.';
	memberPhotoHtml += '</div>';
	
	
	if(memIdx != 'null' && memIdx != ''){
	
	$('.modal-body-mypage').html(memberPhotoHtml);
	$('.nologin-msg').css('display', 'none');
	
	}
	
	
	// 프로필사진 업로드 버튼
	$(document).on('click', '#uploadBtn', function(e){
		e.preventDefault();
		var uploadPhotoName = $("#uploadPhotoName").val();
		
		file_ajax_submit(uploadPhotoName);
		
		console.log(uploadPhotoName);
	});
	
	// 업로드시 실행될 function
	function file_ajax_submit(uploadPhotoName){
		var form = $('#uploadForm')[0];
		var data = new FormData(form);
		
		uploadPhotoName = $("#uploadPhotoName").val();
		console.log(uploadPhotoName);
		
		$('#uploadBtn').prop('disabled', true);
		
		$.ajax({
			type: 'POST',
			url: rootUrl + '/members/upload/'+memIdx,
			enctype: 'multipart/form-data',
			data: data,
			async: false,
			processData: false,
			contentType: false,
			cache: false,
			success: function(data) {
				console.log("success:", data);	
				$('#uploadBtn').prop('disabled', false);
			},
			error: function(e) {
				console.log("error:", e);
				$('#uploadBtn').prop('disabled', false);
			}
		}).done(function(){
		
			var memInfoLogin = '<div class="mem-info-photo-div" style="background-color: white; float: left;">';
			memInfoLogin +='<img class="mem-info-photo" id="memInfoPhoto" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/'+uploadPhotoName+'">';
			memInfoLogin +='</div>';	
			memInfoLogin +='<div class="mem-info-name" id="memInfoName">'+memName+' 님 환영합니다!</div>';
			memInfoLogin +='<div class="mem-info-loc" id="memInfoLoc"><img class="mem-info-loc-icon" id="memInfoLoc" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/image/icon/location.png">내위치 : '+memLoc+'</div>';
			
			$('#memInfo').html(memInfoLogin);
		});
	}
	
	// 기본제공 사진으로 변경
	$(document).on("click","#uploadBtnBasic",function(){
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
			url: rootUrl + '/members/edit/photo',
			contentType: 'application/json',
		    dataType: 'json',
		    data: JSON.stringify(uploadMember),
			success : function(photoDone) {
						
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
		            },
		            
		}).done (function(){
			
			var memInfoLogin = '<div class="mem-info-photo-div" style="background-color: white; float: left;">';
			memInfoLogin +='<img class="mem-info-photo" id="memInfoPhoto" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/'+uploadPhoto+'">';
			memInfoLogin +='</div>';	
			memInfoLogin +='<div class="mem-info-name" id="memInfoName">'+memName+' 님 환영합니다!</div>';
			memInfoLogin +='<div class="mem-info-loc" id="memInfoLoc"><img class="mem-info-loc-icon" id="memInfoLoc" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/image/icon/location.png">내위치 : '+memLoc+'</div>';
			
			$('#memInfo').html(memInfoLogin);	
			});
	});   
	
});	//프로필 사진 변경 end		


//아이디 비밀번호 찾기
$(document).on('click','.mem-forgot',function(){
	
	var memForgot = '';
	memForgot +='<div class="mem-id-pw-find-div" style="margin-top: 150px;">';
	memForgot +='<div class="mem-id-find-div">	';
	memForgot +='<div class="mem-id-find-header">';
	memForgot +='<h3 id="memFindTitle">아이디 찾기</h3>';
	memForgot +='<hr class="mem-find-hr">';
	memForgot +='</div>';
	memForgot +='<div class="mem-id-find-body">';
	memForgot +='<div class="mem-id-find-box">';
	memForgot +='<div class="mem-id-find-content">';
	memForgot +='<span>가입시 입력한 <strong>이름(닉네임)</strong>을 입력해주세요!</span>';
	memForgot +='<div>';
	memForgot +='<input id="memIdFindInput" type="text">';
	memForgot +='</div>';
	memForgot +='<div>';
	memForgot +='<button id="memIdFindBtn" type="button" class="btn btn-info">아이디 찾기!</button>';
	memForgot +='</div>';
	memForgot +='<div>';
	memForgot +='<div id="idFindResult"></div>';
	memForgot +='</div>';
	memForgot +='</div>';
	memForgot +='</div>';
	memForgot +='</div>';
	memForgot +='</div>';
	memForgot +='<div class="mem-pw-find-div">';
	memForgot +='<div class="mem-pw-find-header">';
	memForgot +='<h3 id="memFindTitle">비밀번호 찾기</h3>';
	memForgot +='<hr class="mem-find-hr">';
	memForgot +='</div>';
	memForgot +='<div class="mem-pw-find-body">';
	memForgot +='<div class="mem-pw-find-box">';
	memForgot +='<div class="mem-pw-find-content">';
	memForgot +='<span>가입시 입력한 <strong>ID(이메일)</strong>을 입력해주세요!</span>';
	memForgot +='<div>';
	memForgot +='<input id="memPwFindInput" type="text">';
	memForgot +='</div>';
	memForgot +='<div>';
	memForgot +='<button id="memPwFindBtn" type="button" class="btn btn-info">비밀번호 찾기!</button>';
	memForgot +='</div>';
	memForgot +='<div>';
	memForgot +='<div id="pwFindResult"></div>';
	memForgot +='</div>';
	memForgot +='</div>';
	memForgot +='</div>';
	memForgot +='</div>';
	memForgot +='</div>';
	memForgot +='</div>';

	$('.content').html(memForgot);

//아이디 찾기	
$(document).on('click','#memIdFindBtn',function(){
	
	var idFindName = $('#memIdFindInput').val();
	
	console.log(idFindName);
	
	$.ajax({
		type: 'GET',
		url: rootUrl + '/members/idfind',
		data: {memName:idFindName},
		success: function(findId){
			
			console.log(findId);
			
			if(findId === ""){
				
				$('#idFindResult').text('회원님의 ID를 찾을 수 없습니다. 다시 확인해주세요.');
				
			} else {
				
				var viewIdResult = '';
				viewIdResult += '회원님의 아이디는<br> <strong>'+findId+'</strong> 입니다.';
				
				$('#idFindResult').html(viewIdResult);	
			}	
		}
	});
});

//비밀번호 찾기
$(document).on('click','#memPwFindBtn',function(){
	
	var pwFindId = $('#memPwFindInput').val();
	
	console.log(pwFindId);
	$.ajax({
		type: 'POST',
		url: rootUrl + '/members/pwfind',
		data: {memId:pwFindId},
		success: function(pwFindDone){
			
			if(pwFindDone == 1) {				
				$('#pwFindResult').text('등록된 이메일로 임시비밀번호를 보내드렸습니다.');
				
			} else {
				$('#pwFindResult').text('존재하지 않거나 없는 아이디입니다 다시 확인해주세요.');
			}
		},
		beforeSend: function(){
			var rePwBeforeSend = '<img width="50" height="50" src="http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member/fileupload/member/ajaxloading.gif">';
			
			$('#pwFindResult').html(rePwBeforeSend);
		}
		
	});
	
});

});




	//모달창 제목 변경 
	$(document).on('show.bs.modal', '#mypageModal', function(event){
		var mypageDiv = $(event.relatedTarget) // 버튼 누를 시 요소 타겟
		var recipient = mypageDiv.data('whatever') //whatever-data 요소 추출
		
		var modal = $(this) // 열린 모달 창
		modal.find('.modal-title').text(recipient) //타이틀 recipient로 변경
	});


// 로그인 회원가입 불러오기
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Weather Were 회원가입');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}

function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Weather Were 로그인');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("아이디와 비밀번호를 다시 확인해주세요.");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}


$(document).on('click','.mem-like',function(){
	console.log(memIdx);
	myLikeList(1);
}); 
