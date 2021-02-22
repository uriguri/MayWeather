package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberRegRequest;
import com.mw.member.util.Sha256;

@Service
public class MemberRegService {

	private MemberDao dao;

	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired
	private MailSenderService mailSenderService;
	
	@Autowired
	private Sha256 sha256;

	public int memberReg(MemberRegRequest regRequest) {

		int result = 0;

		dao = template.getMapper(MemberDao.class);

		Member member = regRequest.memberRegRequest();
		sha256.encrypt(member.getMemPw());
		
		result = dao.insertMem(member);

		// 메일발송 : 인증 처리를 하는 페이지 /op/member/verify?id=40&code=난수
		int mailsendCnt = mailSenderService.send(member);
		System.out.println("메일 발송 처리 횟수 : " + mailsendCnt);

		return result;
	}
}
