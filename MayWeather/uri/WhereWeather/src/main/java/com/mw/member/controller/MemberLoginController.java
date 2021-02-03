package com.mw.member.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mw.member.service.MemberLoginService;

@Controller
@RequestMapping("/member/login")
public class MemberLoginController {
	
	@Autowired
	MemberLoginService loginService;
	
	@GetMapping
	public String getLoginForm() {
		return "member/loginForm";
	}
	
	@PostMapping
	public String login(
			HttpServletRequest request,
			HttpServletResponse response,
			Model model
			) {
		
		model.addAttribute("loginCheck", loginService.login(request, response));
		
		return "member/loginView";
	}
}
