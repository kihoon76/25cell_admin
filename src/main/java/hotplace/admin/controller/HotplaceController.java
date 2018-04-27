package hotplace.admin.controller;

import java.util.Calendar;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HotplaceController {

	@GetMapping("main")
	public String index(ModelMap m) {
		
		String accountId = SecurityContextHolder.getContext().getAuthentication().getName();
		Calendar now = Calendar.getInstance();
		int year = now.get(Calendar.YEAR);
		int month = now.get(Calendar.MONTH);
		int date = now.get(Calendar.DATE);
		
		m.put("accountId", accountId);
		m.put("currentYear", String.valueOf(year));
		m.put("currentMonth", String.valueOf(month+1));
		m.put("currentDate", String.valueOf(date));
		
		return "main";
	}
	
	@GetMapping("signin")
	public String signin() {
		return "signin";
	}
	
	@GetMapping("result")
	public String result() {
		return "result";
	}
}
