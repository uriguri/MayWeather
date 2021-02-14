package com.mw.member.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberLoginRequest;

@Service
public class MemberLoginService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public boolean login(MemberLoginRequest loginRequest, HttpServletRequest request) {
		
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
				
			} else {
				loginCheck = true;
				request.setAttribute("msg", "인증되지 않은 아이디입니다. 인증 후 로그인 해주세요.");
			}
		} 
	
		
		
		
		return loginCheck;
	}
	
}
