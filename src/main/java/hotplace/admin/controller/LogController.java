package hotplace.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.AccessLog;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.service.LogService;

@RequestMapping("/log")
@Controller
public class LogController {

	@Resource(name="logService")
	private LogService logService;
	
	@PostMapping("list")
	@ResponseBody
	public ExtjsStoreVO<AccessLog> getLogList(
			@RequestParam("limit") int limit,
			@RequestParam("start") int start,
			@RequestParam(name="ip", required=false) String ip,
			@RequestParam(name="id", required=false) String id,
			@RequestParam(name="", required=false) String regDate) {

	
		Map map = new HashMap();
		map.put("ip", ip);
		map.put("id", id);
		map.put("regDate", regDate);
		map.put("start", start);
		map.put("limit", limit);
		
		return logService.getLogList(map);
	}
}
