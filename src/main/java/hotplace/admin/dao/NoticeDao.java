package hotplace.admin.dao;

import java.util.Map;

import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.Notice;

public interface NoticeDao {

	ExtjsStoreVO<Notice> selectNoticeList(Map map);

	Notice selectNoticeOne(int writeNum);
	
}
