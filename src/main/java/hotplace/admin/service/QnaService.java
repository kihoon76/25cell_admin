package hotplace.admin.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import hotplace.admin.dao.QnaDao;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.QnA;

@Service("qnaService")
public class QnaService {

	@Resource(name="qnaDao")
	QnaDao qnaDao;
	
	public ExtjsStoreVO<QnA> getQnaList(Map map) {
		return qnaDao.selectQnaList(map);
	}

	public String processOpen(Map<String, String> m) {
		String processor = qnaDao.selectOpenedQuestion(m);
		
		return "";
	}

	public QnA getQuestion(Map<String, String> m) {
		return qnaDao.selectQuestion(m);
	}

}
