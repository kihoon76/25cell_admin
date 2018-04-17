package hotplace.admin.dao;

import java.util.List;
import java.util.Map;

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

	@Override
	public int updateDefine(Authority authority) {
		return msSqlSession.update(namespace + ".updateAuthority", authority);
	}

	@Override
	public List<Map<String, String>> selectAuthorityDefineList() {
		return msSqlSession.selectList(namespace + ".selectAuthorityDefineList");
	}

	@Override
	public void insertAuthority(Authority authority) {
		msSqlSession.insert(namespace + ".insertAuthority", authority);
		
	}

	@Override
	public void deleteAuthority(Authority authority) {
		msSqlSession.delete(namespace + ".deleteAuthority", authority);
	}
}
