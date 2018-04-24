package hotplace.admin.service;

import java.util.ArrayList;
import java.util.HashMap;
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

	public List<Map<String, Object>> getUserRegDate(int regYear) {
		List<Map<String, Object>> list = statisticDao.selectUserRegDate(regYear);
		if(list != null && list.size() > 0) {
			int len = list.size();
			Map<String, Map<String, Object>> item = new HashMap<String, Map<String, Object>>();
			for(int i=0; i<len; i++) {
				item.put(String.valueOf(list.get(i).get("regMonth")), list.get(i));
			}
			
			List<Map<String, Object>> newList = new ArrayList<>();
			
			for(int i=1; i<=12; i++) {
				String strI = String.valueOf(i) + "월";
				if(item.get(strI) != null) {
					newList.add(item.get(strI));
				}
				else {
					Map<String, Object> m = new HashMap<String, Object>();
					m.put("regYear", regYear);
					m.put("regMonth", strI);
					m.put("cnt", 0);
					
					newList.add(m);
				}
			}

			list = newList;
		}
		
		return list;		
	}

}
