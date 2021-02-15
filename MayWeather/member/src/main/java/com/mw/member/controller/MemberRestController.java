package com.mw.member.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberLoginRequest;
import com.mw.member.domain.MemberRegRequest;
import com.mw.member.service.MemberLoginService;
import com.mw.member.service.MemberRegService;

@RestController
@RequestMapping("/members")
public class MemberRestController {
	
	@Autowired
	private MemberRegService regService;
	
	@Autowired
	private MemberLoginService loginService;
	
	@PostMapping // 회원가입 
	public String memberReg(@RequestBody MemberRegRequest regRequest) {
		
		return regService.memberReg(regRequest)>0 ? "Y" : "N" ;
	}
	
	
	@PostMapping("/login") // 로그인
	public LoginInfo login(@RequestBody MemberLoginRequest loginRequest, 
						HttpServletRequest request) {
	
		return loginService.login(loginRequest, request); 
	}
	

}
