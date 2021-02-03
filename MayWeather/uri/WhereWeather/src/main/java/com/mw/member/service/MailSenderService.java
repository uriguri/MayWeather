package com.mw.member.service;

import javax.mail.MessagingException;

import java.io.UnsupportedEncodingException;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.mw.member.domain.Member;

@Service
public class MailSenderService {

	@Autowired
	private JavaMailSender sender;
	
	public int send(Member member) {
		
		int result = 1;
		
		MimeMessage message = sender.createMimeMessage();
		
		try {
			
			// 제목
			message.setSubject("[웨어웨더] 회원가입 인증 메일입니다.", "UTF-8");
			// 내용
			String html = "<h1>회원가입을 축하합니다.</h1>";
			html += "<h3>인증을 위해 아래의 링크를 클릭해주세요 ↓ </h3>";
			html += "<a href=\"http://localhost:8080/member/emailchk?memIdx="+member.getMemIdx()+"&memEmailCode="+member.getMemEmailCode()+"\">인증하기</a>";
			
			message.setText(html, "UTF-8", "html");
			
			message.setFrom(new InternetAddress("mayweatheraia@gmail.com"));
			
			message.addRecipient(RecipientType.TO, new InternetAddress(member.getMemId(), member.getMemName()+" 님", "UTF-8"));
			
			sender.send(message);
			
		} catch (MessagingException e) {
			result = 0;
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			result = 0;
			e.printStackTrace();
		}
		
		return result;
	}
}
