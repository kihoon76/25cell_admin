package hotplace.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.Account;
import hotplace.admin.domain.AjaxVO;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.service.UserService;

@RequestMapping("/user")
@Controller
public class UserController {

	@Resource(name="userService")
	UserService userService;
	
	@PostMapping("list")
	@ResponseBody
	public ExtjsStoreVO<Account> getUserList(
			@RequestParam("limit") int limit,
			@RequestParam("start") int start,
			@RequestParam(name="searchType", required=false) String searchType,
			@RequestParam(name="searchValue", required=false) String searchValue) {
		
		Map map = new HashMap();
		map.put("start", start);
		map.put("limit", limit);
		map.put("searchType", searchType);
		map.put("searchValue", searchValue);
		
		return userService.getUserList(map);
	}
	
	@PostMapping("adminlist")
	@ResponseBody
	public AjaxVO getAdminUserList(@RequestParam("accountId") String accountId) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
			List<Map<String, String>> list = userService.getAdminUserList(accountId);
			
			vo.setSuccess(true);
			vo.setDatas(list);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	
	@PostMapping("auth/modify")
	@ResponseBody
	public AjaxVO modifyUserAuth(@RequestBody Account account) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
			if("-1".equals(account.getGrade())) {
				account.setGrade(null);
			}
			
			boolean result = userService.modifyUserAuth(account);
			if(result) {
				vo.setSuccess(true);
			}
			else {
				vo.setSuccess(false);
			}
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
	
		return vo;
	}
	
	@PostMapping("admin/modify")
	@ResponseBody
	public AjaxVO modifyUserAdminAuth(@RequestBody Account account) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
			
			boolean result = userService.modifyUserAdminAuth(account);
			if(result) {
				vo.setSuccess(true);
			}
			else {
				vo.setSuccess(false);
			}
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
	
		return vo;
	}
	
	@PostMapping("auth/out")
	@ResponseBody
	public AjaxVO outUser(@RequestBody Account account) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
						
			userService.outUser(account);
			vo.setSuccess(true);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
	
		return vo;
	}
}
