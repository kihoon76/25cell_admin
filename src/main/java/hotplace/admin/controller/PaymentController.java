package hotplace.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.AjaxVO;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.Payment;
import hotplace.admin.service.PaymentService;
import hotplace.admin.utils.SessionUtil;

@RequestMapping("/payment")
@Controller
public class PaymentController {

	@Resource(name="paymentService")
	PaymentService paymentService;
	
	@PostMapping("list")
	@ResponseBody
	public ExtjsStoreVO<Payment> getCouponList(
			@RequestParam("limit") int limit,
			@RequestParam("start") int start,
			@RequestParam(name="searchType", required=false) String searchType,
			@RequestParam(name="searchValue", required=false) String searchValue) {
		
		Map map = new HashMap();
		map.put("start", start);
		map.put("limit", limit);
		map.put("searchType", searchType);
		map.put("searchValue", searchValue);
		
		return paymentService.getPaymentList(map);
	}
	
	@PostMapping("confirm")
	@ResponseBody
	public AjaxVO confirmPayment(@RequestBody Map<String, String> param) {
		
		System.err.println(param.get("key"));
		param.put("accountId", SessionUtil.getSessionUserId());
		AjaxVO vo = new AjaxVO();
		
		try {
			paymentService.confirmPayment(param);
			vo.setSuccess(true);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	
}
