package com.mw.member.service;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberLoginRequest;
import com.mw.member.util.Sha256;

@Service
public class MemberLoginService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired
	private Sha256 sha256;
	
	public LoginInfo login(MemberLoginRequest loginRequest, HttpServletRequest request) {
		
		dao = template.getMapper(MemberDao.class);
		
		boolean loginCheck = false;
		
		String memId = loginRequest.getMemId();
		String memPw = loginRequest.getMemPw();
		
		String memEncryptPw = sha256.encrypt(memPw);
		
		Member member = dao.selectLogin(memId, memEncryptPw);
		
		System.out.println(member);
		
	
		System.out.println("체크체크중체크체크중");
		
		if(member != null) {
			
			if(member.getMemEmailchk() == 'Y') {
				
				request.getSession().setAttribute("loginInfo", member.toLoginInfo());
				
				loginCheck = true;
				
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
