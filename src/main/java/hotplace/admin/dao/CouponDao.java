package hotplace.admin.dao;

import java.util.List;
import java.util.Map;

import hotplace.admin.domain.Authority;
import hotplace.admin.domain.CouponHistory;
import hotplace.admin.domain.ExcelCouponVO;
import hotplace.admin.domain.ExtjsStoreVO;

public interface CouponDao {

	ExtjsStoreVO<Authority> selectCouponList(Map map);

	void insertJehu(String jehuName);

	List<Map<String, String>> selectJehuListForCombo();

	void insertCoupon(Map map);

	List<ExcelCouponVO> selectCouponsForExcel(String key);

	ExtjsStoreVO<CouponHistory> selectCouponHistoryList(Map map);

}
