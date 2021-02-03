package com.mw.member.service;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberRegRequest;

@Service
public class MemberRegService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired
	private MailSenderService mailSenderService;
	
	public int memberReg(MemberRegRequest regRequest, 
						 HttpServletRequest request) {
		
		int result = 0;
		
		Member member = regRequest.toMember();
		
		dao = template.getMapper(MemberDao.class);
		
		result = dao.insertMember(member);
		
		//메일발송
		int mailsendCnt = mailSenderService.send(member);
		System.out.println("메일 발송 횟수 : " + mailsendCnt);
		
		return result;
	}
}
