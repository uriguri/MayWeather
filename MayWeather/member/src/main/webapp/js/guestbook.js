

        
        window.onload = function() {
			
			setMainPage();
	        
			clock();
			
			// gbList에서만 무한 스크롤이 작동하도록 만드는 변수
			
			console.log(nowLoc);
		}
		
		
		
		
		var gbListScroll = false;

		$(document).ready(function() {

			// 무한스크롤 
			$(document).scroll(function() {
				var maxHeight = $(document).height();
				var currentScroll = $(window).scrollTop() + $(window).height();
				
				//console.log(gbListScroll);
				if(maxHeight <= currentScroll && gbListScroll) {
					setTimeout(function() {
						pageView(pageNum);
					}, 200)
				}
				
			})
			
		
		})
		
		
		
		
		var myHostUrl = 'http://localhost:8080/main';
		var awsHostUrl = 'http://ec2-3-36-78-63.ap-northeast-2.compute.amazonaws.com:8080/main';
		var uploadFileUrl = '/fileupload/guestbook/';
		
		var ootdHostUrl = 'http://ec2-13-125-232-157.ap-northeast-2.compute.amazonaws.com:8080/ootd';
		
		/* 나중에멤버 현재 로그인된 idx 받을 것! 현재 헤더안에 저장한 test용 값으로 하고 있음*/
		var gbOwnerIdx = 0;
		
		
		var file;				// 방명록 첨부 사진 
		var page = 1;			// 방명록 페이지
		var gbNo = 0;			// 방명록 번호
		
		var ownerChk = false;	// 로그인한 계정 != 방명록주인 
		var writerChk = false;	// 로그인한 계정 != 작성자
		
		// gbList에서만 무한스크롤이 작동하도록 만드는 변수
		var gblistScroll = false;	

		
 		var latitude;			// GPS 위도 
		var longitude;			// GPS 경도
		var x;					// X 좌표 (기상청 기준)
		var y;					// Y 좌표 (기상청 기준)
		
		var wn_data;			// 초단기실황 데이터
		var wbt_data;			// 동네예보 데이터
	
		
		
		/* 메인 ---------------------------------------------------------------------------------------------------------------------  */
		
		/* 메인 페이지 구성 */  
		function setMainPage() {
			
			hideGbookList();
			hideMoveToGb();
			showMainForm();
			
			
			var mainhtml = '<div class="header_time"></div>'
							+ '<div class="weather">'
							+ 		'<div class="weatherBT_btn"><input type="button" class="font6" value="시간대별" id="weatherBt_btn" onclick="getWeatherBT()"></div>'
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
							
							+ '<div class="todayCodi">'
							+ 		'<div class="todayCodi_ootd">'
							+ 			'<div class="todayCodi_ootd_border">'
							+ 				'<table>'
							+ 					'<tr><td><img height="90" src="'+awsHostUrl+'/image/main/ootdTest.jpg"></td></tr>'
							+ 					'<tr><td class="font5">뫄뫄님의 LOOK</td></tr>'
							+ 				'</table>'
							+ 			'</div>'
							+ 		'</div>'
							+ 		'<div class="todayCodi_recomm">'
							+ 			'<div class="todayCodi_item">'
							+ 				'<table>'
							+ 					'<tr><td class="font4"> -- 오늘의 코디 추천 -- </td></tr>'
							+ 					'<tr><td class="font_left">00님 <br>오늘 000과 0000 어때요? :)</td></tr>'
							+ 				'</table>'
							+ 			'</div>'
							+ 			'<div class="todayCodi_item_img">';
							
				for(i=0; i<3; i++){
					mainhtml +=				'<div class="todayCodi_item_img1"><img width="45" src="'+awsHostUrl+'/image/main/codiRecTest.png"></div>';
				}
							
				mainhtml 	+= 			'</div>'
							+ 		'</div>'
							+ 		'<div class="todayCodi_btn"><input type="button" value="코디할래요 >" id="btnToCloset"></div>'
							+ '</div>'
							
							+ '<div class="todayPick">'
							+ 		'<div class="todayPick_title"><h5>Todays PICK</h5></div>'
							+ 			'<div class="top3_ootd">';
						
							
			// 좋아요 순으로 OOTD 게시물 Top3 가져오기
		 	$.ajax({
	    		url: ootdHostUrl + '/req/liketopthree',
	    		type: 'GET',
	    		async: false,
	    		success: function(pickData) {
	    			alert('ootd 게시물 호출 성공');
	    			console.log(pickData);
	    			
	    			for(i=0; i<3; i++){
	    				mainhtml += 	'<div class="top3_ootd'+(i+1)+'" onclick="moveToOotdTop3()">'
	    						+ 			'<div class="top3_ootd_border">'
	    						+ 				'<table>'
	    						+ 					'<tr><td colspan="3"><img width="75" src="'+ ootdHostUrl + '/fileupload/ootdimage/THUMB_' + pickData[i].ootdphotoname +'"></td></tr>'
	    						+ 					'<tr>'
	    						+						'<td class="font7">'+ pickData[i].ootdnic +'님</td>'
	    						+ 						'<td><img width="10" src="'+awsHostUrl+'/image/icon/heart.png"></td>'
	    						+ 						'<td class="font7">'+ pickData[i].ootdlikecnt +'</td>'
	    						+ 					'</tr>'
	    						+ 				'</table>'
	    						+ 			'</div>'
	    						+ 		'</div>';
	    			}
	    			
	    			
	    		}, 
	    		error: function(){
	        		alert('주소 호출 실패');
	        	}
	    	
	    	});		 	
					
			
			mainhtml += 	'</div>'
						+ '</div>';
							
							
		    $('#mainForm').html(mainhtml);
		    
		 	// GPS 위도/경도 요청 -> 기상청 x,y좌표로 변환 -> 서버에 전송
			getLocation();
			
			
		}
		
		
		/* Top3 OOTD ajax로 보여주기 */
		function moveToOotdTop3(ootdidx) {
			console.log(ootdidx);
			alert('ootd 게시물 보여주기');
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
        
       	
       	/* 동네 선택 */
       	function btnLoc_click() {
       		console.log(address);
       		
       	}

		
		
		/* 시간대별 날씨  --------------------------------------------------------------------------------------------------------------- */
		
		
		function getWeatherBT() {
			
			var wbt_fcstTime = [3,6,9,12,15,18,21,0,3,6,9,12,15,18,21];	// 예보시간
			var wbt_tmp = [];		// 3시간 기온
			var wbt_rain = [];		// 3시간 강수확률
			var wbt_sky = [];		// 하늘상태 
			
			var wbtHtml = '<form id="weatherByTimeForm" method="GET" enctype="multipart/form-data">'
						+ 	'<div class="weatherBT_title"><span class="font5">시간대별 일기 예보</span></div>'
						+ 	'<div class="weatherBT_content">';
						+		'<div class="weatherBT_tableWrap">';
				
			for(var i=0; i<wbt_data.length; i++){
				
				var wbt_category = wbt_data[i].category;
				var wbt_fcstValue = wbt_data[i].fcstValue;
				var wbt_fcstDate = wbt_data[i].fcstDate;
				
				// 3시간 기온
				if(wbt_category == 'T3H') {
					wbt_tmp.push(wbt_fcstValue);
				}
				
				// 3시간 강수확률
				if(wbt_category == 'POP') {
					wbt_rain.push(wbt_fcstValue);
				}
				
				// 하늘상태 --------> 이미지 변환 처리 필요 * 
				if(wbt_category == 'SKY') {
					wbt_sky.push(wbt_fcstValue);
				}
			}	
				
			
			for(var j=0; j<wbt_fcstTime.length; j++){
				wbtHtml += 	'<div class="weatherBT_table">' // 테이블 삽입 반복 
					+ 			'<table>'
					+ 				'<tr style="height:20px;"><td id="weatherTable_time" class="font7">'+ wbt_fcstTime[j] +'시</td></tr>'
					+ 				'<tr style="height:40px;"><td id="weatherTable_img"><img width="30" src="'+awsHostUrl+'/image/main/weatherTest.png"></td></tr>'
					+				'<tr style="height:100px;"><td id="weatherTable_tmp" class="font5">'+ wbt_tmp[j] +'°</td></tr>'
					+ 				'<tr style="height:40px;"><td id="weatherTable_rain" class="font7">'+ wbt_rain[j] +'%</td></tr>'
					+ 				'<tr style="height:10px;"><td id="weatherTable_rain_percent"><input type="button" id="rainPercentBar"></td></tr>'
					+ 			'</table>'
					+ 		'</div>';
					
				$('#rainPercentBar').css('width', wbt_rain[j] * 5);
			}
				
				console.log('wbt_tmp: '+ wbt_tmp);
              	console.log('wbt_rain: '+ wbt_rain);
              	console.log('wbt_sky: '+ wbt_sky);
              	console.log('wbt_fcstTime: '+ wbt_fcstTime);
              	console.log(wbt_tmp.length);
              	console.log(wbt_rain.length);
              	console.log(wbt_sky.length);
              	console.log(wbt_fcstTime.length);
              	
              	var rain_now;	// 강수량
              	var windD_now;	// 풍향
              	var wind_now;	// 풍속
              	var humidity_now;	// 습도
              	
               	for(var i=0; i< wn_data.length; i++) {
              		var wn_category = wn_data[i].category;
        			var wn_obsrValue = wn_data[i].obsrValue;
            		var wn_baseDate = wn_data[i].baseDate;
            		var wn_baseTime = wn_data[i].baseTime;
            		
            		if(wn_category=='RN1'){	
	              		rain_now = wn_obsrValue;
	              	}
            		
            		if(wn_category=='VEC'){	
	              		windD_now = wn_obsrValue;
	              	}
            		
            		if(wn_category=='WSD'){
	              		wind_now = wn_obsrValue;
	              	}
            		
            		if(wn_category=='WSD'){
            			humidity_now = wn_obsrValue;
            		}
              	} 
              	
						
				wbtHtml += 	'</div>'
						+	'</div>'
						+		'<div class="weatherBT_detail">'
						+			'<table>'
						+				'<tr><td class="onleft" id="wbt_currenttime">오늘, 오후 00:00</td><td></td></tr>'
						+				'<tr><td class="onleft">'+ (pty_now == 0? sky_now : pty_now) +'</td>'
						+					'<td class="onright">체감 온도 0°</td></tr>'
						+				'<tr><td class="onleft"><img width="15" src="'+awsHostUrl+'/image/main/weatherTest.png">강수량</td>'
						+					'<td class="onright">'+ rain_now +' % </td></tr>'
						+				'<tr><td class="onleft"><img width="15" src="'+awsHostUrl+'/image/main/weatherTest.png">비</td>'
						+					'<td class="onright">'+ rain_now +' mm </td></tr>'
						+				'<tr><td class="onleft"><img width="15" src="'+awsHostUrl+'/image/main/weatherTest.png">습도</td>'
						+					'<td class="onright">'+ humidity_now +' %</td></tr>'
						+				'<tr><td class="onleft"><img width="15" src="'+awsHostUrl+'/image/main/weatherTest.png">바람</td>'
						+					'<td class="onright">'+ windD_now + wind_now +' m/s</td></tr>'
						+			'</table>'
						+		'</div>'
						+	'</div>'
						+ '</form>';
						
			$('#mainForm').html(wbtHtml);
			
			

		}

		
		
		
		
		/* 방명록 ------------------------------------------------------------------------------------------------------------------------------  */
		
		// 무한 스크롤 
		
		
		/* test용 방명록 버튼 출력 ----------------------------------------- */
		function getMoveToGb() {
		
			hideMainForm();
			showMoveToGb();
			
			var html = '<button class="gb_btn1" value="10">10</button>';
			html +=	'<button class="gb_btn2" value="20">20</button>';
			html +=	'<button class="gb_btn3" value="30">30</button>';
			html +=	'<button class="gb_btn4" value="40">40</button>';
			html +=	'<button class="gb_btn5" value="50">50</button>';
			html +=	'<button class="gb_btn6" value="60">60</button>';
			html +=	'<button class="gb_btn7" value="70">70</button>';
			html +=	'<button class="gb_btn8" value="80">80</button>';
			    
        	$('#moveToGb').html(html);
        	
        	getOwnerIdx();
		
		}
		

		
		function getOwnerIdx() {
			
			$('.gb_btn1').on('click', function(){
				getGbookList($('.gb_btn1').val());
			})
			$('.gb_btn2').on('click', function(){
					gbOwnerIdx = $('.gb_btn2').val();
					getGbookList();
			})
			$('.gb_btn3').on('click', function(){
					gbOwnerIdx = $('.gb_btn3').val();
					getGbookList();
			})
			$('.gb_btn4').on('click', function(){
					gbOwnerIdx = $('.gb_btn4').val();
					getGbookList();
			})
			$('.gb_btn5').on('click', function(){
					gbOwnerIdx = $('.gb_btn5').val();
					getGbookList();
			})
			$('.gb_btn6').on('click', function(){
					gbOwnerIdx = $('.gb_btn6').val();
					getGbookList();
			})
			$('.gb_btn7').on('click', function(){
					gbOwnerIdx = $('.gb_btn7').val();
					getGbookList();
			})
			$('.gb_btn8').on('click', function(){
					gbOwnerIdx = $('.gb_btn8').val();
					getGbookList();
			})
		
		}
		
		    
		
		
		/* 회원 A 방명록의 리스트 출력 --------------------------------------- */
		
		function getGbookList(gbOwnerIdx) {
		
			console.log('방명록주인:'+gbOwnerIdx);
			//hideMainForm();
			
			hideMoveToGb();
			showGbookList();
			
			
			$.ajax({
 				url: awsHostUrl + '/guestbook/list/' + gbOwnerIdx + '/' + page,
 				type: 'GET',
 				success:function(data){
 				
 					// 비밀글 수
 					var secretNum = 0;
 					
 					// 방명록 목록
 					var listhtml = '<div class="gblist_title">';
 					listhtml += 		'<button type="button" onclick="backToPreview()" class="gb_back_btn"><img width="15" src="'+awsHostUrl+'/image/main/back.png"></button>';
 					listhtml += 		'<span>'+ gbOwnerIdx +'님의 GuestBook('+ data.totalGuestbookCount +')</span>';
 					listhtml += 		'<button type="button" onclick="openRegModal()" class="reg_modal_open_btn"><img width="30" src="'+awsHostUrl+'/image/icon/write2.png"></button>';
 					listhtml += 	'</div>';	
 					listhtml += 	'<div class="gblist">';
 					listhtml += 		'<table class="gblist_table">';
 					
 					for(var i=0; i<data.guestbookList.length; i++) {
	 							
	 					// 방명록 주인이거나 작성자인 경우에만, 비밀글 열람			
	 					if(memIdx == gbOwnerIdx || memIdx == data.guestbookList[i].writerNo){
	 						
	 						
	 						// 비밀글은 css 처리
	 						if(data.guestbookList[i].secret == 'Y') {
	 							listhtml +=				'<tbody id="'+data.guestbookList[i].gbookNo+'" class="secretGb">'
	 						} else {
	 							listhtml +=				'<tbody id="'+data.guestbookList[i].gbookNo+'">'
	 						}
	 						
	 						
		 					listhtml += 				'<tr class="gblist_width">';
		 					listhtml += 					'<td rowspan="2" class="gblist_memImgR">';
		 					listhtml += 						'<img width="30" class="gblist_memImg" src="'+awsHostUrl+'/image/main/blue.jpg">';
		 					listhtml += 					'</td>';
		 					listhtml += 					'<td class="gblist_name">'+ data.guestbookList[i].writerName +'('+ data.guestbookList[i].writerNo +')'+ data.guestbookList[i].secret +'</td>';
		 					listhtml +=						'<td class="gblist_btns">';
		 					
		 					
                    		listhtml +=						'<div class="gbDropdown">';
                    		listhtml += 						'<label for="gbDropBtn"><img height="15" src="'+awsHostUrl+'/image/icon/usefulbutton.png"></label>';
                    		listhtml +=								'<button id="gbDropBtn" style="display:none;" onclick="dropMenu()"></button>';
                    		listhtml += 						'<div id="gbDropContent" class="gbDropdownContent">';
                    		
		 					// 방명록 주인 -> 삭제 버튼만 보이게
		 					if(memIdx == gbOwnerIdx){
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
								listhtml +=						'<td class="font7">'+ data.guestbookList[i].writerLoc +' · <fmt:formatDate value="'+ data.guestbookList[i].regDate +'" pattern="yyyy.MM.dd."/></td>';			
								listhtml +=						'<td rowspan="2" class="gblist_uploadPhoto">';
								listhtml +=							'<div><img id="gblist_Photo" src="' + awsHostUrl + uploadFileUrl + data.guestbookList[i].contentPhoto +'" onclick="gbPopImage(this.src)" ></div><div class="gbOriginalImage" onclick="closeGbPopup()"><div class="gbBigImg" id="gbBigImg"></div></div>';
								listhtml +=						'</td>';
								listhtml +=					'</tr>';
								listhtml +=					'<tr class="gblist_con">';
								listhtml +=						'<td colspan="2" class="gblist_content">'+ data.guestbookList[i].content.replace(/(?:\r\n|\r|\n)/g,'<br/>')+'</td>';
								listhtml +=							'<input type="hidden" name="secret" id="secret" value="'+ data.guestbookList[i].secret +'">';
								listhtml +=					'</tr> ';	
								listhtml +=				'</tbody>';
							} else {
								listhtml +=					'<tr class="gblist_info">';
								listhtml +=						'<td class="font7">'+ data.guestbookList[i].writerLoc +' · <fmt:formatDate value="'+ data.guestbookList[i].regDate +'" pattern="yyyy.MM.dd."/></td>';			
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
			 					listhtml += 						'<img width="30" class="gblist_memImg" src="'+awsHostUrl+'/image/main/blue.jpg">';
			 					listhtml += 					'</td>';
			 					listhtml += 					'<td class="gblist_name">'+ data.guestbookList[i].writerName +'('+ data.guestbookList[i].writerNo +')'+ data.guestbookList[i].secret +'</td>';
			 					listhtml +=						'<td class="gblist_btns">';	 					
			 					listhtml +=						'<input type="hidden" name="gbookNo" id="'+ data.guestbookList[i].gbookNo +'" value="'+ data.guestbookList[i].gbookNo +'">';
			 					listhtml +=					'</tr>';
			 					
		
								// 첨부 사진 없는 경우, 이미지 출력 X
			 					if(data.guestbookList[i].contentPhoto != null) {
			 						listhtml +=					'<tr class="gblist_info">';
									listhtml +=						'<td class="font7">'+ data.guestbookList[i].writerLoc +' · <fmt:formatDate value="'+ data.guestbookList[i].regDate +'" pattern="yyyy.MM.dd."/></td>';			
									listhtml +=						'<td rowspan="2" class="gblist_uploadPhoto">';
									listhtml +=							'<div><img src="' + awsHostUrl + uploadFileUrl + data.guestbookList[i].contentPhoto +'" onclick="gbPopImage(this.src)"></div><div class="gbOriginalImage" onclick="closeGbPopup()"><div class="gbBigImg" id="gbBigImg"></div></div>';
									listhtml +=						'</td>';
									listhtml +=					'</tr>';
									listhtml +=					'<tr class="gblist_con">';
									listhtml +=						'<td colspan="2" class="gblist_content">'+ data.guestbookList[i].content.replace(/(?:\r\n|\r|\n)/g,'<br/>') +'</td>';
									listhtml +=							'<input type="hidden" name="secret" id="secret" value="'+ data.guestbookList[i].secret +'">';
									listhtml +=					'</tr> ';	
									listhtml +=				'</tbody>';
			 					
								} else {
									listhtml +=					'<tr class="gblist_info">';
									listhtml +=						'<td colspan="2" class="font7">'+ data.guestbookList[i].writerLoc +' · <fmt:formatDate value="'+ data.guestbookList[i].regDate +'" pattern="yyyy.MM.dd."/></td>';			
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
 					
 					
 					// 데이터가 없으면 출력
 					if(data.guestbookList.length == 0) {
 						$('.gblist').css('min-height','500px');
 						listhtml +=	'<div>'+gbOwnerIdx+'님에게 첫 방명록을 남겨보세요!</div>';
 					}
 					
 					
 					$('#gblistForm').html(listhtml);
 					
 					
 					
 					// 방명록 주인인 경우, 등록 버튼 비활성화
 					if(memIdx == gbOwnerIdx) {
 						$('.reg_modal_open_btn').attr('disabled', 'disabled');
 					}

 					
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
	        $('.gbOriginalImage').css('display', 'flex');
	        
	        $('.gbBigImg').html('<img src="'+url+'">').animate({width: 'max', height:'max'}, 1000);
	        $('.gbBigImg img').css('width', '300');
	        $('.gbBigImg img').css('height', 'auto');
	 
        }

		/* 이미지 팝업 숨김처리 */
		function closeGbPopup() {
			$('.gbOriginalImage').css('display', 'none');
		}
		
		
		
        // 프로필사진으로 이동 (추후 추가*)
        function backToPreview() {
        
        }
        
        
        
        
        
        
		
		


        /* 방명록 등록 모달 ----------------------------------------------- */
		
		/* 등록 모달 창 만들기 */
        function setRegModal() {
            
        	var reghtml = '<table class="regModal_table"><input type="hidden" id="gbOwnerNo" name="gbOwnerNo" value="'+gbOwnerIdx+'">'
						+	'<tr class="gbGreetArea" height="100">'
						+		'<td class="gbTableExp" colspan="2"><span class="font3">잘 보셨나요?</span><br><span class="font5">'+gbOwnerIdx+'님에게 인사를 남겨보세요:)</span></td>'
						+		'<td class="gbTableImg"><img width="65" src="'+awsHostUrl+'/image/main/guestbook.png"></td>'
						+	'</tr>'
						+	'<tr class="gbInsertArea1" height="90">'
						+		'<td class="gbInsertPhoto"><label for="gbContentPhoto"><img width="30" src="'+awsHostUrl+'/image/main/camera.png"></label>'
						+			'<input type="file" id="gbContentPhoto" name="gbContentPhoto" accept="image/jpeg,image/png,image/gif" style="display:none;" onchange="chkImage(this)"></td>'
						+		'<td id="gbPreview" class="gbPreview" colspan="2">'
						+			'<div class="deletePreviewImg">'
						+			'</div>'
						+		'</td>'
						+	'</tr>'
						+	'<tr class="gbInsertArea2" height="210">'
						+		'<td class="gbInsertText" colspan="3">'
						+			'<textarea id="gbContent" name="gbContent" cols="204" wrap="hard" placeholder="'+gbOwnerIdx+'님의 스타일은 어떤가요? &#13;&#10;하고 싶은 말을 여기에 적어보세요."></textarea></td>'
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
        	setRegModal();
        	$('.regModal_wrapper').css('display', '');
        }
        
        /* 등록 모달 창 닫기 */ 
        function closeRegModal() {
        	$('.regModal_wrapper').css('display', 'none');
        }

		
        /* 방명록 등록 */
        function regGuestbook() {
        	
        	// 로그인 체크 추가 **

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
   	           		getGbookList();
   	           		// 모달창 닫기
   	           		closeRegModal();
   	           	
   	            },
   	            error: function (e) {
   	                alert('등록 데이터 ajax 에러' + e);
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
	           		
	           		var uformhtml = '<table class="regModal_table"><input type="hidden" id="gbOwnerNo" name="gbOwnerNo" value="'+gbOwnerIdx+'"><input type="hidden" id="gbNo" name="gbNo" value="'+gbNo+'">'
								+		'<tr class="gbGreetArea" height="100">'
								+			'<td class="gbTableExp" colspan="2"><span class="font3">잘 보셨나요?</span><br><span class="font5">'+gbOwnerIdx+'님에게 인사를 남겨보세요 :)</span></td>'
								+			'<td class="gbTableImg"><img width="65" src="'+awsHostUrl+'/image/main/guestbook.png"></td>'
								+		'</tr>'
								+		'<tr class="gbInsertArea1" height="90">'
								+			'<td class="gbInsertPhoto"><label for="gbContentPhoto"><img width="30" src="'+awsHostUrl+'/image/main/camera.png"></label>'
								+				'<input type="file" id="gbContentPhoto" name="gbContentPhoto" accept="image/jpeg,image/png,image/gif" style="display:none;" onchange="chkImage(this)"></td>'
								+			'<td id="gbPreview" class="gbPreview" colspan="2">'
								+				'<div class="deletePreviewImg">';
					
								if(gbInfo.contentPhoto != null) {
									uformhtml +=				'<img height="60" id="gbBeforePhoto" src="' + awsHostUrl + uploadFileUrl + gbInfo.contentPhoto +'">';
									uformhtml +=				'<img width="8" id="deletePreview_btn" width="30" src="'+awsHostUrl+'/image/icon/x.png" onclick="deletePreview()">';
								}			
								
					uformhtml +=				'</div>'
								+			'</td>'
								+		'</tr>'
								+		'<tr class="gbInsertArea2" height="210">'
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
	                alert('수정 데이터 ajax 에러' + e);
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
				
				previewhtml = '<img width="60" height="auto" id="gbBeforePhoto" src="' + event.target.result +'">'
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
	           		getGbookList();
	           		// 모달창 닫기
	           		closeUpdateModal();
	           	
	            },
	            error: function (e) {
	                alert('수정 데이터 ajax 에러' + e);
	            }
       		})
        	
        	
        }

        
        
 		/* 방명록 삭제 모달 ----------------------------------------------- */
		
		/* 삭제 모달 창 만들기 */
        function setDeleteModal(gbNo) {
            
			console.log(gbNo);
			
        	var reghtml = '<table class="regModal_table"><input type="hidden" id="gbOwnerNo" name="gbOwnerNo" value="'+gbOwnerIdx+'">'
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
	           		getGbookList();
	           		// 모달창 닫기
	           		closeDeleteModal();
	           	
	            },
	            error: function (e) {
	                alert('삭제 데이터 ajax 에러' + e);
	            }
       		})
       	}
        
        
        
        
        
		/* 메인 폼 */
		function showMainForm() {
			$('#mainForm').css('display', '');
		}
		
		function hideMainForm() {
			$('#mainForm').css('display', 'none');
		}
		
		/* moveToGb */
		function showMoveToGb() {
			$('#moveToGb').css('display', '');
		}
		
		function hideMoveToGb() {
			$('#moveToGb').css('display', 'none');
		}
		
		/* 게스트북 리스트 */
		function showGbookList() {
			$('#gblistForm').css('display','');
		}
		
		function hideGbookList() {
			$('#gblistForm').css('display','none');
		}
        
        
        
        
        
        
        
        
 
		
