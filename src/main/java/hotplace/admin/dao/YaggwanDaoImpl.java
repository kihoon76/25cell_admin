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
	public void updateYaggwan(Yaggwan yaggwan) {
		msSqlSession.update(namespace + ".updateYaggwan", yaggwan);
	}

	@Override
	public void updateYaggwanSoonseo(Yaggwan yaggwan) {
		msSqlSession.update(namespace + ".updateYaggwanSoonseo", yaggwan);
	}

	@Override
	public void deleteYaggwan(Yaggwan yaggwan) {
		msSqlSession.update(namespace + ".deleteYaggwan", yaggwan);
	}

	@Override
	public void insertYaggwan(Yaggwan yaggwan) {
		msSqlSession.update(namespace + ".insertYaggwan", yaggwan);
	}

}
