
		var location;		// 위치좌표를 저장할 객체 
		var address;		// API 데이터 저장할 배열
		var nowLoc;			// 현재 위치 (종로구)
		
		var icon_now;		// 아이콘
    	var tmp_min;		// 일일 최저 기온
		var tmp_max;		// 일일 최고 기온 
		var tmp_now;		// 현재 기온
		var rain_now;		// 현재 강수량 
		var pty_now;		// 현재 강수형태
		var sky_now;		// 현재 하늘형태
		
		
		
		
		function getLocation() {
		
			if (navigator.geolocation) { // GPS를 지원하면
				navigator.geolocation.getCurrentPosition(function(p) {
					latitude = p.coords.latitude;
					longitude = p.coords.longitude;
					
					// 위도/경도 -> 기상청 좌표x / 좌표 y 변환
					var rs = dfs_xy_conv("toXY",latitude,longitude);
					x = rs['x'];
					y = rs['y'];
					
					console.log(rs);
					console.log('x좌표 : '+ x, 'y좌표 : '+ y, 'latitude : '+ latitude, 'longitude : '+ longitude);
					
			        
			     	// xy 좌표로 js로 날씨 API 불러오기 => CORS 문제 발생
					//xml2json(x, y);
			     	
			     	// CORS 문제 해결 : 위치정보를 ajax로 서버에 전송
			    	// 위치정보를 자바스크립트 객체에 담는다.
			        var location =  { 
			    			x : x, 
			    			y : y, 
			    			lat : latitude, 
			    			lot : longitude
			    	};
			    	
			    	
			    	// xy 좌표로 주소 구하기
			    	
			    	$.ajax({
			    		url: awsHostUrl + '/address/' + x + '/' + y,
			    		type: 'GET',
			    		async: false,
			    		success: function(aData) {
			    			alert('주소 호출 성공');
			    			
			    			address = aData;
			    			
			    			console.log(aData);
			    			console.log(aData[0].gu);
			    			
			    			$('#btnLocc').html(aData[0].gu);
			    			
			    			nowLoc = aData[0].gu;
			    		}, 
			    		error: function(){
			        		alert('주소 호출 실패');
			        	}
			    	
			    	});
			    	
			    	
			    	// 날씨 ----------------------------------------------
			    	

			    	
			    	
			    	// 초단기실황 API 데이터
			    	
			        $.ajax({
			        	url: awsHostUrl + '/weathernow',
			        	type: 'GET',
			        	data : location,
			        	async: false,	
			        	success: function(data){
			        		alert('초단기실황 API 호출 성공');
			        		
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
			        		alert("초단기실황 API 호출 실패");
			        	}
			        }); 
			  
			  
			  		// 동네예보 API 데이터 
			  		
			    	$.ajax({
			        	url: awsHostUrl + '/weatherbytime',
			        	type: 'GET',
			        	data : location,
			        	async: false,	
			        	success: function(data){
			        		alert('동네예보 API 호출 성공');
			        		
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
			        		alert("동네예보 API 호출 실패");
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
		       		
		       		
		       		var iconhtml = '<div class="weather_icon">';
					iconhtml += 		'<img width="100" src="'+awsHostUrl+'/image/main/weather/'+ icon_now +'.png">';
					iconhtml += 	'</div>';
		       		
		       		$('.weather_icon').html(iconhtml);
		       		
				
			  	}, function(error) {
							console.error(error);
							alert('getLocation 에러');
			  	}, {
			  		enableHighAccuracy	: false,
			  		maximumAge			: 0,
			  		timeout				: Infinity
			  	});
			} else {
			  alert('GPS를 지원하지 않습니다');
			}
		
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


