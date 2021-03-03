<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">  -->

<title>+WEATHER WEAR+</title>

<!-- 부트스트랩 & 제이쿼리 -->
<%@ include file="/WEB-INF/views/include/basicset.jsp"%>

<!-- 카카오로그인  -->
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

<!-- 기본 CSS파일 -->
<link rel="styleSheet" href="<c:url value="/css/default.css"/>">

<!-- MARKET CSS파일 -->
<link rel="styleSheet" href="<c:url value="/css/market.css"/>">

<!-- OOTD JS파일 -->
<script src="<c:url value="/js/ootd.js"/>"></script>
<script src="<c:url value="/js/croppers.js"/>"></script>

<!-- 메인 CSS -->
<link rel="styleSheet" href="<c:url value="/css/main.css"/>">
<link rel="styleSheet" href="<c:url value="/css/weather.css"/>">
<link rel="styleSheet" href="<c:url value="/css/guestbook.css"/>">

<!-- 클로젯 CSS --> 
<link rel="styleSheet" href="<c:url value="/css/closet.css"/>">

<!-- 마이페이지 CSS -->
<link rel="styleSheet" href="<c:url value="/css/member/login-register.css"/>"/>
<link rel="styleSheet" href="<c:url value="/css/member/bootstrap.css"/>"/>
<link rel="styleSheet" href="<c:url value="/css/member/mypage.css"/>"/>

<!-- alert 창 변경 sweetalert -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<!-- redis loginInfo -->
<script type="text/javascript">

var originJsessionId = '${cookie.JSESSIONID.value}';
var jsessionId = '${sessionScope.jsessionId}';

var memIdx = '${sessionScope.memIdx}';
var memName = '${sessionScope.memName}';
var memId = '${sessionScope.memId}'; 
var memLoc = '${sessionScope.memLoc}';
var memGender = '${sessionScope.memGender}';
var memPhoto = '${sessionScope.memPhoto}';
var memEmailchk = '${sessionScope.memEmailchk}';

console.log(originJsessionId);
console.log(jsessionId);
console.log(memIdx);
console.log(memName);
console.log(memId);
console.log(memLoc);
console.log(memGender);
console.log(memPhoto);
console.log(memEmailchk);

</script>

</head>

<body class="bg_color">

<!-- 상단 고정바 -->
<%@ include file="/WEB-INF/views/include/header.jsp"%>

<div class="memContents">

    <div class="memContent">

        <div class="content">
        
        	<!-- 메인 wrap -->
				<div class="content_wrap">
					
					<!-- 메인 -->
					<div class="mainForm" id="mainForm"></div>
					
					<!-- 방명록 버튼 -->
					<div class="moveToGb" id="moveToGb" style="display: none;"></div>
					
					<!-- 방명록 리스트 -->
		    		<div class="gblistForm" id="gblistForm" style="display: none;"></div>
	
					<!-- 방명록 등록 (모달 창) -->
			    	<form id="gbregForm">	
			    		<div class="regModal_wrapper" style="display: none;">
			    			<div class="regModal">
			    			
			    				<div class="regModal_header">
		                             <div class="regModal_back">
		                                 <button type="button" class="reg_modal_close_btn" onclick="closeRegModal()" ><img width="20" src="https://maymayweather.ml/main/image/main/back.png"></button>
		                             </div>
		                             <div class="regModal_title">방명록 남기기</div>
		                         </div>
			    					
			    				<div class="regModal_body"></div>
			    				
			    				<div class="regModal_footer">
		                           <button type="button" id="reg_submit_btn" onclick="regGuestbook()">보내기</button>
		                       </div>
		                       
			    			</div>
			    		</div>
			    	</form>  
			    	
			    	<!-- 방명록 수정 (모달 창) -->
			    	<form id="gbUpdateForm">	
			    		<div class="updateModal_wrapper" style="display: none;">
			    			<div class="updateModal">
			    			
			    				<div class="regModal_header">
		                             <div class="regModal_back">
		                                 <button type="button" class="reg_modal_close_btn" onclick="closeUpdateModal()"><img width="20" src="https://maymayweather.ml/main/image/main/back.png"></button>
		                             </div>
		                             <div class="regModal_title">방명록 수정하기</div>
		                         </div>
			    					
			    				<div class="updateModal_body"></div>
			    				
			    				<div class="regModal_footer">
		                           <button type="button" id="reg_submit_btn" onclick="updateGuestbook()">수정하기</button>
		                       </div>
		                       
			    			</div>
			    		</div>
			    	</form>  
			    	
			    	<!-- 방명록 삭제 (모달 창) -->
			    	<form id="gbDeleteForm">	
			    		<div class="deleteModal_wrapper" style="display: none;">
			    			<div class="deleteModal">
			    			
			    				<div class="regModal_header">
		                             <div class="regModal_back">
		                                 <button type="button" class="reg_modal_close_btn" onclick="closeDeleteModal()"><img width="20" src="https://maymayweather.ml/main/image/main/back.png"></button>
		                             </div>
		                             <div class="regModal_title">방명록 삭제하기</div>
		                         </div>
			    					
			    				<div class="deleteModal_body"></div>
			    				
			    				<div class="regModal_footer">
		                           <button type="button" id="reg_submit_btn" onclick="deleteGuestbook()">삭제하기</button>
		                       </div>
		                       
			    			</div>
			    		</div>
			    	</form> 
					
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






<!-- 마이페이지 JS -->
<script src="<c:url value="/js/member/mypage.js"/>"></script>
<script src="<c:url value="/js/member/bootstrap.js"/>" type="text/javascript"></script>

<!-- 마켓 JS파일 -->
<script src="<c:url value="/js/market.js"/>"></script>

<!-- 메인 JS -->
<script type="text/javascript" src="<c:url value="/js/location.js"/>" charset="UTF-8"></script> 
<script type="text/javascript" src="<c:url value="/js/guestbook.js"/>" charset="UTF-8"></script>

<!-- 클로젯 JS -->
<script src="<c:url value="/js/codiset.js"/>"></script>

<!-- 푸터 -->
<%@ include file="/WEB-INF/views/include/footer.jsp"%>

</body>
</html>