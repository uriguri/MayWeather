

	// SDK 초기화 ' 키값  '
	Kakao.init('4d5c5170c5e04e72b1bbee5949951a83');
	// SDK 초기화 상태 확인
	console.log(Kakao.isInitialized());
	
	function kakaoLogin(){
		
		Kakao.Auth.login({
			scope:'profile, account_email, gender',
			success: function(authObj) {
				console.log(authObj);
				Kakao.API.request({
					url: '/v2/user/me',
					success: res => {
						const kakao_account = res.kakao_account;
						console.log(kakao_account);
					}
					
				});
			}
		});
	}
