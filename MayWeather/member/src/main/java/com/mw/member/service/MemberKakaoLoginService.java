package com.mw.member.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.KakaoLoginInfo;
import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberKakaoRequest;
import com.mw.member.util.RedisService;

@Service
public class MemberKakaoLoginService {

	
private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired
	private RedisService redisService;
	
	public LoginInfo login(MemberKakaoRequest kakaoRequest, HttpServletRequest request, String jSessionId, HttpSession session) {
	
	dao = template.getMapper(MemberDao.class);
		
	String memId = kakaoRequest.getMemId();	
		
	Member member = dao.selectKakaoLogin(memId);
		
	// 이메일 체크가 없기때문에 바로 로그인정보 세션저장 (기존)
	/* request.getSession().setAttribute("loginInfo", member.toKakaoLoginInfo()); */
	
	// 레디스 세션 저장
	redisService.setMemInformation(member.toLoginInfo(), jSessionId, session);
			
	return member.toLoginInfo();
		
	}
	
}
