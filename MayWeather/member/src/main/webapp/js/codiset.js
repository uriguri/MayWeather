// 드래그 할 아이템, 파일이름, 이미지의 zidx, 드래그한 아이템 배열, 대분류 리스트를 담을 변수
var listItem;
var cIdx;
var img_zidx = 0;
var dragList = [];
var cPage = 1;
var viewlist;
// var myUrl = 'http://localhost:8080';
// var myUrl = 'http://ec2-54-180-82-31.ap-northeast-2.compute.amazonaws.com:8080';
  var myUrl = 'https://maycloset.tk';

 var totalClosetPage = 1;

 var closetPageLoc;



// $(document).ready(function () {
//     list(page);
// })

window.onscroll = function (e) {
        if (closetPageLoc == 'closetNow' && cPage <= totalClosetPage) {
            //window height + window scrollY 값이 document height보다 클 경우,
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                cPage++;
                listView(cPage);
            } 
        }
    }





function listView(cPage){

    closetPageLoc = 'closetNow';

    $.ajax({
        url: myUrl+'/closet/list/' + cPage,
        type: 'GET',
        success: function (listData) {
            // 데이터가 들어왔을 때
            // 총 페이지 개수 불러오기
            totalClosetPage = listData.totalPageCnt;
            console.log(listData.closetList.length);
            if (listData.closetList.length > 0) {
                
                var listhtml = '<table class="closetList" id="closetList">';
                 for (var i = 0; i < listData.closetList.length; i++) {
                    if ((i == 0) || (i % 3 == 0)) {
                       listhtml += '<tr>';
                    }
                    listhtml += '<td> <div class="clist" id="clist' + i + '" onclick="viewChk('+listData.closetList[i].cidx+')"><p><span class="title">#' + listData.closetList[i].ctext + '</span></p></div>';
                    // 좋아요 클릭 여부에 따른 하트 변화 = 내 좋아요 카운트 기준
                    if (listData.closetList[i].myLikeCnt == 0) {
                        listhtml += '<img src="'+myUrl+'/closet/image/icon/heart.png" id="emptyheart"><span class="likeSpan">' + listData.closetList[i].clikecnt+'</span>';
                        listhtml +=  '</td>';
                    } else {
                        listhtml += '<img src="'+myUrl+'/closet/image/icon/heart.png" id="emptyheart"><span class="likeSpan">' + listData.closetList[i].clikecnt+'</span>';
                        listhtml += '</td>';
                    }
                    if ((i == 2) || (i % 3 == 2)) {
                        listhtml += '</tr>';
                    }
                }
                listhtml += '</table>';
                listhtml += '<div class="writebtn" id="writebtn" onclick="writeCall()"></div>';

            }
            $('.content').append(listhtml);
        },
        error: function (e) {
            console.log("에러 발생 : " + e);
        }
    })



}


// 리스트 부르는 함수
function list() {

    $('.content').empty();
    
    listView(1);
    
}

// 로그인 감지 
function viewChk(cIdx){
    if(memIdx==null || memIdx==''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '로그인이 안되셨네요!',
            footer: '<a href="javascript:memberMain()">로그인 페이지로 이동</a>'
          })
    } else {
        viewclick(cIdx);
    }
}

