package hotplace.admin.dao;

import java.util.Map;

import hotplace.admin.domain.Account;
import hotplace.admin.domain.ExtjsStoreVO;

public interface UserDao {

	ExtjsStoreVO<Account> selectUserList(Map map);

	int deleteUserGrade(Account account);

	int insertUserGrade(Account account);

	Account selectUserInfo(String accountId);

	void updateUserInfo(Account account);

	void updateUserOut(Account account);

}
