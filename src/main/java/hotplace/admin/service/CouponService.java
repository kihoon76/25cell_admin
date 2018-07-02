package hotplace.admin.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Service;

import hotplace.admin.dao.CouponDao;
import hotplace.admin.domain.Authority;
import hotplace.admin.domain.CouponHistory;
import hotplace.admin.domain.ExcelCouponVO;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.report.Excel;

@Service("couponService")
public class CouponService {

	@Resource(name="couponDao")
	CouponDao couponDao;
	
	@Resource(name="Excel")
	Excel excel;
	
	public ExtjsStoreVO<Authority> getCouponList(Map map) {
		return couponDao.selectCouponList(map);
	}

	public void regJehu(String jehuName) {
		couponDao.insertJehu(jehuName);
		
	}

	public List<Map<String, String>> getJehuListForCombo() {
		return couponDao.selectJehuListForCombo();
	}

	public void publishCoupon(Map map) {
		couponDao.insertCoupon(map);
		
	}
	
	public Map<String, Object> getCouponExcel(String key) {
		List<ExcelCouponVO> list = couponDao.selectCouponsForExcel(key);

		Map<String, Object> result = new HashMap<>();
		
		if(list != null && list.size() > 0) {
			result.put("target", list.get(0).getTargetName());
		}
		else {
			result.put("target", "없음");
		}
		
		result.put("workbook", excel.getWorkbook(list));
		
		return result;
	}

	public ExtjsStoreVO<CouponHistory> getCouponHistoryList(Map map) {
		return couponDao.selectCouponHistoryList(map);
	}

}
