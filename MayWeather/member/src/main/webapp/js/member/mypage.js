	
	// 회원가입
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
					closeLoginModal();
					
				} else {
					alert('오류가 발생했습니다 다시 시도하세요.');
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
	/* return false; */
	});
	
	//회원가입 유효성 검사
	
	/* 아이디 유효성 */
	$('#memIdReg').focusout(function(){
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
				url : '/members/idcheck',
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
	
	$('#memIdReg').focusin(function(){
		$(this).val('');
		var regMsg = $('#idChkMsg');
		var regChkBox = $('#idChk');
		regMsg.removeClass('font_yes');
		regMsg.removeClass('font_no');
		regMsg.removeClass('display_block');
		regChkBox.prop('checked', false);
	});
	
	
	/* 비밀번호 유효성 */
	$('#memPwReg').focusout(function(){
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
	
	$('#memPwReg').focusin(function(){
		$(this).val('');
		var regPwMsg = $('#pwChkMsg');
		var regPwChkBox = $('#pwChk');
		regPwMsg.removeClass('font_yes');
		regPwMsg.removeClass('font_no');
		regPwMsg.removeClass('display_block');
		regPwChkBox.prop('checked', false);
	});
	
	
	/* 비밀번호 확인 재입력 유효성 */
	$('#memPwRegChk').focusout(function(){
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
	
	$('#memPwRegChk').focusin(function(){
		$(this).val('');
		var regPwChkMsg = $('#pwChkChkMsg');
		var regPwChkChkBox = $('#pwChkChk');
		regPwChkMsg.removeClass('font_yes');
		regPwChkMsg.removeClass('font_no');
		regPwChkMsg.removeClass('display_block');
		regPwChkChkBox.prop('checked', false);
	});
	
	// 회원 정보 수정
	$('.mem-change').click(function() {
		
	    var memberUpdateHtml = "";
	    memberUpdateHtml += '<div class="update-mem-content" id="updateMemContent">'
	    memberUpdateHtml += '<h3 style="background-color: white; margin: 20px 0px 0px 20px">내 정보</h3>'
	    memberUpdateHtml += '<hr class="mypage-hr">'
	    memberUpdateHtml += '<div style="background-color: white; margin: 20px 0px 0px 20px" class="update-id" id="updateId">'
	    memberUpdateHtml += 'ID(이메일) *아이디 변경은 불가능합니다.<br>'
	    memberUpdateHtml += '<div style="background-color: white; margin: 15px 0px 0px 50px; font-weight: bold;" >현재 아이디 : '+memEmailId+'</div>'
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
	

	
	// 모달 닫기
	function closeLoginModal() {
	$('#loginModal').modal("hide");
	}
	
	// 비회원 로그인시 기본값 a href 이벤트 설정
	function hreflogin() {
		$('#mypageModal').modal("hide");
		$('#loginModal').modal("show");
	}
	
	
	//로그인 % 로그인 모달 컨트롤
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
					var memInfoLogin = '<img class="mem-info-photo" id="memInfoPhoto" src="http://localhost:8080/fileupload/member/'+memPhoto+'">';
						memInfoLogin += '<span class="mem-info-name" id="memInfoName">'+memName+' 님 환영합니다!</span>';
						memInfoLogin += '<span class="mem-info-loc" id="memInfoLoc">내위치 : '+memLoc+'</span>';
						
					var logoutBtn = '<a id="memLogoutBtn" style="float: right; margin: 5px 5px 0px 0px;" class="btn big-register" href="#">로그아웃</a>' 
					
					$('#memInfo').html(memInfoLogin);
					$('#memRegloginBtn').html(logoutBtn);
					
					// 메일 인증여부 출력(미 인증시에만 출력됨)
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

	// 로그인 유효성 검사
	$('#memId').focusout(function(){
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
	
	$('#memId').focusin(function(){
		$(this).val('');
		var loginMsg = $('#idLoginMsg');
		loginMsg.removeClass('font_yes');
		loginMsg.removeClass('font_no');
		loginMsg.removeClass('display_block');
	});
	
	// 비밀번호 유효성 
	$('#memPw').focusout(function(){
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
	
	$('#memPw').focusin(function(){
		$(this).val('');
		var loginPwMsg = $('#pwLoginMsg');
		loginPwMsg.removeClass('font_yes');
		loginPwMsg.removeClass('font_no');
		loginPwMsg.removeClass('display_block');
	});
	


	//로그아웃 (동적생성 버튼 클릭 방법)
	$(document).on('click', '#memLogoutBtn', function(){
		
		$.ajax({
			type : 'GET',
			url : '/members/logout',
			dataType: 'text',
			success : function(logout){
				
				console.log(logout);
				var reallogout = confirm('정말 로그아웃 하시겠습니까?')
				if(reallogout == true){
					sessionStorage.clear();
					location.reload();
				} else {
					return;
				}	
			},
			error : function(request, status, error) {
				alert("code:" + request.status+ "\n" +
					  "message:" + request.responseText	+ "\n" + 
					  "error:" + error);
			}
		});
	});
	
	

	//모달 타이틀 컨트롤
	$('#mypageModal').on('show.bs.modal',function(event) {
		var mypageDiv = $(event.relatedTarget) // 버튼 누를 시 요소 타겟
		var recipient = mypageDiv.data('whatever') //whatever-data 요소 추출
		
		var modal = $(this) // 열린 모달 창
		modal.find('.modal-title').text(recipient) //타이틀 recipient로 변경
		
	});

	
	//회원 정보 삭제 
	$('.mem-delete').click(function() {

	var memberDeleteHtml = "";
	memberDeleteHtml += '<div class="delete-id" id="deleteId">';
	memberDeleteHtml += '<h1>회원 탈퇴</h1>';
	memberDeleteHtml += '<div style="background-color: white;" class="delete-info" id="deleteInfo">';
	memberDeleteHtml += '<img style="margin: 10px 0px 10px 140px; border-radius: 40px;" width="50" height="50" src="http://localhost:8080/fileupload/member/'+memPhoto+'">';
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
