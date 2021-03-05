
		var locObj = {};		// 위치좌표를 저장할 객체 
		var addressApiData;		// API 주소 데이터 저장할 배열
		var nowGu;				// 현재 위치 00구 (메인 출력용)
		var nowLoc = '';		// 현재 위치 00시 00구
		
		var nowWth;				// 현재 날씨
		
		var latitude;			// GPS 위도 
		var longitude;			// GPS 경도
		var x;					// X 좌표 (기상청 기준)
		var y;					// Y 좌표 (기상청 기준)
		
		var wn_data;			// 초단기실황 데이터
		var wbt_data;			// 동네예보 데이터
		
		var icon_now;			// 아이콘
    	var tmp_min;			// 일일 최저 기온
		var tmp_max;			// 일일 최고 기온 
		var tmp_now;			// 현재 기온
		var rain_now;			// 현재 강수량 
		var pty_now;			// 현재 강수형태
		var sky_now;			// 현재 하늘형태
		
		
		
		
		function getLocAndWeather() {
		
			if (navigator.geolocation) { // GPS를 지원하면
				navigator.geolocation.getCurrentPosition(function(p) {
					latitude = p.coords.latitude;
					longitude = p.coords.longitude;
					
					// 위도/경도 -> 기상청 좌표x / 좌표 y 변환
					var rs = dfs_xy_conv("toXY",latitude,longitude);
					x = rs['x'];
					y = rs['y'];
					
					//console.log(rs);
					//console.log('x좌표 : '+ x, 'y좌표 : '+ y, 'latitude : '+ latitude, 'longitude : '+ longitude);
					
			        
			     	// xy 좌표로 js로 날씨 API 불러오기 => CORS 문제 발생
					//xml2json(x, y);
			     	
			     	// CORS 문제 해결 : 위치정보를 ajax로 서버에 전송
			    	// 위치정보를 자바스크립트 객체에 담는다.
			        locObj =  { 
			    			x : x, 
			    			y : y, 
			    			lat : latitude, 
			    			lot : longitude
			    	};
			    	
			    	console.log(locObj);
			    	
			    	
			    	setTimeout(function(){
			    	
				    	// xy 좌표로 주소 구하기
				    	$.ajax({
				    		url: awsHostUrl + '/address/' + x + '/' + y,
				    		type: 'GET',
				    		async: false,
				    		success: function(aData) {
				    			console.log('주소 호출 성공');
				    			
				    			addressApiData = aData;
				    			
				    			var defaultCity = aData[0].city;
				    			var defaultGu = aData[0].gu;
				    			
				    			console.log(aData);
				    			//console.log(defaultCity);
				    			//console.log(defaultGu);
				    			
				    			$('#btnLocc').html(defaultGu);
				    			
				    			nowLoc = defaultCity + ' ' + defaultGu;
				    			
				    			console.log(addressApiData);
				    			console.log(nowLoc);
				    			
				    		}, 
				    		error: function(){
				    			console.log('주소 호출 실패');
				        	}
				    	
				    	}).done(function(data){
				    		console.log('XY좌표 성공');
				    	}).fail(function(data){
				    		console.log('XY좌표 실패');
				    	});
			    	
			    	
			    	}, 1000 * 2); 	// 2초 지연
			    	
			    	
			    	
			    	
			    	
			    	
			    	/* 메인 화면 날씨 ---------------------------------------------------------------------------- */
			    	
			    	
			    	
			    	// 초단기실황 API 데이터
			    	
			        $.ajax({
			        	url: awsHostUrl + '/weathernow',
			        	type: 'GET',
			        	data : locObj,
			        	async: false,	
			        	success: function(data){
			        		console.log('초단기실황 API 호출 성공');
			        		//console.log(data);
			        		
			        		var jsonObj = JSON.parse(data);
			        		wn_data = jsonObj.response.body.items.item;
			        		
			        		for(var i=0; i < wn_data.length; i++) {
			        			var wn_category = wn_data[i].category;
			        			var wn_obsrValue = wn_data[i].obsrValue;
		                		var wn_baseDate = wn_data[i].baseDate;
		                		var wn_baseTime = wn_data[i].baseTime;
			        		
			        			//console.log('wn_category: '+ wn_category, 'wn_obsrValue: '+ wn_obsrValue, 'wn_baseDate : '+ wn_baseDate, 'wn_baseTime: '+ wn_baseTime);
			        		
			        			// 현재 기온
				              	if(wn_category=='T1H') {
				              		tmp_now = wn_obsrValue;
				              	
				              		if((tmp_now*10)%10 == 0){	// 소수점 떼기 
				              			tmp_now = parseInt(tmp_now);
				              		}
				              		//$('#tmp_now').html(tmp_now);
				              	}
				              	
				              	// 현재 강수형태 -> 하늘상태 값과 비교 후 한글로 변환해서 출력 예정
				              	if(wn_category=='PTY'){
				              		pty_now = wn_obsrValue;
				              	}
			        		
			        		}
			        		
			        	},
			        	error: function(){
			        		console.log('초단기실황 API 호출 실패');
			        	}
			        }); 
			  
			  
			  		// 동네예보 API 데이터 
			  		
			    	$.ajax({
			        	url: awsHostUrl + '/weatherbytime',
			        	type: 'GET',
			        	data : locObj,
			        	async: false,	
			        	success: function(data){
			        		console.log('동네예보 API 호출 성공');
			        		//console.log(data);
			        		
			        		var jsonObj = JSON.parse(data);
			        		wbt_data = jsonObj.response.body.items.item;
			        		
			        		for(var i=0; i < wbt_data.length; i++) {
			        			var wbt_category = wbt_data[i].category;
			        			var wbt_fcstValue = wbt_data[i].fcstValue;
		                		var wbt_fcstDate = wbt_data[i].fcstDate;
		                		var wbt_fcstTime = wbt_data[i].fcstTime;
		                		
			        			// 현재 하늘형태 -> 하늘상태 값과 비교 후 한글로 변환해서 출력 예정
				              	if(wbt_category=='SKY'){
				              		sky_now = wbt_fcstValue;
				              	}
			        		
			        			// 일일 최저 기온
				              	if(wbt_category=='TMN' && i < wbt_data.length/2){  // 당일 최저 기온만
				              		tmp_min = wbt_fcstValue;
				              
				              		if((tmp_min*10)%10 == 0){	// 소수점 떼기 
				              			tmp_min = parseInt(tmp_min);
				              		}
				              		//$('#tmp_min').html(tmp_min +'°');
				              	}
			              	
				              	// 일일 최고 기온
				              	if(wbt_category=='TMX' && i < wbt_data.length/2) {	// 당일 최고 기온만
				              		tmp_max = wbt_fcstValue;
				              		
				              		if((tmp_max*10)%10 == 0){	// 소수점 떼기 
				              			tmp_max = parseInt(tmp_max);
				              		}
				              		//$('#tmp_max').html(tmp_max +'° /');
				              	}
			        		
			        		}
			        		
			        	},
			        	error: function(){
						    console.log('동네예보 API 호출 실패');
			        	}
			        }); 
			    	
			    	
			    	
			    	// 한글로 변환
			    	// PTY 강수형태 : 	없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
				    // SKY 하늘상태 : 	맑음(1), 구름많음(3), 흐림(4)
				    
				    if(sky_now == 1) {
				    	sky_now = '맑음';
				    	icon_now = 'sunny';
				    } else if(sky_now == 3) {
				    	sky_now = '구름많음';
				    	icon_now = 'cloudy';
				    } else {
				   		sky_now = '흐림';
				   		icon_now = 'cloudy';
				    }
				    
				    switch(pty_now) {
				    	case 0 :
				    		pty_now = 0;
				    		break;
				    	case 1 :
				    		pty_now = '비';
				    		icon_now = 'rainy';
				    		break;
				    	case 2 :
				    		pty_now = '비/눈';
				    		icon_now = 'cloudwithsnow';
				    		break;
				    	case 3 :
				    		pty_now = '눈';
				    		icon_now = 'snowy';
				    		break;
				    	case 4 :
				    		pty_now = '소나기';
				    		icon_now = 'rainy';
				    		break;
				    	case 5 :
				    		pty_now = '빗방울';
				    		icon_now = 'rainy';
				    		break;
				    	case 6 :
				    		pty_now = '빗방울/눈날림';
				    		icon_now = 'cloudwithsnow';
				    		break;
				    	case 7 :
				    		pty_now = '눈날림';
				    		icon_now = 'snowy';
				    		break;
				    } 
				    
				    console.log(wn_data);
					console.log(wbt_data);
					
				    
		       		var wnhtml = '<div class="weather_now">';
		       		wnhtml += 		'<table>';
		       		wnhtml += 			'<tr>';
		       		wnhtml += 				'<td colspan="2" class="font3" id="sky_now">' + (pty_now == 0? sky_now : pty_now) + '</td>';
		       		wnhtml += 			'</tr>';
		       		wnhtml += 			'<tr>';
		       		wnhtml += 				'<td colspan="2" class="font1" id="tmp_now">'+tmp_now+'°</td>';
		       		wnhtml += 			'</tr>';
		       		wnhtml += 			'<tr>';
		       		wnhtml += 				'<td class="font5" id="tmp_max">최고:'+tmp_max+'° /</td>';
		       		wnhtml += 			'<td class="font5" id="tmp_min">최저:'+tmp_min+'°</td>';
		       		wnhtml +=			'</tr>';
		       		wnhtml += 		'</table>';
		       		wnhtml += 	'</div>';
		       		
		       		$('.weather_now').html(wnhtml);
		       		
		       		
		       		var iconhtml = '<div class="weather_icon_wrap">';
					iconhtml += 		'<img width="75" src="'+awsHostUrl+'/image/main/weather/'+ icon_now +'.png">';
					iconhtml += 	'</div>';
		       		
		       		$('.weather_icon').html(iconhtml);
		       		
		       		// 현재 날씨 (하늘, 평균/최고/최저 기온) 저장
		       		nowWth = {
		       			sky : (pty_now == 0? sky_now : pty_now),
		       			avTemp : tmp_now,
		       			maxTemp : tmp_max,
		       			minTemp : tmp_min
		       		};
		       		
		       		console.log(nowWth);
		       		
		       		disableBtn();
		       		
				
			  	}, function(error) {
							console.error(error);
							console.log('getLocAndWeather 에러');
			  	}, {
			  		enableHighAccuracy	: false,
			  		maximumAge			: 0,
			  		timeout				: Infinity
			  	});
			  	
			} else {
				
				// geolocation 에러 분기 -----------------------------------------
			
				  console.log('GPS를 지원하지 않습니다');
				  console.log('Default 좌표 날씨 출력');
			        		
			        		// default 좌표값
			        		locObj =  { 
				    			x : 60, 
				    			y : 127, 
				    			lat : 0, 
				    			lot : 0
			    			};
			        		
			        		
			        			// 초단기실황 API 데이터
			    	
						        $.ajax({
						        	url: awsHostUrl + '/weathernow',
						        	type: 'GET',
						        	data : locObj,
						        	async: false,
						        	success: function(data){
						        		console.log('초단기실황 API 호출 성공');
						        		//console.log(data);
						        		
						        		var jsonObj = JSON.parse(data);
						        		wn_data = jsonObj.response.body.items.item;
						        		
						        		for(var i=0; i < wn_data.length; i++) {
						        			var wn_category = wn_data[i].category;
						        			var wn_obsrValue = wn_data[i].obsrValue;
					                		var wn_baseDate = wn_data[i].baseDate;
					                		var wn_baseTime = wn_data[i].baseTime;
						        		
						        			//console.log('wn_category: '+ wn_category, 'wn_obsrValue: '+ wn_obsrValue, 'wn_baseDate : '+ wn_baseDate, 'wn_baseTime: '+ wn_baseTime);
						        		
						        			// 현재 기온
							              	if(wn_category=='T1H') {
							              		tmp_now = wn_obsrValue;
							              	
							              		if((tmp_now*10)%10 == 0){	// 소수점 떼기 
							              			tmp_now = parseInt(tmp_now);
							              		}
							              		//$('#tmp_now').html(tmp_now);
							              	}
							              	
							              	// 현재 강수형태 -> 하늘상태 값과 비교 후 한글로 변환해서 출력 예정
							              	if(wn_category=='PTY'){
							              		pty_now = wn_obsrValue;
							              	}
						        		
						        		}
						        		
						        	},
						        	error: function(){
						        		console.log('초단기실황 API 호출 실패');
						        	}
						        }); 
						  
						  
						  		// 동네예보 API 데이터 
						  		
						    	$.ajax({
						        	url: awsHostUrl + '/weatherbytime',
						        	type: 'GET',
						        	data : locObj,
						        	async: false,	
						        	success: function(data){
						        		console.log('동네예보 API 호출 성공');
						        		//console.log(data);
						        		
						        		var jsonObj = JSON.parse(data);
						        		wbt_data = jsonObj.response.body.items.item;
						        		
						        		for(var i=0; i < wbt_data.length; i++) {
						        			var wbt_category = wbt_data[i].category;
						        			var wbt_fcstValue = wbt_data[i].fcstValue;
					                		var wbt_fcstDate = wbt_data[i].fcstDate;
					                		var wbt_fcstTime = wbt_data[i].fcstTime;
					                		
						        			// 현재 하늘형태 -> 하늘상태 값과 비교 후 한글로 변환해서 출력 예정
							              	if(wbt_category=='SKY'){
							              		sky_now = wbt_fcstValue;
							              	}
						        		
						        			// 일일 최저 기온
							              	if(wbt_category=='TMN' && i < wbt_data.length/2){  // 당일 최저 기온만
							              		tmp_min = wbt_fcstValue;
							              
							              		if((tmp_min*10)%10 == 0){	// 소수점 떼기 
							              			tmp_min = parseInt(tmp_min);
							              		}
							              		//$('#tmp_min').html(tmp_min +'°');
							              	}
						              	
							              	// 일일 최고 기온
							              	if(wbt_category=='TMX' && i < wbt_data.length/2) {	// 당일 최고 기온만
							              		tmp_max = wbt_fcstValue;
							              		
							              		if((tmp_max*10)%10 == 0){	// 소수점 떼기 
							              			tmp_max = parseInt(tmp_max);
							              		}
							              		//$('#tmp_max').html(tmp_max +'° /');
							              	}
						        		
						        		}
						        		
						        	},
						        	error: function(){
						        		console.log('동네예보 API 호출 실패');
						        	}
						        }); 
						    	
						    	
						    	
						    	// 한글로 변환
						    	// PTY 강수형태 : 	없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
							    // SKY 하늘상태 : 	맑음(1), 구름많음(3), 흐림(4)
							    
							    if(sky_now == 1) {
							    	sky_now = '맑음';
							    	icon_now = 'sunny';
							    } else if(sky_now == 3) {
							    	sky_now = '구름많음';
							    	icon_now = 'cloudy';
							    } else {
							   		sky_now = '흐림';
							   		icon_now = 'cloudy';
							    }
							    
							    switch(pty_now) {
							    	case 0 :
							    		pty_now = 0;
							    		break;
							    	case 1 :
							    		pty_now = '비';
							    		icon_now = 'rainy';
							    		break;
							    	case 2 :
							    		pty_now = '비/눈';
							    		icon_now = 'cloudwithsnow';
							    		break;
							    	case 3 :
							    		pty_now = '눈';
							    		icon_now = 'snowy';
							    		break;
							    	case 4 :
							    		pty_now = '소나기';
							    		icon_now = 'rainy';
							    		break;
							    	case 5 :
							    		pty_now = '빗방울';
							    		icon_now = 'rainy';
							    		break;
							    	case 6 :
							    		pty_now = '빗방울/눈날림';
							    		icon_now = 'cloudwithsnow';
							    		break;
							    	case 7 :
							    		pty_now = '눈날림';
							    		icon_now = 'snowy';
							    		break;
							    } 
							    
							    console.log(wn_data);
								console.log(wbt_data);
								
							    
					       		var wnhtml = '<div class="weather_now">';
					       		wnhtml += 		'<table>';
					       		wnhtml += 			'<tr>';
					       		wnhtml += 				'<td colspan="2" class="font3" id="sky_now">' + (pty_now == 0? sky_now : pty_now) + '</td>';
					       		wnhtml += 			'</tr>';
					       		wnhtml += 			'<tr>';
					       		wnhtml += 				'<td colspan="2" class="font1" id="tmp_now">'+tmp_now+'°</td>';
					       		wnhtml += 			'</tr>';
					       		wnhtml += 			'<tr>';
					       		wnhtml += 				'<td class="font5" id="tmp_max">최고:'+tmp_max+'° /</td>';
					       		wnhtml += 			'<td class="font5" id="tmp_min">최저:'+tmp_min+'°</td>';
					       		wnhtml +=			'</tr>';
					       		wnhtml += 		'</table>';
					       		wnhtml += 	'</div>';
					       		
					       		$('.weather_now').html(wnhtml);
					       		
					       		
					       		var iconhtml = '<div class="weather_icon_wrap">';
								iconhtml += 		'<img width="75" src="'+awsHostUrl+'/image/main/weather/'+ icon_now +'.png">';
								iconhtml += 	'</div>';
					       		
					       		$('.weather_icon').html(iconhtml);
					       		
					       		// 현재 날씨 (하늘, 평균/최고/최저 기온) 저장
					       		nowWth = {
					       			sky : (pty_now == 0? sky_now : pty_now),
					       			avTemp : tmp_now,
					       			maxTemp : tmp_max,
					       			minTemp : tmp_min
					       		};
					       		
					       		console.log(nowWth);
				  
				  disableBtn();
				  
				  
			}
		
		} 
		
		
		
		
		
		
		/* 위치 호출 없이 날씨 API 데이터 호출 -------------------------------------------- */
		
		function getWeather() {
		
			console.log(locObj);
		
		
			    	
			    	// 초단기실황 API 데이터
			    	
			        $.ajax({
			        	url: awsHostUrl + '/weathernow',
			        	type: 'GET',
			        	data : locObj,
			        	async: false,	
			        	success: function(data){
			        		console.log('초단기실황 API 호출 성공');
			        		//console.log(data);
			        		
			        		var jsonObj = JSON.parse(data);
			        		wn_data = jsonObj.response.body.items.item;
			        		
			        		for(var i=0; i < wn_data.length; i++) {
			        			var wn_category = wn_data[i].category;
			        			var wn_obsrValue = wn_data[i].obsrValue;
		                		var wn_baseDate = wn_data[i].baseDate;
		                		var wn_baseTime = wn_data[i].baseTime;
			        		
			        			//console.log('wn_category: '+ wn_category, 'wn_obsrValue: '+ wn_obsrValue, 'wn_baseDate : '+ wn_baseDate, 'wn_baseTime: '+ wn_baseTime);
			        		
			        			// 현재 기온
				              	if(wn_category=='T1H') {
				              		tmp_now = wn_obsrValue;
				              	
				              		if((tmp_now*10)%10 == 0){	// 소수점 떼기 
				              			tmp_now = parseInt(tmp_now);
				              		}
				              		//$('#tmp_now').html(tmp_now);
				              	}
				              	
				              	// 현재 강수형태 -> 하늘상태 값과 비교 후 한글로 변환해서 출력 예정
				              	if(wn_category=='PTY'){
				              		pty_now = wn_obsrValue;
				              	}
			        		
			        		}
			        		
			        	},
			        	error: function(){
			        		console.log('초단기실황 API 호출 실패');
			        	}
			        }); 
			  
			  
			  		// 동네예보 API 데이터 
			  		
			    	$.ajax({
			        	url: awsHostUrl + '/weatherbytime',
			        	type: 'GET',
			        	data : locObj,
			        	async: false,	
			        	success: function(data){
			        		console.log('동네예보 API 호출 성공');
			        		//console.log(data);
			        		
			        		var jsonObj = JSON.parse(data);
			        		wbt_data = jsonObj.response.body.items.item;
			        		
			        		for(var i=0; i < wbt_data.length; i++) {
			        			var wbt_category = wbt_data[i].category;
			        			var wbt_fcstValue = wbt_data[i].fcstValue;
		                		var wbt_fcstDate = wbt_data[i].fcstDate;
		                		var wbt_fcstTime = wbt_data[i].fcstTime;
		                		
			        			// 현재 하늘형태 -> 하늘상태 값과 비교 후 한글로 변환해서 출력 예정
				              	if(wbt_category=='SKY'){
				              		sky_now = wbt_fcstValue;
				              	}
			        		
			        			// 일일 최저 기온
				              	if(wbt_category=='TMN' && i < wbt_data.length/2){  // 당일 최저 기온만
				              		tmp_min = wbt_fcstValue;
				              
				              		if((tmp_min*10)%10 == 0){	// 소수점 떼기 
				              			tmp_min = parseInt(tmp_min);
				              		}
				              		//$('#tmp_min').html(tmp_min +'°');
				              	}
			              	
				              	// 일일 최고 기온
				              	if(wbt_category=='TMX' && i < wbt_data.length/2) {	// 당일 최고 기온만
				              		tmp_max = wbt_fcstValue;
				              		
				              		if((tmp_max*10)%10 == 0){	// 소수점 떼기 
				              			tmp_max = parseInt(tmp_max);
				              		}
				              		//$('#tmp_max').html(tmp_max +'° /');
				              	}
			        		
			        		}
			        		
			        	},
			        	error: function(){
			        		console.log('동네예보 API 호출 실패');
			        	}
			        }); 
			    	
			    	
			    	
			    	// 한글로 변환
			    	// PTY 강수형태 : 	없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
				    // SKY 하늘상태 : 	맑음(1), 구름많음(3), 흐림(4)
				    
				    if(sky_now == 1) {
				    	sky_now = '맑음';
				    	icon_now = 'sunny';
				    } else if(sky_now == 3) {
				    	sky_now = '구름많음';
				    	icon_now = 'cloudy';
				    } else {
				   		sky_now = '흐림';
				   		icon_now = 'cloudy';
				    }
				    
				    switch(pty_now) {
				    	case 0 :
				    		pty_now = 0;
				    		break;
				    	case 1 :
				    		pty_now = '비';
				    		icon_now = 'rainy';
				    		break;
				    	case 2 :
				    		pty_now = '비/눈';
				    		icon_now = 'cloudwithsnow';
				    		break;
				    	case 3 :
				    		pty_now = '눈';
				    		icon_now = 'snowy';
				    		break;
				    	case 4 :
				    		pty_now = '소나기';
				    		icon_now = 'rainy';
				    		break;
				    	case 5 :
				    		pty_now = '빗방울';
				    		icon_now = 'rainy';
				    		break;
				    	case 6 :
				    		pty_now = '빗방울/눈날림';
				    		icon_now = 'cloudwithsnow';
				    		break;
				    	case 7 :
				    		pty_now = '눈날림';
				    		icon_now = 'snowy';
				    		break;
				    } 
				    
				    console.log(wn_data);
					console.log(wbt_data);
					
				    
		       		var wnhtml = '<div class="weather_now">';
		       		wnhtml += 		'<table>';
		       		wnhtml += 			'<tr>';
		       		wnhtml += 				'<td colspan="2" class="font3" id="sky_now">' + (pty_now == 0? sky_now : pty_now) + '</td>';
		       		wnhtml += 			'</tr>';
		       		wnhtml += 			'<tr>';
		       		wnhtml += 				'<td colspan="2" class="font1" id="tmp_now">'+tmp_now+'°</td>';
		       		wnhtml += 			'</tr>';
		       		wnhtml += 			'<tr>';
		       		wnhtml += 				'<td class="font5" id="tmp_max">최고:'+tmp_max+'° /</td>';
		       		wnhtml += 			'<td class="font5" id="tmp_min">최저:'+tmp_min+'°</td>';
		       		wnhtml +=			'</tr>';
		       		wnhtml += 		'</table>';
		       		wnhtml += 	'</div>';
		       		
		       		$('.weather_now').html(wnhtml);
		       		
		       		
		       		var iconhtml = '<div class="weather_icon_wrap">';
					iconhtml += 		'<img width="75" src="'+awsHostUrl+'/image/main/weather/'+ icon_now +'.png">';
					iconhtml += 	'</div>';
		       		
		       		$('.weather_icon').html(iconhtml);
		       		
		       		// 현재 날씨 (하늘, 평균/최고/최저 기온) 저장
		       		nowWth = {
		       			sky : (pty_now == 0? sky_now : pty_now),
		       			avTemp : tmp_now,
		       			maxTemp : tmp_max,
		       			minTemp : tmp_min
		       		};
		       		
		       		console.log(nowWth);
		
		
		}
		
		
		
		
		
		
		
		/* 시간대별 날씨  --------------------------------------------------------------------------------------------------------------- */
		
		
		function getWeatherBT() {
			
			var wbt_fcstTime = [3,6,9,12,15,18,21,24,3,6,9,12,15,18,21];
			var wbt_fcstDay = ['오늘','오늘','오늘','오늘','오늘','오늘','오늘','오늘','내일','내일','내일','내일','내일','내일','내일']
			var wbt_tmp = [];		// 3시간 기온
			var wbt_rain = [];		// 3시간 강수확률
			var wbt_sky = [];		// 하늘상태
			var wbt_pty = [];		// 강수상태
			var icon_bt;			// 아이콘
			
			
			
			
			
			var wbtHtml = '<!-- 메인 wrap -->'
						+	'<div class="content_wrap">'
						+		'<!-- 메인 -->'
						+		'<div class="mainForm" id="mainForm">'
						+			'<form id="weatherByTimeForm" method="GET" enctype="multipart/form-data">'
						+ 				'<div class="weatherBT_title"><span class="font5"><b>시간대별 일기 예보</b></span></div>'
						+ 				'<div class="weatherBT_content">'
						+					'<div class="weatherBT_tableWrap">'
						+						'<div class="weatherBT_table">';
				
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
				
				// 하늘상태 --------> 강수상태와 비교 후 이미지 변환 처리 필요 * 
				if(wbt_category == 'SKY') {
					wbt_sky.push(wbt_fcstValue);
				}
				
				// 강수상태 
				if(wbt_category == 'PTY') {
					wbt_pty.push(wbt_fcstValue);
				}
				
			}	
			
			
			
			for(var j=0; j<wbt_fcstTime.length; j++){
			
				// 한글로 변환
				// PTY 강수형태 : 	없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
			    // SKY 하늘상태 : 	맑음(1), 구름많음(3), 흐림(4)
			    
				
				if(wbt_sky[j] == 1) {
			    	wbt_sky[j] = '맑음';
			    	icon_bt = 'sunny';
			    } else if(wbt_sky[i] == 3) {
			    	wbt_sky[j] = '구름많음';
			    	icon_bt = 'cloudy';
			    } else {
			   		wbt_sky[j] = '흐림';
			   		icon_bt = 'cloudy';
			    }
			    
			    switch(wbt_pty) {
			    	case 0 :
			    		wbt_pty[j] = 0;
			    		break;
			    	case 1 :
			    		wbt_pty[j] = '비';
			    		icon_bt = 'rainy';
			    		break;
			    	case 2 :
			    		wbt_pty[j] = '비/눈';
			    		icon_bt = 'cloudwithsnow';
			    		break;
			    	case 3 :
			    		wbt_pty[j] = '눈';
			    		icon_bt = 'snowy';
			    		break;
			    	case 4 :
			    		wbt_pty[j] = '소나기';
			    		icon_bt = 'rainy';
			    		break;
			    	case 5 :
			    		wbt_pty[j] = '빗방울';
			    		icon_bt = 'rainy';
			    		break;
			    	case 6 :
			    		wbt_pty[j] = '빗방울/눈날림';
			    		icon_bt = 'cloudwithsnow';
			    		break;
			    	case 7 :
			    		wbt_pty[j] = '눈날림';
			    		icon_bt = 'snowy';
			    		break;
			    } 
				
				
			    
				wbtHtml += 	 '<table>'
					+				'<tr style="height:20px;"><td id="weatherTable_time" class="font7">'+ wbt_fcstDay[j] +'</td></tr>'
					+ 				'<tr style="height:20px;"><td id="weatherTable_time" class="font7">'+ wbt_fcstTime[j] +'시</td></tr>'
					+				'<tr style="height:70px;"><td id="weatherTable_img"><img width="30" src="'+awsHostUrl+'/image/main/weather/' + icon_bt + '.png"></td></tr>'
					+ 				'<tr style="height:20px;"><td id="weatherTable_sky" class="font5">' + (wbt_pty[j] == 0? wbt_sky[j] : wbt_pty[j]) + '</td></tr>'
					+				'<tr style="height:110px;"><td id="weatherTable_tmp" class="font5">'+ wbt_tmp[j] +'°</td></tr>'
					+ 				'<tr style="height:50px;"><td id="weatherTable_rain" class="font7">'+ wbt_rain[j] +'%</td></tr>'
					+ 				'<tr style="height:10px;"><td id="weatherTable_rain_percent"><input type="button" id="rainPercentBar"></td></tr>'
					+ 		'</table>';
					
				$('#rainPercentBar').css('width', wbt_rain[j] * 5);
			}
			
				
			console.log('wbt_tmp: '+ wbt_tmp);
          	console.log('wbt_rain: '+ wbt_rain);
          	console.log('wbt_sky: '+ wbt_sky);
          	console.log('wbt_pty: '+ wbt_pty);
          	console.log('wbt_fcstTime: '+ wbt_fcstTime);
          	console.log('icon_bt: '+ icon_bt);
          	console.log(wbt_tmp.length);
          	console.log(wbt_rain.length);
          	console.log(wbt_sky.length);
          	console.log(wbt_pty.length);
          	console.log(wbt_fcstTime.length);
          	
          	
          	var rain_now;		// 강수량
          	var windD_now;		// 풍향
          	var wind_now;		// 풍속
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
          	
					
			wbtHtml += 			'</div>'
					+ 		'</div>'
					+	'</div>'
					+	'<div class="weatherBT_detail">'
					+			'<table>'
					+				'<tr><td class="onleft" id="wbt_currenttime">오늘, 오후 12:00</td>'
					+					'<td class="onright"></td></tr>'
					+				'<tr><td class="onleft"><img width="15" src="'+awsHostUrl+'/image/main/weather/wbtRain.png">강수량</td>'
					+					'<td class="onright"> '+ rain_now +' % </td></tr>'
					+				'<tr><td class="onleft"><img width="15" src="'+awsHostUrl+'/image/main/weather/wbtUmbrella.png">비</td>'
					+					'<td class="onright"> '+ rain_now +' mm </td></tr>'
					+				'<tr><td class="onleft"><img width="15" src="'+awsHostUrl+'/image/main/weather/wbtHumid.png">습도</td>'
					+					'<td class="onright"> '+ humidity_now +' %</td></tr>'
					+				'<tr><td class="onleft"><img width="15" src="'+awsHostUrl+'/image/main/weather/wbtWind.png">바람</td>'
					+					'<td class="onright"> '+ windD_now + wind_now +' m/s</td></tr>'
					+			'</table>' 
					+	'</div>'
					+ '</form>'
					+ '</div>'
					+ '</div>';
						
			$('#content').html(wbtHtml);
			
			wbtClock();
			

		}

		
		/* 시간대별 일기 예보 - 실시간 날짜 시계 구하기 */
        
	    function getWbtTime() {
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
		    
		    $('#wbt_currenttime').html(clockhtml);
		    
		    console.log(nowWth);
	    }
	    
	   	function wbtClock() {
	   		getWbtTime();
	   		setInterval(getWbtTime, 30 * 1000);	// 30초마다 함수 반복
	   	}





		// LCC DFS 좌표변환을 위한 기초 자료 
		
		var RE = 6371.00877; // 지구 반경(km)
		var GRID = 5.0; // 격자 간격(km)
		var SLAT1 = 30.0; // 투영 위도1(degree)
		var SLAT2 = 60.0; // 투영 위도2(degree)
		var OLON = 126.0; // 기준점 경도(degree)
		var OLAT = 38.0; // 기준점 위도(degree)
		var XO = 43; // 기준점 X좌표(GRID)
		var YO = 136; // 기1준점 Y좌표(GRID)
		var X;
		var Y;
		
		
		// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
		
		function dfs_xy_conv(code, v1, v2) {
			
		    var DEGRAD = Math.PI / 180.0;
		    var RADDEG = 180.0 / Math.PI;
		
		    var re = RE / GRID;
		    var slat1 = SLAT1 * DEGRAD;
		    var slat2 = SLAT2 * DEGRAD;
		    var olon = OLON * DEGRAD;
		    var olat = OLAT * DEGRAD;
		
		    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
		    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
		    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
		    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
		    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
		    ro = re * sf / Math.pow(ro, sn);
		    var rs = {};
		   
		    if (code == "toXY") {
		        rs['lat'] = v1;
		        rs['lng'] = v2;
		        var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
		        ra = re * sf / Math.pow(ra, sn);
		        var theta = v2 * DEGRAD - olon;
		        if (theta > Math.PI) theta -= 2.0 * Math.PI;
		        if (theta < -Math.PI) theta += 2.0 * Math.PI;
		        theta *= sn;
		        rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
		        rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
		    }
		    else {
		        rs['x'] = v1;
		        rs['y'] = v2;
		        var xn = v1 - XO;
		        var yn = ro - v2 + YO;
		        ra = Math.sqrt(xn * xn + yn * yn);
		        if (sn < 0.0) - ra;
		        var alat = Math.pow((re * sf / ra), (1.0 / sn));  
		        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;
		
		        if (Math.abs(xn) <= 0.0) {
		            theta = 0.0;
		        } 
		        else {
		            if (Math.abs(yn) <= 0.0) {
		                theta = Math.PI * 0.5;
		                if (xn < 0.0) - theta;
		            }
		            else theta = Math.atan2(xn, yn);
		        }
		        var alon = theta / sn + olon;
		        rs['lat'] = alat * RADDEG;
		        rs['lng'] = alon * RADDEG;
		    }
		   
		    return rs;
		}

