package com.mw.member.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mw.member.domain.MemberRegRequest;
import com.mw.member.service.MemberRegService;

@Controller
@RequestMapping("/member/reg")
public class MemberRegController {
	
	@Autowired
	private MemberRegService regService;
	
	@GetMapping
	public String getRegForm() {
		return "/member/memberRegForm";
	}
	
	
	@PostMapping
	public String memberReg(
			@ModelAttribute("regData") MemberRegRequest regRequest,
			HttpServletRequest request,
			Model model
			) {
		
		System.out.println(regRequest);
		int result = regService.memberReg(regRequest, request);
		
		model.addAttribute("result", result);
		
		
		return "/member/memberRegView";
	}

}
