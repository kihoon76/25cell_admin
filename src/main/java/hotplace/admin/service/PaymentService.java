package hotplace.admin.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import hotplace.admin.dao.PaymentDao;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.Payment;

@Service("paymentService")
public class PaymentService {
	
	@Resource(name="paymentDao")
	PaymentDao paymentDao;

	public ExtjsStoreVO<Payment> getPaymentList(Map map) {
		return paymentDao.selectPaymentList(map);
	}

	public void confirmPayment(Map<String, String> param) {
		paymentDao.updatePayment(param);
	}

	public void mockPayment(Map<String, String> param) {
		paymentDao.insertMockPayment(param);
		
	}

}