// 게시물 세부 페이지
function viewclick(cIdx) {
    console.log('게시물번호:' + cIdx);

    // 리스트 페이지 비우기
    $('.content').empty();

    closetPageLoc = 'noList';

    // 세부페이지 호출하기
    $.ajax({
        url: myUrl+'/closet/list/view/' + cIdx+'/'+jsessionId,
        type: 'GET',
        success: function (viewData) {
            var viewhtml = '<div class="closetPage" "id="closetPage">'; 
            viewhtml += '       <div id="viewBack"><img src="'+myUrl+'/closet/image/icon/back.png" onclick="redirect()">';
            viewhtml += '           <span class="closetTitle" onclick="getGbookList('+viewData.memIdx+')">' + viewData.name + '님의 옷장</span></div>';
            viewhtml += '               <div class="closetView" id="closetView">';

            console.log('viewData'+viewData);
            // 사진 정보 데이터 파싱
            var viewPhoto = JSON.parse(viewData.cphoto);
            console.log(viewPhoto);
            // 클로젯뷰 안의 이미지 for문으로 넣기
            for (var i = 0; i < viewPhoto.length; i++) {
                viewhtml += '               <img src="';
                viewhtml +=                             viewPhoto[i].src;
                viewhtml += '                               " style="z-index:' + viewPhoto[i].z + '; position:absolute; left:' + (viewPhoto[i].x+20) + 'px; top:' + (viewPhoto[i].y-350) + 'px;" width=150 height=150 >';
            }
            // 이미지 for문 종료
            viewhtml += '</div>';
            viewhtml += '<input type=hidden id="memIdx" name="memIdx" value="' + viewData.memIdx + '">';
            viewhtml += '<div class="viewbtns">';

            // 좋아요 하트 클릭 유무에 따른 다른 이미지 보여주기
            // 좋아요 하트 체크(1:등록, 2:삭제)
            var likeChk = 1;
            var heartImg = "heart.png"
                if (viewData.myLikeCnt == 0) {
                    heartImg = "emptyheart.png"
                    viewhtml += '<img src="'+myUrl+'/closet/image/icon/' + heartImg + '" id="heartview" onclick="clickLike(' + cIdx + ',' + likeChk + ')" ><span class="viewLike">' + viewData.clikecnt+'</span>';
                } else {
                    likeChk = 2;
                    viewhtml += '<img src="'+myUrl+'/closet/image/icon/' + heartImg + '" id="heartview" onclick="clickLike(' + cIdx + ',' + likeChk + ')" ><span class="viewLike">' + viewData.clikecnt+'</span>';
                }

            // memIdx가 현재 로그인한 사람과 같을 경우 삭제,편집 페이지 보여주기
            if (viewData.memIdx == memIdx) {
                viewhtml += '<button type="button" class="btn btn-light" id="del" onclick="del(' + cIdx + ')">삭제</button>';
                viewhtml += '<button type="button" class="btn btn-light" id="edit" onclick="edit(' + cIdx + ')">수정</button>';
            }
            // 삭제, 편집 페이지 종료
            viewhtml += '</div>';
            viewhtml += '<div class="closetTextView" id="closetTextView"> <span>' + viewData.ctext + '</span> </div>';
            // 최종 페이지 종료
            viewhtml += '</div>';
            $('.content').append(viewhtml);
        },
        error: function (e) {
            console.log('에러' + e);
        }

    })
}



// 좋아요 늘려주는 카운트(likeChk=1:등록, 2:삭제)
function clickLike(cIdx, likeChk) {

    var like = {
        jsessionId: jsessionId,
        cIdx: cIdx,
        likeChk: likeChk
    };
    $.ajax({
        url: myUrl+'/closet/list/like',
        type: 'post',
        data: like,
        success: function (data) {
            console.log('데이터값' + data);
            viewclick(cIdx);
        },
        error: function (e) {
            console.log('에러:' + e);
        }
    })
}

//  수정하기
function edit(cIdx) {
    $('.content').empty();

    closetPageLoc = 'noList';

    console.log(cIdx);
    // 수정 폼 만들어주기 -> ajax로 불러오기
    $.ajax({
        url: myUrl+'/closet/edit/' + cIdx,
        type: 'GET',
        success: function (data) {
            var dataPhoto = JSON.parse(data.cphoto);

            var edithtml ='<div class="editWrap">';
            edithtml += '   <div class="editTitle" id="editTitle"><span>수정하기</span></div>';
            edithtml += '       <div class="editCloset" id="editCloset">' 
            for(var i=0; i<dataPhoto.length; i++){
                edithtml += '       <img src="';
                edithtml += dataPhoto[i].src;
                edithtml += '"          style="z-index:' + dataPhoto[i].z + '; position:absolute; left:' + (dataPhoto[i].x-30) + 'px; top:' + (dataPhoto[i].y-350) + 'px;" width=150 height=150 >';
            }
            edithtml += '       </div>';
            edithtml += '   <div class="form-floating" id="editText">';
            edithtml += '       <form action="POST" id="closetEditForm">';
            edithtml += '           <input type=hidden id="cIdx" name="cIdx" value="' + cIdx + '">';
            edithtml += '                <textarea class="form-control" id="closetEditText" style="height: 100px">' + data.ctext + '</textarea>';
            edithtml += '   </div>';
            edithtml += '   <div class="editbtns">';
            edithtml += '   <button type="button" class="btn btn-light" id="editView" onclick="editCall(' + cIdx + ')">수정</button>';
            edithtml += '   <button type="button" class="btn btn-light" id="cancel" onclick="redirect()">취소</button>';
            edithtml += '   </div>';
            edithtml += '</div>';
            $('.content').append(edithtml);
        }
    })
}

// 수정 ajax 호출
function editCall(cIdx) {
    closetPageLoc = 'noList';
    console.log('게시물번호:' + cIdx);

    var edit = {
        cIdx: cIdx,
        ctext: $('#closetEditText').val()
    };
    var editData = JSON.stringify(edit);
    $.ajax({
        url: myUrl+'/closet/edit',
        type: 'POST',
        dataType: 'JSON',
        data: editData,
        contentType: 'application/json; charset=utf-8',
        success: function (editData) {
            console.log('수정데이터:' + editData);
            Swal.fire({
                icon: 'success',
                title: '수정이 완료되었습니다!',
                showConfirmButton: false,
                timer: 1500
              })
            redirect();
        },
        error: function (e) {
            console.log('에러') + e;
        }
    })
}

