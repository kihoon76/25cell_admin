package hotplace.admin.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.Authority;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.service.AuthorityService;

@RequestMapping("/authority")
@Controller
public class AuthorityController {

	@Resource(name="authorityService")
	AuthorityService authorityService;
	
	@PostMapping("list")
	@ResponseBody
	public ExtjsStoreVO<Authority> getAuthorityList() {
		
		return authorityService.getAuthorityList();
	}
}
