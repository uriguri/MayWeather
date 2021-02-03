package com.mw.member.domain;

import lombok.Data;

@Data
public class LoginInfo {

		private String memId;
		private String memName;
		private String memGender;
		private String memPhoto;
		
		public LoginInfo(String memId, String memName, String memGender, String memPhoto) {
			this.memId = memId;
			this.memName = memName;
			this.memGender = memGender;
			this.memPhoto = memPhoto;
		}
}
