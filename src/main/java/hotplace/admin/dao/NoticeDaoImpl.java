package hotplace.admin.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.Notice;

@Repository("noticeDao")
public class NoticeDaoImpl implements NoticeDao {

	private final static String namespace = "mappers.noticeMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;

	@Override
	public ExtjsStoreVO<Notice> selectNoticeList(Map map) {
		return msSqlSession.selectOne(namespace + ".selectNoticeList", map);
	}

	@Override
	public Notice selectNoticeOne(int writeNum) {
		return msSqlSession.selectOne(namespace + ".selectNoticeOne", writeNum);
	}
	
}
