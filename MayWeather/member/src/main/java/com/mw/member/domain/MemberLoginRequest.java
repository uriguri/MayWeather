package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberLoginRequest {

	private String memId;
	private String memPw;
}
