package hotplace.admin.dao;

import java.util.List;
import java.util.Map;

import hotplace.admin.domain.Authority;
import hotplace.admin.domain.ExtjsStoreVO;

public interface AuthorityDao {

	public ExtjsStoreVO<Authority> selectAuthorityList();

	public int updateDefine(Authority authority);

	public  List<Map<String, String>> selectAuthorityDefineList();

}
