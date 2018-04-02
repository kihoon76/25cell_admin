package hotplace.admin.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("define")
	@ResponseBody
	public AjaxVO<Map<String, String>> getDefine() {
		
		AjaxVO<Map<String, String>> vo = new AjaxVO<>();
		
		try {
			vo.setSuccess(true);
			vo.setDatas(authorityService.getDefine());
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
}
