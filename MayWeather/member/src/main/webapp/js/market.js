		var page = 1;
		var totalPage = 1;
		
//		var marketUrl = 'http://localhost:8080/market';
//		var clientUrl = 'http://localhost:8081';
		
		// 로컬에서 레디스 테스트 
//		var marketUrl = 'http://192.168.0.90:8080/market';
//		var clientUrl = 'http://192.168.0.35:8080/member';
				
		// aws 
//		var marketUrl = 'http://ec2-3-35-27-93.ap-northeast-2.compute.amazonaws.com:8080/mwMarket';
//		var clientUrl = 'http://ec2-52-78-37-31.ap-northeast-2.compute.amazonaws.com:8080/member';

		var marketUrl = 'https://maymarket.tk/mwMarket';
		var clientUrl = 'Https://weatherwearmember.tk/member';
		
		
		//임의의 file object영역
        var fileObject = {};
        var previewIndex = 0;	
        var orgDelImage = ""; 
        var numbePlus = 0;
        
        var nowSaleNo = 0;
        var saleReplyCnt = 0;
        var saleGoodCnt = 0;
        
        // 최종 현재 페이지
        var nowPageLoc = "";
    
		// mysale : 내 판매 목록 fnMyList('mysale')
		// mybuy : 내 구매 목록, fnMyList('mybuy')
		// mygood : 내 관심 목록 fnMyList('mygood')	    
		
