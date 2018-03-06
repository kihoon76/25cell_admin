package hotplace.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.AjaxVO;
import hotplace.admin.domain.Configure;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.service.ConfigureService;
import hotplace.admin.service.ThriftService;

@RequestMapping("/configure")
@Controller
public class ConfigureController {
	
	@Resource(name="configureService")
	ConfigureService configureService;
	
	@Resource(name="thriftService")
	ThriftService thriftService;

	@PostMapping("list")
	@ResponseBody
	public ExtjsStoreVO<Configure> getConfigureList() {
		return configureService.getConfigureList();
	}
	
	@PostMapping("modify")
	@ResponseBody
	public AjaxVO<Configure> modifyConfig(@RequestParam("confNum") String confNum,
							   @RequestParam("confContent") String confContent,
							   @RequestParam("confValue") String confValue,
							   @RequestParam("confBigo") String confBigo) {
		
		Configure param = new Configure();
		param.setConfNum(confNum);
		param.setConfContent(confContent);
		param.setConfValue(confValue);
		param.setConfBigo(confBigo);
		
		AjaxVO<Configure> vo = new AjaxVO<Configure>();
		vo.setSuccess(false);
		
		try {
			Configure r = configureService.modifyConfig(param);
			if(r != null) {
				AjaxVO result = thriftService.runHotplace25Config();
				vo.setSuccess(true);
				if(!result.isSuccess()) {
					vo.setErrMsg("hotplace25 not touched....");
				}
				vo.addObject(r);
			}
			else {
				vo.setErrMsg("오류가 발생했습니다");
			}
		}
		catch(Exception e) {
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
}
