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
		
		if(account.getGrade() != null && !"".equals(account.getGrade())) {
			userDao.insertUserGrade(account);
		}
		
		if("Y".equals(account.getAdmin())) {
			userDao.insertUserGradeAdmin(account);
		}
		else if("Y".equals(account.getQaAdmin())) {
			userDao.insertUserGradeQaAdmin(account);
		}
		
		userDao.updateUserInfo(account);
		
		return true;
	}

	public Account getUserInfo(String accountId) {
		return userDao.selectUserInfo(accountId);
	}

	public void outUser(Account account) {
		userDao.updateUserOut(account);
		
	}
}
