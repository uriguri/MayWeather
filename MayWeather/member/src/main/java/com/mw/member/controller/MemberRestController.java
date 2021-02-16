package com.mw.member.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.MemberEditRequest;
import com.mw.member.domain.MemberLoginRequest;
import com.mw.member.domain.MemberRegRequest;
import com.mw.member.service.MemberDeleteService;
import com.mw.member.service.MemberEditService;
import com.mw.member.service.MemberLoginService;
import com.mw.member.service.MemberRegService;

@RestController
@RequestMapping("/members")
public class MemberRestController {
	
	@Autowired
	private MemberRegService regService;
	
	@Autowired
	private MemberLoginService loginService;
	
	@Autowired
	private MemberDeleteService deleteService;
	
	@Autowired
	private MemberEditService editService;
	
	@PostMapping // 회원가입 
	public String memberReg(@RequestBody MemberRegRequest regRequest) {
		
		return regService.memberReg(regRequest)>0 ? "Y" : "N" ;
	}
	
	@PostMapping("/login") // 로그인
	public LoginInfo login(@RequestBody MemberLoginRequest loginRequest, 
						HttpServletRequest request) {
	
		return loginService.login(loginRequest, request); 
	}
	
	@PutMapping("/edit/{memIdx}")
	public int editMem(@RequestBody MemberEditRequest editRequest, @PathVariable("memIdx") int memIdx) {
		
		System.out.println("=======PUT=======");
		System.out.println(editRequest);
		System.out.println(memIdx);
		System.out.println("=======PUT=======");
		
		return editService.editMember(editRequest, memIdx);
	}
	
	@DeleteMapping("/delete/{memIdx}")
	public int deleteMem(@PathVariable("memIdx") int memIdx ) {
		
		return deleteService.deleteMem(memIdx);
	}
	

}
