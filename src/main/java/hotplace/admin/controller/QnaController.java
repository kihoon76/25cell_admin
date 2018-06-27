package hotplace.admin.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.AjaxVO;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.QnA;
import hotplace.admin.service.QnaService;
import hotplace.admin.utils.SessionUtil;

@RequestMapping("/qna")
@Controller
public class QnaController {

	@Resource(name="qnaService")
	QnaService qnaService;
	
	@PostMapping("list")
	@ResponseBody
	public ExtjsStoreVO<QnA> getQnaList(
			@RequestParam("limit") int limit,
			@RequestParam("start") int start,
			@RequestParam(name="searchType", required=false) String searchType,
			@RequestParam(name="searchValue", required=false) String searchValue) {
		
		
		Map map = new HashMap();
		map.put("start", start);
		map.put("limit", limit);
		map.put("searchType", searchType);
		map.put("searchValue", searchValue);
		
		return qnaService.getQnaList(map);
	}
	
	@GetMapping("process")
	@ResponseBody
	public AjaxVO processOpen(@RequestParam("type") String process, @RequestParam("seq") String seq) {
		
		String currUser = SessionUtil.getSessionUserId();
		AjaxVO vo = new AjaxVO();
		Map<String, String> m = new HashMap<String, String>();
		m.put("seq", seq);
		
		try {
			QnA qna = qnaService.getQuestion(m);
			
			if(qna == null) {
				throw new Exception("존재하지 않는 문의입니다");
			}
			
			if("Y".equals(qna.getProcessYN())) {
				vo.setErrCode("600");
				throw new Exception("처리완료되었습니다 .");
			}
				
			if(qna.getProcessor() != null && !currUser.equals(qna.getProcessor())) {
				vo.setErrCode("601");
				throw new Exception("ID (" + qna.getProcessor() + ")에 할당된 처리건입니다.");
			}
			
			if("close".equals(process) && qna.getProcessor() == null) {
				vo.setErrCode("603");
				throw new Exception("open후에 close가능합니다.");
			}
			
			if("open".equals(process)) {
				
				//m.put("process", process);
				m.put("currUser", currUser);
				
				try {
					String accountId = qnaService.processOpen(m);
					
					//한번더 체크한다
					if(!currUser.equals(accountId)) {
						vo.setErrCode("601");
						throw new Exception("ID (" + accountId + ")에 할당된 처리건입니다.");
					}
					
					vo.setSuccess(true);
				}
				catch(Exception e) {
					vo.setSuccess(false);
					vo.setErrMsg(e.getMessage());
				}
				
			}
			else if("close".equals(process)) {
				m.put("currUser", currUser);
				try{
					qnaService.processClose(m);
					vo.setSuccess(true);
				}
				catch(Exception e) {
					vo.setSuccess(false);
					vo.setErrMsg(e.getMessage());
				}
			}
			else {
				vo.setSuccess(false);
				vo.setErrMsg("type값이 유효하지 않습니다.");
			}
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}	
	
	@PostMapping("process/resolve")
	@ResponseBody
	public AjaxVO<Map<String, String>> processResolve(@RequestBody Map<String, String> param) {
		String currUser = SessionUtil.getSessionUserId();
		
		AjaxVO<Map<String, String>> vo = new AjaxVO<Map<String, String>>();
		
		param.put("accountId", currUser);
		param.put("processTime", "");;
		
		try{
			qnaService.resolveProcess(param); 
			vo.setSuccess(true);
			vo.addObject(param);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
		
		
//		ObjectMapper om = new ObjectMapper();
//		try {
//			System.err.println(om.writeValueAsString(param));
//		} catch (JsonGenerationException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (JsonMappingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
	}
}
