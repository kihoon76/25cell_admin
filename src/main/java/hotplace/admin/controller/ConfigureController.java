package hotplace.admin.controller;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.Gson;

import hotplace.admin.domain.AjaxVO;
import hotplace.admin.domain.Configure;
import hotplace.admin.domain.Email;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.service.ConfigureService;
import hotplace.admin.service.ThriftService;
import hotplace.admin.utils.MailUtil;
import hotplace.admin.utils.ScheduleUtil;
import hotplace.admin.websocket.HpWebSocketHandler;

@RequestMapping("/configure")
@Controller
public class ConfigureController {
	
	@Resource(name="configureService")
	ConfigureService configureService;
	
	@Resource(name="thriftService")
	ThriftService thriftService;
	
	@Resource(name="schedule")
	ScheduleUtil schedule;
	
	@Resource(name="hpWebSocketHandler")
	HpWebSocketHandler hpWebSocketHandler;
	
	@Resource(name="mailUtil")
	MailUtil mailUtil;
	
	private boolean[] heartbeatStatus = { false, false, false};
	private int heartbeat = 0;
	private int mailSendCount = 3;

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
	
	@Scheduled(cron="0 0/1 * * * *")
	public void checkDb() {
		//schedule.viewDatabaseConnection();
		try {
			Map<String, Boolean> result = schedule.viewDatabaseConnection();
			if(result != null) {
				hpWebSocketHandler.sendDatabaseMsg(new Gson().toJson(result));
				recoveryFolicy(result);
			}
			else { //db class load error
				hpWebSocketHandler.sendDatabaseMsg("error");
			}
		} 
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void recoveryFolicy(Map<String, Boolean> result) {
		heartbeat++;
		if(heartbeat >= 5) {
			StringBuilder msg = new StringBuilder();
			boolean err = false;
			
			if(!heartbeatStatus[0]) {
				msg.append("192.168.0.43 : 5분동안 반응없음 <br/>");
				err = true;
			} 
			
			if(!heartbeatStatus[1]) {
				msg.append("192.168.0.42 : 5분동안 반응없음 <br/>");
				err = true;
			} 
			
			if(!heartbeatStatus[2]) {
				msg.append("192.168.0.2 : 5분동안 반응없음 <br/>");
				err = true;
			} 
			
			//초기화
			heartbeat = 0;
			heartbeatStatus[0] = false;
			heartbeatStatus[1] = false;
			heartbeatStatus[2] = false;
			
			
			if(err) {
				try {
					if(mailSendCount > 0) {
						Email email = new Email();
						email.setContent(msg.toString());
						email.setAddress("juninikim@naver.com");
						email.setAddressCC("lovedeer118@gmail.com");
						mailUtil.sendMail(email);
					}
				} 
				catch (AddressException e) {
					e.printStackTrace();
				} 
				catch (MessagingException e) {
					e.printStackTrace();
				}
				finally {
					mailSendCount--;
				}
			}
			else {
				mailSendCount = 3;
			}
		}
		else {
			heartbeatStatus[0] = heartbeatStatus[0] || result.get("43");
			heartbeatStatus[1] = heartbeatStatus[1] || result.get("42");
			heartbeatStatus[2] = heartbeatStatus[2] || result.get("2");
		}
	}
}
