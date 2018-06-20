package hotplace.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import hotplace.admin.domain.Authority;
import hotplace.admin.domain.ExtjsStoreVO;

@Repository("couponDao")
public class CouponDaoImpl implements CouponDao {

	private final static String namespace = "mappers.couponMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Override
	public ExtjsStoreVO<Authority> selectCouponList(Map map) {
		return msSqlSession.selectOne(namespace + ".selectCouponList", map);
	}

	@Override
	public void insertJehu(String jehuName) {
		msSqlSession.insert(namespace + ".insertJehu", jehuName);
		
	}

	@Override
	public List<Map<String, String>> selectJehuListForCombo() {
		return msSqlSession.selectList(namespace + ".selectJehuListForCombo");
	}

	@Override
	public void insertCoupon(Map map) {
		msSqlSession.insert(namespace + ".insertCoupon", map);
		
	}

}
