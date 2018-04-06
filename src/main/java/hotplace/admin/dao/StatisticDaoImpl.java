package hotplace.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository("statisticDao")
public class StatisticDaoImpl implements StatisticDao {

	private static final String namespace = "mappers.statisticMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;

	@Override
	public List<Map<String, Object>> selectUserKind() {
		return msSqlSession.selectList(namespace + ".selectUserKind");
	}
}
