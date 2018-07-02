package hotplace.admin.domain;

import org.apache.ibatis.type.Alias;

@Alias("CouponHistory")
public class CouponHistory {

	private String key;						//내역번호
	private String pubDate;					//발행날짜
	private String pubTarget;				//발행대상
	private String pubTargetName;			//발행대상명
	private String pubId;					//발행인아이디
	private String pubName;					//발행인명
	private int pubCount;					//발행수
	
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getPubDate() {
		return pubDate;
	}
	public void setPubDate(String pubDate) {
		this.pubDate = pubDate;
	}
	public String getPubTargetName() {
		return pubTargetName;
	}
	public void setPubTargetName(String pubTargetName) {
		this.pubTargetName = pubTargetName;
	}
	public String getPubId() {
		return pubId;
	}
	public void setPubId(String pubId) {
		this.pubId = pubId;
	}
	public int getPubCount() {
		return pubCount;
	}
	public void setPubCount(int pubCount) {
		this.pubCount = pubCount;
	}
	public String getPubName() {
		return pubName;
	}
	public void setPubName(String pubName) {
		this.pubName = pubName;
	}
	public String getPubTarget() {
		return pubTarget;
	}
	public void setPubTarget(String pubTarget) {
		this.pubTarget = pubTarget;
	}
}
