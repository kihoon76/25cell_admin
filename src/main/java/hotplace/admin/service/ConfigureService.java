package hotplace.admin.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import hotplace.admin.dao.ConfigureDao;
import hotplace.admin.domain.Configure;
import hotplace.admin.domain.ExtjsStoreVO;

@Service("configureService")
public class ConfigureService {

	@Resource(name="configureDao")
	ConfigureDao configureDao;
	
	public ExtjsStoreVO<Configure> getConfigureList() {
		return configureDao.selectConfigureList();
	}

	public Configure modifyConfig(Configure param) {
		return configureDao.updateConfigure(param);
	} 
}
