package hotplace.admin.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import hotplace.admin.domain.Account;
import hotplace.admin.domain.ExtjsStoreVO;

@Repository("userDao")
public class UserDaoImpl implements UserDao {

	private static final String namespace = "mappers.userMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Override
	public ExtjsStoreVO<Account> selectUserList(Map map) {
		return msSqlSession.selectOne(namespace + ".selectUserList", map);
	}

	@Override
	public int deleteUserGrade(Account account) {
		return msSqlSession.delete(namespace + ".deleteUserGrade", account);
	}

	@Override
	public int insertUserGrade(Account account) {
		return msSqlSession.insert(namespace + ".insertUserGrade", account);
	}

}
