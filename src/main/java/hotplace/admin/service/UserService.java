package hotplace.admin.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import hotplace.admin.dao.UserDao;
import hotplace.admin.domain.Account;
import hotplace.admin.domain.ExtjsStoreVO;

@Service("userService")
public class UserService {

	@Resource(name="userDao")
	UserDao userDao;
	
	public ExtjsStoreVO<Account> getUserList(Map map) {
		return userDao.selectUserList(map);
	}

}
