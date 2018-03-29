package hotplace.admin.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import hotplace.admin.dao.AuthorityDao;
import hotplace.admin.domain.Authority;
import hotplace.admin.domain.ExtjsStoreVO;

@Service("authorityService")
public class AuthorityService {

	@Resource(name="authorityDao")
	AuthorityDao authorityDao;
	
	public ExtjsStoreVO<Authority> getAuthorityList() {
		return authorityDao.selectAuthorityList();
	}

	public boolean modifyDefine(Authority authority) {
		return 1 == authorityDao.updateDefine(authority);
	}

}
