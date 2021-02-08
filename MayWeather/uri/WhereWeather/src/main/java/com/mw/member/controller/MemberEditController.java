package com.mw.member.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mw.member.domain.MemberEditRequest;
import com.mw.member.service.MemberEditService;

@Controller
@RequestMapping("/member/edit")
public class MemberEditController {

	@Autowired
	private MemberEditService editService;
	
	@GetMapping
	public String editForm(@RequestParam("memIdx") int memIdx, Model model) {
		model.addAttribute("member", editService.getMember(memIdx));
		return "member/editForm";
	}
	
	@PostMapping
	public String editMember(MemberEditRequest editRequest, Model model) {
		model.addAttribute("result", editService.editMember(editRequest));
		return "member/edit";
	}
}
