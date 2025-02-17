

        
             
       	window.onload = function() {
            
         hashtagList();   
            
         var paramDiv = getParameter("div");
           
         // 카카오페이 결제인 경우      
         var kSaleNo = getParameter("saleNo");
           
         // http://localhost:8081/?div=ksuccess&saleNo=80
         // ksuccess : 카카오페이 결제 성공 , kfail : 카카오페이 결제 실패, kcancel : 카카오페이 결제 취소            
         if(paramDiv == "ksuccess" || paramDiv == "kfail" || paramDiv == "kcancel"){                        
            fnKakaoPayResult(paramDiv, kSaleNo);
         }else{
         	  setMainPage();
           
            clock();      
         }
            

            
      }
		
		
		
		
		
		
		
		var myHostUrl = 'http://localhost:8080/main';
		//var awsHostUrl = 'http://ec2-3-36-78-63.ap-northeast-2.compute.amazonaws.com:8080/main';
		var awsHostUrl = 'https://maymayweather.ml/main';
		//var awsHostUrl = 'http://localhost:8080/main';
		var uploadFileUrl = '/fileupload/guestbook/';
		
		var memberHostUrl = 'https://weatherwearmember.tk/member';
		var ootdHostUrl = 'https://www.mayootd.tk/ootd';
		
		
		var file;				// 방명록 첨부 사진 
		var gbNo = 0;			// 방명록 번호
		var gbpage = 1;

		
 		
		/* 메인 ---------------------------------------------------------------------------------------------------------------------  */
		
		/* 메인 페이지 구성 : 위치 호출 후 데이터 받아오기 */  
		function setMainPage() {
			
			var mainhtml = '<!-- 메인 wrap -->'
						+	'<div class="content_wrap">'
						+	'<!-- 메인 -->'
						+	'<div class="mainForm" id="mainForm">'
				
					
						+ '<div class="header_time"></div>'
							+ '<div class="weather">'
							+ 		'<div class="weatherBT_btn"><input type="button" class="font5" value="시간대별" id="weatherBt_btn" onclick="getWeatherBT()"></div>'
							+ 		'<div class="weather_icon">'
							+ 			'<img width="80" src="'+awsHostUrl+'/image/main/weatherTest.png">'
							+ 		'</div>'
							+ 		'<div class="weather_now">'
							+ 			'<table>'
							+ 				'<tr><td colspan="2" class="font4" id="sky_now">약한 비</td></tr>	'
							+ 				'<tr><td colspan="2" class="font0" id="tmp_now">0°</td></tr>	'
							+ 				'<tr><td class="font5" id="tmp_max">0° /</td><td class="font5" id="tmp_min"> -0°</td></tr>'
							+			'</table>'
							+ 		'</div>'
							+ '</div>'
							
							
							+ 	'<div class="todayCodi">'
							+ 		'<div class="todayCodi_ootd">'
							+ 				'<table>'
							+ 					'<tr>'
							+						'<td><img height="90" src="'+awsHostUrl+'/image/main/clothes/trenchcoat1.png"></td>'
							+						'<td><img height="90" src="'+awsHostUrl+'/image/main/clothes/mtm1.png"></td>'
							+						'<td><img height="90" src="'+awsHostUrl+'/image/main/clothes/skirt1.png"></td>'
							+					'</tr>'
							+ 					'<tr><td colspan="3" height="50px">오늘 트렌치코트, 맨투맨, 청치마 어때요? :)</td></tr>'
							+ 				'</table>'
							+ 		'</div>'
							+ 	'</div>'
							+ 	'<div class="todayCodi_btn" onclick="list(page)"><input type="button" value="코디할래요  >" id="btnToCloset"></div>'
							
							
							+ '<div class="todayPick">'
							+ 		'<div class="todayPick_title"><h5>Todays PICK</h5></div>'
							+ 			'<div class="top3_ootd">';
			
							
			// 좋아요 순으로 OOTD 게시물 Top3 가져오기
		 	$.ajax({
	    		url: ootdHostUrl + '/req/liketopthree',
	    		type: 'GET',
	    		async: false,
	    		success: function(pickData) {
	    			console.log('ootd 게시물 호출 성공');
	    			console.log(pickData);
	    			
	    			// 총 게시물 수가 3개보다 적을때 분기
	    			if(pickData.length < 3){
	    			
	    				for(i=0; i<pickData.length; i++){
	    					mainhtml += 	'<div class="top3_ootd'+(i+1)+'" onclick="moveToOotdTop3('+pickData[i].ootdidx+')">'
		    						+		'<input type="hidden" id="top3_ootdIdx" value="'+pickData[i].ootdidx+'">'
		    						+ 			'<div class="top3_ootd_border">'
		    						+ 				'<table>'
		    						+ 					'<tr><td colspan="2"><img width="85" class="img_paddingB" src="'+ ootdHostUrl + '/fileupload/ootdimage/THUMB_' + pickData[i].ootdphotoname +'"></td></tr>'
		    						+ 					'<tr>'
		    						+						'<td colspan="2" class="pick_onleft">'+ pickData[i].ootdnic +' 님</td>'
		    						+ 					'</tr>'
		    						+ 					'<tr>'
		    						+ 						'<td class="pick_onleft">'+ pickData[i].ootdloc +'</td>'
		    						+ 						'<td class="pick_onright"><img width="10" src="'+awsHostUrl+'/image/icon/heart.png"> '+ pickData[i].ootdlikecnt +'</td>'
		    						+ 					'</tr>'
		    						+ 				'</table>'
		    						+ 			'</div>'
		    						+ 		'</div>';
	    				}
	    			
	    			
	    			} else {
	    			
	    				for(i=0; i<3; i++){
		    				mainhtml += 	'<div class="top3_ootd'+(i+1)+'" onclick="moveToOotdTop3('+pickData[i].ootdidx+')">'
		    						+		'<input type="hidden" id="top3_ootdIdx" value="'+pickData[i].ootdidx+'">'
		    						+ 			'<div class="top3_ootd_border">'
		    						+ 				'<table>'
		    						+ 					'<tr><td colspan="2"><img width="85" class="img_paddingB" src="'+ ootdHostUrl + '/fileupload/ootdimage/THUMB_' + pickData[i].ootdphotoname +'"></td></tr>'
		    						+ 					'<tr>'
		    						+						'<td colspan="2" class="pick_onleft">'+ pickData[i].ootdnic +' 님</td>'
		    						+ 					'</tr>'
		    						+ 					'<tr>'
		    						+ 						'<td class="pick_onleft">'+ pickData[i].ootdloc +'</td>'
		    						+ 						'<td class="pick_onright"><img width="10" src="'+awsHostUrl+'/image/icon/heart.png"> '+ pickData[i].ootdlikecnt +'</td>'
		    						+ 					'</tr>'
		    						+ 				'</table>'
		    						+ 			'</div>'
		    						+ 		'</div>';
		    			}
	    			
	    			}
	    			
	    		}, 
	    		error: function(){
	    			console.log('주소 호출 실패');
	        	}
	    	
	    	});		 	
					
			
			mainhtml += 	'</div>'
						+ '</div>'
						+ '</div>'
						+ '</div>';
						
			
							
		    $('#content').html(mainhtml);
		    
		    
		    // 위치 호출 여부 분기
		    if(nowLoc == null || nowLoc == '') {
		    	getLocAndWeather();
		    	
		    } else {
		    	getWeather();
		    }
		    
			
		}
		
		
		
		
		/* Top3 상세페이지 보여주기 */
		function moveToOotdTop3(ootdidx) {
			
			var content = document.querySelector('.content');
            contentTemp = content.innerHTML;
            
            viewPost(ootdidx);
			
			console.log(ootdidx);
			console.log('ootd Top3 게시물 보여주기');
		}
		
		
		
		
		/* 실시간 날짜 시계 구하기 */
        
        function getTime() {
			var date = new Date(); 
		    var month = date.getMonth() + 1;
		    var clockDate = date.getDate();
		    var day = date.getDay();
		    var week = ['일', '월', '화', '수', '목', '금', '토'];
		    var hours = date.getHours();
		    var minutes = date.getMinutes();
		    
		    hours = hours < 10 ? '0' + hours : hours;
		    minutes = minutes < 10 ? '0' + minutes : minutes;
		    
				// 월은 0부터 1월이기때문에 +1일을 해주고 
			    // 시간 분은 10보다 작으면 앞에0을 붙혀주기 
		    //clockhtml = month +'월\n'+clockDate+'일\n'+week[day]+'요일\n'+ hours + ':' + minutes;
		    clockhtml = '지금, '+ hours + ':' + minutes;
		    
		    $('.header_time').html(clockhtml);
        }
        
       	function clock() {
       		getTime();
       		setInterval(getTime, 30 * 1000);	// 30초마다 함수 반복
       	}
        
       	
       	
       	
       	/* 동네 설정 모달 창 열기 */
       	
       	$('#header_loc').click(function () {
       	
       	
       		// 동네 데이터 없을 때 분기
       		if(nowLoc == null || nowLoc == '') {
       			
       			Swal.fire({
				  icon: 'error',
				  title: 'GPS Error',
				  text: '위치 정보 접근을 허용해주세요!',
				  footer: '<a href="https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DAndroid&hl=ko">How do I solve this issue?</a>'
				})
       		
       		} else {
       		
       		
       			console.log(addressApiData);
       		
	       		$('#weatherBt_btn').css('display','none');
	       		$('.locationModal_wrapper').css('display','');
	       		
					lochtml = 	'<div class="regModal">';
					lochtml += 		'<div class="regModal_header">';
					lochtml += 			'<div class="regModal_title">내 동네 설정하기</div>';
					lochtml += 			'<div class="regModal_back">';
					lochtml += 				'<button type="button" class="reg_modal_close_btn" onclick="closeLocModal()" ><img width="20" src="'+awsHostUrl+'/image/icon/x.png"></button>';
					lochtml += 			'</div>';
					lochtml += 		'</div>';
					lochtml += 		'<div class="locationModal_body">';
					
					for(i=0; i<addressApiData.length; i++) {
						lochtml += '<input type="radio" name="LocOptions" id="possibleLocBtn'+i+'" value="'+addressApiData[i].city + ' ' + addressApiData[i].gu+'" style="display:none;">';
						lochtml += '<label for="possibleLocBtn'+i+'" class="labelforLoc">'+ addressApiData[i].city + ' ' + addressApiData[i].gu + '</label>';
					}
					
					lochtml +=			'<img width="200" src="'+awsHostUrl+'/image/main/map.png">';
					
					lochtml +=		'</div>';
					lochtml += 		'<div class="regModal_footer">';
					lochtml += 			'<button type="button" id="reg_submit_btn" onclick="changeLoc()">주소 설정하기</button>';
					lochtml += 		'</div>';
					lochtml += 	'</div>'; 
					
					console.log(addressApiData);
					
	 				
	 			$('.locationModal_wrapper').html(lochtml);
	 			
	 			//$('.possibleLocBtn:checked').css('background-color','#424242');
	 		
	 			//$('.possibleLocBtn:checked').css('color','white');
       		
       		
       		}
       	
		});
		
       	
       	
       	function openLocModal() {
       		console.log(addressApiData);
       		
       		$('#weatherBt_btn').css('display','none');
       		$('.locationModal_wrapper').css('display','');
       		
				lochtml = 	'<div class="regModal">';
				lochtml += 		'<div class="regModal_header">';
				lochtml += 			'<div class="regModal_title">내 동네 설정하기</div>';
				lochtml += 			'<div class="regModal_back">';
				lochtml += 				'<button type="button" class="reg_modal_close_btn" onclick="closeLocModal()" ><img width="20" src="'+awsHostUrl+'/image/icon/x.png"></button>';
				lochtml += 			'</div>';
				lochtml += 		'</div>';
				lochtml += 		'<div class="locationModal_body">';
				
				for(i=0; i<addressApiData.length; i++) {

					lochtml += '<input type="radio" name="LocOptions" id="possibleLocBtn'+i+'" value="'+addressApiData[i].city + ' ' + addressApiData[i].gu+'" style="display:none;">';
					lochtml += '<label for="possibleLocBtn'+i+'" class="labelforLoc">'+ addressApiData[i].city + ' ' + addressApiData[i].gu + '</label>';
				}
				
				lochtml +=			'<img width="200" src="'+awsHostUrl+'/image/main/map.png">';
				
				lochtml +=		'</div>';
				lochtml += 		'<div class="regModal_footer">';
				lochtml += 			'<button type="button" id="reg_submit_btn" onclick="changeLoc()">주소 설정하기</button>';
				lochtml += 		'</div>';
				lochtml += 	'</div>'; 
				
				console.log(addressApiData);
				
 				
 			$('.locationModal_wrapper').html(lochtml);
 			
 			//$('.possibleLocBtn:checked').css('background-color','#424242');
 		
 			//$('.possibleLocBtn:checked').css('color','white');
 			
 			
		/*	// 동네 이름 클릭 이벤트
			$('.labelforLoc').click(function () {
				$(this).css('background-color','#424242');
				$(this).css('color','white');
			});
		*/
 			
 			
       	}
       	
       	
       	
       	
       	/* 동네 설정 */
       	function changeLoc() {
       		
			var checkValue = $('.locationModal_body input:checked');
       		const str = checkValue.val();
       		
       		nowLoc = str;
       		
       		const arr = str.split(' ');
       		console.log(arr);
       		console.log(arr[0]);
       		console.log(arr[1]);
       		
       		nowGu = arr[1];
       		console.log(nowGu);
       	
       		
       		$('.locationModal_wrapper').css('display','none');
       		$('#btnLocc').html(nowGu);
       		
       		console.log(location);
       		
       	
       	}
		
		
		/* 동네 설정 모달 닫기 */
		function closeLocModal() {
			$('.locationModal_wrapper').css('display','none');
			$('#weatherBt_btn').css('display','');
		}
	
	
		
		
		
		
		
		/* 방명록 ------------------------------------------------------------------------------------------------------------------------------  */
		
		var gbOwnerId;	// 방명록 주인 ID
		var gbOwnerName;	// 방명록 주인 name
		
		
		/* test용 방명록 버튼 출력 ----------------------------------------- */
		function getMoveToGb() {
			
			
			var html = '<!-- 방명록 버튼 -->';
			html +=	'<div class="moveToGb" id="moveToGb">';
			html += 	'<button class="gb_btn1" onclick="getGbookList(10)">10</button>';
			html +=		'<button class="gb_btn2" onclick="getGbookList(20)">20</button>';
			html +=		'<button class="gb_btn3" onclick="getGbookList(30)">30</button>';
			html +=		'<button class="gb_btn4" onclick="getGbookList(40)">40</button>';
			html +=		'<button class="gb_btn5" onclick="getGbookList(50)">50</button>';
			html +=		'<button class="gb_btn6" onclick="getGbookList(60)">60</button>';
			html +=		'<button class="gb_btn7" onclick="getGbookList(70)">70</button>';
			html +=		'<button class="gb_btn8" onclick="getGbookList(80)">80</button>';
			html +=	'</div>';
			    
        	$('#content').html(html);
        	
		}
				    
		
		
		
		/* 회원 A 방명록의 리스트 출력 --------------------------------------- */
		
		function getGbookList(ownerIdx) {
		
			var content = document.querySelector('.content');
            contentTemp = content.innerHTML;
		
			gbOwnerId = ownerIdx;
			
			// 방명록 주인이름 호출
			$.ajax({
				url: 'https://weatherwearmember.tk/member/members/'+gbOwnerId,
				type: 'GET',
				async: false,
				contentType: 'text/html; charset=UTF-8',
				success: function(name) {
				
					console.log(name);
					gbOwnerName = name;
				
				}, 
 				error: function(e) {
 					console.log("gbOwnerName 호출 에러 : "+e);
 				}
			
			});
			
			console.log('방명록주인:'+gbOwnerName+'('+gbOwnerId + ')');
			
			
			$.ajax({
 				url: awsHostUrl + '/guestbook/list/' + gbOwnerId + '/' + gbpage,
 				type: 'GET',
 				success:function(data){
 				
 					// 비밀글 수
 					var secretNum = 0;
 					
 					// 방명록 목록
 					
 					
 					
 					var listhtml = '<!-- 메인 wrap -->';
 					listhtml += 	'<div class="content_wrap">';
 					listhtml += 		'<!-- 방명록 리스트 -->';
 					listhtml += 		'<div class="gblistForm" id="gblistForm">';
 					

 					
 					listhtml +=		'<div class="gblist_title">';
 					listhtml += 		'<button type="button" onclick="backToPreview()" class="gb_back_btn"><img width="17" src="'+awsHostUrl+'/image/main/back.png"></button>';
 					listhtml += 		'<span>'+ gbOwnerName + ' 님의 GuestBook</span>';
 					listhtml +=			'<div class="writebtn" id="writebtn" onclick="openRegModal()"></div>';
 					listhtml += 	'</div>';	
 					listhtml += 	'<div class="gblist">';
 					listhtml += 		'<table class="gblist_table">';
 					
 					for(var i=0; i<data.guestbookList.length; i++) {
	 							
	 					// 방명록 주인이거나 작성자인 경우에만, 비밀글 열람			
	 					if(memIdx == gbOwnerId || memIdx == data.guestbookList[i].writerNo){
	 						
	 						
	 						// 비밀글은 css 처리
	 						if(data.guestbookList[i].secret == 'Y') {
	 							listhtml +=				'<tbody id="'+data.guestbookList[i].gbookNo+'" class="secretGb">'
	 						} else {
	 							listhtml +=				'<tbody id="'+data.guestbookList[i].gbookNo+'">'
	 						}
	 						
	 						
		 					listhtml += 				'<tr class="gblist_width">';
		 					listhtml += 					'<td rowspan="2" class="gblist_memImgR">';
		 					listhtml += 						'<img width="35" class="gblist_memImg" src="'+memberHostUrl+'/fileupload/member/' + data.guestbookList[i].writerPhoto + '">';
		 					listhtml += 					'</td>';
		 					listhtml += 					'<td class="gblist_name">'+ data.guestbookList[i].writerName +'</td>';
		 					listhtml +=						'<td class="gblist_btns">';
		 					
		 					
                    		listhtml +=						'<div class="gbDropdown">';
                    		listhtml += 						'<label for="gbDropBtn"><img height="15" src="'+awsHostUrl+'/image/icon/usefulbutton.png"></label>';
                    		listhtml +=								'<button id="gbDropBtn" style="display:none;" onclick="dropMenu()"></button>';
                    		listhtml += 						'<div id="gbDropContent" class="gbDropdownContent">';
                    		
		 					// 방명록 주인 -> 삭제 버튼만 보이게
		 					if(memIdx == gbOwnerId){
		 						listhtml += 							'<li class="dropdown"  id="gbdelete" onclick="openDeleteModal('+data.guestbookList[i].gbookNo +')">삭제</li>';
		 					
		 					// 방명록 작성자 -> 수정/삭제 버튼 모두 보이게 
		 					} else {
		 						listhtml += 							'<li class="dropdown" id="gbupdate" onclick="openUpdateModal('+data.guestbookList[i].gbookNo + ')">수정</li>';
		 						listhtml += 							'<li class="dropdown"  id="gbdelete" onclick="openDeleteModal('+data.guestbookList[i].gbookNo +')">삭제</li>';
		 					}
		 		
		 					listhtml += 						'</div>';
		 					listhtml += 					'</div>';
		 					listhtml +=						'<input type="hidden" name="gbookNo" id="'+ data.guestbookList[i].gbookNo +'" value="'+ data.guestbookList[i].gbookNo +'"></td>';
		 					listhtml +=					'</tr>';
		 					
		 					
		 					
	
							// 첨부 사진 없는 경우, 이미지 출력 X
		 					if(data.guestbookList[i].contentPhoto != null) {
		 						listhtml +=					'<tr class="gblist_info">';
								listhtml +=						'<td class="font7"><img height="10" class="locIcon" src="'+awsHostUrl+'/image/icon/location.png">'+ data.guestbookList[i].writerLoc +'<br>' + data.guestbookList[i].regDate +'</td>';			
								listhtml +=						'<td rowspan="2" class="gblist_uploadPhoto">';
								listhtml +=							'<div width="70" height="70"><img id="gblist_Photo" src="' + awsHostUrl + uploadFileUrl + data.guestbookList[i].contentPhoto +'" onclick="gbPopImage(this.src)" ></div><div class="gbOriginalImage" onclick="closeGbPopup()" style="display:none;"><div class="gbBigImg" id="gbBigImg"></div></div>';
								listhtml +=						'</td>';
								listhtml +=					'</tr>';
								listhtml +=					'<tr class="gblist_con">';
								listhtml +=						'<td colspan="2" class="gblist_content">'+ data.guestbookList[i].content.replace(/(?:\r\n|\r|\n)/g,'<br/>')+'</td>';
								listhtml +=							'<input type="hidden" name="secret" id="secret" value="'+ data.guestbookList[i].secret +'">';
								listhtml +=					'</tr> ';	
								listhtml +=				'</tbody>';
							} else {
								listhtml +=					'<tr class="gblist_info">';
								listhtml +=						'<td class="font7"><img height="10" class="locIcon" src="'+awsHostUrl+'/image/icon/location.png">'+ data.guestbookList[i].writerLoc +'<br>' + data.guestbookList[i].regDate +'</td>';			
								listhtml +=					'</tr>';
								listhtml +=					'<tr class="gblist_con">';
								listhtml +=						'<td colspan="3" class="gblist_content">'+ data.guestbookList[i].content.replace(/(?:\r\n|\r|\n)/g,'<br/>') +'</td>';
								listhtml +=							'<input type="hidden" name="secret" id="secret" value="'+ data.guestbookList[i].secret +'">';
								listhtml +=					'</tr> ';
								listhtml +=				'</tbody>';
							}
		 				
		 				
	 					} else {
							
							// 공개글만 출력 & 수정/삭제 버튼 숨기기
							if(data.guestbookList[i].secret != 'Y'){
							
								listhtml +=				'<tbody id="'+data.guestbookList[i].gbookNo+'">'
			 					listhtml += 				'<tr class="gblist_width">';
			 					listhtml += 					'<td rowspan="2" class="gblist_memImgR">';
			 					listhtml += 						'<img width="35" class="gblist_memImg" src="'+memberHostUrl+'/fileupload/member/' + data.guestbookList[i].writerPhoto + '">';
			 					listhtml += 					'</td>';
			 					listhtml += 					'<td class="gblist_name">'+ data.guestbookList[i].writerName +'</td>';
			 					listhtml +=						'<td class="gblist_btns">';	 					
			 					listhtml +=						'<input type="hidden" name="gbookNo" id="'+ data.guestbookList[i].gbookNo +'" value="'+ data.guestbookList[i].gbookNo +'">';
			 					listhtml +=					'</tr>';
			 					
		
								// 첨부 사진 없는 경우, 이미지 출력 X
			 					if(data.guestbookList[i].contentPhoto != null) {
			 						listhtml +=					'<tr class="gblist_info">';
									listhtml +=						'<td class="font7"><img height="10" class="locIcon" src="'+awsHostUrl+'/image/icon/location.png">'+ data.guestbookList[i].writerLoc +'<br>' + data.guestbookList[i].regDate +'</td>';			
									listhtml +=						'<td rowspan="2" class="gblist_uploadPhoto">';
									listhtml +=							'<div width="70" height="70"><img src="' + awsHostUrl + uploadFileUrl + data.guestbookList[i].contentPhoto +'" onclick="gbPopImage(this.src)"></div><div class="gbOriginalImage" onclick="closeGbPopup()" style="display:none;"><div class="gbBigImg" id="gbBigImg"></div></div>';
									listhtml +=						'</td>';
									listhtml +=					'</tr>';
									listhtml +=					'<tr class="gblist_con">';
									listhtml +=						'<td colspan="2" class="gblist_content">'+ data.guestbookList[i].content.replace(/(?:\r\n|\r|\n)/g,'<br/>') +'</td>';
									listhtml +=							'<input type="hidden" name="secret" id="secret" value="'+ data.guestbookList[i].secret +'">';
									listhtml +=					'</tr> ';	
									listhtml +=				'</tbody>';
			 					
								} else {
									listhtml +=					'<tr class="gblist_info">';
									listhtml +=						'<td colspan="2" class="font7"><img height="10" class="locIcon" src="'+awsHostUrl+'/image/icon/location.png">'+ data.guestbookList[i].writerLoc +'<br>' + data.guestbookList[i].regDate +'</td>';			
									listhtml +=					'</tr>';
									listhtml +=					'<tr class="gblist_con">';
									listhtml +=						'<td colspan="3" class="gblist_content">'+ data.guestbookList[i].content.replace(/(?:\r\n|\r|\n)/g,'<br/>') +'</td>';
									listhtml +=							'<input type="hidden" name="secret" id="secret" value="'+ data.guestbookList[i].secret +'">';
									listhtml +=					'</tr> ';
									listhtml +=				'</tbody>';
								}
	 					
							} else {
							
								// 비밀글 수 +1
	 							secretNum += 1;
							}
	 					
	 					}			
	 					
	 					
	 										
	 				
 					}
 					
 					listhtml +=			'</table>';
 					listhtml +=		'</div>';
 					 					
 					
 					listhtml += 	'<!-- 방명록 등록 (모달 창) -->';
 					listhtml += 	'<form id="gbregForm">';
 					listhtml += 		'<div class="regModal_wrapper" style="display: none;">';
 					listhtml += 			'<div class="regModal">';
 					listhtml += 				'<div class="regModal_header">';
 					listhtml += 					'<div class="regModal_title">방명록 남기기</div>';
 					listhtml += 					'<div class="regModal_back">';
 					listhtml += 						'<button type="button" class="reg_modal_close_btn" onclick="closeRegModal()" ><img width="20" src="'+awsHostUrl+'/image/icon/x.png"></button>';
 					listhtml += 					' </div>';
 					listhtml += 				'</div>';
 					listhtml += 				'<div class="regModal_body"></div>';
 					listhtml += 				'<div class="regModal_footer">';
 					listhtml += 					'<button type="button" id="reg_submit_btn" onclick="regGuestbook()">보내기</button>';
 					listhtml += 				'</div>';
 					listhtml += 			'</div>';
		            listhtml += 		'</div>';         
		            listhtml +=		'</form> '; 
		            
		            listhtml += '<!-- 방명록 수정 (모달 창) -->';    
		            listhtml += '<form id="gbUpdateForm">'; 
		            listhtml += 	'<div class="updateModal_wrapper" style="display: none;">'; 
		            listhtml += 		'<div class="updateModal">'; 
		            listhtml += 			'<div class="regModal_header">';
		            listhtml += 				'<div class="regModal_title">방명록 수정하기</div>';   
		            listhtml += 				'<div class="regModal_back">';
		            listhtml += 					'<button type="button" class="reg_modal_close_btn" onclick="closeUpdateModal()"><img width="20" src="'+awsHostUrl+'/image/icon/x.png"></button>';
		            listhtml += 				'</div>';   
		            listhtml += 			'</div>'; 
		            listhtml += 			'<div class="updateModal_body"></div>';
		            listhtml += 			'<div class="regModal_footer">';
		            listhtml += 				'<button type="button" id="reg_submit_btn" onclick="updateGuestbook()">수정하기</button>';
		            listhtml += 			'</div>';     
		            listhtml += 		'</div>'; 
		            listhtml += 	'</div>';
		            listhtml += '</form>';
		            
		            
		            listhtml += '<!-- 방명록 삭제 (모달 창) -->';
		            listhtml += '<form id="gbDeleteForm">';
		            listhtml += 	'<div class="deleteModal_wrapper" style="display: none;">';
		            listhtml += 		'<div class="deleteModal">';
		            listhtml += 			'<div class="regModal_header">';
		            listhtml += 				'<div class="regModal_title">방명록 삭제하기</div>';
		            listhtml += 				'<div class="regModal_back">';
		            listhtml += 					'<button type="button" class="reg_modal_close_btn" onclick="closeDeleteModal()"><img width="20" src="'+awsHostUrl+'/image/icon/x.png"></button>';
		            listhtml += 				'</div>';
		            listhtml += 			'</div>';
		            listhtml += 			'<div class="deleteModal_body"></div>';
		            listhtml += 			'<div class="regModal_footer">';
		            listhtml += 				'<button type="button" id="delete_submit_btn" onclick="deleteGuestbook()">삭제하기</button>';
		            listhtml += 			'</div>';
		            listhtml += 		'</div>';
		            listhtml += 	'</div>';
		            listhtml += '</form>';
		            
		            listhtml += '</div>';
		            
			    			
			    	$('#content').html(listhtml);	
 					
 					
 					// 데이터가 없으면 출력
 					if(data.guestbookList.length == 0) {
 						
 						Swal.fire({
						  title: gbOwnerName+' 님에게 첫 방명록을 남겨보세요!',
						  showClass: {
						    popup: 'animate__animated animate__fadeInDown'
						  },
						  hideClass: {
						    popup: 'animate__animated animate__fadeOutUp'
						  }
						})
 						$('.gblist').css('min-height','590px');
 						
 					}
 					
 					// 방명록 주인인 경우, 등록 버튼 비활성화
 				/*	if(memIdx == gbOwnerId) {
 						$('.reg_modal_open_btn').attr('disabled', 'disabled');
 					}
 				*/

 					
	 			}, 
 				error: function(e) {
 					console.log("방명록 리스트 ajax 에러 : "+e);
 				}

 			})
	
			
	
		
		}

		
		/* 수정/삭제 드롭다운 메뉴 */
        function dropMenu() {
	       $('.gbDropdownContent').css('display','');
	       
	       window.onclick = function(e){
		        if(!event.target.matches('gbDropBtn')) {
		            var dropdowns = document.getElementsByClassName('gbDropdownContent');
		            for (var i=0; i< dropdowns.length; i++){
		                var openDropdown = dropdowns[i];
		                if(openDropdown.classList.contains('show')){
		                    openDropdown.classList.remove('show');
		                }
		            }
		        }
		    }
	       
	    }
	     
	    
	    /* 이미지 팝업 */
        function gbPopImage(url){
	        $('.gbOriginalImage').css('display', '');
	        
	        $('.gbBigImg').html('<img src="'+url+'">').animate({width: 'max', height:'max'}, 1000);
	        $('.gbBigImg img').css('width', '300');
	        $('.gbBigImg img').css('height', 'auto');
	 
        }

		/* 이미지 팝업 숨김처리 */
		function closeGbPopup() {
			$('.gbOriginalImage').css('display', 'none');
		}
		
		
		
        // 회원 방명록 -> 회원 게시물로 이동
        function backToPreview() {
        
        	$('#content').html(contentTemp);
        
        }
        
        
        
        
        
        
        
		
		


        /* 방명록 등록 모달 ----------------------------------------------- */
		
		/* 등록 모달 창 만들기 */
        function setRegModal() {
            
        	var reghtml = '<table class="regModal_table"><input type="hidden" id="gbOwnerNo" name="gbOwnerNo" value="'+gbOwnerId+'">'
        				+	'<input type="hidden" id="gbWriterLoc" name="gbWriterLoc" value="'+ nowLoc +'">'
						+	'<tr class="gbGreetArea" height="100">'
						+		'<td class="gbTableExp" colspan="2"><span class="font3">잘 보셨나요?</span><br><span class="font5">'+gbOwnerName+' 님에게 인사를 남겨보세요:)</span></td>'
						+		'<td class="gbTableImg"><img width="65" src="'+awsHostUrl+'/image/main/guestbook.png"></td>'
						+	'</tr>'
						+	'<tr class="gbInsertArea1" height="110">'
						+		'<td class="gbInsertPhoto"><label for="gbContentPhoto"><img width="30" src="'+awsHostUrl+'/image/main/camera.png"></label>'
						+			'<input type="file" id="gbContentPhoto" name="gbContentPhoto" accept="image/jpeg,image/png,image/gif" style="display:none;" onchange="chkImage(this)"></td>'
						+		'<td id="gbPreview" class="gbPreview" colspan="2">'
						+			'<div class="deletePreviewImg">'
						+			'</div>'
						+		'</td>'
						+	'</tr>'
						+	'<tr class="gbInsertArea2" height="180">'
						+		'<td class="gbInsertText" colspan="3">'
						+			'<textarea id="gbContent" name="gbContent" cols="204" wrap="hard" placeholder="'+gbOwnerName+' 님의 스타일은 어떤가요? &#13;&#10;하고 싶은 말을 여기에 적어보세요."></textarea></td>'
						+	'</tr>'
						+	'<tr class="gbSecretArea" height="50">'
						+		'<td colspan="3">비밀글 <input type="checkbox" id="gbcheck" name="gbcheck"></td>'
						+ 	'</tr>'
						+ '</table>';
            
            
    		 $('.regModal_body').html(reghtml);

        }
		

		
		var maxFileSize = 1024 * 1024 * 2;	// 파일 용량 제한: 2MB
		
		/* 파일 용량 체크 */ 
		function chkImage(el) {
			
			console.log(el);
			
			// files로 해당 파일 정보 얻기 
			var imgfile = el.files;
			
			if(imgfile[0].size > maxFileSize) {
				// 용량 초과시 
				alert('2MB 이하의 파일만 등록할 수 있습니다.\n현재파일 용량 : '+ (Math.round(file[0].size / 1024 / 1024*100) / 100)+ 'MB');
				
			} else {
				console.log('용량 이하입니다.');
				readImage(event);
			}
		}
		
		
		/* 첨부 파일 미리보기 */ 
		function readImage(event){
			
			console.log(event);
			
			var gbPreview = document.querySelector('#gbPreview');
			
			// FileReader 객체 생성
			var reader = new FileReader();
			
			// 이미지가 로드가 된 경우
			reader.onload = function(event) {
				var img = document.createElement('img');
				img.setAttribute('src', event.target.result);
				img.setAttribute('width', 60);
				gbPreview.appendChild(img);
			};
			
			console.log(gbPreview);
			
			// reader 가 이미지 읽도록 하기 
			reader.readAsDataURL(event.target.files[0]);
			
		} 
        
        /* 등록 모달 창 열기 */
        function openRegModal() {
        
        	// 로그인체크
        	if(memIdx == null || memIdx == '') {
	        	Swal.fire({
			            icon: 'error',
			            title: 'Oops...',
			            text: '로그인이 안되셨네요!',
			            footer: '<a href="javascript:memberMain()">로그인 페이지로 이동</a>'
			          })
        	} else {
        		setRegModal();
        		$('.regModal_wrapper').css('display', '');
        	}
        }
        
        /* 등록 모달 창 닫기 */ 
        function closeRegModal() {
        	$('.regModal_wrapper').css('display', 'none');
        }

		
        /* 방명록 등록 */
        function regGuestbook() {

        	var form = $('#gbregForm')[0];
        	var formData = new FormData(form);
       
        	
        	for (var key of formData.keys()) {
				console.log(key);
				}
			for (var value of formData.values()) {
			  	console.log(value);
			}
			
			var content = $('#gbContent');
			var secret_check = null;		// 비밀글 체크여부
        	
        	// 내용은 필수로 받기
         	if(!content.val()) {
        		alert('내용을 입력해주세요');
        		
        	} else {    		
            	$('input:checkbox[name="gbcheck"]').each(function(){
            		if($(this).is(":checked") == true) {
            			secret_check = 'Y';
            			console.log('비밀글');
            		} else  {
            			secret_check = 'N';
            			console.log('공개글');
            		}
            	})
            	
           	// gbSecret를 FormData에 추가 
           	formData.append('gbSecret', secret_check);
           	
           	// jsessionId를 FormData에 추가 
           	formData.append('jsessionId', jsessionId);
            	
           	$.ajax({
           		type: 'POST',
              	enctype : 'multipart/form-data',
   	            processData : false,
   	            contentType : false,
   	            cache : false,
   	            timeout : 600000,
               	url: awsHostUrl + '/guestbook/reg',
               	data: formData,
   	           	success: function (data) {
   	           		
   	           		console.log('등록 데이터 ajax 전송 성공');
   	           		console.log(data);
   	           		
   	           		// 리스트 출력  
   	           		getGbookList(gbOwnerId);
   	           		// 모달창 닫기
   	           		closeRegModal();
   	           	
   	            },
   	            error: function (e) {
   	            	console.log('등록 데이터 ajax 에러' + e);
   	            }
          		})
        		
        		
        	}
        	
        }
		
        
        
 
        
 		/* 방명록 수정 모달 ----------------------------------------------- */
		
		/* 수정 모달 창 만들기 */
        function setUpdateModal(gbNo) {
 			
        	console.log(gbNo);
 			
        	// 수정할 게시물 정보 가져와서 수정 폼에 넣기
        	$.ajax({
        		type: 'GET',
	            cache : false,
	            timeout : 600000,
            	url: awsHostUrl + '/guestbook/update/' + gbNo + '/form',
	           	success: function (gbInfo) {
	           		
	           		console.log('수정할 게시판 데이터 ajax로 받기 성공');
	           		console.log(gbInfo);
	           		
	           		var uformhtml = '<table class="regModal_table"><input type="hidden" id="gbOwnerNo" name="gbOwnerNo" value="'+gbOwnerId+'"><input type="hidden" id="gbNo" name="gbNo" value="'+gbNo+'">'
								+		'<tr class="gbGreetArea" height="100">'
								+			'<td class="gbTableExp" colspan="2"><span class="font3">잘 보셨나요?</span><br><span class="font5">'+gbOwnerName+' 님에게 인사를 남겨보세요 :)</span></td>'
								+			'<td class="gbTableImg"><img width="65" src="'+awsHostUrl+'/image/main/guestbook.png"></td>'
								+		'</tr>'
								+		'<tr class="gbInsertArea1" height="110">'
								+			'<td class="gbInsertPhoto"><label for="gbContentPhoto"><img width="30" src="'+awsHostUrl+'/image/main/camera.png"></label>'
								+				'<input type="file" id="gbContentPhoto" name="gbContentPhoto" accept="image/jpeg,image/png,image/gif" style="display:none;" onchange="chkImage(this)"></td>'
								+			'<td id="gbPreview" class="gbPreview" colspan="2">'
								+				'<div class="deletePreviewImg">';
					
								if(gbInfo.contentPhoto != null) {
									uformhtml +=				'<img height="70" width="auto" id="gbBeforePhoto" src="' + awsHostUrl + uploadFileUrl + gbInfo.contentPhoto +'">';
									uformhtml +=				'<img width="8" id="deletePreview_btn" width="30" src="'+awsHostUrl+'/image/icon/x.png" onclick="deletePreview()">';
								}			
								
					uformhtml +=				'</div>'
								+			'</td>'
								+		'</tr>'
								+		'<tr class="gbInsertArea2" height="180">'
								+			'<td class="gbInsertText" colspan="3">'
								+				'<textarea id="gbContent" name="gbContent" cols="204" wrap="hard">'+ gbInfo.content.replace(/(?:\r\n|\r|\n)/g,'<br/>') +'</textarea></td>'
								+		'</tr>'
								+		'<tr class="gbSecretArea" height="50">';
								
								if(gbInfo.secret == 'Y') {
									uformhtml += '<td colspan="3">비밀글 <input type="checkbox" id="gbcheck" name="gbcheck" checked="'+ gbInfo.secret +'" ></td>';
								} else {
									uformhtml += '<td colspan="3">비밀글 <input type="checkbox" id="gbcheck" name="gbcheck"></td>';
								}
	
					uformhtml +=		'</tr>'
								+ 	'</table>';
        			
					$('.updateModal_body').html(uformhtml);
	           		
	            },
	            error: function (e) {
	            	console.log('수정 데이터 ajax 에러' + e);
	            }
       		})
            
        }
 		
 		
 		
        var gbNo = 0;	// 게시글 번호 
        
        /* 수정 모달 창 열기 */
        function openUpdateModal(num) {
        	
        	gbNo = num;
        	
        	setUpdateModal(gbNo);
        	$('.updateModal_wrapper').css('display', '');
        }
        
        /* 수정 모달 창 닫기 */ 
        function closeUpdateModal() {
        	$('.updateModal_wrapper').css('display', 'none');
        }
      
        
        
		
		/* 파일 용량 체크 */ 
		function chkImage(el) {
			
			console.log(el);
			
			var maxFileSize = 1024 * 1024 * 2;	// 파일 용량 제한: 2MB
			
			// files로 해당 파일 정보 얻기 
			var imgfile = el.files;
			
			if(imgfile[0].size > maxFileSize) {
				// 용량 초과시 
				alert('2MB 이하의 파일만 등록할 수 있습니다.\n현재파일 용량 : '+ (Math.round(file[0].size / 1024 / 1024*100) / 100)+ 'MB');
				
			} else {
				console.log('용량 이하입니다.');
				changeImage(event);
			}
		}
		
        
     	/* 파일 변경 시, 미리보기 파일 변경 */ 
		function changeImage(event){
			
			console.log(event);
			
			var deletePreviewImg = document.querySelector('.deletePreviewImg');
			
     		// 이전 이미지 삭제
     		$('.deletePreviewImg').empty();
     		
			// FileReader 객체 생성
			var reader = new FileReader();
			
			// 이미지가 로드가 된 경우
			reader.onload = function(event) {			
				
				previewhtml = '<img height="70" width="auto" id="gbBeforePhoto" src="' + event.target.result +'">'
							+ '<img width="10" id="deletePreview_btn" width="30" src="'+awsHostUrl+'/image/icon/x.png" onclick="deletePreview()">';
				
				$('.deletePreviewImg').html(previewhtml);
		
			};
			
			console.log(deletePreviewImg);
			
			// reader 가 이미지 읽도록 하기 
			reader.readAsDataURL(event.target.files[0]);
		} 
        
     	
     	/* 미리보기 삭제 버튼 클릭 시 -> 미리보기 삭제 */
		function deletePreview() {
			$('.deletePreviewImg').empty();
		}
     	
     	
        /* 방명록 수정 */
        function updateGuestbook() {
        	
        	console.log(gbNo);
        	
        	// .deletePreviewImg가 비어있으면 file input도 지우기
        	if(!$('#gbBeforePhoto').length) {
    			$('.gbInsertPhoto input[type=file]').remove();
        		console.log('저장할 파일 없음');
        	} 
        	
        	var form = $('#gbUpdateForm')[0];
        	var formData = new FormData(form);
        	
        	var secret_check = null;		// 비밀글 체크여부
        	    		
        	$('input:checkbox[name="gbcheck"]').each(function(){
        		if($(this).is(":checked") == true) {
        			secret_check = 'Y';
        		} else  {
        			secret_check = 'N';
        		}
        	})
        	
        	// gbSecret를 FormData에 추가 
        	formData.append('gbSecret', secret_check);
        	
			for (var key of formData.keys()) {
				  console.log(key);
				}
			for (var value of formData.values()) {
			  console.log(value);
			}
			
        	
        	$.ajax({
        		type: 'POST',
           		enctype : 'multipart/form-data',
	            processData : false,
	            contentType : false,
	            cache : false,
	            timeout : 600000,
            	url: awsHostUrl + '/guestbook/update/' + gbNo,
            	data: formData,
	           	success: function (data) {
	           		
	           		console.log('수정 데이터 ajax 전송 성공');
	           		console.log(data);
	           		
	           		// 리스트 출력  
	           		getGbookList(gbOwnerId);
	           		// 모달창 닫기
	           		closeUpdateModal();
	           	
	            },
	            error: function (e) {
	           		console.log('수정 데이터 ajax 에러' + e);
	            }
       		})
        	
        	
        }

        
        
 		/* 방명록 삭제 모달 ----------------------------------------------- */
		
		/* 삭제 모달 창 만들기 */
        function setDeleteModal(gbNo) {
            
			console.log(gbNo);
			
        	var reghtml = '<table class="regModal_table"><input type="hidden" id="gbOwnerNo" name="gbOwnerNo" value="'+gbOwnerId+'">'
        				+ 	'<input type="hidden" id="gbNo" name="gbNo" value="'+gbNo+'">'
						+	'<tr class="greetArea" height="100">'
						+		'<td class="gbDelChk"><span class="font3">정말 삭제하시겠어요?</span></td>'
						+	'</tr>'
						+ '</table>';
            
            $('.deleteModal_body').html(reghtml);
        }

     	/* 삭제 모달 창 열기 */
        function openDeleteModal(num) {
        	
        	gbNo = num;
        	
        	setDeleteModal(gbNo);
        	$('.deleteModal_wrapper').css('display', '');
        }
        
        /* 수정 모달 창 닫기  */
        function closeDeleteModal() {
        	$('.deleteModal_wrapper').css('display', 'none');
        }
        
        /* 방명록 삭제 */
       	function deleteGuestbook() {
       		
        	console.log(gbNo);
        	
        	$.ajax({
        		type: 'POST',
	            processData : false,
	            contentType : false,
	            cache : false,
	            timeout : 600000,
            	url: awsHostUrl + '/guestbook/delete/' + gbNo,
	           	success: function () {
	           		
	           		console.log('삭제 데이터 ajax 전송 성공');
	           		console.log(gbNo);
	           		
	           		// 리스트 출력  
	           		getGbookList(gbOwnerId);
	           		// 모달창 닫기
	           		closeDeleteModal();
	           	
	            },
	            error: function (e) {
	            	console.log('삭제 데이터 ajax 에러' + e);
	            }
       		})
       	}
        
        
        
        
 
		
