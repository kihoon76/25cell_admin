package hotplace.admin.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
	
	public XSSFWorkbook getCouponExcel() {
		List<ExcelCouponVO> list = couponDao.selectCouponsForExcel();
		return excel.getWorkbook(list);
	}

	public ExtjsStoreVO<CouponHistory> getCouponHistoryList(Map map) {
		return couponDao.selectCouponHistoryList(map);
	}

}
