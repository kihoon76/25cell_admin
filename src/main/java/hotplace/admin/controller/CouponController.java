package hotplace.admin.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hotplace.admin.domain.AjaxVO;
import hotplace.admin.domain.Authority;
import hotplace.admin.domain.CouponHistory;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.service.CouponService;
import hotplace.admin.utils.SessionUtil;

@RequestMapping("/coupon")
@Controller
public class CouponController {

	@Resource(name="couponService")
	CouponService couponService;
	
	@PostMapping("list")
	@ResponseBody
	public ExtjsStoreVO<Authority> getCouponList(
			@RequestParam("limit") int limit,
			@RequestParam("start") int start,
			@RequestParam(name="searchType", required=false) String searchType,
			@RequestParam(name="searchValue", required=false) String searchValue) {
		
		Map map = new HashMap();
		map.put("start", start);
		map.put("limit", limit);
		map.put("searchType", searchType);
		map.put("searchValue", searchValue);
		
		return couponService.getCouponList(map);
	}
	
	@PostMapping("regJehu")
	@ResponseBody
	public AjaxVO regJehu(@RequestBody Map<String, String> map) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
			couponService.regJehu(map.get("jehuName"));
			vo.setSuccess(true);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	@PostMapping("jehulist")
	@ResponseBody
	public AjaxVO<Map<String, String>> getJehuList() {
		
		AjaxVO<Map<String, String>> vo = new AjaxVO<Map<String, String>>(); 
		
		try {
			vo.setSuccess(true);
			List<Map<String, String>> list = couponService.getJehuListForCombo();
			
			vo.setDatas(list);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	@PostMapping("publishCoupon")
	@ResponseBody
	public AjaxVO publishCoupon(@RequestBody Map map) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
			
			ObjectMapper m = new ObjectMapper();
			System.err.println(m.writeValueAsString(map));
			map.put("count", Integer.parseInt(String.valueOf(map.get("count"))));
			map.put("discountValue", Integer.parseInt(String.valueOf(map.get("discountValue"))));
			map.put("jehuNum", Integer.parseInt(String.valueOf(map.get("jehuNum"))));
			map.put("pubId", SessionUtil.getSessionUserId());
			
			couponService.publishCoupon(map);
			vo.setSuccess(true);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	@PostMapping("historylist")
	@ResponseBody
	public ExtjsStoreVO<CouponHistory> getCouponHistoryList(
			@RequestParam("limit") int limit,
			@RequestParam("start") int start,
			@RequestParam(name="searchType", required=false) String searchType,
			@RequestParam(name="searchValue", required=false) String searchValue) {
		
		Map map = new HashMap();
		map.put("start", start);
		map.put("limit", limit);
		map.put("searchType", searchType);
		map.put("searchValue", searchValue);
		
		return couponService.getCouponHistoryList(map);
	}
	
	@PostMapping("excel")
	public void getCouponListExcel(
			@RequestParam("key") String key,
			HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		
		System.err.println("==============" + key);
		//XSSFWorkbook excel =  couponService.getCouponExcel();
		Map<String, Object> result = couponService.getCouponExcel(key);
		XSSFWorkbook excel = (XSSFWorkbook)result.get("workbook");
		
		
		//한글파일명 라우저 별 처리
		String fileName = "발행쿠폰_" + (String)result.get("target");
		if(request.getHeader("User-Agent").contains("MSIE") || request.getHeader("User-Agent").contains("Trident")) {
			fileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
		}
		else {
			fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
		}
				
		response.setHeader("Content-Transper-Encoding", "binary");
		response.setHeader("Content-Disposition", "inline; filename=" + fileName + ".xlsx");
		response.setContentType("application/octet-stream");
		
		
		
		OutputStream os = response.getOutputStream();
		excel.write(os);
		
		os.close();
	}
}
