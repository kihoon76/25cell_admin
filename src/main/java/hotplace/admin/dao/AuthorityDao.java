package hotplace.admin.dao;

import hotplace.admin.domain.Authority;
import hotplace.admin.domain.ExtjsStoreVO;

public interface AuthorityDao {

	public ExtjsStoreVO<Authority> selectAuthorityList();

	public int updateDefine(Authority authority);

}
