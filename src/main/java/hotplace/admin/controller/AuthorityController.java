package hotplace.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@PostMapping("regist")
	@ResponseBody
	public AjaxVO<Authority> registAuthority(@RequestBody Authority authority) {
		
		AjaxVO<Authority> vo = new AjaxVO<>();
		
		try {
			authorityService.registAuthority(authority);
			
			vo.setSuccess(true);
		}
		catch(Exception e){
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
		
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
	
	@PostMapping("delete")
	@ResponseBody
	public AjaxVO<Authority> removeAuthority(@RequestBody Authority authority) {
		
		AjaxVO<Authority> vo = new AjaxVO<>();
		
		try {
			authorityService.removeAuthority(authority);
			vo.setSuccess(true);
		}
		catch(Exception e){
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
		
	}
	
	@GetMapping("define")
	@ResponseBody
	public AjaxVO<Map<String, String>> getDefine(@RequestParam(name="no", required=false) String no) {
		
		AjaxVO<Map<String, String>> vo = new AjaxVO<>();
		
		try {
			vo.setSuccess(true);
			List<Map<String, String>> list = authorityService.getDefine();
			if(no != null) {
				Map<String, String> m = new HashMap<>();
				m.put("name", "없음");
				m.put("value", "-1");
				list.add(0, m);
			}
			
			vo.setDatas(list);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
}
