package com.mw.member.service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.util.Sha256;

@Service
public class MemberPwFindService {

	MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired 
	private JavaMailSender sender;

	@Autowired
	private Sha256 sha256;
	
	private String newPw;
	
	
	private void getRandomString() {
		Random r  = new Random(System.nanoTime());
		
		StringBuffer sb = new StringBuffer();
		
		for(int i=0; i<8; i++) {
			if(r.nextBoolean()) {
				sb.append(r.nextInt(10));
			} else {
				sb.append((char)(r.nextInt(26)+97));
			}
		}
		newPw = new String(sb);
	}

	
	
	public int rePwSend(String memId) {
		
		//결과 값
		int result = 0;
		
		//메일 객체
		MimeMessage message = sender.createMimeMessage();
		
		dao = template.getMapper(MemberDao.class);
		
		//유저가 입력한 아이디가 존재하는 아이디인지 확인
		int idChk = dao.selectMemberByIdCount(memId);
		
		// 존재한다면 해당하는 멤버 객체를 얻어오고, 임시비밀번호를 메일로 전송 , 멤버 비밀번호 변경해줌.
		if(idChk == 1) {
			
			Member member = dao.selectKakaoLogin(memId);
			
			//임시 비밀번호 생성
			getRandomString();
			
			System.out.println("임시값======");
			System.out.println(newPw);
			System.out.println("임시값======");
			
			try {
				//제목
				message.setSubject("[웨어웨더] 비밀번호 찾기 이메일 입니다.", "UTF-8");
				
				// 내용 html
				String html = "<h1>임시 비밀번호로 설정되었습니다.</h1>";
				html += "생성된 임시 비밀번호는 <strong>"+newPw+"</strong> 입니다.";
				
				// message 내용 적용
				message.setText(html, "UTF-8", "html");
				
				// from 설정
				message.setFrom(new InternetAddress("mayweatheraia@gmail.com"));
				
				// to 설정
				message.addRecipient(RecipientType.TO, new InternetAddress(member.getMemId(), member.getMemName()+" 님", "UTF-8"));
				
				// 메일 발송
				sender.send(message);
				
				//sha256방식으로 비밀번호 변경
				String encryptPw = sha256.encrypt(newPw);
				
				//멤버의 비밀번호 변경
				dao.updateMemberPw(encryptPw, memId);
				
				
			} catch (MessagingException e) {
				e.printStackTrace();
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			
			
			result = 1;
			
		} else {
			
			result = 0;
		}
		
		
		
		return result;
		
	}
}
