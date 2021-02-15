<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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

    .mypage-header{
        background-color: white;
        border: 7px solid #f5f5f5;
        border-radius: 15px;
        color: white;
    }
    
    .mypage-header>div{
    	background-color: white;
    }
    
    .mypage-body-1{
        background-color: white;
        border: 7px solid #f5f5f5;
        border-radius: 15px;
        padding: 10px
    }
    
     .mypage-body-1>div{
    	background-color: white;
    }
    
     .mypage-body-2{
        background-color: white;
        border: 7px solid #f5f5f5;
        border-radius: 15px;
        padding: 10px
    }
    
       .mypage-body-2>div{
    	background-color: white;
    }
    
     .mypage-body-3{
        background-color: white;
        border: 7px solid #f5f5f5;
        border-radius: 15px;
        padding: 10px
    }
    
       .mypage-body-3>div{
    	background-color: white;
    }
    
    .mypage-title{
        text-align: center;
        border: 1px solid gray;
        border-radius: 5px;
        width: 95%;
        margin: 0 auto;  
        margin-bottom: 10px;
    }
    
    .mem-info{
        margin: 15px;
    }
    .mem-info>div{
    	background-color: white;
    }
    
    .mem-info-photo{
    	width: 50px;
    	height: 50px;
        float: left;
    }
    
    

	
</style>


<body bgcolor="#f5f5f5">

	<%@ include file="/WEB-INF/views/include/header.jsp"%>

	<div class="memContents">

		<div class="memContent">
	
				<!-- 회원가입 로그인 div -->
				<div class="container">
					<div class="row">
						<div class="col-sm-4"></div>
						<div class="col-sm-4">
						
						<!-- 로그인버튼 -->
							<a class="btn big-login" data-toggle="modal"
								href="javascript:void(0)" onclick="openLoginModal();">로그인</a> 
								
						<!-- 회원 가입버튼 -->		
							<a class="btn big-register" data-toggle="modal"
								href="javascript:void(0)" onclick="openRegisterModal();">회원 가입</a>
						</div>
						<div class="col-sm-4"></div>
					</div>
	
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
	                                    <a class="circle github" href="#">
	                                        <i class="fa fa-github fa-fw"></i>
	                                    </a>
	                                    <a id="google_login" class="circle google" href="#">
	                                        <i class="fa fa-google-plus fa-fw"></i>
	                                    </a>
	                                    <a id="facebook_login" class="circle facebook" href="#">
	                                        <i class="fa fa-facebook fa-fw"></i>
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
	                                    <input id="memId" class="form-control" type="text" placeholder="Email (ID로 사용됩니다.)" name="memId">
	                                    <input id="memPw" class="form-control" type="password" placeholder="Password" name="memPw">
	                                    <input class="btn btn-default btn-login" type="button" value="Login" name="loginButton" id="loginButton">
	                                    </form>
	                                </div>
	                                
	                             </div>
	                        </div>
	                        
	                        
	                        <div class="box">
	                        
	                        	<!-- 회원가입 폼 --> 
	                            <div class="registerBox" style="display:none;">
	                             <div class="form">
	                                <form method="post" html="{:multipart=>true}" data-remote="true" action="" accept-charset="UTF-8">
	                                <input id="memIdReg" class="form-control" type="text" placeholder="Email" name="memIdReg">
	                                <input id="memPwReg" class="form-control" type="password" placeholder="비밀번호(4자 이상 12자 이하)" name="memPwReg">
	                                <input id="password_confirmation" class="form-control" type="password" placeholder="비밀번호 확인" name="password_confirmation">
	                                <input id="nickName" class="form-control" type="text" placeholder="이름(닉네임)" name="nickName">
	                                <select id="genderSelect" class="form-control-select" name="memGender">
	                                	<option value="">성별</option>
	                                	<option value="M">남성</option>
	                                	<option value="F">여성</option>
	                                	<option value="N">선택하지 않음</option>
	                                </select>
	                                <input class="btn btn-default btn-register" type="button" value="가입 하기" name="commit" id="commit">
	                                </form>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    
	                    <!-- 모달 하단 -->
	                    <div class="modal-footer">
	                        <div class="forgot login-footer">
	                            <span>계정이 없으신가요?
	                                 <a href="javascript: showRegisterForm();">회원가입 하러가기</a>
	                            </span>
	                        </div>
	                        
	                        <div class="forgot register-footer" style="display:none">
	                             <span>이미 계정을 가지고 계신가요?</span>
	                             <a href="javascript: showLoginForm();">로그인 하러가기</a>
	                        </div>
	                        
	                    </div>
	    		      </div>
			      </div>
			  </div>
	    </div>
	 		
	 		 <div class="mypage-menu">
           
           
            <div class="mypage-header">
	 		
				<div class="mem-info" id="mem-info">
				    <div class="mem-info-name">마이페이지</div>
				    <div class="mem-info-loc">마이페이지 기능을 이용하시려면 먼저 로그인 해주세요.</div>
				</div>
			
			   
				<div class="mypage-title">
				내가 쓴글
				</div>
				
			</div>
			
			<div class="mypage-body-1">
			
				<div class="mem-change">
				내 정보 변경
				${loginInfo}
				</div>
				
				<hr class="mypage-hr">
				
				<div class="mem-locchange">
				내 위치 변경
				${msg}
				</div>
				
				<hr class="mypage-hr">
				
				<div class="mem-photochange">
				프로필 사진 등록 변경
				</div>
				
			</div>
			
			<div class="mypage-body-2">
			
				<div class="mem-like">
				좋아요 한 게시물
				</div>
				
				<hr class="mypage-hr">
                           
				<div class="mem-bookmark">
				북마크 한 게시물
				</div>

			</div>
			
			<div class="mypage-body-3">
			
				<div class="mem-notice">
				공지사항 
				</div>
				
				<hr class="mypage-hr">
				
				<div class="mem-delete">
				회원 탈퇴
				</div>
				
			</div>
    </div>
	 	
			
		</div>
		
	</div>