// 페이지 뒤로 가기
function redirect() {
    
    closetPageLoc = 'noList';

    $('.content').empty();
    $('.content').css({'margin-top':'100px','margin-left':'0','margin-right':'0'});
    listView(1);

}

// // 삭제하기
function del(cIdx) {

    closetPageLoc = 'noList';

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '정말로 삭제하시겠어요?',
        text: "삭제하면 리스트로 되돌아갑니다.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네,삭제할래요!',
        cancelButtonText: '아니요, 삭제하지 않을래요.',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            '삭제 완료!',
            '작성한 게시물이 없어졌습니다.',
            'success'
          )

          $.ajax({
            url: myUrl+'/closet/delete/' + cIdx,
            type: 'GET',
            success: function (delData) {
                $('.content').empty();
                listView(1);
            }, error: function (e) {
                console.log("에러 발생" + e);
            }
        })

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '삭제 취소',
            '게시물이 살아남았습니다 :)',
            'error'
          )
        }
      })
       
}


// 글쓰기 부르는 펑션
function writeCall(){
    if(memIdx==null || memIdx==''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '로그인이 안되셨네요!',
            footer: '<a href="javascript:memberMain()">로그인 페이지로 이동</a>'
          })
    } else {
        bigCategory();
    }
}

// 대분류 호출하는 펑션
function bigCategory() {

    $('.content').empty();

    closetPageLoc = 'noList';

    $.ajax({
        url: myUrl+'/closet/codi',
        type: 'get',
        async: false,
        success: function (data) {
            var html = '<div class="writeWrap">';
            html += '       <div class="bigCategory">';
            html += '           <div class="row" id="bigCategoryMenu" style="margin-left: 20px; margin-top: 15px;">';
            html += '               <div class="col-6 col-sm-3" onclick="codiView(\'top\')" id="top">' + data[3].codiList + '<br>' + data[3].codiPho + '</td>' + '</div>';
            html += '               <div class="col-6 col-sm-3" onclick="codiView(\'outer\')" id="outer" >' + data[1].codiList + '<br>' + data[1].codiPho + '</td>' + '</div>';
            html += '           <div class="w-100"></div>';
            html += '               <tr>';
            html += '           <div class="col-6 col-sm-3" onclick="codiView(\'bottom\')" id="bottom" >' + data[0].codiList + '<br>' + data[0].codiPho + '</td>' + '</div>';
            html += '           <div class="col-6 col-sm-3" onclick="codiView(\'shoes\')" id="shoes">' + data[2].codiList + '<br>' + data[2].codiPho + '</td>' + '</div>';
            html += '              </tr>';
            html += '       </div>';
            html += '   </div>';
            html += '</div>';

            $('.content').append(html);
        },
        error: function (e) {
            console.log("에러 발생 :" + e);
        }
    })
}




// 코디 세부 리스트 출력
function codiView(value) {
    listItem = value;
    // 빅카테고리 메뉴 숨기기
    $('.bigCategory').css('display', 'none');
    // 다시 돌아왔을 때 codibg 출력
    $('#codibg').css('display', 'block');


    var html = '<div class="codi" id="codi" name="codi">';
    html += '       <table width="80%">';
    html += '           <tr>';
    for (i = 1; i < 4; i++) {
        html += '           <td class=' + i + '>' + '<div class="dragev" id="dragev' + listItem + i + '">' + '<img src="'+myUrl+'/closet/image/codi/' + value + '/' + i + '.png" width="120" height="120" id="codiInfo' + listItem + i + '">' + '</div> </td>';
    }
    html += '           </tr>';
    html += '           <tr>';
    for (i = 4; i < 7; i++) {
        html += '           <td class=' + i + '>' + '<div class="dragev" id="dragev' + listItem + i + '">' + '<img src="'+myUrl+'/closet/image/codi/' + value + '/' + i + '.png" width="120" height="120" id="codiInfo' + listItem + i + '" >' + '</div> </td>';
    }
    html += '          </tr>';
    html += '       </table>';
    html += '</div>';
    html += '<div class="codicon" id="codicon" name="codicon">';
    html += '   <img src="'+myUrl+'/closet/image/icon/back.png" id="codiback" onclick="backDrag()">';
    html += '   <img src="'+myUrl+'/closet/image/icon/list.png" id="codilist" onclick="showList()">';
    html += '   <img src="'+myUrl+'/closet/image/icon/save.png" id="codisave" onclick="saveDrag()">';
    html += '   <img src="'+myUrl+'/closet/image/icon/reset.png" id="codireset" onclick="resetDrag()">';
    html += '</div>';
    if ($('#codibg').length == 0) {
        html += '<div class="codibg" id="codibg" name="codibg"></div>';
    }
    $('.writeWrap').append(html);

    // 이미지 드래그해서 끌어다놓고, x, y좌표 얻기
    $('#codi').on('mouseenter', 'img', function () {
        //드래그 시 clone 생성해서 이동
        $('#codi img').draggable({
            helper: 'clone',
            cursor: 'hand'
        });

        // 드롭될 때 발생하는 이벤트
        $('#codibg').droppable({
            activeClass: 'ui-state-hover',
            accept: 'img',
            containment: 'parent',
            drop: function (e, ui) {
                if (!ui.draggable.hasClass('dropped'))
                    $(this).append($(ui.draggable).clone().addClass('dropped').draggable());
            }
        });

        // 이미지 클릭하면 항상 위로 오게 만들기
        $('img').mousedown(function () {
            $(this).css('z-index', img_zidx);
            img_zidx++;
        })
    })
}

