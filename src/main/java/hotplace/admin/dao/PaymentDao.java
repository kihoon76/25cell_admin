package hotplace.admin.dao;

import java.util.Map;

import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.Payment;

public interface PaymentDao {

	ExtjsStoreVO<Payment> selectPaymentList(Map map);

	void updatePayment(Map<String, String> param);

	void insertMockPayment(Map<String, String> param);


}