<!-- 마이페이지 접속시 로그인창 팝업 -->
<script type="text/javascript">
    $(document).ready(function(){
        openLoginModal();
    });
</script>

<script>
 
    	$('#commit').click(function(e){
    		
    		var memId = $('#memIdReg').val();
    		var memPw = $('#memPwReg').val();
    		var memName = $('#nickName').val();
    		var memGender = $('#genderSelect option:selected').val();
    		
    		var member = {
    				memId: memId,
    				memPw: memPw,
    				memName: memName,
    				memGender: memGender
    		};
    		
    	
    		$.ajax({
    			type: 'POST',
    			url: '/members',
    			contentType: 'application/json',
    			/* dataType: 'json', */
    			data: JSON.stringify(member),
    			async : false,
    			success: function(regDone) {
    				console.log(regDone);
    				if(regDone == 'Y') {
    					alert('회원가입 성공');
    					
    				} else {
    					alert('오류가 발생했습니다 다시 시도하세요.');
    				}
    			},
    			error:function(request,status,error){
    		        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    		       }

    		
    			
    	    });

    			return false;
    		});
 </script>
  
 <script>
 function closeLoginModal(){
	 
		/* $('#loginModal').fadeOut('fast',function(){
			$('.modal-backdrop').fadeOut('fast');
		}); */
		
		$('#loginModal').modal("hide");
			
 }
 
 
    	$('#loginButton').click(function(e){
				
    	   	e.preventDefault();
    		   
    		   var memId = $('#memId').val();
    		   var memPw = $('#memPw').val();
    		   
    
    		   var member = {
    		   		memId: memId,
    		   		memPw: memPw
    		   };
    		   
    			
    		 $.ajax({
    		   	type: 'POST',
    		   	url: '/members/login',
    		   	contentType: 'application/json; charset=utf-8',
    		   	dataType: 'json',
    		   	data: JSON.stringify(member),
    		   	success: function(loginDone){
    		   		
    		   	 	console.log(loginDone);
    		   	 	
    		 	var memPhoto = loginDone.memPhoto;
	   			var memName = loginDone.memName;
	   			var memIdx = loginDone.memIdx;
	   			
    		   		 if(memName == 'admin'){
    		   			shakeModal();
    		   			
    		   	 	} else {
    		   	 	console.log(memPhoto);
		   			console.log(memName);
		   			console.log(memIdx);
		   			
		   				var loginHtml = "";
		   				loginHtml += '<div class="mem-info">';
		   				loginHtml += '<img class="mem-info-photo" src="<c:url value="/fileupload/member/'+memPhoto+'"/>">';
		   				loginHtml += '<div class="mem-info-name">'+memName+'</div>';
		   				loginHtml += '<div class="mem-info-loc">'+memIdx+' 종로구</div>';
		   				loginHtml += '</div>';
		   					
		   			// 마이페이지 상단 사진, 아이디, 지역 
		   			$('#mem-info').html(loginHtml);
		   			closeLoginModal();
    		   	    }
    		   	},
    		   	error:function(request,status,error){
    		        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    		       }

    
  
    		 });
    		   
    		 
    		})
    		
    		
    		
  	
</script>

<script>

</script>

	<%@ include file="/WEB-INF/views/include/footer.jsp"%>
</body>
</html>