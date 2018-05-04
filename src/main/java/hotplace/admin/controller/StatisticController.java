package hotplace.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping("regDate")
	@ResponseBody
	public AjaxVO<Map<String, Object>> getUserRegDate(@RequestParam("regYear") int regYear) {
		
		AjaxVO<Map<String, Object>> vo = new AjaxVO<>();
		vo.setSuccess(false);
		
		try {
			vo.setDatas(statisticService.getUserRegDate(regYear));
			vo.setSuccess(true);
		}
		catch(Exception e) {
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	@GetMapping("accessTime")
	@ResponseBody
	public AjaxVO<Map<String, Object>> getAccessPerTime(
			@RequestParam("year") int year,
			@RequestParam("month") int month,
			@RequestParam("day") int day) {
		
		Map<String, Integer> param = new HashMap<String, Integer>();
		param.put("year", year);
		param.put("month", month);
		param.put("day", day);
		
		AjaxVO<Map<String, Object>> vo = new AjaxVO<>();
		vo.setSuccess(false);
		
		try {
			vo.setDatas(statisticService.getAccessPerTime(param));
			vo.setSuccess(true);
		}
		catch(Exception e) {
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}

	@GetMapping("content")
	@ResponseBody
	public AjaxVO<Map<String, Object>> getCompareContent(
			@RequestParam("year") int year,
			@RequestParam("month") int month) {
		
		Map<String, Integer> param = new HashMap<String, Integer>();
		param.put("year", year);
		param.put("month", month);
		
		AjaxVO<Map<String, Object>> vo = new AjaxVO<>();
		vo.setSuccess(false);
		
		try {
			vo.setDatas(statisticService.getCompareContent(param));
			vo.setSuccess(true);
		}
		catch(Exception e) {
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
}
