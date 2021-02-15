
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Weather Were 회원가입');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Weather Were 로그인');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("아이디와 비밀번호를 다시 확인해주세요.");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}


   