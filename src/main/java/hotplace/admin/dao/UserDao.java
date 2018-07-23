package hotplace.admin.dao;

import java.util.List;
import java.util.Map;

import hotplace.admin.domain.Account;
import hotplace.admin.domain.ExtjsStoreVO;

public interface UserDao {

	ExtjsStoreVO<Account> selectUserList(Map map);

	int deleteUserGrade(Account account);
	
	int deleteUserGradeNotAdmin(Account account);
	
	int deleteUserGradeAdmin(Account account);

	int insertUserGrade(Account account);

	Account selectUserInfo(String accountId);
	
	Map selectPaymentUserInfo(String accountId);

	void updateUserInfo(Account account);

	void updateUserOut(Account account);

	void insertUserGradeAdmin(Account account);

	void insertUserGradeQaAdmin(Account account);

	List<Map<String, String>> selectAdminUserList(String accountId);

}
