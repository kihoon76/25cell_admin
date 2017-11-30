package hotplace.admin.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import hotplace.admin.dao.NoticeDao;
import hotplace.admin.domain.ExtjsStoreVO;
import hotplace.admin.domain.Notice;

@Service("noticeService")
public class NoticeService {
	
	@Resource(name="noticeDao")
	NoticeDao noticeDao;

	public ExtjsStoreVO<Notice> getNoticeList(Map map) {
		return noticeDao.selectNoticeList(map);
	}

	
}
