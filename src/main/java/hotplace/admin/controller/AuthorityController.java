package hotplace.admin.controller;

import java.io.IOException;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.AjaxVO;
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
	
	@PostMapping("modify")
	@ResponseBody
	public AjaxVO<Authority> modifyAuthorityDefine(	@RequestBody Authority authority) {
		
		AjaxVO<Authority> vo = new AjaxVO<>();
		
		boolean r = authorityService.modifyDefine(authority);
		
		try {
			if(r) {
				vo.setSuccess(true);
				vo.addObject(authority);
			}
			else {
				vo.setSuccess(false);
			}
		}
		catch(Exception e){
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
		
	}
}
