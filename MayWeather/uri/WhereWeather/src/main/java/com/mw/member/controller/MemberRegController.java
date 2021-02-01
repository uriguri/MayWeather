package com.mw.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member/reg")
public class MemberRegController {
	
	@GetMapping
	public String getRegForm() {
		return "/member/memberRegForm";
	}
	
	
	@PostMapping
	public String memberReg() {
		return "/member/memberRegView";
	}

}
