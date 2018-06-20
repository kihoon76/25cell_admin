package hotplace.admin.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import hotplace.admin.dao.CouponDao;
import hotplace.admin.domain.Authority;
import hotplace.admin.domain.ExtjsStoreVO;

@Service("couponService")
public class CouponService {

	@Resource(name="couponDao")
	CouponDao couponDao;
	
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

}
