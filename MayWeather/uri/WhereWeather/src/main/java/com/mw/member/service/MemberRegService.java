package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;

@Service
public class MemberRegService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired
	private MailSenderService mailSenderService;
	
	public int memberReg(Member member) {
		
		int result = 0;
		try {
			dao = template.getMapper(MemberDao.class);
			
			result = dao.insertMember(member);
			
			mailSenderService.send(member);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
