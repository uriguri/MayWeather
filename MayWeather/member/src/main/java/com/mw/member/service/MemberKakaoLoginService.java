package com.mw.member.service;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.KakaoLoginInfo;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberKakaoRequest;

@Service
public class MemberKakaoLoginService {

	
private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	
	public KakaoLoginInfo login(MemberKakaoRequest kakaoRequest, HttpServletRequest request) {
	
	dao = template.getMapper(MemberDao.class);
		
	String memId = kakaoRequest.getMemId();	
		
	Member member = dao.selectKakaoLogin(memId);
		
	// 이메일 체크가 없기때문에 바로 로그인정보 세션저장
	request.getSession().setAttribute("loginInfo", member.toKakaoLoginInfo());
		
			
	return member.toKakaoLoginInfo();
		
	}
	
}
