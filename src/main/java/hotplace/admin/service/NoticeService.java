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

	public Notice getNoticeOne(int writeNum) {
		return noticeDao.selectNoticeOne(writeNum);
	}

	public int modifyNoticeOne(Map map) {
		return noticeDao.updateNoticeOne(map);
	}

	public int writeNotice(Map<String, String> map) {
		return noticeDao.insertNotice(map);
	}

	public int removeNoticeOne(int writeNum) {
		return noticeDao.deleteNotice(writeNum);
	}

	
}
