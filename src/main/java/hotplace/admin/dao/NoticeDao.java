package hotplace.admin.dao;

import java.util.Map;

import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.Notice;

public interface NoticeDao {

	ExtjsStoreVO<Notice> selectNoticeList(Map map);

	Notice selectNoticeOne(int writeNum);

	int updateNoticeOne(Map map);

	int insertNotice(Map<String, String> map);

	int deleteNotice(int writeNum);
	
}
