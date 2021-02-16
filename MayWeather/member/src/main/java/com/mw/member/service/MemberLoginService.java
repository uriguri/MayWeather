package com.mw.member.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberLoginRequest;

@Service
public class MemberLoginService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public LoginInfo login(MemberLoginRequest loginRequest, HttpServletRequest request, HttpSession session) {
		
		dao = template.getMapper(MemberDao.class);
		
		boolean loginCheck = false;
		
		String memId = loginRequest.getMemId();
		String memPw = loginRequest.getMemPw();
		
		Member member = dao.selectLogin(memId, memPw);
		
		System.out.println(member);
		
	
		
		if(member != null) {
			
			if(member.getMemEmailchk() == 'Y') {
				request.getSession().setAttribute("loginInfo", member.toLoginInfo());
				loginCheck = true;
				session.setAttribute("loginInfo", member.toLoginInfo());
				session.setMaxInactiveInterval(60*60);
				
			} else {
				loginCheck = true;
				request.getSession().setAttribute("msg", "인증되지 않은 아이디입니다. 인증 후 로그인 해주세요.");
			}
		} else {
			member = dao.selectLogin("admin@gmail.com", "1111");
		}
		
		
		return member.toLoginInfo();
		
		
		
	}
	
}