// 리셋하는 함수
function resetDrag() {
    if ($('#codibg').length > 0) {
        $('#codibg').empty();
    }
}

// 아이템 클릭 동작 뒤로가는(기존 아이템을 삭제하는)함수
function backDrag() {
    $('#codibg img').last().remove();
}

// 버튼 누르면 배열에 드래그 정보를 저장하는 이벤트:이미지경로, xy좌표, z-index
function saveDrag() {

    $('#codibg img').each(function (index, item) {
            var dragsrc = $(item).attr('src');
            var dragoffleft = $(item).offset().left;
            var dragofftop = $(item).offset().top;
            var dragoffzidx = $(item).css('z-index');
            // console.log('dragsrc:' + dragsrc, 'dragoffleft:' + dragoffleft, 'dragofftop:' + dragofftop, 'zIdx:' + dragoffzidx);
            dragList.push({ src: dragsrc, x: dragoffleft, y: dragofftop, z: dragoffzidx });
            // 배열 위치 확인
             console.log('dragList 1일때:' +dragList.length);
        
    })

    if (dragList.length <= 0) {
        alert('저장된 조합이 없습니다. 다시 시도해주세요.');
    }
    // 글쓰기 화면 보여주기 -> 세부 리스트 내용 비워주기
    $('#codi').remove();
    // 코디아이콘 디스플레이 없애기
    $('#codicon').remove();
    // 빅카테고리메뉴 삭제
    $('.bigCategory').remove();
    // 코디 드래거블 해제
    $('#codibg img').draggable({ disabled: true });
    // closet, codibg css 수정
    $('.content').css({'margin-top':'0','margin-left':'0','margin-right':'0'});
    $('#codibg').css({'margin-top':'0','margin-left':'0','background-color':'#EDEDED','border':'1px solid #ddd','position':'absolute','top':'180px'});
    $('.writeWrap').css({'width':'350px','height':'550px','background-color':'white','padding':'10px','margin-left':'10px','margin-top':'120px','box-shadow':'10px 4px 633px 2px'});
    



    // 텍스트에리어 만들어주기
    var cHtml = '      <div class="writeTitle"><span>글쓰기</span></div>';
    cHtml += '          <form action="POST" id="closetRegForm">';
    cHtml += '          <div class="form-floating">';
    cHtml += '            <textarea class="form-control" id="closetText"></textarea>';
    cHtml += '          </div>';
    cHtml += '              <button type="button" class="btn btn-light" id="savebuttn">SAVE</button>';
    cHtml += '              <button type="button" class="btn btn-light" id="cancelbuttn" onclick="redirect()">CANCEL</button>';
    cHtml += '</div>';
    
    $('.writeWrap').append(cHtml);
    
    // 이미지 리스트 넘겨주는 ajax
    $('#savebuttn').on('click', function () {
        // db로 보내주기 위한 객체
        var img = {
            jsessionId: jsessionId,
           // memIdx: memIdx,
            cphoto: dragList,
            ctext: $('#closetText').val()
        };
        console.log(img);
        // 배열 JSON으로 변환
        var jsonDrag = JSON.stringify(img);
        console.log('json : ' + jsonDrag);
        console.log('jsonDrag length:' + jsonDrag.length);
        $.ajax({
            url: myUrl+'/closet/write',
            type: 'POST',
            dataType: 'JSON',
            data: jsonDrag,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                // 보낸 후 리스트로 돌아가기
                $('.content').empty();
                $('.content').css({'margin-top':'100px','margin-left':'0','margin-right':'0'});
                listView(1);
                dragList=[];
            },
            error: function (e) {
                console.log('에러' + e);
            }
        })

    })
}

// 리스트로 돌아가는 함수
function showList() {
    // 코디div 비우기
    $('#codi').remove();
    // 코디아이콘 css none
    $('#codicon').remove();
    // 드래그배경 css none
    $('#codibg').css('display', 'none');
    // 대분류리스트 부르기
    $('.bigCategory').css('display', 'block');
    
}