/*      정은이 js로 옮김
		$(document).ready(function(){
	
			var paramDiv = getParameter("div");
			 
			// 카카오페이 결제인 경우      
			var kSaleNo = getParameter("saleNo");
			 
			// http://localhost:8081/?div=ksuccess&saleNo=80
			// ksuccess : 카카오페이 결제 성공 , kfail : 카카오페이 결제 실패, kcancel : 카카오페이 결제 취소            
			if(paramDiv == "ksuccess" || paramDiv == "kfail" || paramDiv == "kcancel"){                        
				fnKakaoPayResult(paramDiv, kSaleNo);
			}
	  });		
*/

		// 검색버튼 클릭
		$(document).on("click","#search_btn",function(){
			fnSaleList(1);
		 });
		
		// 상품목록 정렬시(최신순 : L, 인기순 : B, 조회순 : R)
		$(document).on("change","select[id=searchOrder]",function(){
			fnSaleList(1);			
		});	
		
		// 뒤로가기튼 클릭
		$(document).on("click","#back_btn",function(){ 
			fnSaleList(1);		
		 });
		
		// 판매여부(판매중 : i, 예약중 : B, 판매완료 : E) 박스 클릭
		$(document).on("change","select[id=saleDiv]",function(){
			var saleDiv = $("select[id=saleDiv] option:selected").val();
			
			// 판매 여부 수정 
			fnSaleDivUpd(saleDiv);			
		});	
		
		//스크롤 바닥 감지
		window.onscroll = function(e) {
			// 목록인 경우에만
			if (nowPageLoc == "salelist" && page <= totalPage) {
			    //window height + window scrollY 값이 document height보다 클 경우,
			    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			    	//실행할 로직 (콘텐츠 추가)
					page++;
					fnSaleList(page);
			        
			    }
			}
		};
		
		// 내 판매 내역 
		function fnMyList(paramDiv){
			nowPageLoc = "mylist";
									
			// 페이지 테그 삭제
			//$('#market *').remove();
			$('.content *').remove();
            
			var html = '';
			html = '<div id="market" name="market"></div>';
			
			$('.content').append(html);
			            
			$.ajax({
				url : marketUrl + '/sale/' + paramDiv + '/' + jsessionId,
				type : 'GET',
				success : function(data){

					// 글쓰기
					html = '';

					// 리스트
					if (data.length == 0){
						html = '<div class="container border text-center">상품 목록이 존재하지 않습니다.</div>';												
						$('#market').append(html);
					}else{ 
						for(var i = 0 ; i < data.length; i++) {
							mainFileName = data[i].fileName;
		
							if(mainFileName == '' || mainFileName == null){
								mainFileName = '' + clientUrl + '/image/icon/default.png';
							}
							html = '<a href="javascript:fnViewInfo(' + data[i].saleNo + ')">';
							html += '<div class="container border">';
							
							html += '  <div class="row g-2">';
							html += '    <div class="w-25" >';
							html += '      <div class="mw-100"><img class="list_image" src="' + mainFileName + '"></div>';
							html += '    </div>';
							html += '    <div class="w-75">';
							html += '      <div class="p-3 div-margin">';
							
							// 판매여부(판매중 : i, 예약중 : B, 판매완료 : E)
							var addDiv = '';
							
							if(data[i].saleDiv == 'B'){
								addDiv = '<span class="badge badge-success">예약중</span>&nbsp;';
							}else if(data[i].saleDiv == 'E'){
								addDiv = '<span class="badge badge-dark">거래완료</span>&nbsp;';
							}
							
							html += '        <h5 class="card-title">' + data[i].saleTitle + '</h5>';
							html += '        <p class="card-text sale_amount_list">' + addDiv + data[i].saleAmount + '원</p>';
							html += '        <p class="card-text">' + data[i].saleDate + '</p>';
							
							html += '		 <p class="card-text align_right"><img src="' + clientUrl + '/image/icon/comment.png" width="15px"> ' + data[i].replyCnt + ' <img src="' + clientUrl + '/image/icon/heart.png" width="15px"> ' + data[i].goodCnt + '</p>';
							
							html += '      </div>';
							html += '    </div>';
							html += '  </div>';						
							
							html += '</div>';
					    	html += '</a>';
	
							
					    	$('#market').append(html);
						} 
					}	

				},
				error : function(e){
					console.log("에러발생 : " + e);
				}
			});
		}		
				
		// 판매 목록
		function fnSaleList(pagenum){
			nowPageLoc = "salelist";
			var searchOrder = $("select[id=searchOrder] option:selected").val();
			var searchTitle = $('#searchTitle').val();
			
			if(searchOrder == undefined){
				searchOrder = '';
			}
			if(searchTitle == undefined){
				searchTitle = '';
			}		
					
			// 최신순 : L, 인기순 : B, 조회순 : R 									
			if(searchOrder == 'L'){
				var selectL = "selected";				
			}else if(searchOrder == 'B'){
				var selectB = "selected";
			}else if(searchOrder == 'R'){
				var selectR = "selected";
			}
									
            if (pagenum == 1){
				// 페이지 테그 삭제				
				$('.content *').remove();
				//$('#market *').remove();
            }
            
			var data = {
					page : pagenum,
					searchOrder : searchOrder,
					searchTitle : searchTitle
				};	

			$.ajax({
				url : marketUrl + '/sale',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false,				
				success : function(data){
					
					totalPage = data.totalPageCount;

					// 글쓰기
					var html = '';
					html = '<div id="market" name="market"></div>';
					
					$('.content').append(html);
					
					if (pagenum == 1){
												
						html = '<a href="javascript:fnSaleWriteForm()"><div id="write_btn"></div></a>';
						
						// 검색
						html += '<div class="search_div">';
						html += '<div class="search_select">';
						html += '	<div class="d-flex text-muted pt-3">';
						html += '		<select id="searchOrder" class="form-control form-select form-select-lg" aria-label=".form-select-lg example">';
						html += '  			<option value="L" ' + selectL + '>최신순</option>';
						html += '  			<option value="B" ' + selectB + '>인기순</option>';
						html += '  			<option value="R" ' + selectR + '>조회순</option>';
						html += '		</select>&nbsp;';
						html += '  		<input type="text" id="searchTitle" value="' + searchTitle + '" class="form-control" onclass="form-control" placeholder="" aria-label="" aria-describedby="search_btn">';
						html += '		<div class="input-group-append">';
						html += '  			<button class="btn btn-primary" type="button" id="search_btn">Search</button>';	
						html += '		</div>';
						html += '	</div>';
						html += '</div>';
						html += '</div>';
								
						$('#market').append(html);
					}
					
					// 리스트
					for(var i = 0 ; i < data.saleList.length; i++) {
						mainFileName = data.saleList[i].fileName;
	
						if(mainFileName == '' || mainFileName == null){
							mainFileName = clientUrl + '/image/icon/default.png';
						}
						html = '<a href="javascript:fnViewInfo(' + data.saleList[i].saleNo + ')">';
						html += '<div class="container border">';
						
						html += '  <div class="row g-2">';
						html += '    <div class="w-25" >';
						html += '      <div class="mw-100"><img class="list_image" src="' + mainFileName + '"></div>';
						html += '    </div>';
						html += '    <div class="w-75">';
						html += '      <div class="p-3 div-margin">';
						
						// 판매여부(판매중 : i, 예약중 : B, 판매완료 : E)
						var addDiv = '';
						
						if(data.saleList[i].saleDiv == 'B'){
							addDiv = '<span class="badge badge-success">예약중</span>&nbsp;';
						}else if(data.saleList[i].saleDiv == 'E'){
							addDiv = '<span class="badge badge-dark">거래완료</span>&nbsp;';
						}
						
						html += '        <h5 class="card-title">' + data.saleList[i].saleTitle + '</h5>';
						html += '        <p class="card-text sale_amount_list">' + addDiv + data.saleList[i].saleAmount + '원</p>';
						html += '        <p class="card-text">' + data.saleList[i].saleDate + '</p>';
						
						html += '		 <p class="card-text align_right"><img src="' + clientUrl + '/image/icon/comment.png" width="15px"> ' + data.saleList[i].replyCnt + ' <img src="' + clientUrl + '/image/icon/heart.png" width="15px"> ' + data.saleList[i].goodCnt + '</p>';
						
						html += '      </div>';
						html += '    </div>';
						html += '  </div>';						
						

						html += '</div>';
				    	html += '</a>';
				    	
						if(((i+1) == data.saleList.length) && (pagenum == totalPage)){
							html += '<div class="bottomArea"></div>';
						}	
				    	
				    	$('#market').append(html);
				    							
					}
				},
				error : function(e){
					console.log("에러발생 : " + e);
				}
			});
		}		
				
		// 구매목록 상세보기 
		function fnViewInfo(saleNo){
		    //$(this).css('background', '');
		    
			nowPageLoc = "view";
			
			// 페이지 테그 삭제
			$('#market *').remove();
			nowSaleNo = saleNo;
			
			var addClass = "active";

			var data = {
				saleNo : saleNo,
				jsessionId : jsessionId
			};

			$.ajax({
				url : marketUrl + '/sale/view',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(data){
	
					saleReplyCnt = data.saleMember.replyCnt;
					saleGoodCnt = data.saleMember.goodCnt;
					
					var html = ''
					html += '<div class="container border">';
										
					// 이미지 목록
					if(data.imageList.length > 0){
			
						html += '	<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">';
						html += '		<!-- Indicators -->';
						html += '  		<ol class="carousel-indicators">';
				
						for(var i = 0 ; i < data.imageList.length ; i++) {
							addClass = '';
							if(i == 0){
								addClass = 'active';								
							}
							html += '    		<li data-target="#carousel-example-generic" data-slide-to="' + i + '" class="' + addClass + '"></li>';							
						}
						 
						html += '			</ol>';

						html += '			<div class="back_class"><img id="back_btn" src="' + clientUrl + '/image/icon/back.png"></div>';
						
						html += '  		<!-- Wrapper for slides -->';
						html += '  		<div class="carousel-inner" role="listbox">';
						

						for(var i = 0 ; i < data.imageList.length; i++) {
							addClass = '';
							
							if(i == 0){
								addClass = 'active';								
							}							
							
							html += '    	<div class="item ' + addClass + '">';
							html += '      		<img src="' + data.imageList[i].fileNameAll +'" class="image_list" alt="...">';
							html += '      		<div class="carousel-caption">';
							html += '      		</div>';
							html += '    	</div>';
						}
						html += '  		</div>';
						
						html += '	<!-- Controls -->';
						html += '	<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">';
						html += '		<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
						html += '  	 <span class="sr-only">Previous</span>';
						html += '	</a>';
						html += '	<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">';
						html += '		<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
						html += '  	 <span class="sr-only">Next</span>';
						html += '	</a>';
						html += '</div>';
											

						html += '	</div>';
				
					}
					
					// 상세보기
					html += '	<table class="table">';
					html += '  	<thead>';
					html += '   	<tr>';
					html += '      		<th scope="col"><a href="javascript:getGbookList(' + data.saleMember.saleIdx + ')"><img class="img-circle market_profile" src="' + clientUrl	+ '/fileupload/member/' + data.saleMember.saleIdx + '.png"> ' + data.saleMember.saleNic + '</a></th>';
					html += '      		<th scope="col">';

					html += '    		<div class="sale_reg_btn">';
					
					// 조아요 버튼
					var heartImage = "heart.png";
					var goodDiv = 2;
					
					if(data.myGoodCnt == 0) {
						heartImage = "emptyheart.png";
						goodDiv = 1; 
					}
					html += '				<a href="javascript:fnGoodProc(' + goodDiv + ');"><img src="' + clientUrl + '/image/icon/' + heartImage + '" style="width:15px;"></a>&nbsp;';

					// 내 글인 경우에만 수정, 삭제 허용 START
					if(memIdx == data.saleMember.saleIdx){
						
						html += '    		<img src="' + clientUrl + '/image/icon/usefulbutton.png" style="width:15px;" onclick="fnDropDownDisp(\'dropdown_sale\');">';
						html += '    		<div id="dropdown_sale" class="dropdown_div">';
						html += '    			<div class="dropdown_item">';
						html += '					<a href="javascript:fnSaleDel(' + saleNo + ');">삭제</a><br>';
						html += '    	 	   		<a href="javascript:fnSaleUpdForm(' + saleNo + ');">수정</a>';
						html += '    			</div>';
						html += '    		</div>';
							
					}
					html += '    		</div>';
			
					html += '      		</th>';
					html += '   	 </tr>';
					html += '  		</thead>';
					html += '  		<tbody>';
					
					
					// 판매여부(판매중 : I, 예약중 : B, 판매완료 : E)		
					var selectI = '';
					var selectB = '';
					var selectE = '';
					if(data.saleMember.saleDiv == 'I'){
						selectI = 'selected';				
					}else if(data.saleMember.saleDiv == 'B'){
						selectB = 'selected';
					}else if(data.saleMember.saleDiv == 'E'){
						selectE = 'selected';
					}		

					// 카카오페이 결제 이용
					var payDivText = '직접 결제';
					if(data.saleMember.payDiv == 'K'){	
						payDivText = '카카오페이';
					}
					
					html += '    	<tr>';													
					html += '      		<td class="text-primary">결제 방법 : ' + payDivText + '</td>';
					html += '      		<td></td>';							
					html += '    	</tr>';
							
					html += '    	<tr>';		
																																
					// 내 글인 경우에만 판매여부변경 START
					if(memIdx == data.saleMember.saleIdx){	
						html += '      		<td>';
						html += '				<select id="saleDiv" class="form-control form-select">';
						html += '  					<option value="I" ' + selectI + '>판매중</option>';
						html += '  					<option value="B" ' + selectB + '>예약중</option>';
						html += '  					<option value="E" ' + selectE + '>판매완료</option>';
						html += '				</select>';
						html += '			</td>';
						html += '      		<td></td>';		
						
					}else {
						// 판매중
						if(data.saleMember.saleDiv == 'I'){
							// 카카오페이 결제 이용
							if(data.saleMember.payDiv == 'K'){
								html += '      		<td>';					
								html += '      			<a href="javascript:fnKakaoPay();"><img width="50px" src="' + clientUrl + '/image/icon/kakaopay.png"></a>';
								html += '			</td>';						
								html += '      		<td></td>';		
							}		
						// 예약중	
						}else if(data.saleMember.saleDiv == 'B'){
							html += '      		<td>';					
							html += '      			<span class="badge badge-success">예약중</span>&nbsp;';
							html += '			</td>';						
							html += '      		<td></td>';		
						// 판매완료	
						}else if(data.saleMember.saleDiv == 'E'){
							html += '      		<td>';					
							html += '      			<span class="badge badge-dark">거래완료</span>&nbsp;';
							html += '			</td>';						
							html += '     	 	<td></td>';			
						}					
					}	
					html += '   	</tr>';		
					
					html += '    	<tr>';
					html += '      		<td colspan="2">';
					html += '				<div class="sale_title">' + data.saleMember.saleTitle + '</div><br>';
					html += data.saleMember.saleDate + '<br><br>';
					html += '					<pre>' + data.saleMember.saleCmt + '</pre><br><br>';
					html += '				<div class="sale_amount">' + data.saleMember.saleAmount + '원</div><br><br>';
					
					html += '댓글 <span id="reply_span">' + data.saleMember.replyCnt + '</span>개 ＊ 조아요 <span id="good_span">' + data.saleMember.goodCnt + '</span> ＊ 조회 ' + data.saleMember.readCnt + '<br>';
					
					html += '    	</tr>';
					html += '  	</tbody>';
					html += '	</table>';
				
					html += '	<!-- 댓글 등록 폼 -->';
					html += '	<div class="col-12">';					
					html += '		<div class="input-group mb-3 border-bottom align_right">';
					html += '			<textarea id="reply_content" class="form-control" aria-label="With textarea"></textarea>';
					html += '  			<button class="btn btn-primary" type="button" id="reply_button" onclick="fnReplyBtnClick(); return false;">등록</button>';
					html += '		</div>';

					html += '		<!-- 댓글 목록 -->';
					html += '		<div id="comList" name="comList"></div>';
					html += '	</div>';		
					
					html += '	<div class="bottomArea"></div>';
					html += '</div>';
				
					$('#market').append(html);

					// 댓글 목록 호출
					fnReplyList();
						
				},
				error : function(e){
					console.log("에러발생 : " + e);
				}
				
				
			});			
		}       
		
		// 드롭다운 display 
		function fnDropDownDisp(id){

		    if($("#" + id).css("display") == "none"){   
		        jQuery('#' + id).show();  
		    } else {  
		        jQuery('#' + id).hide();  
		    }  
		
		}
		
		// 댓글 목록 
		function fnReplyList(){
			$('#comList *').remove();
			$('#reply_content').val('');
			
			var saleNo = nowSaleNo;

			$.ajax({
				url : marketUrl + '/reply/' + saleNo,
				type : 'GET',
				success : function(data){

					for(var i = 0 ; i < data.length; i++) {
						var html = '';
						html += '<div id="rely_div_' + data[i].replyNo + '" class="container pt-3 pb-3 border-bottom">';
						html += '	<div class="row">';
						html += '		<div class="col-12 col-sm-12">';

						// 내 댓글인 경우에만 수정, 삭제 허용 START
						html += '    			<div class="reply_upd_btn">';
						
						if(memIdx == data[i].replyIdx){
							html += '    			<img src="' + clientUrl + '/image/icon/usefulbutton.png" style="width:15px;" onclick="fnDropDownDisp(\'dropdown_reply_' + data[i].replyNo + '\');">';
							html += '    			<div id="dropdown_reply_' + data[i].replyNo + '" class="dropdown_div_reply">';
							html += '    				<div id="dropdown_item_reply_' + data[i].replyNo + '" class="dropdown_item_reply">';
							html += '						<p onclick="fnReplyDel(' + data[i].replyNo + ');">삭제</p>';
							html += '    	 	 	  		<p onclick="fnDropDownDisp(\'dropdown_reply_' + data[i].replyNo + '\'); fnReplyUpdForm(' + data[i].replyNo + ');">수정</p>';
							html += '    				</div>';
							html += '    			</div>';
						}
						html += '    			</div>';
						// 내 댓글인 경우에만 수정, 삭제 허용 END
						
						html += '			<div class="row">';
						//html += '				<div class="col-2 col-sm-2 align_left">';
						html += '				<div>';
						html += '					<a href="javascript:getGbookList(' + data[i].replyIdx + ')"><img class="img-circle market_profile" src="' + clientUrl	+ '/fileupload/member/' + data[i].replyIdx + '.png"></a>';
						html += '				</div>';
						html += '				<div id="reply_view_div_' + data[i].replyNo + '" class="col-10 col-sm-10">';
						html += '        			<h5 class="card-title">' + data[i].replyNic + '</h5>';
						html += '        			<h5 id="reply_view_cnt_' + data[i].replyNo + '" class="card-title">' + data[i].replyCnt + '</h5>';
						html += '       	 		<p class="card-text">' + data[i].replyDate + '</p>';
						html += '				</div>';
						
						// 댓글 수정폼
						html += '				<div id="reply_upd_div_' + data[i].replyNo + '" class="col-10 col-sm-10 " style="display:none">';
						html += '					<textarea id="reply_content_' + data[i].replyNo + '" class="form-control" aria-label="With textarea">' + data[i].replyCnt + '</textarea>';
						html += ' 					<div class="btn-group reply_upd_div pt-1" role="group" aria-label="Basic example"><button type="button" onclick="fnReplyUpd(' + data[i].replyNo + ')" class="btn btn-info">수정</button><button type="button" onclick="fnReplyView(' + data[i].replyNo + ');" class="btn btn-info">취소</button></div>';
						html += '				</div>';
						html += '			</div>';
						html += '		</div>';
						html += '	</div>';
						
						
						html += '</div><br>';

						$('#comList').append(html);
					} 	
					
				},
				error : function(e){
				
					console.log("에러발생 : " + e);
					alert("에러발생 : " + e);
				}
			});
		}
						
		function fnKakaoPay(){

			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}
		
			var data = {
				saleNo : nowSaleNo,
				jsessionId : jsessionId
			};
		
			$.ajax({
				url : marketUrl + '/sale/pay/',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(msg){
					if(msg =='N'){
						alert('결제 실패');
					}else {
						window.location.href = msg;
					}
				}, 
				error : function(err){
					alert(err);
					return;
				} 				
			});					
		}
	
		
		// 판매 여부 수정 
		function fnSaleDivUpd(saleDiv){
		
			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}
		
			var data = {
				saleNo : nowSaleNo,
				saleDiv : saleDiv
			};

			$.ajax({
				url : marketUrl + '/sale/salediv',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(msg){

					if(msg == 'Y'){
						// 판매 완료인 경우 구매자 선택창으로 이동
						if(saleDiv == 'E'){
							fnSaleBuyForm();
						}
						
					}else {
						alert('판매여부 수정에 실패했습니다.' + msg);
						return false;
					}
				}, 
				error : function(err){
					alert(err);
					return;
				} 				
			});		
			
		}
		
		// 판매 완료시 구매자 선택폼 
		function fnSaleBuyForm(){
			nowPageLoc = "salediv";
			var saleNo = nowSaleNo;
			
			// 페이지 테그 삭제
			$('#market *').remove();

			$.ajax({
				url : marketUrl + '/reply/sale/' + saleNo,
				type : 'GET',
				success : function(data){
					// 댓글 등록자 없이 판매 완료한 경우
					if(data.length == 0){
						fnViewInfo(saleNo);
					}else {
						var html = '';
						html += '<div class="card w-90">';
						html += '	<div class="card-header text-center">';
						html += '		<img src="' + clientUrl + '/image/icon/ootd2.png" width="100px" alt="...">';
						html += '	</div>';			

						html += '  	<div class="card-body">';
						html += '    	<h5 class="card-title">구매가 완료되었습니다.</h5>';
						html += '    	<p class="card-text">아래 댓글 목록에서 구매자를 선택해 주세요.</p>';
						html += '  	</div>';
						html += '  	<ul class="list-group list-group-flush">';
					
						for(var i = 0 ; i < data.length; i++) {
							html += '    	<li class="list-group-item">' + data[i].replyNic + '&nbsp;<button type="button" class="btn btn-primary" onclick="fnSaleDivReg(' + data[i].replyIdx + ');">선택</button></li>';

						}	

						
						html += '    	<li class="list-group-item">선택 안하고 판매완료&nbsp;<button type="button" class="btn btn-primary" onclick="fnViewInfo(' + saleNo + ');">선택</button></li>';
						html += '  	</ul>';
						html += '</div>';	
											
						$('#market').append(html);
					} 	

				}, 
				error : function(err){
					alert(err);
					return;
				} 				
			});						
				
		}
		
		// 구매자 선택 
		function fnSaleDivReg(replyIdx){

			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}
			
			var data = {
				saleNo : nowSaleNo,
				buyIdx : replyIdx				
			};


			$.ajax({
				url : marketUrl + '/sale/buyreg',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(msg){

					if(msg == 'Y'){
						fnViewInfo(nowSaleNo);
					}else {
						alert('구매자 선택에 실패했습니다.' + msg);
						return false;
					}
				}, 
				error : function(err){
					alert(err);
					return;
				} 				
			});					
		}

		// 카카오페이 결제 결과 (성공 : S, 실패 : F, 취소 : C)
		function fnKakaoPayResult(kDiv, kSaleNo) {
			nowPageLoc = "payview";

			// 결제 성공인 경우
			if(kDiv == "ksuccess"){

				// 페이지 테그 삭제
				$('.content *').remove();
									
				var html = '';
				html = '<div id="market" name="market"></div>';
				$('.content').append(html);
														
				$.ajax({
					url : marketUrl + '/sale/payview/' + kSaleNo,
					type : 'GET',
					success : function(data){
				
						var mainFileName = data.saleMember.fileName;
						if(mainFileName == '' || mainFileName == null){
							mainFileName = clientUrl + '/image/icon/default.png';
						}
						
						html = '<div class="card w-90">';
						html += '	<div class="card-header text-center">';
						html += '		<img src="' + mainFileName + '" width="100px" alt="...">';
						html += '	</div>';			

						html += '  	<div class="card-body">';
						html += '    	<h5 class="card-title">결제가 완료되었습니다.</h5>';
						html += '    	<p class="card-text">※ 현금영수증 발행 여부는 가맹점을 통해 확인해주세요.</p>';
						html += '  	</div>';
						html += '  	<ul class="list-group list-group-flush">';
					
						html += '    	<li class="list-group-item">- 상품명 : ' + data.saleMember.saleTitle + '</li>';
						html += '    	<li class="list-group-item">- 결제일시 : ' + data.buyMember.buyDate + '</li>';
						html += '    	<li class="list-group-item">- 결제금액 : ' + data.saleMember.saleAmount + '</li>';
						html += '    	<li class="list-group-item">- 결제수단 : 카카오페이(' + data.buyMember.buyType + ')</li>';
						html += '    	<li class="list-group-item">- 상품명 : ' + data.saleMember.saleTitle + '</li>';

						html += '  	</ul>';


						html += '	<div class="card-body text-center">';
						html += '		<a href="javascript:fnSaleList(1)" class="card-link">목록으로 돌아가기</a>';
						html += '	</div>';
						  
						html += '</div>';	
										
						$('#market').append(html);
					},
					error : function(e){
						console.log("에러발생 : " + e);
					}
					
					
				});			
				
				
			}else if(kDiv == "kfail"){
				alert("결제 실패 하였습니다.");
				fnSaleList(1);
				
			}else if(kDiv == "kcancel"){
				alert("결제 취소 하였습니다.");
				fnSaleList(1);
			}
		}
		

		// 구매 수정폼
		function fnSaleUpdForm(saleNo){
			nowPageLoc = "view";
			
			// 페이지 테그 삭제
			$('#market *').remove();
			nowSaleNo = saleNo;
		    
			var data = {
				saleNo : saleNo,
				jsessionId : jsessionId
			};
    
			$.ajax({
				url : marketUrl + '/sale/view/',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(data){
					
					var html = '';
					// 검색
					html += '<div class="write_form" >';
					html += '	<div class="back_class"><img id="back_btn" src="' + clientUrl + '/image/icon/back.png"></div>';
					html += '	<div>마켓 글쓰기</div>';
					html += '	<div class="write_form_btn" >';
					html += ' 	 	<button type="button" class="btn btn-primary" onclick="fnSaleUpd(' + saleNo + ');">완료</button>';
					html += '	</div>';
					html += '</div>';
				
					// 첨부 버튼 
		            html += '<div id="attach" class="p-3">';
		            html += '	<div class="img_upload_div">';
		            html += '		<label for="uploadInput">';
		            html += '    		<img class="img_upload" src="' + clientUrl + '/image/icon/carmera.png">';
		            html += '     	</label>';
		            html += '     	<input id="uploadInput" style="display: none" type="file" name="filedata" multiple onchange="addPreview($(this));"/>';
		            html += '	</div>';
		            // 미리보기 영역
		            html += '	<div id="preview" class="img_preview">';
		            
					// 이미지 목록
					if(data.imageList.length > 0){
						previewIndex = data.imageList.length;
						
						for(var i = 0 ; i < data.imageList.length ; i++) {
							html += '<div class="preview_box" value="' + i  +'">';
	                        html += '	<a class="img_delete" value="' + i  +'" href="javascript:fnImageDel(' + i  +', ' + data.imageList[i].fileNo + ')"><img class="x-btn" src="' + clientUrl + '/image/icon/x.png"></a>';
	                        html += '	<img class="thumbnail rounded" src="' + data.imageList[i].fileNameAll + '">';                         
	                        html += '</div>';
						}
					}
		            
		            html += '	</div>';
		            html += '</div>';            
		            
		            // multipart 업로드시 영역 
		            html += '<form id="saleRegForm" />';
					html += '<table class="table">';
		    		html += '	<tr>';
					html += '      	<td>';
					
		 			html += '      		<input id="saleTitle" name="saleTitle" value="' + data.saleMember.saleTitle + '" class="form-control" type="text" placeholder="제목">';
		 			html += '      		<input id="saleAmount" name="saleAmount" value="' + data.saleMember.saleAmount + '" class="form-control" type="number" placeholder="가격">';
					
	 				var payDivChk_K = '';
	 				var payDivChk_D = 'checked';		 			
		 			if (data.saleMember.payDiv == 'K'){
		 				payDivChk_K = 'checked';
		 				payDivChk_D = '';
		 			}
		 			html += '			<br><br>';
		 			html += '      		<div class="form-check form-check-inline">';
		 			html += '        		<input class="form-check-input" type="radio" name="inlineRadioOptions" id="payDiv" name="payDiv" value="D" ' + payDivChk_D + '>';
		 			html += '        		<label class="form-check-label" for="inlineRadio1">직접결제</label>';
		 			html += '      		</div>';
		 			html += '      		<div class="form-check form-check-inline">';
		 			html += '        		<input class="form-check-input" type="radio" name="inlineRadioOptions" id="payDiv" name="payDiv" value="K" ' + payDivChk_K + '>';
		 			html += '        		<label class="form-check-label" for="inlineRadio2">카카오페이</label>';
		 			html += '      		</div>';
		 			html += '        	<div class="form-group">';
		 			html += '          		<label for="exampleFormControlTextarea1"></label>';
		 			html += '          		<textarea id="saleCmt" name="saleCmt" class="form-control" id="exampleFormControlTextarea1" rows="5">' + data.saleMember.saleCmt + '</textarea>';
		 			html += '        	</div>';
					
					html += '		</td>';
					html += '    </tr>';

					html += '</table>';	
			
					$('#market').append(html);					
					
				},
				error : function(e){
					console.log("에러발생 : " + e);
				}
				
				
			});				
			

		}
	
		// 상품 등록
		function fnSaleReg(){
		
			var saleTitle = $('#saleTitle');
			var saleAmount = $('#saleAmount');
			var saleCmt = $('#saleCmt');

			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}
		
			if($.trim($('#saleTitle').val()).length < 1) { 
				alert('제목을 입력해주세요.'); 
				$('#saleTitle').focus();
				return false;
			}			

			if($.trim($('#saleAmount').val()).length < 1) { 
				alert('가격을 입력해주세요.'); 
				$('#saleAmount').focus();
				return false;
			}	
			
			if($.trim($('#saleCmt').val()).length < 1) { 
				alert('내용을 입력해주세요.'); 
				$('#saleCmt').focus();
				return false;
			}		
			
			var form = $('#saleRegForm')[0];
	        var formData = new FormData(form);

	        formData.append('saleTitle', $('#saleTitle').val());
	        formData.append('saleAmount', $('#saleAmount').val());
	        formData.append('saleCmt', $('#saleCmt').val());
	        formData.append('payDiv', $("input:radio[id=payDiv]:checked").val());
	        formData.append('jsessionId', jsessionId);

	        for (var index = 0; index < Object.keys(fileObject).length; index++) {
	            //formData 공간에 files라는 이름으로 파일을 추가한다.
	            //동일명으로 계속 추가할 수 있다.
	            formData.append('files', fileObject[index]);
	        }
	        
	        //ajax 통신으로 multipart form을 전송한다.
	        $.ajax({
	            type : 'POST',
	            enctype : 'multipart/form-data',
	            processData : false,
	            contentType : false,
	            cache : false,
	            timeout : 600000,
	            url : marketUrl + '/sale/reg',
	            //dataType : 'JSON',
	            data : formData,
	            success : function(result) {
					if(result > 0){
						// 상세보기 페이지 이동 
						fnViewInfo(result);
					}else {
					  	//-2 = 잘못된 확장자 업로드, -3 = 용량초과, 그외 = 성공(1)
					  	if (result === -2) {
					      	alert('jpg, gif, png, bmp 확장자만 업로드 가능합니다.');                         
					  	} else if (result === -3) {
					      	alert('파일이 10MB를 초과하였습니다.');
					  	} else if (result === -4) {
					      	alert('상품 등록에 실패하였습니다.');
					  	} else if (result === -5) {
					  	    alert('상품 이미지 등록에 실패하였습니다.');                                                                        
					  	} else {
					      	alert('에러');                          
					  	}
					}	
	            }
	            //전송실패에대한 핸들링은 고려하지 않음
	        });

		}

		// 상품 수정
		function fnSaleUpd(saleNo){
			var saleTitle = $('#saleTitle');
			var saleAmount = $('#saleAmount');
			var saleCmt = $('#saleCmt');

			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}
		
			if($.trim($('#saleTitle').val()).length < 1) { 
				alert('제목을 입력해주세요.'); 
				$('#saleTitle').focus();
				return false;
			}			

			if($.trim($('#saleAmount').val()).length < 1) { 
				alert('가격을 입력해주세요.'); 
				$('#saleAmount').focus();
				return false;
			}	
			
			if($.trim($('#saleCmt').val()).length < 1) { 
				alert('내용을 입력해주세요.'); 
				$('#saleCmt').focus();
				return false;
			}		
			
			var form = $('#saleRegForm')[0];
	        var formData = new FormData(form);
	        
	        formData.append('saleNo', saleNo);
	        formData.append('saleTitle', $('#saleTitle').val());
	        formData.append('saleAmount', $('#saleAmount').val());
	        formData.append('saleCmt', $('#saleCmt').val());
	        formData.append('payDiv', $("input:radio[id=payDiv]:checked").val());
	        formData.append('delImage', orgDelImage.trim());
	        formData.append('jsessionId', jsessionId);    
	        
	        /* 	
			var data = {
					saleTitle : $('#saleTitle').val(),
					saleAmount : $('#saleAmount').val(),
					saleCmt : $('#saleCmt').val(),
					payDiv : $("input:radio[id=payDiv]:checked").val(),
					saleAmount : $('#saleAmount').val()
				};	
			 
			formData.append('data', data);
			*/
			
			for (var index = 0; index < Object.keys(fileObject).length; index++) {
	            //formData 공간에 files라는 이름으로 파일을 추가한다.
	            //동일명으로 계속 추가할 수 있다.
	            formData.append('files', fileObject[index]);
	            //alert('index : ' + fileObject[index])
	        }
	        
	        //ajax 통신으로 multipart form을 전송한다.
	        $.ajax({
	            type : 'POST',
	            enctype : 'multipart/form-data',
	            processData : false,
	            contentType : false,
	            cache : false,
	            timeout : 600000,
	            url : marketUrl + '/sale/upd',
	            //dataType : 'JSON',
	            data : formData,
	            success : function(result) {
					if(result > 0){
						// 상세보기 페이지 이동 
						fnViewInfo(saleNo);
					}else {
					  	//-2 = 잘못된 확장자 업로드, -3 = 용량초과, 그외 = 성공(1)
					  	if (result === -2) {
					      	alert('jpg, gif, png, bmp 확장자만 업로드 가능합니다.');                         
					  	} else if (result === -3) {
					      	alert('파일이 10MB를 초과하였습니다.');
					  	} else if (result === -4) {
					      	alert('상품 등록에 실패하였습니다.');
					  	} else if (result === -5) {
					  	    alert('상품 이미지 등록에 실패하였습니다.');                                                                        
					  	} else {
					      	alert('에러');                          
					  	}
					}	
	            }
	            //전송실패에대한 핸들링은 고려하지 않음
	        });

		}
		
        //preview 영역에서 삭제 버튼 클릭시 해당 미리보기이미지 영역 삭제
        function fnImageDel(imgNum, fileNo) {

            //var imgNum = obj.attributes['value'].value;
        	      	
            delete fileObject[imgNum];
            $("#preview .preview_box[value=" + imgNum + "]").remove();
            
            // 수정시 원본 이미지 목록에서 삭제
            if (fileNo > 0) {
            	orgDelImage = orgDelImage + fileNo + ','; 
            	//alert(orgDelImage)
            }

        }
        		
        // image preview 기능 구현
        // input = file object[]
        function addPreview(input) {
            if (input[0].files) {
                //파일 선택이 여러개였을 시의 대응
                for (var fileIndex = 0; fileIndex < input[0].files.length; fileIndex++) {
                    var file = input[0].files[fileIndex];
                    fileObject[fileIndex] = file;  
                    
                    if (validation(file.name)) {
                        continue;
 					}
 					
                    var reader = new FileReader();
                    reader.onload = function(img) {
                        //div id="preview" 내에 동적코드추가.
                        var imgNum = previewIndex++;
                                              
                        $("#preview").append(
                                        '<div class="preview_box" value="' + imgNum  +'">'
                                                + '<a class="img_delete" value="' + imgNum  +'" href="javascript:fnImageDel(' + imgNum  +', ' + imgNum +')"><img class="x-btn" src="' + clientUrl + '/image/icon/x.png"></a>'
                                                + '<img class="thumbnail rounded" src="' + img.target.result + '">'
                                                + '</div>');
                    };
                    reader.readAsDataURL(file);
                }
            } 
        }	
        
	    // 문자 치환
        function replaceAll(str, searchStr, replaceStr) {
        	return str.split(searchStr).join(replaceStr);
        }      
 
        //client-side validation
        //always server-side validation required
        function validation(fileName) {
            fileName = fileName + "";
            var fileNameExtensionIndex = fileName.lastIndexOf('.') + 1;
            var fileNameExtension = fileName.toLowerCase().substring(
                    fileNameExtensionIndex, fileName.length);
            if (!((fileNameExtension === 'jpg')
                    || (fileNameExtension === 'gif') || (fileNameExtension === 'png'))) {
                alert('jpg, gif, png 확장자만 업로드 가능합니다.');
                return true;
            } else {
                return false;
            }
        }


		// 조아요 등록
		function fnGoodProc(goodDiv){

			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}
			
			var data = {
					saleNo : nowSaleNo,
					goodDiv : goodDiv,
					jsessionId : jsessionId					
				};

			$.ajax({
				url : marketUrl + '/sale/good',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(msg){

					if(msg == 'Y'){
						// 판매 상세보기 호출 
						fnViewInfo(nowSaleNo);

					}else {
						alert('조아요에 실패했습니다.' + msg);
						return false;
					} 
				}, 
				error : function(err){
					alert(err);
					return;
				} 				
			});
			
		}
		

		// 조아요 삭제
		function fnGoodDel(){

			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}
			
			$.ajax({
				url : marketUrl + '/sale/gooddel/' + nowSaleNo,
				type : 'GET',
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(msg){

					if(msg == 'Y'){
						// 판매 상세보기 호출 
						fnViewInfo(nowSaleNo);

					}else {
						alert('조아요 삭제에 실패했습니다.' + msg);
						return false;
					}
				}, 
				error : function(err){
					alert(err);
					return;
				} 				
			});
			
		}		
		// 상품 삭제 처리
		function fnSaleDel(saleNo) {
		
			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}

			$.ajax({
				url : marketUrl + '/sale/del/' + saleNo,
				type : 'GET',
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(msg){

					if(msg == 'Y'){
						// 판매 목록 호출 
						fnSaleList(1);

					}else {
						alert('상품 삭제에 실패했습니다.' + msg);
						return false;
					}
				}, 
				error : function(err){
					alert(err);
					return;
				} 				
			});

		}


			
		// 내 구매 내역 
		function fnMyBuyList(){

			nowPageLoc = "mybuylist";
									
			// 페이지 테그 삭제
			$('#market *').remove();
            
			$.ajax({
				url : marketUrl + '/sale/mybuy',
				type : 'GET',
				success : function(data){

					// 글쓰기
					var html = '';

					// 리스트
					for(var i = 0 ; i < data.length; i++) {
						mainFileName = data[i].fileName;
	
						if(mainFileName == '' || mainFileName == null){
							mainFileName = clientUrl + '/image/icon/default.png';
						}
						
						html = '<a href="javascript:fnViewInfo(' + data[i].saleNo + ')">';
						html += '<div class="container border">';
						
						html += '  <div class="row g-2">';
						html += '    <div class="w-25" >';
						html += '      <div class="mw-100"><img class="list_image" src="' + mainFileName + '"></div>';
						html += '    </div>';
						html += '    <div class="w-75">';
						html += '      <div class="p-3">';
						
						// 판매여부(판매중 : i, 예약중 : B, 판매완료 : E)
						var addDiv = '';
						
						if(data[i].saleDiv == 'B'){
							addDiv = '<span class="badge badge-success">예약중</span>&nbsp;';
						}else if(data[i].saleDiv == 'E'){
							addDiv = '<span class="badge badge-dark">거래완료</span>&nbsp;';
						}
						
						html += '        <h5 class="card-title">' + data[i].saleTitle + '</h5>';
						html += '        <p class="card-text sale_amount_list">' + addDiv + data[i].saleAmount + '원</p>';
						html += '        <p class="card-text">' + data[i].saleDate + '</p>';
						
						
						html += '		 <p class="card-text align_right"><img src="' + clientUrl + '/image/icon/comment.png" width="15px"> ' + data[i].replyCnt + ' <img src="' + clientUrl + '/image/icon/heart.png" width="15px"> ' + data[i].goodCnt + '</p>';
						
						html += '      </div>';
						html += '    </div>';
						html += '  </div>';						
						

						html += '</div>';
				    	html += '</a>';
							
				    	$('#market').append(html);
					} 	

				},
				error : function(e){
					console.log("에러발생 : " + e);
				}
			});
		}		
			
		// 내 관심 목록
		function fnMyGoodList(){

			nowPageLoc = "mygoodlist";
									
			// 페이지 테그 삭제
			$('#market *').remove();
            
			$.ajax({
				url : marketUrl + '/sale/mygood',
				type : 'GET',
				success : function(data){

					// 글쓰기
					var html = '';

					// 리스트
					for(var i = 0 ; i < data.length; i++) {
						mainFileName = data[i].fileName;
	
						if(mainFileName == '' || mainFileName == null){
							mainFileName = clientUrl + '/image/icon/default.png';
						}
						html = '<a href="javascript:fnViewInfo(' + data[i].saleNo + ')">';
						html += '<div class="container border">';
						
						html += '  <div class="row g-2">';
						html += '    <div class="w-25" >';
						html += '      <div class="mw-100"><img class="list_image" src="' + mainFileName + '"></div>';
						html += '    </div>';
						html += '    <div class="w-75">';
						html += '      <div class="p-3">';
						
						// 판매여부(판매중 : i, 예약중 : B, 판매완료 : E)
						var addDiv = '';
						
						if(data[i].saleDiv == 'B'){
							addDiv = '<span class="badge badge-success">예약중</span>&nbsp;';
						}else if(data[i].saleDiv == 'E'){
							addDiv = '<span class="badge badge-dark">거래완료</span>&nbsp;';
						}
						
						html += '        <h5 class="card-title">' + data[i].saleTitle + '</h5>';
						html += '        <p class="card-text sale_amount_list">' + addDiv + data[i].saleAmount + '원</p>';
						html += '        <p class="card-text">' + data[i].saleDate + '</p>';
						
						
						html += '		 <p class="card-text align_right"><img src="' + clientUrl + '/image/icon/comment.png" width="15px"> ' + data[i].replyCnt + ' <img src="' + clientUrl + '/image/icon/heart.png" width="15px"> ' + data[i].goodCnt + '</p>';
						
						html += '      </div>';
						html += '    </div>';
						html += '  </div>';						
						

						html += '</div>';
				    	html += '</a>';
							
				    	$('#market').append(html);
					} 	

				},
				error : function(e){
					console.log("에러발생 : " + e);
				}
			});
		}		
			
					
		// 구매 등록폼
		function fnSaleWriteForm(){
			nowPageLoc = "reg";
			
			// 페이지 테그 삭제
			$('#market *').remove();
		    
			// 구매 등록폼
			var html = '';
			// 검색
			html += '<div class="write_form" >';
			html += '	<div class="back_class"><img id="back_btn" src="' + clientUrl + '/image/icon/back.png"></div>';
			html += '	<div>마켓 글쓰기</div>';
			html += '	<div class="write_form_btn" >';
			html += ' 	 	<button type="button" class="btn btn-primary" onclick="fnSaleReg();">완료</button>';
			html += '	</div>';
			html += '</div>';
		
			// 첨부 버튼 
            html += '<div id="attach" class="p-3">';
            html += '	<div class="img_upload_div">';
            html += '		<label for="uploadInput">';
            html += '    		<img class="img_upload" src="' + clientUrl + '/image/icon/carmera.png">';
            html += '     	</label>';
            html += '     	<input id="uploadInput" style="display: none" type="file" name="filedata" multiple onchange="addPreview($(this));"/>';
            html += '	</div>';
            // 미리보기 영역
            html += '	<div id="preview" class="img_preview"></div>';
            html += '</div>';            
            
            // multipart 업로드시 영역 
            html += '<form id="saleRegForm" />';
			html += '<table class="table">';
    		html += '	<tr>';
			html += '      	<td>';

 			html += '      		<input id="saleTitle" name="saleTitle" class="form-control" type="text" placeholder="제목">';
 			html += '      		<input id="saleAmount" name="saleAmount" class="form-control" type="number" placeholder="가격">';
			
 			html += '			<br><br>';
 			html += '      		<div class="form-check form-check-inline">';
 			html += '        		<input class="form-check-input" type="radio" name="inlineRadioOptions" id="payDiv" name="payDiv" value="D" checked>';
 			html += '        		<label class="form-check-label" for="inlineRadio1">직접결제</label>';
 			html += '      		</div>';
 			html += '      		<div class="form-check form-check-inline">';
 			html += '        		<input class="form-check-input" type="radio" name="inlineRadioOptions" id="payDiv" name="payDiv" value="K">';
 			html += '        		<label class="form-check-label" for="inlineRadio2">카카오페이</label>';
 			html += '      		</div>';
 			html += '        	<div class="form-group">';
 			html += '          		<label for="exampleFormControlTextarea1"></label>';
 			html += '          		<textarea id="saleCmt" name="saleCmt" class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="게시글 내용을 작성해주세요."></textarea>';
 			html += '        	</div>';
			
			html += '		</td>';
			html += '    </tr>';

			html += '</table>';	
	
			$('#market').append(html);	
		}
				


		
		// 댓글 등록
		function fnReplyBtnClick(){
			
			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}
			
			if($.trim($('#reply_content').val()).length < 1) { 
				alert('댓글을 입력해주세요.'); 
				$('#reply_content').focus();
				return false;
			}
			
			var data = {
				saleNo : nowSaleNo,
				replyCnt : $('#reply_content').val(),
				jsessionId : jsessionId
			};

			$.ajax({
				url : marketUrl + '/reply/reg',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(msg){

					if(msg == 'Y'){
						// 댓글 수 수정
						saleReplyCnt = saleReplyCnt + 1;
						$('#reply_span').text(saleReplyCnt);

						// 댓글 목록 호출
						fnReplyList();
						
							
					}else {
						alert('오류가 발생했습니다. 다시 시도해주세요.' + msg);
						return false;
					}
				}, 
				error : function(err){
					alert(err);
					return false;
				} 				
			});

		}
		
		// 로그인 체크 
		function fnLoginChk(){
		
			if(memIdx == null || memIdx == ''){
				alert('로그인 후 이용해주세요.');
				return false;
			} else {
				return true;
			}
		}		
		
		function fnReplyUpdClose() {
		    // 수정 화면 캐스팅
		    var editDiv = $('div.edit_div');
		    editDiv.hide();
		}		
		
		// 댓글 상세보기로 되돌리기
		function fnReplyView(replyNo) {
			// 댓글 수정폼 숨기기 
			$('#reply_view_div_' + replyNo).show();
			$('#reply_upd_div_' + replyNo).hide();			
		}
		
		// 댓글 수정폼
		function fnReplyUpdForm(replyNo) {
			// 댓글 수정폼 보이게
			$('#reply_view_div_' + replyNo).hide();
			$('#reply_upd_div_' + replyNo).show();
			
		}
		
		// 댓글 수정 처리
		function fnReplyUpd(replyNo) {
		
			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}
			
			var replyCnt = $('#reply_content_' + replyNo);
			
			if($.trim(replyCnt.val()).length < 1) { 
				alert('댓글을 입력해주세요.'); 
				replyCnt.focus();
				return false;
			}
			
			var data = {
				replyNo : replyNo,
				replyCnt : replyCnt.val()
			};

			$.ajax({
				url : marketUrl + '/reply/upd',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(msg){

					if(msg == 'Y'){
						$('#reply_view_cnt_' + replyNo).text(replyCnt.val());
						
						// 댓글 상세보기로 되돌리기
						fnReplyView(replyNo);
					}else {
						alert('댓글 수정에 실패했습니다.' + msg);
						return false;
					}
				}, 
				error : function(err){
					alert(err);
					return;
				} 				
			});

		}
		
		// 댓글 삭제 처리
		function fnReplyDel(replyNo) {
		
			// 로그인 체크 
			if(!fnLoginChk()){
				return false;
			}

			var data = {
				saleNo : nowSaleNo,
				replyNo : replyNo				
			};
		
			$.ajax({
				url : marketUrl + '/reply/del',
				type : 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json; charset=UTF-8',
				//dataType : 'json',
				async : false, 
				success : function(msg){

					if(msg == 'Y'){
						// 댓글창 숨기기
						$('#rely_div_' + replyNo).hide();
						
						// 댓글 수 수정
						saleReplyCnt = saleReplyCnt - 1;
						$('#reply_span').text(saleReplyCnt);

					}else {
						alert('댓글 삭제에 실패했습니다.' + msg);
						return false;
					}
				}, 
				error : function(err){
					alert(err);
					return;
				} 				
			});

		}
		
   		// 파라미터 받기
		function getParameter(name) {
		    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		        results = regex.exec(location.search);
		    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}   		