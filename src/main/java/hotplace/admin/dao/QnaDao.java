package hotplace.admin.dao;

import java.util.Map;

import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.QnA;

public interface QnaDao {

	ExtjsStoreVO<QnA> selectQnaList(Map map);

	String selectOpenedQuestion(Map<String, String> m);

	QnA selectQuestion(Map<String, String> m);

}
