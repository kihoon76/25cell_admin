package hotplace.admin.service;

import java.util.List;
import java.util.Map;

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

	public List<Map<String, String>> getDefine() {
		return authorityDao.selectAuthorityDefineList();
	}

}
