package com.mw.member.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.mw.member.domain.KakaoLoginInfo;
import com.mw.member.domain.MemberKakaoRequest;

@Service
public class MemberKakaoLoginService {

	
	
	public KakaoLoginInfo login(MemberKakaoRequest kakaoRequest, HttpServletRequest request) {
		
	
		
	request.getSession().setAttribute("loginInfo", kakaoRequest.toKaKaoLoginInfo());
		
			
	return kakaoRequest.toKaKaoLoginInfo();
		
	}
	
}
