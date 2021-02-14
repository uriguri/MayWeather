package com.mw.member.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
		
		regService.memberReg(regRequest);
		
		return "regSUCCESS";
	}
	
	
	@PostMapping("/login") // 로그인
	public String login(@RequestBody MemberLoginRequest loginRequest, HttpServletRequest request, Model model) {
		
		model.addAttribute("loginCheck", loginService.login(loginRequest, request));
		
		
		return "loginSUCCESS";
		
	}
	

}
