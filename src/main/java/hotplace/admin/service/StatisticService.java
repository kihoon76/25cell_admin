package hotplace.admin.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import hotplace.admin.dao.StatisticDao;

@Service("statisticService")
public class StatisticService {

	@Resource(name="statisticDao")
	StatisticDao statisticDao;
	
	public List<Map<String, Object>> getUserKind() {
		return statisticDao.selectUserKind();
	}

}
