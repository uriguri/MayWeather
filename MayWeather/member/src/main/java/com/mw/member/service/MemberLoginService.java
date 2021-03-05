package com.mw.member.service;

import javax.servlet.http.HttpSession;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberLoginRequest;
import com.mw.member.util.RedisService;
import com.mw.member.util.Sha256;

@Service
public class MemberLoginService {

	private MemberDao dao;

	@Autowired
	private SqlSessionTemplate template;

	@Autowired
	private Sha256 sha256;

	@Autowired
	private RedisService redisService;

	
	public LoginInfo login(MemberLoginRequest loginRequest, 
						   String jSessionId,
						   HttpSession session ) {

		dao = template.getMapper(MemberDao.class);

//		String memId = loginRequest.getMemId();
//		String memPw = loginRequest.getMemPw();

		//sha256 방식으로 입력 암호화
		String memEncryptPw = sha256.encrypt(loginRequest.getMemPw());

		// ID와 PW로 로그인
		Member member = dao.selectLogin(loginRequest.getMemId(), memEncryptPw);
		
		System.out.println("로그인 한 멤버 정보 " + member);

		// 해당하는 멤버객체가 DB에 있다면
		// -> 이메일 인증여부 체크 ->
		// Y일 경우 redis를 사용해 세션에 loginInfo 저장
		// N일 경우 현재 세션에 미 인증메세지 전달
		
		if (member != null) {

			if (member.getMemEmailchk() == 'Y') {

				member.setJsessionId(jSessionId);
				
				// 기존 세션 저장 방식
				session.setAttribute("loginInfo", member.toLoginInfo());
				session.setAttribute("memIdx", member.getMemIdx());
				session.setAttribute("memName", member.getMemName());
				session.setAttribute("memId", member.getMemId());
				session.setAttribute("memLoc", member.getMemLoc());
				session.setAttribute("memGender", member.getMemGender());
				session.setAttribute("memPhoto", member.getMemPhoto());
				session.setAttribute("memEmailchk", member.getMemEmailchk());
				
				//21 03 05 나이 저장 추가
				session.setAttribute("memAge", member.getMemAge());
				
				
				// 레디스 세션 저장 방식
				redisService.setMemInformation(member.toLoginInfo(), jSessionId, session);

				// 레디스 세션 확인 
				//LoginInfo test = redisService.getMemInformation(jSessionId);
				//System.out.println(test.getMemIdx());
				 

			} else {
				session.setAttribute("msg", "인증되지 않은 아이디입니다. 인증 후 로그인 해주세요.");
			}
			
		} else {
			member = dao.selectLogin("admin@gmail.com", "1111");
		}

		return member.toLoginInfo();

	}

}
