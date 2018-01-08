package hotplace.admin.dao;

import hotplace.admin.domain.Configure;
import hotplace.admin.domain.ExtjsStoreVO;

public interface ConfigureDao {

	ExtjsStoreVO<Configure> selectConfigureList();

	Configure updateConfigure(Configure param);

}
