package hotplace.admin.dao;

import hotplace.admin.domain.Configure;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.SystemUpdate;

public interface ConfigureDao {

	ExtjsStoreVO<Configure> selectConfigureList();

	Configure updateConfigure(Configure param);

	ExtjsStoreVO<SystemUpdate> selectUpdateList();

	void insertUpdateSystemUpdateInfo(SystemUpdate systemUpdate);

	void updateSystemUpdateInfo(SystemUpdate systemUpdate);

	void deleteSystemUpdateInfo(SystemUpdate systemUpdate);

}
