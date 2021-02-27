package com.mw.member.util;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mw.member.domain.LoginInfo;

@Service
public class RedisService {

	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	
	/* Redis에 사용자 정보 등록 */
	public void setMemInformation(LoginInfo loginInfo, String jSessionId, HttpSession session) {
		
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		redisTemplate.setValueSerializer(new StringRedisSerializer());
		
		String key = jSessionId;
		
		
		/*
		 * Map<String, Object> mapMemberInfo = new HashMap<String, Object>();
		 * mapMemberInfo.put("memIdx", loginInfo.getMemIdx());
		 * mapMemberInfo.put("memId", loginInfo.getMemId());
		 * mapMemberInfo.put("memName", loginInfo.getMemName());
		 * mapMemberInfo.put("memPhoto", loginInfo.getMemPhoto());
		 * mapMemberInfo.put("memLoc", loginInfo.getMemLoc());
		 * mapMemberInfo.put("memGender", loginInfo.getMemGender());
		 * mapMemberInfo.put("memEmailchk", loginInfo.getMemEmailchk());
		 * mapMemberInfo.put("memSocial", loginInfo.getMemSocial());
		 */
		
		
		Gson gson = new Gson();
		
		
		redisTemplate.opsForValue().set(key, gson.toJson(loginInfo));
		
		
		System.out.println(jSessionId);
		System.out.println("====================");
		System.out.println(key);
		System.out.println("====================");
		System.out.println(loginInfo);
		
	
		 session.setAttribute("jsessionId", jSessionId);
		 session.setAttribute("memIdx", loginInfo.getMemIdx());
		 session.setAttribute("memId", loginInfo.getMemId());
		 session.setAttribute("memName", loginInfo.getMemName());
		 session.setAttribute("memPhoto", loginInfo.getMemPhoto());
		 session.setAttribute("memLoc", loginInfo.getMemLoc());
		 session.setAttribute("memGender", loginInfo.getMemGender());
		 session.setAttribute("memEmailchk", loginInfo.getMemEmailchk());
		 
	}
	
	/* Redis 에서 정보를 가져온다 */
	public LoginInfo getMemInformation(String sessionId) {
		
		String key = sessionId;
		
		LoginInfo result = new LoginInfo(
				(String) redisTemplate.opsForHash().get(key, "memIdx"),
				(String) redisTemplate.opsForHash().get(key, "memId"),
				(String) redisTemplate.opsForHash().get(key, "memName"),
				(String) redisTemplate.opsForHash().get(key, "memPhoto"),
				(String) redisTemplate.opsForHash().get(key, "memLoc"),
				(String) redisTemplate.opsForHash().get(key, "memGender"),
				(String) redisTemplate.opsForHash().get(key, "memEmailchk"),
				(String) redisTemplate.opsForHash().get(key, "memSocial"),
				(String) redisTemplate.opsForHash().get(key, "jsessionId"));
		
		return result;
	}
}
