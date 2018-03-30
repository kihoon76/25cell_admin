package hotplace.admin.dao;

import java.util.Map;

import hotplace.admin.domain.Account;
import hotplace.admin.domain.ExtjsStoreVO;

public interface UserDao {

	ExtjsStoreVO<Account> selectUserList(Map map);

}
