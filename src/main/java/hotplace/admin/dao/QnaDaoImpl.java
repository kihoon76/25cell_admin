package hotplace.admin.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.QnA;

@Repository("qnaDao")
public class QnaDaoImpl implements QnaDao {

	private final static String namespace = "mappers.qnaMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;

	@Override
	public ExtjsStoreVO<QnA> selectQnaList(Map map) {
		return msSqlSession.selectOne(namespace + ".selectQnaList", map);
	}

	@Override
	public String selectOpenedQuestion(Map<String, String> m) {
		return msSqlSession.selectOne(namespace + ".selectOpenedQuestion", m);
	}

	@Override
	public QnA selectQuestion(Map<String, String> m) {
		return msSqlSession.selectOne(namespace + ".selectQuestion", m);
	}

	@Override
	public void updateProcessor(Map<String, String> m) {
		msSqlSession.update(namespace + ".updateProcessor", m);
		
	}

	@Override
	public void updateProcess(Map<String, String> param) {
		msSqlSession.update(namespace + ".updateProcess", param);
	}
}
