package hotplace.admin.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import hotplace.admin.dao.YaggwanDao;
import hotplace.admin.domain.Yaggwan;

@Service("yaggwanService")
public class YaggwanService {

	@Resource(name="yaggwanDao")
	YaggwanDao yaggwanDao;
	
	public List<Yaggwan> getYaggwanList() {
		return yaggwanDao.selectYaggwanList();
	}

	@Transactional(isolation=Isolation.DEFAULT, 
			   propagation=Propagation.REQUIRED, 
			   rollbackFor=Exception.class,
			   timeout=10)//timeout 초단위
	public boolean modifyYaggwan(Yaggwan yaggwan) throws Exception {
		
		int orginSoonseo = yaggwan.getOriginSoonseo();
		int soonseo = yaggwan.getSoonseo();
		
		if(orginSoonseo != soonseo) {
			yaggwanDao.updateYaggwanSoonseo(yaggwan);
		}
		
		yaggwanDao.updateYaggwan(yaggwan);
		
		return true;
	}

	public void removeYaggwan(Yaggwan yaggwan) {
		yaggwanDao.deleteYaggwan(yaggwan);
	}

	public void registYaggwan(Yaggwan yaggwan) {
		yaggwanDao.insertYaggwan(yaggwan);
	}

	
}
