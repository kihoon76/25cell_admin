package hotplace.admin.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import hotplace.admin.dao.LogDao;
import hotplace.admin.domain.AccessLog;
import hotplace.admin.domain.ExtjsStoreVO;

@Service("logService")
public class LogService {

	@Resource(name="logDao")
	LogDao logDao;
	
	public ExtjsStoreVO<AccessLog> getLogList(Map map) {
		return logDao.selectLogList(map);
	}

}
