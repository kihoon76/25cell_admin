package hotplace.admin.dao;

import java.util.List;
import java.util.Map;

public interface StatisticDao {

	List<Map<String, Object>> selectUserKind();

	List<Map<String, Object>> selectUserRegDate(int regYear);
	
	List<Map<String, Object>> selectAccessPerTime(Map<String, Integer> param);

}
