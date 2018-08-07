package hotplace.admin.dao;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import hotplace.admin.domain.Configure;
import hotplace.admin.domain.ExtjsStoreVO;

@Repository("configureDao")
public class ConfigureDaoImpl implements ConfigureDao {

	private final static String namespace = "mappers.configureMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Override
	public ExtjsStoreVO<Configure> selectConfigureList() {
		return msSqlSession.selectOne(namespace + ".selectConfigureList");
	}

	@Override
	public Configure updateConfigure(Configure param) {
		int r = msSqlSession.update(namespace + ".updateConfigure", param);
		if(r == 1) return param;
		
		return null;
	}

}
