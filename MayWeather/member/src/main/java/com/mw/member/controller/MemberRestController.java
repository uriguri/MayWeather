package com.mw.member.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.MemberEditRequest;
import com.mw.member.domain.MemberLoginRequest;
import com.mw.member.domain.MemberPhotoEditRequest;
import com.mw.member.domain.MemberRegRequest;
import com.mw.member.service.MemberDeleteService;
import com.mw.member.service.MemberEditService;
import com.mw.member.service.MemberIdCheckService;
import com.mw.member.service.MemberLoginService;
import com.mw.member.service.MemberPhotoEditService;
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
	
	@Autowired
	private MemberPhotoEditService photoEditService;
	
	@Autowired
	private MemberIdCheckService idCheckService;
	
	
	
	@PostMapping // 회원가입 
	public String memberReg(@RequestBody MemberRegRequest regRequest) {
		return regService.memberReg(regRequest)>0 ? "Y" : "N" ;
	}
	
	
	@GetMapping("/idcheck")	// 중복 아이디 체크
	public String idCheck(@RequestParam("memId") String memId) {
		return idCheckService.chekId(memId);
	}
	
	@PostMapping("/login") // 로그인
	public LoginInfo login(@RequestBody MemberLoginRequest loginRequest, 
						HttpServletRequest request, Model model) {
		
		model.addAttribute("loginCheck", loginService.login(loginRequest, request));
		
		return loginService.login(loginRequest, request); 
	}
	
	@GetMapping("/logout") // 로그아웃
	public String logout(HttpSession session, RedirectAttributes rda) {
		
		session.invalidate();
		
		System.out.println("로그아웃!!!");
		
		rda.addAttribute("type", "delete");
		rda.addAttribute("result", "ok");
		
		return "logoutSUCESS";
	}
	
	@PutMapping("/edit/{memIdx}")// 정보수정
	public int editMem(@RequestBody MemberEditRequest editRequest, @PathVariable("memIdx") int memIdx) {
		
		System.out.println("=======PUT=======");
		System.out.println(editRequest);
		System.out.println(memIdx);
		System.out.println("=======PUT=======");
		
		return editService.editMember(editRequest, memIdx);
	}
	
	@PutMapping("/edit/photo") //사진 수정
	public int photoUpload(@RequestBody MemberPhotoEditRequest photoEditRequest) {
		
		return photoEditService.editPhotoMember(photoEditRequest);
	}
	
	
	
	@DeleteMapping("/delete/{memIdx}")// 회원탈퇴
	public int deleteMem(@PathVariable("memIdx") int memIdx ) {
		
		return deleteService.deleteMem(memIdx);
	}
	
	
	
	
	
		
	
}
