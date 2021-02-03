package com.mw.member.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;

@Service
public class MemberLoginService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public boolean login(
				   HttpServletRequest request,
				   HttpServletResponse response
				   ) {
		
		String memId = request.getParameter("memberId");
		String memPw = request.getParameter("memberPw");
		String memChk = request.getParameter("memberChk");
		
		dao = template.getMapper(MemberDao.class);
		
		boolean loginCheck = false;
		
		Member member = dao.selectLogin(memId, memPw); 
		
		System.out.println(member);
		
		if(member != null) {
			
			if(member.getMemEmailchk() == 'Y') {
				request.getSession().setAttribute("loginInfo", member.toLoginInfo());
				loginCheck = true;
				
				if(memChk != null && memChk.equals("on")) {
					Cookie c = new Cookie("mid", memId);
					c.setMaxAge(60*60*24*3);
					response.addCookie(c);
				} else {
					Cookie c = new Cookie("mid", memId);
					c.setMaxAge(0);
					response.addCookie(c);
				}
			} else {
				loginCheck = true;
				request.setAttribute("msg", "인증되지 않은 아이디입니다. 인증 후 로그인 해주세요.");
			}
		}
		
		return loginCheck;
	}
	
}
