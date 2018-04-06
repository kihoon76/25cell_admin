package hotplace.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HotplaceController {

	@GetMapping("main")
	public String index() {
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
