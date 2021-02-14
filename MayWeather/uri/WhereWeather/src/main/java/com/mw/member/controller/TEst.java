package com.mw.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member/index")
public class TEst {

	@GetMapping
	public String test() {
		return "member/index";
	}
}
