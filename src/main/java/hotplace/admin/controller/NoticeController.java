package hotplace.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.service.NoticeService;

@RequestMapping("/notice")
@Controller
public class NoticeController {

	@Resource(name="noticeService")
	NoticeService noticeService;
	
	
	@PostMapping("list")
	@ResponseBody
	public ExtjsStoreVO getNoticeList(@RequestParam("limit") int limit,
									  @RequestParam("start") int start,
									  @RequestParam(name="searchType", required=false) String searchType,
									  @RequestParam(name="searchValue", required=false) String searchValue) {
		
		Map map = new HashMap();
		map.put("searchType", searchType);
		map.put("searchValue", searchValue);
		map.put("start", start);
		map.put("limit", limit);
		
		return noticeService.getNoticeList(map);
	}
	
}
