package hotplace.admin.dao;

import java.util.Map;

import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.QnA;

public interface QnaDao {

	ExtjsStoreVO<QnA> selectQnaList(Map map);

}
