package hotplace.admin.dao;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import hotplace.admin.domain.Authority;
import hotplace.admin.domain.ExtjsStoreVO;

@Repository("authorityDao")
public class AuthorityDaoImpl implements AuthorityDao {

	private final static String namespace = "mappers.authorityMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Override
	public ExtjsStoreVO<Authority> selectAuthorityList() {
		return msSqlSession.selectOne(namespace + ".selectAuthorityList");
	}

}
