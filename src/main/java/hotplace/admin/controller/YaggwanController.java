package hotplace.admin.controller;

import java.io.IOException;
import java.util.List;

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
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.Yaggwan;
import hotplace.admin.service.YaggwanService;

@RequestMapping("yaggwan")
@Controller
public class YaggwanController {

	@Resource(name="yaggwanService")
	YaggwanService yaggwanService; 
	
	@PostMapping("list")
	@ResponseBody
	public ExtjsStoreVO<Yaggwan> getYaggwanList() {
		
		ExtjsStoreVO<Yaggwan> vo = new ExtjsStoreVO<Yaggwan>();
		
		List<Yaggwan> list = yaggwanService.getYaggwanList();
		vo.setTotal(list.size());
		vo.setDatas(list);
		
		return vo;
	}
	
	@PostMapping("modify")
	@ResponseBody
	public AjaxVO modifyYaggwan(@RequestBody Yaggwan yaggwan) {
		AjaxVO vo = new AjaxVO();
		
		ObjectMapper m = new ObjectMapper();
		try {
			System.err.println(m.writeValueAsString(yaggwan));
			yaggwanService.modifyYaggwan(yaggwan);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
