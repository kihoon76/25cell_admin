package hotplace.admin.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.AjaxVO;
import hotplace.admin.service.StatisticService;

@Controller
@RequestMapping("/statistic")
public class StatisticController {

	@Resource(name="statisticService")
	StatisticService statisticService;
	
	@GetMapping("userKind")
	@ResponseBody
	public AjaxVO<Map<String, Object>> getUserKind() {
		
		AjaxVO<Map<String, Object>> vo = new AjaxVO<>();
		vo.setSuccess(false);
		
		try {
			vo.setDatas(statisticService.getUserKind());
			vo.setSuccess(true);
		}
		catch(Exception e) {
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
}
