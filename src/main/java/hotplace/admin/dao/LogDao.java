package hotplace.admin.dao;

import java.util.Map;

import hotplace.admin.domain.AccessLog;
import hotplace.admin.domain.ExtjsStoreVO;

public interface LogDao {

	ExtjsStoreVO<AccessLog> selectLogList(Map map);

}
