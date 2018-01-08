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
			@RequestParam(name="searchType", required=false) String searchType,
			@RequestParam(name="searchValue", required=false) String searchValue) {

	
		Map map = new HashMap();
		map.put("searchType", searchType);
		map.put("searchValue", searchValue);
		map.put("start", start);
		map.put("limit", limit);
		
		return logService.getLogList(map);
	}
}
