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

	@Override
	public List<Map<String, Object>> selectUserRegDate(int regYear) {
		return msSqlSession.selectList(namespace + ".selectUserRegDate", regYear);
	}

	@Override
	public List<Map<String, Object>> selectAccessPerTime(Map<String, Integer> param) {
		return msSqlSession.selectList(namespace + ".selectAccessPerTime", param);
	}

	@Override
	public List<Map<String, Object>> selectCompareContent(Map<String, Integer> param) {
		return msSqlSession.selectList(namespace + ".selectCompareContent", param);
	}
}
