package hotplace.admin.utils;

import org.springframework.security.core.context.SecurityContextHolder;

public class SessionUtil {

	public static String getSessionUserId() {
		
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
}
