package com.mw.member.domain;

import lombok.Data;

@Data
public class KakaoLoginInfo {
	
	private int memIdx;
	private String memId;
	private String memName;
	private String memGender;
	private String memPhoto;
	private int memSocial;
	
	public KakaoLoginInfo(int memIdx, String memId, String memName, String memGender, String memPhoto, int memSocial) {
		this.memIdx = memIdx;
		this.memId = memId;
		this.memName = memName;
		this.memGender = memGender;
		this.memPhoto = memPhoto;
		this.memSocial = memSocial;
	}
	
	
}
