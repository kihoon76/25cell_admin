package hotplace.admin.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.Payment;

@Repository("paymentDao")
public class PaymentDaoImpl implements PaymentDao {

	private final static String namespace = "mappers.paymentMapper"; 
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;

	@Override
	public ExtjsStoreVO<Payment> selectPaymentList(Map map) {
		return msSqlSession.selectOne(namespace + ".selectPaymentList", map);
	}

	@Override
	public void updatePayment(Map<String, String> param) {
		msSqlSession.update(namespace + ".updatePayment", param);
	}

	@Override
	public void insertMockPayment(Map<String, String> param) {
		msSqlSession.insert(namespace + ".insertMockPayment", param);
	}
}
