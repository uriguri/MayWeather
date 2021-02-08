package com.mw.member.domain;

import lombok.Data;

@Data
public class LoginInfo {
		private int memIdx;
		private String memId;
		private String memName;
		private String memGender;
		private String memPhoto;
		
		public LoginInfo(int memIdx, String memId, String memName, String memGender, String memPhoto) {
			this.memIdx = memIdx;
			this.memId = memId;
			this.memName = memName;
			this.memGender = memGender;
			this.memPhoto = memPhoto;
		}
}
