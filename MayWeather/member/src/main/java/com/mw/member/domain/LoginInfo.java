package com.mw.member.domain;

import java.io.Serializable;

import lombok.Data;

@Data
public class LoginInfo implements Serializable{
			private String memIdx;
			private String memId;
			private String memName;
			private String memGender;
			private String memPhoto;
			private String memLoc;
			private String memEmailchk;
			private String memSocial;
			private String jsessionId;
			
			public LoginInfo(String memIdx, String memId, String memName, String memGender, String memPhoto, String memLoc, String memEmailchk, String memSocial, String jsessionId) {
				this.memIdx = memIdx;
				this.memId = memId;
				this.memName = memName;
				this.memGender = memGender;
				this.memPhoto = memPhoto;
				this.memLoc = memLoc;
				this.memEmailchk = memEmailchk;
				this.memSocial = memSocial;
				this.jsessionId = jsessionId;
			}
			
			
	}

