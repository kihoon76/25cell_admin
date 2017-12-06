package hotplace.admin.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import hotplace.admin.domain.AccessLog;
import hotplace.admin.domain.ExtjsStoreVO;

@Repository("logDao")
public class LogDaoImpl implements LogDao {

	private static final String namespace = "mappers.logMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Override
	public ExtjsStoreVO<AccessLog> selectLogList(Map map) {
		return msSqlSession.selectOne(namespace + ".selectLogList", map);
				
	}

}
