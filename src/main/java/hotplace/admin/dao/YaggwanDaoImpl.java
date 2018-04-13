package hotplace.admin.dao;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import hotplace.admin.domain.Yaggwan;

@Repository("yaggwanDao")
public class YaggwanDaoImpl implements YaggwanDao {

	private static final String namespace = "mappers.yaggwanMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Override
	public List<Yaggwan> selectYaggwanList() {
		return msSqlSession.selectList(namespace + ".selectYaggwanList");
	}

	@Override
	public boolean updateYaggwan(Yaggwan yaggwan) {
		return 1 == msSqlSession.update(namespace + ".updateYaggwan", yaggwan);
	}

	@Override
	public boolean updateYaggwanSoonseo(Yaggwan yaggwan) {
		return 1 == msSqlSession.update(namespace + ".updateYaggwanSoonseo", yaggwan);
	}

}
