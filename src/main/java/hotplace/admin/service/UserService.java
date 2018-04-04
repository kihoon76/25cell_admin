package hotplace.admin.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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

	@Transactional(isolation=Isolation.DEFAULT, 
			   propagation=Propagation.REQUIRED, 
			   rollbackFor=Exception.class,
			   timeout=10)//timeout 초단위
	public boolean modifyUserAuth(Account account) throws Exception {
		userDao.deleteUserGrade(account);
		
		if(account.getGradeNum() != null) {
			userDao.insertUserGrade(account);
		}
		
		account.setGradeNum("1");
		userDao.deleteUserGrade(account);
		
		if("Y".equals(account.getAdmin())) {
			userDao.insertUserGrade(account);
		}
		
		return true;
	}
}
